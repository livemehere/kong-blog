import styled from '@emotion/styled';
import { FC, useState } from 'react';
import SearchIcon from '@svg/search.svg';
import CloseIcon from '@svg/close.svg';
import cn from 'simple-class-names';

interface Props {}

const Search: FC<Props> = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [q, setQ] = useState('');

  return (
    <Root className={cn('Search', { focus: isFocus })}>
      <SearchIcon />
      <input
        placeholder="찾으시는 컨텐츠가 있나요?"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(e) => setQ(e.target.value)}
        value={q}
      />
      {q.length > 0 && (
        <button onClick={() => setQ('')}>
          <CloseIcon />
        </button>
      )}
    </Root>
  );
};

export default Search;

export const Root = styled.div`
  display: flex;
  align-items: center;
  background: hsla(222deg 10% 17% / 1);
  max-width: 584px;
  margin: auto;
  padding: 8px 14px;
  gap: 8px;
  border-radius: 8px;
  > svg {
    width: 24px;
    height: 24px;
  }
  input {
    color: hsla(222deg 7% 30% / 1);
    padding: 8px 0;
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
  }
  &.focus {
    background: hsla(222deg 14% 90% / 1);
  }
  button {
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;
