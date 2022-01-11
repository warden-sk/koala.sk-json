/*
 * Copyright 2022 Marek Kobida
 */

import { Destination } from '../createDestination';
import EnhancedHotel from './EnhancedHotel';
import { Hotel } from '../createHotel';

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
    this.#hotels = destination.hotels.map(this.#createEnhancedHotel);

    this.category = destination.category;
    this.destinations = destination.destinations.map(this.#createEnhancedDestination);
    this.id = destination.id;
    this.latitude = destination.latitude || 0;
    this.level = destination.level;
    this.longitude = destination.longitude || 0;
    this.name = destination.name;
    this.parent = parent;
    this.parentId = destination.parentId;
  }

  #createEnhancedDestination = (destination: Destination): EnhancedDestination => {
    return new EnhancedDestination(destination, this);
  };

  #createEnhancedHotel = (hotel: Hotel): EnhancedHotel => {
    return new EnhancedHotel(hotel, this);
  };

  hotels(recursion = false): EnhancedHotel[] {
    if (recursion) {
      let hotels = [...this.#hotels];

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