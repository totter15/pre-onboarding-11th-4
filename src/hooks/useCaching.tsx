import { SearchItem } from '../apis/search';

interface Caching {
	saveCache: (query: string, data: SearchItem[]) => void;
	getCache: (query: string) => SearchItem[];
}

export function useCaching(): Caching {
	function saveCache(query: string, data: SearchItem[]) {
		localStorage.setItem(query, JSON.stringify(data));
	}

	function getCache(query: string) {
		const list = localStorage.getItem(query);
		if (list) return JSON.parse(list);
	}

	return { saveCache, getCache };
}
