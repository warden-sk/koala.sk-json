/*
 * Copyright 2022 Marek Kobida
 */

import createEnhancedTree from './ts/createTree';
import fs from 'fs';

const tree = JSON.parse(fs.readFileSync('./decoded/tree.json').toString());

const enhancedTree = createEnhancedTree(tree);

const search = enhancedTree.search({ name: 'Faerské ostrovy', stars: 4 });

console.dir(search, { color: true, depth: null });
