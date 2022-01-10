/*
 * Copyright 2021 Marek Kobida
 */

import SearchInput from './ts/createEnhancedTree/SearchInput';
import createEnhancedTree from './ts/createEnhancedTree';
import fs from 'fs';

const TREE = JSON.parse(fs.readFileSync('./raw/tree.json').toString());

const SEARCH_INPUT: SearchInput = { stars: 6 };

const SEARCH_OUTPUT = createEnhancedTree(TREE);

console.log(SEARCH_INPUT, SEARCH_OUTPUT);
