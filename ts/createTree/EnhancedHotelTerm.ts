/*
 * Copyright 2022 Marek Kobida
 */

import EnhancedHotel from './EnhancedHotel';
import { HotelTerm } from '../createHotelTerm';

class EnhancedHotelTerm implements Omit<HotelTerm, 'date'> {
  date: [from: Date, to: Date];
  days: number;
  discount: number;
  id: number;
  parent?: EnhancedHotel;
  price: number;
  transportationId: number;

  constructor(hotelTerm: HotelTerm, parent?: EnhancedHotel) {
    this.date = [this.decodeDate(hotelTerm.date[0]), this.decodeDate(hotelTerm.date[1])];
    this.days = hotelTerm.days;
    this.discount = hotelTerm.discount || 0;
    this.id = hotelTerm.id;
    this.parent = parent;
    this.price = hotelTerm.price;
    this.transportationId = hotelTerm.transportationId;
  }

  decodeDate(date: number | string): Date {
    date = date.toString();

    const year = '20' + date[0] + date[1];
    const month = date[2] + date[3];
    const day = date[4] + date[5];

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

  hasTransportationId = (transportationId: number): boolean => {
    return this.transportationId === transportationId;
  };
}

export default EnhancedHotelTerm;
