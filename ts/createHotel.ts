/*
 * Copyright 2022 Marek Kobida
 */

export interface Hotel {
  category: number;
  equipment: number[];
  id: number;
  isNew?: boolean;
  name: string;
  parentId: number;
  photoId: number;
  serviceId: number;
  stars: number;
  terms: HotelTerm[];
  type: number;
  videoId?: string;
}

export interface HotelTerm {
  date: [from: number, to: number];
  days: number;
  discount?: number;
  id: number;
  price: number;
  transportationId: number;
}

function createHotel(): Hotel {
  return {
    category: 1,
    equipment: [],
    id: 0,
    name: 'Test Hotel',
    parentId: 0,
    photoId: 0,
    serviceId: 0,
    stars: 2.5,
    terms: [
      {
        date: [19700101, 19700101],
        days: 0,
        discount: 50,
        id: 0,
        price: 500,
        transportationId: 0,
      },
    ],
    type: 0,
  };
}

export default createHotel;
