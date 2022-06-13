/*
 * Copyright 2022 Marek Kobida
 */

import type { Destination } from '../createDestination';
import EnhancedHotel from './EnhancedHotel';

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

  breadcrumbs<T>(destination: EnhancedDestination | undefined, on: (destination: EnhancedDestination) => T): T[] {
    return destination ? [...this.breadcrumbs(destination.parent, on), on(destination)] : [];
  }

  hotels(recursion = false): EnhancedHotel[] {
    if (recursion) {
      let hotels: EnhancedHotel[] = [...this.#hotels];

      return (function $(destination: EnhancedDestination): EnhancedHotel[] {
        destination.destinations.forEach(destination => {
          hotels = [...hotels, ...destination.#hotels];
          $(destination);
        });

        return hotels;
      })(this);
    }

    return this.#hotels;
  }
}

export default EnhancedDestination;
