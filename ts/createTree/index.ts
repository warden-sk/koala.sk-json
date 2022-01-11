/*
 * Copyright 2022 Marek Kobida
 */

import { Destination } from '../createDestination';
import EnhancedDestination from './EnhancedDestination';
import EnhancedHotel from './EnhancedHotel';
import EnhancedHotelTerm from './EnhancedHotelTerm';

export interface Conditions {
  hotel: ((hotel: EnhancedHotel) => boolean)[];
  hotelTerm: ((hotelTerm: EnhancedHotelTerm) => boolean)[];
}

export interface SearchInput {
  days?: [from: number, to: number];
  name?: string;
  price?: [from: number, to: number];
  stars?: number[] | number;
  transportationId?: number[] | number;
}

class EnhancedTree {
  destinations: EnhancedDestination[];

  constructor(destinations: Destination[]) {
    this.destinations = destinations.map(destination => new EnhancedDestination(destination));
  }

  search({ days, name, price, stars, transportationId }: SearchInput = {}): EnhancedHotel[] {
    const conditions: Conditions = {
      hotel: [
        // has name
        hotel => (name ? new RegExp(name).test(hotel.name) : true),
        // has stars
        hotel =>
          stars ? (Array.isArray(stars) ? stars.findIndex(hotel.hasStars) !== -1 : hotel.hasStars(stars)) : true,
      ],
      hotelTerm: [
        // has days
        hotelTerm => (days ? hotelTerm.hasDays(days[0], days[1]) : true),
        // has price
        hotelTerm => (price ? hotelTerm.hasPrice(price[0], price[1]) : true),
        // has transportationId
        hotelTerm =>
          transportationId
            ? Array.isArray(transportationId)
              ? transportationId.findIndex(hotelTerm.hasTransportationId) !== -1
              : hotelTerm.hasTransportationId(transportationId)
            : true,
      ],
    };

    return this.destinations.flatMap(destination =>
      destination
        .hotels(true)
        .filter(
          hotel =>
            conditions.hotel.every(condition => condition(hotel)) &&
            hotel.terms.filter(hotelTerm => conditions.hotelTerm.every(condition => condition(hotelTerm))).length > 0
        )
    );
  }
}

function createEnhancedTree(destinations: Destination[]): EnhancedTree {
  return new EnhancedTree(destinations);
}

export default createEnhancedTree;
