import { SearchItem } from '../apis/search';

interface Caching {
	saveCache: (key: string, data: SearchItem[], ttl?: number) => void;
	getCache: (key: string) => { data: SearchItem[]; expire: number };
	deleteCache: (key: string) => void;
}

export function caching(): Caching {
	const now = new Date();

	function saveCache(key: string, data: SearchItem[], ttl: number = 0) {
		localStorage.setItem(
			key,
			JSON.stringify({ data, expire: now.getTime() + ttl })
		);
	}

	function getCache(key: string) {
		const list = localStorage.getItem(key);
		if (list) return JSON.parse(list);
	}

	function deleteCache(key: string) {
		localStorage.removeItem(key);
	}

	return { saveCache, getCache, deleteCache };
}
