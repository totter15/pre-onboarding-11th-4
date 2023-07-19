import React, { useState, useCallback } from 'react';
import { getSearch } from '../apis/search';
import { SearchItem } from '../apis/search';
import RecommendList from '../components/RecommendList';
import SearchInput from '../components/SearchInput';
import { TitleBox } from '../styles/Search.style';
import Layout from './Layout';
import { caching } from '../utils/caching';

function Search() {
	const { getCache, saveCache } = caching();
	const [searchList, setSearchList] = useState<SearchItem[]>([]);
	const [selectIndex, setSelectIndex] = useState<number>(-1);

	const getSearchList = useCallback(
		(function () {
			let queryBefore = '';

			return async function (query: string) {
				if (query === queryBefore) return;
				if (query === '') {
					setSearchList([]);
					return;
				}

				const cache = getCache(query);
				if (cache) {
					setSearchList(cache);
				} else {
					const data = await getSearch(query);
					saveCache(query, data);
					setSearchList(data);
					setSelectIndex(-1);
				}
				queryBefore = query;
			};
		})(),
		[]
	);

	let timer: ReturnType<typeof setTimeout>;
	function debounce(query: string) {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			const trimQuery = query.trim();
			getSearchList(trimQuery);
		}, 500);
	}

	const listTopDownHandler = useCallback(
		(type: string) => {
			const firstIndex = 0;
			const lastIndex = searchList.length - 1;

			if (type === 'up') {
				if (selectIndex === firstIndex) return setSelectIndex(lastIndex);
				setSelectIndex((prev) => prev - 1);
			}
			if (type === 'down') {
				selectIndex >= lastIndex
					? setSelectIndex(0)
					: setSelectIndex((prev) => prev + 1);
			}
		},
		[selectIndex, searchList]
	);

	function onKeyDown(e: any) {
		const { keyCode, target } = e;
		const up = 38;
		const down = 40;

		if (keyCode === up || keyCode === down) {
			listTopDownHandler(keyCode === up ? 'up' : 'down');
		} else {
			debounce(target.value);
		}
	}

	return (
		<Layout>
			<TitleBox>
				국내 모든 임상시험 검색하고
				<br />
				온라인으로 참여하기
			</TitleBox>
			<SearchInput onKeyDown={onKeyDown} />
			<RecommendList searchList={searchList} selectIndex={selectIndex} />
		</Layout>
	);
}

export default Search;
