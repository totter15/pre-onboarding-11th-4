import { SearchOutlined } from '@ant-design/icons';
import { FormBox, InputBox, InputButton } from '../styles/SearchInput.style';
import { useState } from 'react';

function SearchInput({
	onChange,
	onKeyDown,
	onSubmit,
	value,
	selectValue,
}: {
	onChange: (e: any) => void;
	onKeyDown: (e: any) => void;
	onSubmit: (e: any) => void;
	value: string;
	selectValue: string | undefined;
}) {
	const [isFocus, setIsFocus] = useState(false);
	return (
		<FormBox
			onSubmit={onSubmit}
			onFocus={() => setIsFocus(true)}
			onBlur={() => setIsFocus(false)}
		>
			{!isFocus && (
				<SearchOutlined style={{ color: '#A7AFB7', fontSize: '1.125rem' }} />
			)}
			<InputBox
				value={selectValue || value}
				onChange={onChange}
				onKeyDown={onKeyDown}
				type='search'
				name='search'
				placeholder='질환명을 입력해 주세요.'
			/>
			<InputButton>
				<SearchOutlined style={{ fontSize: 21, color: 'white' }} />
			</InputButton>
		</FormBox>
	);
}

export default SearchInput;
