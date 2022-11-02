/*
 * Copyright 2022 Marek Kobida
 */

import type { Hotel } from './createHotel';
import createHotel from './createHotel';

export interface Destination {
  category: number[];
  destinations: Destination[];
  hotels: Hotel[];
  id: number;
  isActive?: boolean;
  latitude?: number;
  level: number;
  longitude?: number;
  name: string;
  parentId: number;
}

let id = 0;

function createDestination(hotelsLength: number): Destination {
  return {
    category: [],
    destinations: [],
    hotels: Array.from({ length: hotelsLength }, createHotel),
    id: id++,
    // isActive
    // latitude
    level: 0,
    // longitude
    name: 'Destination',
    parentId: 0,
  };
}

export default createDestination;
