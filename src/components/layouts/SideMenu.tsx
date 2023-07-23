import styled from '@emotion/styled';
import { FC } from 'react';
import Link from 'next/link';
import HomeIcon from '@svg/home.svg';
import ArticleIcon from '@svg/article.svg';
import ResumeIcon from '@svg/resume.svg';
import KongIcon from '@svg/logo.svg';
import ToolIcon from '@svg/tool.svg';
import { css } from '@emotion/react';
import useClickOutside from '@src/hooks/useClickOutside';

interface Props {
  sideMenuOpen: boolean;
  setSideMenuOpen: (open: boolean) => void;
}

const menu = [
  { href: '/', label: '홈', icon: <HomeIcon /> },
  { href: '/posts', label: '포스트', icon: <ArticleIcon /> },
  {
    href: '/tools',
    label: '툴',
    icon: <ToolIcon />,
  },
  {
    href: '/resume',
    label: '이력서',
    icon: <ResumeIcon />,
  },
];

const SideMenu: FC<Props> = ({ sideMenuOpen, setSideMenuOpen }) => {
  const ref = useClickOutside(() => {
    setSideMenuOpen(false);
  });
  return (
    <Root
      ref={ref}
      className="SideMenu"
      css={css`
        @media (width< 1232px) {
          width: 239px;
          transform: translateX(-100%);
          transition: transform 0.6s var(--easing);
          z-index: 3;

          a {
            .label {
              display: inline-block;
            }
          }
        }

        ${sideMenuOpen &&
        css`
          @media (width< 1232px) {
            transform: translateX(0%);
          }
        `}
      `}
    >
      <Link
        href={'/'}
        className={'logo'}
        onClickCapture={() => setSideMenuOpen(false)}
      >
        <span className="icon">
          <KongIcon />
        </span>
        <span className="label">{"Kong's 블로그"}</span>
      </Link>
      <ul>
        {menu.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClickCapture={() => setSideMenuOpen(false)}
            >
              <span className={'icon'}>{item.icon}</span>
              <span className={'label'}>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Root>
  );
};

export default SideMenu;

export const Root = styled.aside`
  position: fixed;
  border-right: 1px solid var(--dark-light2);
  background: var(--dark-light);
  padding: 24px 12px;
  transition: width 0.6s var(--easing);
  width: 48px; // 이걸 줘야 트렌지션이 먹는다.
  height: 100%;
  z-index: 1;

  /* 로고, 메뉴 공통 */
  a {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 8px 12px;
    font-size: 14px;
    font-weight: 600;
    color: var(--gray);
    transition: all 0.2s ease-in-out;

    &.logo {
      margin-bottom: 20px;

      .label {
        font-weight: 700;
        font-size: 16px;
        color: white;
      }
    }

    .icon {
      svg {
        width: 24px;
        height: 24px;

        path {
          transition: all 0.2s ease-in-out;
        }
      }
    }

    .label {
      display: none;
      white-space: nowrap;
    }

    &:hover:not(.logo) {
      color: var(--white);

      .icon {
        svg path {
          fill: var(--white);
        }
      }
    }
  }
  /* 메뉴 */
  ul {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  &:hover {
    width: 239px;

    a {
      .label {
        display: inline-block;
      }
    }
  }
`;
