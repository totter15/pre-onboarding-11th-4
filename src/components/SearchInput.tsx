import { SearchOutlined } from '@ant-design/icons';
import { FormBox } from '../styles/SearchInput.style';

function SearchInput({ onKeyDown }: { onKeyDown: (e: any) => void }) {
	return (
		<FormBox onSubmit={(e) => e.preventDefault()}>
			<SearchOutlined />
			<input
				onKeyDown={onKeyDown}
				type='search'
				name='search'
				placeholder='질환명을 입력해 주세요.'
			/>
			<button>
				<SearchOutlined />
			</button>
		</FormBox>
	);
}

export default SearchInput;
