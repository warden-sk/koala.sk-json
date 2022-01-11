/*
 * Copyright 2022 Marek Kobida
 */

import { Destination } from '../createDestination';
import EnhancedHotel from './EnhancedHotel';
import EnhancedHotelTerm from './EnhancedHotelTerm';
import SearchInput from './SearchInput';

class EnhancedDestination implements Omit<Destination, 'destinations' | 'hotels'> {
  #hotels: EnhancedHotel[];

  category: number[];
  destinations: EnhancedDestination[];
  id: number;
  latitude: number;
  level: number;
  longitude: number;
  name: string;
  parent?: EnhancedDestination;
  parentId: number;

  constructor(destination: Destination, parent?: EnhancedDestination) {
    this.#hotels = destination.hotels.map(hotel => new EnhancedHotel(hotel, this));

    this.category = destination.category;
    this.destinations = destination.destinations.map(destination => new EnhancedDestination(destination, this));
    this.id = destination.id;
    this.latitude = destination.latitude || 0;
    this.level = destination.level;
    this.longitude = destination.longitude || 0;
    this.name = destination.name;
    this.parent = parent;
    this.parentId = destination.parentId;
  }

  hotels(_1 = false): EnhancedHotel[] {
    if (_1) {
      //           | copy
      let hotels = [...this.#hotels];

      return (function _2(destination: EnhancedDestination): EnhancedHotel[] {
        destination.destinations.forEach(destination => {
          hotels = [...hotels, ...destination.#hotels];
          _2(destination);
        });

        return hotels;
      })(this);
    }

    return this.#hotels;
  }

  search({ days, price, stars, transportationId }: SearchInput = {}): EnhancedHotel[] {
    const hasDays = (term: EnhancedHotelTerm) => (days ? term.hasDays(days[0], days[1]) : true);

    const hasPrice = (term: EnhancedHotelTerm) => (price ? term.hasPrice(price[0], price[1]) : true);

    const hasStars = (hotel: EnhancedHotel) =>
      stars ? (Array.isArray(stars) ? stars.findIndex($ => hotel.hasStars($)) !== -1 : hotel.hasStars(stars)) : true;

    const hasTransportationId = (term: EnhancedHotelTerm) =>
      transportationId
        ? Array.isArray(transportationId)
          ? transportationId.findIndex($ => term.hasTransportationId($)) !== -1
          : term.hasTransportationId(transportationId)
        : true;

    return this.hotels(true).filter(
      hotel =>
        hasStars(hotel) &&
        hotel.terms.filter(term => hasDays(term) && hasPrice(term) && hasTransportationId(term)).length > 0
    );
  }
}

export default EnhancedDestination;
