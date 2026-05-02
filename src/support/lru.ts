// Adapted from https://stackoverflow.com/a/46432113/11613622

export default class LRUCache<K, V> {
	private readonly max: number;
	private readonly cache: Map<K, V>;

	constructor(max = 10) {
		this.max = max;
		this.cache = new Map<K, V>();
	}

	get(key: K): V | undefined {
		const item = this.cache.get(key);
		if (item !== undefined) {
			// Refresh key
			this.cache.delete(key);
			this.cache.set(key, item);
		}
		return item;
	}

	set(key: K, val: V): void {
		// Refresh key
		if (this.cache.has(key)) this.cache.delete(key);
		// Evict oldest
		else if (this.cache.size === this.max) {
			const first = this.first();
			if (first) this.cache.delete(first);
		}
		this.cache.set(key, val);
	}

	first(): K | undefined {
		return this.cache.keys().next().value;
	}

	clear(): void {
		this.cache.clear();
	}
}
