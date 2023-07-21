import styled from '@emotion/styled';
import { FC } from 'react';
import Link from 'next/link';
import HomeIcon from '@svg/home.svg';
import ArticleIcon from '@svg/article.svg';
import ResumeIcon from '@svg/resume.svg';
import KongIcon from '@svg/kong-icon.svg';

interface Props {}

const menu = [
  { category: 'home', href: '/', label: '홈', icon: <HomeIcon /> },
  { category: 'post', href: '/post', label: '포스트', icon: <ArticleIcon /> },
  {
    category: 'resume',
    href: '/resume',
    label: '이력서',
    icon: <ResumeIcon />,
  },
];

const SideMenu: FC<Props> = () => {
  return (
    <Root className="SideMenu">
      <Link href={'/'} className={'logo'}>
        <span className="icon">
          <KongIcon />
        </span>
        <span className="label">{"Kong's 블로그"}</span>
      </Link>
      <ul>
        {menu.map((item) => (
          <li key={item.category}>
            <Link href={item.href}>
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
  border-right: 1px solid var(--border-color);
  background: var(--light-black-color);
  padding: 12px;
  transition: width 0.6s var(--easing);
  width: 48px;
  overflow: hidden;

  /* 로고, 메뉴 공통 */
  a {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 8px 12px;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-gray-color);
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
      color: hsl(222deg 14% 90% / 75%);
      .icon {
        svg path {
          fill: hsl(222deg 14% 90% / 75%);
        }
      }
    }
  }

  /* 메뉴 */
  ul {
    display: flex;
    flex-direction: column;
    gap: 8px;
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
