import { styled, css } from 'styled-components';

export const RecommendListBox = styled.ul`
	width: 100%;
	box-sizing: border-box;
	margin: 0 auto;
	background: white;
	padding: 24px 0;
	border-radius: 20px;
	text-align: left;
`;

export const RecommendListTitle = styled.div`
	margin-bottom: 10px;
	margin-left: 24px;
`;

export const RecommendCard = styled.li<{ $select: boolean }>`
	display: flex;
	align-items: center;
	padding: 10px 24px;
	font-size: 1rem;
	${(props) =>
		props.$select &&
		css`
			background: #f7f7f6;
		`}
`;
