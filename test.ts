/*
 * Copyright 2022 Marek Kobida
 */

import createDestination from './ts/createDestination';
import createEnhancedTree from './ts/createTree';

const enhancedTree = createEnhancedTree(Array.from({ length: 2 }, () => createDestination(2)));

const search = enhancedTree.search();

console.dir(search, { color: true, depth: null });
