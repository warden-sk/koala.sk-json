/*
 * Copyright 2022 Marek Kobida
 */

import EnhancedHotel from './EnhancedHotel';
import { HotelTerm } from '../createHotel';

class EnhancedHotelTerm implements Omit<HotelTerm, 'date'> {
  date: [from: Date, to: Date];
  days: number;
  discount: number;
  id: number;
  parent?: EnhancedHotel;
  price: number;
  transportationId: number;

  constructor(term: HotelTerm, parent?: EnhancedHotel) {
    this.date = [this.decodeDate(term.date[0]), this.decodeDate(term.date[1])];
    this.days = term.days;
    this.discount = term.discount || 0;
    this.id = term.id;
    this.parent = parent;
    this.price = term.price;
    this.transportationId = term.transportationId;
  }

  decodeDate(date: number | string): Date {
    date = date.toString();

    const year = date[0] + date[1] + date[2] + date[3];
    const month = date[4] + date[5];
    const day = date[6] + date[7];

    return new Date(+year, +month, +day);
  }

  hasDays(from: number, to: number): boolean {
    return this.days >= from && this.days <= to;
  }

  hasDiscount(): boolean {
    return this.discount > 0;
  }

  hasPrice(from: number, to: number): boolean {
    return this.price >= from && this.price <= to;
  }

  hasTransportationId(transportationId: number): boolean {
    return this.transportationId === transportationId;
  }
}

export default EnhancedHotelTerm;
