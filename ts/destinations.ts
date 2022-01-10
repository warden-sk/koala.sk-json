/*
 * Copyright 2022 Marek Kobida
 */

export interface Destination {
  category: number[];
  id: number;
  latitude?: number;
  level: number;
  longitude?: number;
  name: string;
  parentId: number;
}

export function createDestination(): Destination {
  return {
    category: [],
    id: 0,
    level: 0,
    name: 'Test Destination',
    parentId: 0,
  };
}
