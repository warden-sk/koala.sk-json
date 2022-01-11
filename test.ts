/*
 * Copyright 2021 Marek Kobida
 */

import EnhancedDestination from './ts/createTree/EnhancedDestination';
import createDestination from './ts/createDestination';
import createEnhancedTree from './ts/createTree';
import tree from './decoded/tree.json';

const searchInput: EnhancedDestination.SearchInput = { stars: 6 };

// @ts-ignore
const enhancedTree = createEnhancedTree(tree);

// console.log(searchInput, enhancedTree);

console.log(createDestination(3));
