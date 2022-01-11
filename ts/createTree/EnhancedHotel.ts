/*
 * Copyright 2022 Marek Kobida
 */

import EnhancedDestination from './EnhancedDestination';
import EnhancedHotelTerm from './EnhancedHotelTerm';
import { Hotel } from '../createHotel';

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
    this.terms = hotel.terms.map(term => new EnhancedHotelTerm(term, this));
    this.type = hotel.type;
    this.videoId = hotel.videoId;
  }

  firstTerm(): EnhancedHotelTerm | undefined {
    return this.terms[0];
  }

  firstTermWithDiscount(): EnhancedHotelTerm | undefined {
    return this.terms.filter(term => term.hasDiscount())[0];
  }

  hasServiceId(serviceId: number): boolean {
    return this.serviceId === serviceId;
  }

  hasStars(stars: number): boolean {
    return this.stars >= stars && this.stars < stars + 1;
  }

  hasTerms(): boolean {
    return this.terms.length > 0;
  }
}

export default EnhancedHotel;
