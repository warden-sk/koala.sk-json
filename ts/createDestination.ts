/*
 * Copyright 2022 Marek Kobida
 */

import createHotel, { Hotel } from './createHotel';

export interface Destination {
  category: number[];
  destinations: Destination[];
  hotels: Hotel[];
  id: number;
  latitude?: number;
  level: number;
  longitude?: number;
  name: string;
  parentId: number;
}

function createDestination(hotelsLength: number): Destination {
  return {
    category: [],
    destinations: [],
    hotels: [...new Array(hotelsLength)].map(createHotel),
    id: 0,
    level: 0,
    name: 'Test Destination',
    parentId: 0,
  };
}

export default createDestination;
