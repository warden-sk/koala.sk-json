/*
 * Copyright 2023 Marek Kobida
 */

import type EnhancedDestination from './EnhancedDestination';
import EnhancedHotelTerm from './EnhancedHotelTerm';
import type { Hotel } from '../createHotel';

class EnhancedHotel implements Omit<Hotel, 'terms'> {
  category: number;
  equipment: number[];
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  parent?: EnhancedDestination;
  parentId: number;
  photoId: number;
  stars: number;
  terms: EnhancedHotelTerm[];
  type: string;
  url: string;
  videoId?: string;

  constructor(hotel: Hotel, parent?: EnhancedDestination) {
    this.category = hotel.category;
    this.equipment = hotel.equipment;
    this.id = hotel.id;
    this.latitude = hotel.latitude ?? 0;
    this.longitude = hotel.longitude ?? 0;
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

  hasCategory = (category: number): boolean => {
    return this.category === category;
  };

  hasEquipmentId = (equipmentId: number): boolean => {
    return this.equipment.indexOf(equipmentId) !== -1;
  };

  hasStars = (stars: number): boolean => {
    return this.stars === stars || this.stars === stars + 0.5;
  };

  hasTerms(): boolean {
    return this.terms.length > 0;
  }
}

export default EnhancedHotel;
