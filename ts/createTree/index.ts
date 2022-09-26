/*
 * Copyright 2022 Marek Kobida
 */

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
  hasDiscount?: boolean;
  hotelId?: number;
  price?: [from: number, to: number];
  serviceId?: number[];
  stars?: number[];
  transportationId?: number[];
  //--------------------------------------------------------------------------------------------------------------------
  s?: string;
}

export class Tree {
  destinations: EnhancedDestination[];

  constructor(destinations: Destination[]) {
    this.destinations = destinations.map(destination => new EnhancedDestination(destination));
  }

  searchHotels({
    category,
    date,
    days,
    destinationId,
    hasDiscount,
    hotelId,
    price,
    s,
    serviceId,
    stars,
    transportationId,
  }: SearchInput = {}): EnhancedHotel[] {
    const filterConditions: FilterConditions = {
      hotel: [
        // (1) development
        hotel =>
          destinationId
            ? hotel
                .breadcrumbs(hotel.parent, destination => destination.id)
                .findIndex(breadcrumb => destinationId.findIndex(id => id === breadcrumb) !== -1) !== -1
            : true,
        // has category
        hotel => (category ? category.findIndex(hotel.hasCategory) !== -1 : true),
        // has id
        hotel => (hotelId ? hotel.id === hotelId : true),
        // has serviceId
        hotel =>
          serviceId
            ? Array.isArray(serviceId)
              ? serviceId.findIndex(hotel.hasServiceId) !== -1
              : hotel.hasServiceId(serviceId)
            : true,
        // has stars
        hotel => (stars ? stars.findIndex(hotel.hasStars) !== -1 : true),
      ],
      hotelTerm: [
        // (2) development
        hotelTerm => (date ? +hotelTerm.date[0] > date[0] && +hotelTerm.date[1] < date[1] : true),
        // has days
        hotelTerm => (days ? hotelTerm.hasDays(days[0], days[1]) : true),
        // has discount
        hotelTerm => (hasDiscount ? hotelTerm.hasDiscount() : true),
        // has price
        hotelTerm => (price ? hotelTerm.hasPrice(price[0], price[1]) : true),
        // has transportationId
        hotelTerm => (transportationId ? transportationId.findIndex(hotelTerm.hasTransportationId) !== -1 : true),
      ],
    };

    let hotels = this.destinations.flatMap(destination =>
      destination
        .hotels(true)
        .filter(
          hotel =>
            // 1
            filterConditions.hotel.every(filterCondition => filterCondition(hotel)) &&
            // 2
            hotel.terms.filter(hotelTerm =>
              filterConditions.hotelTerm.every(filterCondition => filterCondition(hotelTerm))
            ).length
        )
        .map(hotel => {
          hotel.terms = hotel.terms
          .filter(hotelTerm =>
            filterConditions.hotelTerm.every(filterCondition => filterCondition(hotelTerm))
          )
          .sort((l,r) => l.price > r.price ? 1 : -1);

          return hotel;
        })
    );

    const [sl,sr] = s?.split(',') ?? []

    console.log('slsr', s,sl, sr)

    if (sl && sr) {
      if (sl === 'price' && sr==='0') {
        hotels = hotels.sort((l,r)=>l.terms[0].price < r.terms[0].price ? 1 : -1)
      } else if (sl==='price' && sr==='1') {
        hotels = hotels.sort((l,r)=>l.terms[0].price > r.terms[0].price ? 1 : -1)
      }
    }

    return hotels;
  }
} 

function createTree(destinations: Destination[]): Tree {
  return new Tree(destinations);
}

export default createTree;
