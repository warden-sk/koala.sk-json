/*
 * Copyright 2022 Marek Kobida
 */

import { Destination, createDestination } from './destinations';
import { Hotel, createHotel } from './hotels';

export interface Tree extends Destination {
  destinations: Tree[];
  hotels: Hotel[];
}

export function createTree(hotelsLength: number): Tree {
  return {
    destinations: [],
    hotels: [...new Array(hotelsLength)].map(createHotel),
    ...createDestination(),
  };
}
