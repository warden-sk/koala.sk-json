/*
 * Copyright 2023 Marek Kobida
 */

import { pernik } from '../../../private/2023/DestinationSelector';
import getDestinationsFromDestination from '../../../private/2023/DestinationSelector/helpers/getDestinationsFromDestination';
import EnhancedRegExp from '../../../private/helpers/EnhancedRegExp';
import type { Destination } from '../createDestination';
import EnhancedDestination from './EnhancedDestination';
import type EnhancedHotel from './EnhancedHotel';
import type EnhancedHotelTerm from './EnhancedHotelTerm';

export interface FilterConditions {
  hotel: ((hotel: EnhancedHotel) => boolean)[];
  hotelTerm: ((hotelTerm: EnhancedHotelTerm) => boolean)[];
}

export interface SearchInput {
  category?: number[];
  date?: [from: number, to: number];
  days?: [from: number, to: number];
  destinationId?: number[];
  equipmentId?: number[];
  hasDiscount?: boolean;
  hotelId?: number;
  price?: [from: number, to: number];
  serviceId?: number[];
  stars?: number[];
  transportationFromId?: number[];
  transportationId?: number[];
  url?: string;
  //--------------------------------------------------------------------------------------------------------------------
  s?: string;
}

export class Tree {
  destinations: EnhancedDestination[];

  constructor(destinations: Destination[]) {
    this.destinations = destinations.map(destination => new EnhancedDestination(destination));
  }

  searchHotels(searchInput: SearchInput = {}): EnhancedHotel[] {
    const {
      category,
      date,
      days,
      destinationId,
      equipmentId,
      hasDiscount,
      hotelId,
      price,
      s,
      serviceId,
      stars,
      transportationFromId,
      transportationId,
      url,
    } = searchInput;

    // dokončiť
    const destinations = [
      ...this.destinations,
      ...this.destinations.flatMap(destination => getDestinationsFromDestination(destination)),
    ].filter(destination => (destinationId ?? []).indexOf(destination.id) !== -1);

    const dOf = pernik(destinations).map(destination => destination.id);

    const destinationId2 = dOf.length > 0 ? dOf : undefined;

    const filterConditions: FilterConditions = {
      hotel: [
        // (1) development
        hotel =>
          destinationId2
            ? hotel
                .breadcrumbs(hotel.parent, destination => destination.id)
                .findIndex(breadcrumb => destinationId2.findIndex(id => id === breadcrumb) !== -1) !== -1
            : true,
        // has category
        hotel => (category ? category.findIndex(hotel.hasCategory) !== -1 : true),
        // has equipmentId
        hotel => (equipmentId ? equipmentId.findIndex(hotel.hasEquipmentId) !== -1 : true),
        // has id
        hotel => (hotelId ? hotel.id === hotelId : true),
        // has stars
        hotel => (stars ? stars.findIndex(hotel.hasStars) !== -1 : true),
        // has url
        hotel => (url ? hotel.url === url : true),
      ],
      hotelTerm: [
        // (2) development
        hotelTerm => (date ? +hotelTerm.date[0] >= date[0] && +hotelTerm.date[1] <= date[1] : true),
        // has days
        hotelTerm => (days ? hotelTerm.hasDays(days[0], days[1]) : true),
        // has discount
        hotelTerm => (hasDiscount ? hotelTerm.hasDiscount() : true),
        // has price
        hotelTerm => (price ? hotelTerm.hasPrice(price[0], price[1]) : true),
        // has serviceId
        hotelTerm =>
          serviceId
            ? Array.isArray(serviceId)
              ? serviceId.findIndex(n => hotelTerm.hasServiceId(n)) !== -1
              : hotelTerm.hasServiceId(serviceId)
            : true,
        // has hasTransportationFromId
        hotelTerm =>
          transportationFromId
            ? transportationFromId.findIndex(n => hotelTerm.hasTransportationFromId(n)) !== -1
            : true,
        // has transportationId
        hotelTerm =>
          transportationId ? transportationId.findIndex(n => hotelTerm.hasTransportationId(n)) !== -1 : true,
      ],
    };

    if (searchInput && searchInput.date) {
      console.log(
        'dátum vyhľadávania',
        searchInput.date.map(d => new Date(d).toString())
      );
    }

    const hotels = this.destinations.flatMap(destination =>
      destination
        .hotels(true)
        .filter(
          hotel =>
            filterConditions.hotel.every(filterCondition => filterCondition(hotel)) &&
            hotel.terms.every(hotelTerm =>
              filterConditions.hotelTerm.some(filterCondition => filterCondition(hotelTerm))
            )
        )
        // TODO
        .map(hotel => {
          const hotel2: EnhancedHotel = Object.assign(Object.create(Object.getPrototypeOf(hotel)), hotel);

          if (/Alba Resort/.test(hotel.name)) {
            console.log('🏨', hotel.name, hotel.terms);
          }

          hotel2.terms = hotel2.terms
            .filter(hotelTerm => filterConditions.hotelTerm.every(filterCondition => filterCondition(hotelTerm)))
            .sort((l, r) => (l.price > r.price ? 1 : -1));

          return hotel2;
        })
    );

    // TODO
    if (s) {
      const { left, right } = new EnhancedRegExp<{ left: string; right: string }>(
        '^(?<left>[^\u2191|\u2193]+)(?<right>\u2191|\u2193)$'
      ).groups(s);

      const UP = '\u2191';
      const DOWN = '\u2193';

      if (left === 'price' && right === UP) {
        return hotels.sort((l, r) => {
          const lFirst = l.terms[0]?.price;
          const rFirst = r.terms[0]?.price;

          return !!lFirst ? (lFirst > rFirst ? 1 : -1) : 1;
        });
      }

      if (left === 'price' && right === DOWN) {
        return hotels.sort((l, r) => {
          const lFirst = l.terms[0]?.price;
          const rFirst = r.terms[0]?.price;

          return !!lFirst ? (lFirst < rFirst ? 1 : -1) : 1;
        });
      }
    }

    return hotels;
  }
}

function createTree(destinations: Destination[]): Tree {
  return new Tree(destinations);
}

export default createTree;
