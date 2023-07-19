import { styled } from 'styled-components';

export const FormBox = styled.form`
	margin: 0 auto;
	margin-bottom: 10px;
	width: 100%;
	display: flex;
	align-items: center;
	padding: 10px 10px 10px 24px;
	box-sizing: border-box;
	background: white;
	border-radius: 45px;
	&:focus-within {
		box-shadow: 0 0 0 2px #007be9 inset;
	}
`;

export const InputBox = styled.input`
	flex: 1;
	margin: 0 10px;
	font-size: 1.125rem;
	outline: none;
	&::placeholder {
		color: #a7afb7;
	}
`;

export const InputButton = styled.button`
	width: 48px;
	height: 48px;
	border-radius: 50%;
	background: #007be9;
`;
