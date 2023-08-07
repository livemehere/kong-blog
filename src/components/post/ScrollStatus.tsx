import { css } from '@emotion/react';
import { FC, useEffect, useState } from 'react';

type Props = {};

const ScrollStatus: FC<Props> = () => {
  const [scrollRatio, setScrollRatio] = useState(0);
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const scrollHeight = document.body.scrollHeight;
      const clientHeight = document.body.clientHeight;
      const ratio = scrollY / (scrollHeight - clientHeight);
      setScrollRatio(ratio);
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        width: ${scrollRatio * 100}%;
        height: 6px;
        background: var(--blue);
        z-index: 9999;
      `}
    ></div>
  );
};

export default ScrollStatus;
