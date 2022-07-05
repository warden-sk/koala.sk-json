/*
 * Copyright 2022 Marek Kobida
 */

import type EnhancedHotel from './EnhancedHotel';
import type { HotelTerm } from '../createHotelTerm';

class EnhancedHotelTerm implements Omit<HotelTerm, 'date'> {
  code: number;
  date: [from: Date, to: Date];
  days: number;
  discount: number;
  id: number;
  parent?: EnhancedHotel;
  price: number;
  transportationFromId?: number;
  transportationId: number;

  constructor(hotelTerm: HotelTerm, parent?: EnhancedHotel) {
    this.code = hotelTerm.code;
    this.date = [this.decodeDate(hotelTerm.date[0]), this.decodeDate(hotelTerm.date[1])];
    this.days = hotelTerm.days;
    this.discount = hotelTerm.discount ?? 0;
    this.id = hotelTerm.id;
    this.parent = parent;
    this.price = hotelTerm.price;
    this.transportationFromId = hotelTerm.transportationFromId;
    this.transportationId = hotelTerm.transportationId;
  }

  decodeDate(date: number | string): Date {
    date = date.toString();

    const year = date[0] + date[1] + date[2] + date[3];
    const month = date[4] + date[5];
    const day = date[6] + date[7];

    return new Date(+year, +month - 1, +day);
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

  hasTransportationId = (transportationId: number): boolean => {
    return this.transportationId === transportationId;
  };
}

export default EnhancedHotelTerm;
