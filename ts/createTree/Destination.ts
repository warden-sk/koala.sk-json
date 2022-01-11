/*
 * Copyright 2022 Marek Kobida
 */

import { Destination as D } from '../createDestination';
import Hotel from './Hotel';
import HotelTerm from './HotelTerm';
import SearchInput from './SearchInput';

class Destination implements Omit<D, 'destinations' | 'hotels'> {
  #hotels: Hotel[];

  category: number[];
  destinations: Destination[];
  id: number;
  latitude: number;
  level: number;
  longitude: number;
  name: string;
  parent?: Destination;
  parentId: number;

  constructor(destination: D, parent?: Destination) {
    this.#hotels = destination.hotels.map(hotel => new Hotel(hotel, this));

    this.category = destination.category;
    this.destinations = destination.destinations.map(destination => new Destination(destination, this));
    this.id = destination.id;
    this.latitude = destination.latitude || 0;
    this.level = destination.level;
    this.longitude = destination.longitude || 0;
    this.name = destination.name;
    this.parent = parent;
    this.parentId = destination.parentId;
  }

  hotels(_1 = false): Hotel[] {
    if (_1) {
      //           | copy
      let hotels = [...this.#hotels];

      return (function _2(destination: Destination): Hotel[] {
        destination.destinations.forEach(destination => {
          hotels = [...hotels, ...destination.#hotels];
          _2(destination);
        });

        return hotels;
      })(this);
    }

    return this.#hotels;
  }

  search({ days, price, stars, transportationId }: SearchInput = {}): Hotel[] {
    const hasDays = (term: HotelTerm) => (days ? term.hasDays(days[0], days[1]) : true);

    const hasPrice = (term: HotelTerm) => (price ? term.hasPrice(price[0], price[1]) : true);

    const hasStars = (hotel: Hotel) =>
      stars ? (Array.isArray(stars) ? stars.findIndex($ => hotel.hasStars($)) !== -1 : hotel.hasStars(stars)) : true;

    const hasTransportationId = (term: HotelTerm) =>
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

export default Destination;
