/*
 * Copyright 2022 Marek Kobida
 */

import { Destination as D } from '../createDestination';
import Destination from './Destination';

class EnhancedTree {
  destinations: Destination[];

  constructor(destinations: D[]) {
    this.destinations = destinations.map(destination => new Destination(destination));
  }
}

function createEnhancedTree(destinations: D[]): EnhancedTree {
  return new EnhancedTree(destinations);
}

export default createEnhancedTree;
