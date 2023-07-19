import { ReactNode } from 'react';
import { LayoutBox } from '../styles/Layout.style';

function Layout({ children }: { children: ReactNode }) {
	return <LayoutBox>{children}</LayoutBox>;
}

export default Layout;
