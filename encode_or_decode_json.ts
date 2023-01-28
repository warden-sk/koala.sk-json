/*
 * Copyright 2023 Marek Kobida
 */

import isObject from './isObject';
import Dictionary from '../packages/Dictionary';
import koala_decoded_keys from '../packages/Dictionary/koala_decoded_keys';

interface O {
  [key: string]: T;
}

export type T = O | T[] | boolean | number | string | null;

const dictionary = new Dictionary(koala_decoded_keys);

// @ts-ignore
function encode_or_decode_json(json, keys) {
  if (Array.isArray(json)) {
    return json.map($ => encode_or_decode_json($, keys));
  }

  if (isObject(json)) {
    return Object.keys(json).reduce(($, key) => {
      // @ts-ignore
      $[keys[key] ?? key] = encode_or_decode_json(json[key], keys);

      return $;
    }, {});
  }

  return json;
}

// @ts-ignore
export function decode_json(json) {
  return encode_or_decode_json(
    json,
    Object.keys(dictionary.dictionary).reduce(($, key) => ({ ...$, [dictionary.dictionary[key]]: key }), {})
  );
}

// @ts-ignore
export function encode_json(json) {
  return encode_or_decode_json(json, dictionary.dictionary);
}
