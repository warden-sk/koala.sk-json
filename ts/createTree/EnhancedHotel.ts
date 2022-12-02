/*
 * Copyright 2022 Marek Kobida
 */

import type EnhancedDestination from './EnhancedDestination';
import EnhancedHotelTerm from './EnhancedHotelTerm';
import type { Hotel } from '../createHotel';

class EnhancedHotel implements Omit<Hotel, 'terms'> {
  category: number;
  equipment: number[];
  id: number;
  isNew: boolean;
  name: string;
  parent?: EnhancedDestination;
  parentId: number;
  photoId: number;
  stars: number;
  terms: EnhancedHotelTerm[];
  type: number;
  url: string;
  videoId?: string;

  constructor(hotel: Hotel, parent?: EnhancedDestination) {
    this.category = hotel.category;
    this.equipment = hotel.equipment;
    this.id = hotel.id;
    this.isNew = hotel.isNew ?? false;
    this.name = hotel.name;
    this.parent = parent;
    this.parentId = hotel.parentId;
    this.photoId = hotel.photoId;
    this.stars = hotel.stars;
    this.terms = hotel.terms.map(hotelTerm => new EnhancedHotelTerm(hotelTerm, this));
    this.type = hotel.type;
    this.url = hotel.url;
    this.videoId = hotel.videoId;
  }

  breadcrumbs<T>(destination: EnhancedDestination | undefined, on: (destination: EnhancedDestination) => T): T[] {
    return destination ? [...this.breadcrumbs(destination.parent, on), on(destination)] : [];
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

  hasStars = (stars: number): boolean => {
    return this.stars === stars || this.stars === stars + 0.5;
  };

  hasTerms(): boolean {
    return this.terms.length > 0;
  }
}

export default EnhancedHotel;
