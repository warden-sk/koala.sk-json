/*
 * Copyright 2023 Marek Kobida
 */

import type { Hotel } from './createHotel';
import createHotel from './createHotel';

export interface Destination {
  category: number[];
  destinations: Destination[];
  hotels: Hotel[];
  id: number;
  isActive?: boolean; // undefined
  latitude?: number; // undefined
  level: number;
  longitude?: number; // undefined
  name: string;
  parentId: number;
  url: string;
}

let id = 0;

function createDestination(hotelsLength: number): Destination {
  return {
    category: [],
    destinations: [],
    hotels: Array.from({ length: hotelsLength }, createHotel),
    id: id++,
    level: 0,
    name: 'Destination',
    parentId: 0,
    url: 'destination',
  };
}

export default createDestination;
