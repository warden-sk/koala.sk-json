/*
 * Copyright 2022 Marek Kobida
 */

export interface HotelTerm {
  code: number;
  date: [from: number, to: number];
  days: number;
  discount?: number; // undefined
  id: number;
  isActive?: boolean; // undefined
  price: number;
  serviceId: number;
  transportationFromId?: number; // undefined
  transportationId: number;
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
    serviceId: 403,
    // transportationFromId
    transportationId: 199,
  };
}

export default createHotelTerm;
