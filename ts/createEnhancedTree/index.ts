/*
 * Copyright 2022 Marek Kobida
 */

import Destination from './Destination';
import { Tree as T } from '../tree';

function createEnhancedTree(trees: T[]): Destination[] {
  return trees.map(tree => new Destination(tree));
}

export default createEnhancedTree;
