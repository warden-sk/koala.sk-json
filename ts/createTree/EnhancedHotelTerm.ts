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
  isActive: boolean;
  parent?: EnhancedHotel;
  price: number;
  serviceId: number;
  transportationFromId?: number;
  transportationId: number;
  url: string;

  constructor(hotelTerm: HotelTerm, parent?: EnhancedHotel) {
    this.code = hotelTerm.code;
    this.date = [this.decodeDate(hotelTerm.date[0]), this.decodeDate(hotelTerm.date[1])];
    this.days = hotelTerm.days;
    this.discount = hotelTerm.discount ?? 0;
    this.id = hotelTerm.id;
    this.isActive = hotelTerm.isActive ?? false;
    this.parent = parent;
    this.price = hotelTerm.price;
    this.serviceId = hotelTerm.serviceId;
    this.transportationFromId = hotelTerm.transportationFromId;
    this.transportationId = hotelTerm.transportationId;
    this.url = hotelTerm.url;
  }

  decodeDate(date: number | string): Date {
    date = date.toString();

    const year = date[0] + date[1] + date[2] + date[3];
    const month = date[4] + date[5];
    const day = date[6] + date[7];

    return new Date(+year, +month - 1, +day);
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

  hasDays(from: number, to: number): boolean {
    return this.days >= from && this.days <= to;
  }

  hasDiscount(): boolean {
    return this.discount > 0;
  }

  hasPrice(from: number, to: number): boolean {
    return this.price >= from && this.price <= to;
  }

  hasServiceId = (serviceId: number): boolean => {
    return this.serviceId === serviceId;
  };

  hasTransportationId = (transportationId: number): boolean => {
    return this.transportationId === transportationId;
  };
}

export default EnhancedHotelTerm;
