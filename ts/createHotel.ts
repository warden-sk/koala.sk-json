/*
 * Copyright 2022 Marek Kobida
 */

import createHotelTerm, { HotelTerm } from './createHotelTerm';

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

let id = 0;

function createHotel(): Hotel {
  return {
    category: 1,
    equipment: [],
    id: id++,
    name: 'Test Hotel',
    parentId: 0,
    photoId: 0,
    serviceId: 403,
    stars: 2.5,
    terms: [createHotelTerm()],
    type: 3,
  };
}

export default createHotel;
