/*
 * Copyright 2021 Marek Kobida
 */

import SearchInput from './ts/createTree/SearchInput';
import createEnhancedTree from './ts/createTree';
import fs from 'fs';

const TREE = JSON.parse(fs.readFileSync('./decoded/tree.json').toString());

const SEARCH_INPUT: SearchInput = { stars: 6 };

const SEARCH_OUTPUT = createEnhancedTree(TREE);

console.log(SEARCH_INPUT, SEARCH_OUTPUT);
