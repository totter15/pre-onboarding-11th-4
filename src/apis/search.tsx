import { client } from './client';

export interface SearchItem {
	sickCd: string;
	sickNm: string;
}

export async function getSearch(query: string): Promise<SearchItem[]> {
	console.info('calling api');
	const { data } = await client.get(`?q=${query}`);
	return data;
}
