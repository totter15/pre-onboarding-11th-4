import { SearchOutlined } from '@ant-design/icons';
import { FormBox, InputBox, InputButton } from '../styles/SearchInput.style';
import { useState } from 'react';

function SearchInput({ onKeyDown }: { onKeyDown: (e: any) => void }) {
	const [isFocus, setIsFocus] = useState(false);
	return (
		<FormBox
			onSubmit={(e) => e.preventDefault()}
			onFocus={() => setIsFocus(true)}
			onBlur={() => setIsFocus(false)}
		>
			{!isFocus && (
				<SearchOutlined style={{ color: '#A7AFB7', fontSize: '1.125rem' }} />
			)}
			<InputBox
				onKeyDown={onKeyDown}
				type='search'
				placeholder='질환명을 입력해 주세요.'
			/>
			<InputButton>
				<SearchOutlined style={{ fontSize: 21, color: 'white' }} />
			</InputButton>
		</FormBox>
	);
}

export default SearchInput;
