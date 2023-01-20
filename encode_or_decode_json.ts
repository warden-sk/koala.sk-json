/*
 * Copyright 2023 Marek Kobida
 */

import isObject from './isObject';
import KEYS from './keys';

interface O {
  [key: string]: T;
}

export type T = O | T[] | boolean | number | string | null;

// @ts-ignore
function encode_or_decode_json(json, keys) {
  if (Array.isArray(json)) {
    return json.map(encode_or_decode_json);
  }

  if (isObject(json)) {
    return Object.keys(json).reduce(($, key) => {
      // @ts-ignore
      $[keys[key] ?? key] = encode_or_decode_json(json[key]);

      return $;
    }, {});
  }

  return json;
}

// @ts-ignore
export function decode_json(json) {
  return encode_or_decode_json(json, KEYS);
}

// @ts-ignore
export function encode_json(json) {
  return encode_or_decode_json(
    json,
    Object.keys(KEYS).reduce(($, key) => ({ ...$, [KEYS[key as 'a']]: key }), {})
  );
}