/*
 * Copyright 2023 Marek Kobida
 */

export interface HotelTerm {
  code: number;
  date: [from: number, to: number];
  days: number;
  discount?: number; // undefined
  id: number;
  isActive?: boolean; // undefined
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
  transportationFrom?: string; // undefined
  transportationFromId?: number; // undefined
  transportationId: number;
  url?: string; // undefined
}

let id = 0;

function createHotelTerm(): HotelTerm {
  return {
    code: 1234,
    date: [19700101, 19700101],
    days: 0,
    discount: 50,
    id: id++,
    isActive: true,
    price: 500,
    room: {
      adultCount: 0,
      childAge: [0, 0],
      personCount: 0,
      roomCount: 0,
    },
    service: 'Ultra All Inclusive',
    serviceId: 672,
    transportation: 'airplane',
    transportationId: 201,
  };
}

export default createHotelTerm;
