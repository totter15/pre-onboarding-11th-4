import React, { useState, useCallback, useRef } from 'react';
import { getSearch } from '../apis/search';
import { SearchItem } from '../apis/search';
import RecommendList from '../components/RecommendList';
import SearchInput from '../components/SearchInput';
import { TitleBox } from '../styles/Search.style';
import Layout from './Layout';
import { caching } from '../utils/caching';

function Search() {
	const [searchList, setSearchList] = useState<SearchItem[]>([]);
	const [selectIndex, setSelectIndex] = useState<number>(-1);

	const getSearchList = useCallback(async (query: string) => {
		const { getCache, saveCache, deleteCache } = caching();
		if (query === '') {
			setSearchList([]);
			return;
		}

		const { data: cache, expire } = getCache(query) ?? {};
		const now = new Date();
		const isExpire = now.getTime() > expire;

		if (cache && !isExpire) return setSearchList(cache);

		if (isExpire) deleteCache(query);
		const data = await getSearch(query);
		const day_3 = 86400000;

		saveCache(query, data, day_3);
		setSearchList(data);
		setSelectIndex(-1);
	}, []);

	let timer: ReturnType<typeof setTimeout>;
	function debounce(e: any) {
		const query = e.target.value;
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			const trimQuery = query.trim();
			getSearchList(trimQuery);
		}, 500);
	}

	const listTopDownHandler = useCallback(
		(e: any) => {
			const up = e.keyCode === 38;
			const down = e.keyCode === 40;
			const firstIndex = 0;
			const lastIndex = searchList.length - 1;

			if (up) {
				if (selectIndex === firstIndex) return setSelectIndex(lastIndex);
				setSelectIndex((prev) => prev - 1);
			}
			if (down) {
				selectIndex >= lastIndex
					? setSelectIndex(0)
					: setSelectIndex((prev) => prev + 1);
			}
		},
		[selectIndex, searchList]
	);

	return (
		<Layout>
			<TitleBox>
				국내 모든 임상시험 검색하고
				<br />
				온라인으로 참여하기
			</TitleBox>
			<SearchInput onChange={debounce} onKeyDown={listTopDownHandler} />
			<RecommendList searchList={searchList} selectIndex={selectIndex} />
		</Layout>
	);
}

export default Search;
