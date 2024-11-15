/** @format */

import { NeetClient } from "../NeetClient";

/**
 * Returns the Key & saves the value.
 */
export function createKey<T>(key: string, value: T) {
	NeetClient.store.set(key, value);
	return key;
}

export function getFromKey<T>(key: string): T | false {
	const Value = NeetClient.store.get(key);
	if (!Value) return false;
	return Value as T;
}
