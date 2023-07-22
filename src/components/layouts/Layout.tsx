import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';
import Header from '@src/components/layouts/Header';
import SideMenu from '@src/components/layouts/SideMenu';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <Root className="Layout">
      <SideMenu />
      <div className={'container'}>
        <Header />
        <main>{children}</main>
      </div>
    </Root>
  );
};

export default Layout;

export const Root = styled.div`
  height: 100%;
  display: flex;
  .container {
    height: 100%;
    flex: 1;
  }
`;