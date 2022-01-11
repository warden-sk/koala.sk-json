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
    terms: [createHotelTerm()],
    type: 0,
  };
}

export default createHotel;
