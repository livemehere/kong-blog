import styled from '@emotion/styled';
import { FC } from 'react';
import GithubIcon from '@svg/github.svg';
import YoutubeIcon from '@svg/youtube.svg';
import { css } from '@emotion/react';
interface Props {}

const headerLinks = [
  {
    href: 'https://github.com/livemehere',
    label: 'Github',
    icon: <GithubIcon />,
    bgColor: 'hsla(222deg 10% 17% / 1)',
    color: 'var(--gray)',
    hoverColor: '#fff',
    hoverBgColor: 'hsl(218, 7%, 29%)',
  },
  {
    href: 'https://www.youtube.com/@devkong-00',
    label: '유튜브',
    icon: <YoutubeIcon />,
    bgColor: 'hsl(352, 71%, 54%,0.9)',
    color: '#fff',
    hoverColor: '#fff',
    hoverBgColor: 'hsl(352, 71%, 54%, 1)',
  },
];

const Header: FC<Props> = () => {
  return (
    <Root className="Header">
      <ul>
        {headerLinks.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              css={css`
                background: ${item.bgColor};
                color: ${item.color};
                &:hover {
                  background: ${item.hoverBgColor};
                  color: ${item.hoverColor};
                }
              `}
            >
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
        border-radius: 4px;
        padding: 8px 12px;
        transition: all 0.2s ease-in-out;

        span {
          display: flex;
        }
      }
    }
  }
`;
