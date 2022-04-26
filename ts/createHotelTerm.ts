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

let id = 0;

function createHotelTerm(): HotelTerm {
  return {
    date: [19700101, 19700101],
    days: 0,
    discount: 50,
    id: id++,
    price: 500,
    transportationId: 199,
  };
}

export default createHotelTerm;
