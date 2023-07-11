/*
 * Copyright 2023 Marek Kobida
 */

import { pernik } from '../../../packages/2023/DestinationSelector';
import getDestinationsFromDestination from '../../../packages/2023/DestinationSelector/helpers/getDestinationsFromDestination';
import getFilterConditions from '../../../private/components/Filter/FilterChildrenHelpers/getFilterConditions';
import deleteSoldOutTermsFromHotels from '../../../private/components/HotelSelection/deleteSoldOutTermsFromHotels';
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
  query?: string;
  //
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
  $?: { createdAt: number; hash: string; size: number; version: string };
  destinations: EnhancedDestination[];

  constructor(destinations: Destination[], $?: { createdAt: number; hash: string; size: number; version: string }) {
    this.$ = $;
    this.destinations = destinations.map(destination => new EnhancedDestination(destination));
  }

  searchHotels(searchInput: SearchInput = {}, skipSoldOut = true): EnhancedHotel[] {
    const {
      query,
      //
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

    const hotels = this.destinations.flatMap(destination =>
      destination
        .hotels(true)
        .filter(
          hotel =>
            filterConditions.hotel.every(filterCondition => {
              return filterCondition(hotel);
            }) &&
            hotel.terms.every(hotelTerm => {
              return filterConditions.hotelTerm.some(filterCondition => {
                return filterCondition(hotelTerm);
              });
            })
        )
        .map(hotel => {
          const hotel2: EnhancedHotel = Object.assign(Object.create(Object.getPrototypeOf(hotel)), hotel);

          hotel2.terms = hotel2.terms
            .filter(hotelTerm => {
              return filterConditions.hotelTerm.every(filterCondition => {
                return filterCondition(hotelTerm);
              });
            })
            .sort((l, r) => {
              return l.price > r.price ? 1 : -1;
            });

          return hotel2;
        })
        .map(hotel => {
          const hotel2: EnhancedHotel = Object.assign(Object.create(Object.getPrototypeOf(hotel)), hotel);

          if (query) {
            hotel2.terms = hotel2.terms.filter(
              term =>
                getFilterConditions[0](term, query) ||
                (getFilterConditions[1](term, query) && getFilterConditions[2](term, query)) ||
                getFilterConditions[3](term, query)
            );
          }

          return hotel2;
        })
    );

    function defaultSort(htls) {
      return (
        htls
          // dokončiť
          .filter(hotel => hotel.terms.length > 0)
          .sort((l, r) => {
            const lFirst = l.terms[0];
            const rFirst = r.terms[0];

            if (+lFirst.date[0] > +rFirst.date[0]) {
              return 1;
            }

            if (+lFirst.date[0] < +rFirst.date[0]) {
              return -1;
            }
          })
      );
    }

    // toto je dôležité

    function omitSoldOutHotels(arr: EnhancedHotel[]): EnhancedHotel[] {
      if (skipSoldOut) {
        return deleteSoldOutTermsFromHotels(arr);
      }

      return arr;
    }

    // TODO
    if (s) {
      const { left, right } = new EnhancedRegExp<{ left: string; right: string }>(
        '^(?<left>[^\u2191|\u2193]+)(?<right>\u2191|\u2193)$'
      ).groups(s);

      const UP = '\u2191';
      const DOWN = '\u2193';

      if (left === 'price' && right === UP) {
        return omitSoldOutHotels(hotels).sort((l, r) => {
          const lFirst = l.terms[0]?.price;
          const rFirst = r.terms[0]?.price;

          return !!lFirst ? (lFirst > rFirst ? 1 : -1) : 1;
        });
      } else if (left === 'price' && right === DOWN) {
        return omitSoldOutHotels(hotels).sort((l, r) => {
          const lFirst = l.terms[0]?.price;
          const rFirst = r.terms[0]?.price;

          return !!lFirst ? (lFirst < rFirst ? 1 : -1) : 1;
        });
      } else if (left === 'date' && right === '\u2191') {
        return defaultSort(omitSoldOutHotels(hotels));
      }
    } else {
      return defaultSort(omitSoldOutHotels(hotels));
    }

    return omitSoldOutHotels(hotels);
  }
}

function createTree(
  destinations: Destination[],
  $?: { createdAt: number; hash: string; size: number; version: string }
): Tree {
  return new Tree(destinations, $);
}

export default createTree;
