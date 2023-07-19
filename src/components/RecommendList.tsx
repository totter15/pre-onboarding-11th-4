import { SearchItem } from '../apis/search';
import {
	RecommendCard,
	RecommendListBox,
	RecommendListTitle,
} from '../styles/RecommendList.style';
import { SearchOutlined } from '@ant-design/icons';

function RecommendList({
	searchList,
	selectIndex,
}: {
	searchList: SearchItem[];
	selectIndex: number;
}) {
	return (
		<RecommendListBox>
			<RecommendListTitle>
				{!!searchList.length ? '추천 검색어' : '검색어 없음'}
			</RecommendListTitle>

			{searchList?.map((search, index) => (
				<RecommendCard $select={index === selectIndex} key={search.sickCd}>
					<SearchOutlined
						style={{ color: '#A7AFB7', fontSize: '1.125rem', marginRight: 10 }}
					/>
					{search.sickNm}
				</RecommendCard>
			))}
		</RecommendListBox>
	);
}

export default RecommendList;
