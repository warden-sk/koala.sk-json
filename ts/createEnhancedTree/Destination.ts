/*
 * Copyright 2022 Marek Kobida
 */

import Hotel from './Hotel';
import HotelTerm from './HotelTerm';
import { Tree as T } from '../tree';

export interface SearchInput {
  days?: [from: number, to: number];
  price?: [from: number, to: number];
  stars?: number[] | number;
  transportationId?: number[] | number;
}

class Destination implements Omit<T, 'destinations' | 'hotels'> {
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

  constructor(tree: T, parent?: Destination) {
    this.#hotels = tree.hotels.map(hotel => new Hotel(hotel, this));

    this.category = tree.category;
    this.destinations = tree.destinations.map(destination => new Destination(destination, this));
    this.id = tree.id;
    this.latitude = tree.latitude || 0;
    this.level = tree.level;
    this.longitude = tree.longitude || 0;
    this.name = tree.name;
    this.parent = parent;
    this.parentId = tree.parentId;
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
