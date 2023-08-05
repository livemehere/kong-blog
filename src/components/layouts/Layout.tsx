import styled from '@emotion/styled';
import { FC, ReactNode, useState } from 'react';
import Header from '@src/components/layouts/Header';
import SideMenu from '@src/components/layouts/SideMenu';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  return (
    <Root className="Layout">
      <SideMenu sideMenuOpen={sideMenuOpen} setSideMenuOpen={setSideMenuOpen} />
      <div className={'container'}>
        <div className="bg"></div>
        <Header setSideMenuOpen={setSideMenuOpen} />
        <main>{children}</main>
      </div>
    </Root>
  );
};

export default Layout;

export const Root = styled.div`
  display: flex;
  min-height: 100%;
  .container {
    position: relative;
    width: 100%;
    flex: 1;
    padding-left: 74px;
    @media (width < 1232px) {
      padding-left: 0;
    }

    .bg {
      user-select: none;
      position: absolute;
      object-fit: cover;
      z-index: -1;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 50%;
      background: linear-gradient(to top, var(--dark), var(--gray));
      opacity: 0.04;
    }
  }
`;
