import { SearchItem } from '../apis/search';

function RecommendList({ searchList }: { searchList: SearchItem[] }) {
	return (
		<ul>
			{searchList?.map((search) => (
				<li>{search.sickNm}</li>
			))}
		</ul>
	);
}

export default RecommendList;
