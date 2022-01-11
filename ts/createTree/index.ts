/*
 * Copyright 2022 Marek Kobida
 */

import { Destination } from '../createDestination';
import EnhancedDestination from './EnhancedDestination';

class EnhancedTree {
  destinations: EnhancedDestination[];

  constructor(destinations: Destination[]) {
    this.destinations = destinations.map(destination => new EnhancedDestination(destination));
  }
}

function createEnhancedTree(destinations: Destination[]): EnhancedTree {
  return new EnhancedTree(destinations);
}

export default createEnhancedTree;
