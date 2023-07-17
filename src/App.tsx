import React, { useState } from 'react';
import './App.css';
import { SearchOutlined } from '@ant-design/icons';
import { getSearch } from './apis/search';
import { SearchItem } from './apis/search';

function App() {
	const [searchList, setSearchList] = useState<SearchItem[]>([]);
	async function getSearchList(e: any) {
		const data = await getSearch(e.target.value);
		setSearchList(data);
	}

	return (
		<div className='App' style={{ background: '#cae9ff' }}>
			<h1>국내 모든 임상시험 검색하고 온라인으로 참여하기</h1>
			<form>
				<div>
					<SearchOutlined />
					<input
						onChange={getSearchList}
						type='search'
						name='search'
						placeholder='질환명을 입력해 주세요.'
					/>
					<button>
						<SearchOutlined />
					</button>
				</div>
			</form>
			<ul>
				{searchList?.map((search) => (
					<li>{search.sickNm}</li>
				))}
			</ul>
		</div>
	);
}

export default App;
