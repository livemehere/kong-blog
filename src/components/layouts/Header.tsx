import styled from '@emotion/styled';
import { FC } from 'react';
import GithubIcon from '@svg/github.svg';
import YoutubeIcon from '@svg/youtube.svg';

interface Props {}

const headerLinks = [
  {
    href: 'https://github.com/livemehere',
    label: 'Github',
    icon: <GithubIcon />,
  },
  {
    href: 'https://www.youtube.com/@devkong-00',
    label: '유튜브',
    icon: <YoutubeIcon />,
  },
];

const Header: FC<Props> = () => {
  return (
    <Root className="Header">
      <ul>
        {headerLinks.map((item) => (
          <li key={item.href}>
            <a href={item.href} target="_blank" rel="noreferrer">
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </Root>
  );
};

export default Header;

export const Root = styled.div`
  height: 64px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  ul {
    display: flex;
    gap: 8px;

    li {
      a {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        font-weight: 600;
        background: hsla(222deg 10% 17% / 1);
        color: var(--text-gray-color);
        border-radius: 4px;
        padding: 8px 12px;
        transition: all 0.2s ease-in-out;

        span {
          display: flex;
        }

        &:hover {
          background: hsl(218, 7%, 29%);
          color: #fff;
        }
      }
    }
  }
`;
