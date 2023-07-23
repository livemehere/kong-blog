import styled from '@emotion/styled';
import { FC, useMemo, useState } from 'react';
import PostList from '@src/components/post/PostList';
import { GetStaticProps } from 'next';
import {
  getRecentPosts,
  Post,
} from '@src/server-functions/getCategoricalPosts';
import { groupByCategory } from '@src/utils/post';
import PostPageHeader from '@src/components/post/PostPageHeader';
import useScroll from '@src/hooks/useScroll';
import cn from 'simple-class-names';

interface Props {
  posts: Post[];
}

/* TODO: 카테고리별로 정렬 및 카테고리별 최대 2줄 하고 모바일 스크롤 효과 만들기 */
const PostsPage: FC<Props> = ({ posts }) => {
  const groupedPosts = groupByCategory(posts);
  const categories = ['전체', ...Object.keys(groupedPosts)];
  const [currentCategory, setCurrentCategory] = useState('전체');

  const filteredPosts = useMemo(() => {
    if (currentCategory === '전체') return groupedPosts;
    return { [currentCategory]: groupedPosts[currentCategory] };
  }, [currentCategory, groupedPosts]);

  const handleSetCategory = (category: string) => setCurrentCategory(category);

  const { y } = useScroll();
  const showBlurBg = y > 65.5;

  return (
    <Root className="PostsPage">
      <div className={cn('filter-bg', { showBlurBg })} />
      <PostPageHeader
        categories={categories}
        onClick={handleSetCategory}
        currentCategory={currentCategory}
      />
      <section>
        {Object.entries(filteredPosts).map(([category, posts]) => (
          <PostList
            key={category}
            posts={posts}
            title={category}
            description={`${category} 카테고리의 게시물 목록이에요.`}
            n={10}
          />
        ))}
      </section>
    </Root>
  );
};

export default PostsPage;

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  position: relative;
  padding-bottom: 100px;

  > section {
    display: flex;
    flex-direction: column;
    gap: 100px;
  }

  .filter-bg::after {
    content: '';
    will-change: height;
    transition: all 0.2s var(--easing);
    height: 0;
    opacity: 0;
    top: 0;
    left: 0;
    right: 0;
    position: fixed;
    background: hsl(222deg 20% 7% / 75%);
  }

  .filter-bg.showBlurBg::after {
    opacity: 0.5;
    height: 140px;
  }
`;

export const getStaticProps: GetStaticProps = async () => {
  const posts = getRecentPosts(); // 여기서 자름으로써, 번들 JSON 사이즈 줄이기
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};
