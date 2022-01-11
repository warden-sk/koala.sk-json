/*
 * Copyright 2022 Marek Kobida
 */

interface SearchInput {
  days?: [from: number, to: number];
  price?: [from: number, to: number];
  stars?: number[] | number;
  transportationId?: number[] | number;
}

export default SearchInput;
