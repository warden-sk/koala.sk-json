/*
 * Copyright 2023 Marek Kobida
 */

import type { HotelTerm } from '../createHotelTerm';
import type EnhancedHotel from './EnhancedHotel';

class EnhancedHotelTerm implements Omit<HotelTerm, 'date'> {
  code: number;
  date: [from: Date, to: Date];
  days: number;
  discount: number;
  id: number;
  isActive: boolean;
  json: HotelTerm;
  parent?: EnhancedHotel;
  price: number;
  room: {
    adultCount: number;
    childAge: [number, number];
    personCount: number;
    roomCount: number;
  };
  service: string;
  serviceId: number;
  transportation: string;
  transportationFrom?: string;
  transportationFromId?: number;
  transportationId: number;
  url?: string;

  constructor(hotelTerm: HotelTerm, parent?: EnhancedHotel) {
    this.code = hotelTerm.code;
    this.date = [this.decodeDate(hotelTerm.date[0]), this.decodeDate(hotelTerm.date[1])];
    this.days = hotelTerm.days;
    this.discount = hotelTerm.discount ?? 0;
    this.id = hotelTerm.id;
    this.isActive = hotelTerm.isActive ?? false;
    this.json = hotelTerm;
    this.parent = parent;
    this.price = hotelTerm.price;
    this.room = {
      adultCount: hotelTerm.room.adultCount,
      childAge: hotelTerm.room.childAge,
      personCount: hotelTerm.room.personCount,
      roomCount: hotelTerm.room.roomCount,
    };
    this.service = hotelTerm.service;
    this.serviceId = hotelTerm.serviceId;
    this.transportation = hotelTerm.transportation;
    this.transportationFrom = hotelTerm.transportationFrom;
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

  hasDays(from: number, to: number): boolean {
    return this.days >= from && this.days <= to;
  }

  hasDiscount(): boolean {
    return this.discount > 0;
  }

  hasPrice(from: number, to: number): boolean {
    return this.price >= from && this.price <= to;
  }

  hasServiceId(serviceId: number): boolean {
    return this.serviceId === serviceId;
  }

  hasTransportationFromId(transportationFromId: number): boolean {
    return this.transportationFromId === transportationFromId;
  }

  hasTransportationId(transportationId: number): boolean {
    return this.transportationId === transportationId;
  }
}

export default EnhancedHotelTerm;
