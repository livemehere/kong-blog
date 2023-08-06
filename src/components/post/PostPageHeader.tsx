import styled from '@emotion/styled';
import { FC } from 'react';
import cn from 'simple-class-names';

interface Props {
  categories: string[];
  onClick: (category: string) => void;
  currentCategory: string;
}

const PostPageHeader: FC<Props> = ({
  categories,
  onClick,
  currentCategory,
}) => {
  return (
    <Root className={'PostPageHeader'}>
      <h2>게시글 목록</h2>
      <p>카테고리와 태그를 선택해 원하는 게시글을 찾을 수 있습니다.</p>
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            className={cn('category', { active: currentCategory === category })}
            onClick={() => onClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </Root>
  );
};

export default PostPageHeader;

export const Root = styled.div`
  max-width: var(--main-width);
  margin: 0 auto;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 var(--main-padding);

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 8px;
  }

  p {
    font-size: 0.875rem;
    color: var(--gray);
    margin-bottom: 24px;
  }

  .categories {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 0 8px;

    .category {
      padding: 8px 12px;
      border-radius: 8px;
      background: var(--dark-light2);
      color: var(--gray);
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s ease-in-out;

      &:hover,
      &.active {
        background: hsla(222deg 10% 17% / 1);
        color: var(--white);
      }
    }
  }
`;
