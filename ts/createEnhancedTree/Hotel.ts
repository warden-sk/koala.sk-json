/*
 * Copyright 2022 Marek Kobida
 */

import Destination from './Destination';
import { Hotel as H } from '../hotels';
import HotelTerm from './HotelTerm';

class Hotel implements Omit<H, 'terms'> {
  category: number;
  equipment: number[];
  id: number;
  isNew: boolean;
  name: string;
  parent?: Destination;
  parentId: number;
  photoId: number;
  serviceId: number;
  stars: number;
  terms: HotelTerm[];
  type: number;
  videoId?: string;

  constructor(hotel: H, parent?: Destination) {
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
    this.terms = hotel.terms.map(term => new HotelTerm(term, this));
    this.type = hotel.type;
    this.videoId = hotel.videoId;
  }

  firstTerm(): HotelTerm | undefined {
    return this.terms[0];
  }

  firstTermWithDiscount(): HotelTerm | undefined {
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

export default Hotel;
