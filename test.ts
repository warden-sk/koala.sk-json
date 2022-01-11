/*
 * Copyright 2022 Marek Kobida
 */

import createTree from './ts/createTree';
import decodedTree from './decoded/tree.json';

// @ts-ignore
const tree = createTree(decodedTree);

const search = tree.search();

let $ = '';
let i = 1;

search.forEach(hotel => {
  $ += `${i++}. (${hotel.id}) ${hotel.name}`;
  $ += '\n';
});

console.log($);
