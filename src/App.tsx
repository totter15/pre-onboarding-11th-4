import React, { useState } from 'react';
import { getSearch } from './apis/search';
import { SearchItem } from './apis/search';
import { useCaching } from './hooks/useCaching';
import RecommendList from './components/RecommendList';
import SearchInput from './components/SearchInput';
import { AppBox, TitleBox } from './styles/App.style';

function App() {
	const { getCache, saveCache } = useCaching();
	const [searchList, setSearchList] = useState<SearchItem[]>([]);
	const [selectIndex, setSelectIndex] = useState<number>(-1);
	const [cacheKey, setCacheKey] = useState<string>('');

	async function getSearchList(query: string) {
		if (query === '') {
			setSearchList([]);
			return;
		}
		setCacheKey(query);
		const cache = getCache(query);
		if (cache) {
			setSearchList(cache);
		} else {
			const data = await getSearch(query);
			saveCache(query, data);
			setSearchList(data);
			setSelectIndex(-1);
		}
	}

	let timer: ReturnType<typeof setTimeout>;

	function debounce(e: any) {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			const query = e.target.value;
			cacheKey !== query && getSearchList(query);
		}, 500);
	}

	function pressDown(e: any) {
		const up = 38;
		const down = 40;
		if (e.keyCode === up) {
			selectIndex < 1 ? setSelectIndex(10) : setSelectIndex((prev) => prev - 1);
		}
		if (e.keyCode === down) {
			selectIndex >= searchList.length - 1
				? setSelectIndex(0)
				: setSelectIndex((prev) => prev + 1);
		}
	}

	function onKeyDown(e: any) {
		debounce(e);
		pressDown(e);
	}

	return (
		<AppBox>
			<TitleBox>
				국내 모든 임상시험 검색하고
				<br />
				온라인으로 참여하기
			</TitleBox>
			<SearchInput onKeyDown={onKeyDown} />
			<RecommendList searchList={searchList} />
		</AppBox>
	);
}

export default App;
