/*
 * Copyright 2022 Marek Kobida
 */

import type { HotelTerm } from './createHotelTerm';
import createHotelTerm from './createHotelTerm';

export interface Hotel {
  category: number;
  equipment: number[];
  id: number;
  isNew?: boolean; // undefined
  latitude?: number; // undefined
  longitude?: number; // undefined
  name: string;
  parentId: number;
  photoId: number;
  stars: number;
  terms: HotelTerm[];
  type: string;
  url: string;
  videoId?: string; // undefined
}

let id = 0;

function createHotel(): Hotel {
  return {
    category: 1,
    equipment: [],
    id: id++,
    name: 'Hotel',
    parentId: 0,
    photoId: 0,
    stars: 5,
    terms: [createHotelTerm()],
    type: 'hotel',
    url: 'hotel',
  };
}

export default createHotel;
