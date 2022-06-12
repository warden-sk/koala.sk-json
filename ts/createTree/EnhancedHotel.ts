/*
 * Copyright 2022 Marek Kobida
 */

import type EnhancedDestination from './EnhancedDestination';
import EnhancedHotelTerm from './EnhancedHotelTerm';
import type { Hotel } from '../createHotel';
import type { SearchInput } from './index';

class EnhancedHotel implements Omit<Hotel, 'terms'> {
  category: number;
  equipment: number[];
  id: number;
  isNew: boolean;
  name: string;
  parent?: EnhancedDestination;
  parentId: number;
  photoId: number;
  serviceId: number;
  stars: number;
  terms: EnhancedHotelTerm[];
  type: number;
  videoId?: string;

  constructor(hotel: Hotel, parent?: EnhancedDestination) {
    this.category = hotel.category;
    this.equipment = hotel.equipment;
    this.id = hotel.id;
    this.isNew = hotel.isNew || false;
    this.name = hotel.name;
    this.parent = parent;
    this.parentId = hotel.parentId;
    this.photoId = hotel.photoId;
    this.serviceId = hotel.serviceId;
    this.stars = hotel.stars;
    this.terms = hotel.terms.map(hotelTerm => new EnhancedHotelTerm(hotelTerm, this));
    this.type = hotel.type;
    this.videoId = hotel.videoId;
  }

  breadcrumbs<T>(destination: EnhancedDestination | undefined, on: (destination: EnhancedDestination) => T): T[] {
    return destination ? [...this.breadcrumbs(destination.parent, on), on(destination)] : [];
  }

  decodeServiceId(): string {
    const ids: { [id: number]: string } = {
      403: 'raňajky',
      404: 'polpenzia',
      406: 'All Inclusive',
      672: 'Ultra All Inclusive',
      1043: 'All Inclusive Light',
      1109: 'polpenzia ULTRA',
    };

    return ids[this.serviceId];
  }

  decodeType(): string {
    const types: { [type: number]: string } = {
      3: 'hotel',
      4: 'penzión',
      11: 'hotelový komplex',
      13: 'pavilóny',
      15: 'vilky hotela',
      17: 'dependance hotela',
      48: 'apartmány',
      51: 'turistický hotel',
    };

    return types[this.type];
  }

  hasCategory = (category: number): boolean => {
    return this.category === category;
  };

  hasServiceId = (serviceId: number): boolean => {
    return this.serviceId === serviceId;
  };

  hasStars = (stars: number): boolean => {
    return this.stars === stars || this.stars === stars + 0.5;
  };

  hasTerms(): boolean {
    return this.terms.length > 0;
  }

  searchTerm({ days, price, transportationId }: SearchInput = {}): EnhancedHotelTerm | undefined {
    return this.terms[0];
  }
}

export default EnhancedHotel;
