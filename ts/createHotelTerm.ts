/*
 * Copyright 2022 Marek Kobida
 */

export interface HotelTerm {
  date: [from: number, to: number];
  days: number;
  discount?: number;
  id: number;
  price: number;
  transportationId: number;
}

function createHotelTerm(): HotelTerm {
  return {
    date: [19700101, 19700101],
    days: 0,
    discount: 50,
    id: 0,
    price: 500,
    transportationId: 0,
  };
}

export default createHotelTerm;
