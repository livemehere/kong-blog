import styled from '@emotion/styled';
import { FC } from 'react';
import PostList from '@src/components/post/PostList';
import { GetStaticProps } from 'next';
import {
  getRecentPosts,
  Post,
} from '@src/server-functions/getCategoricalPosts';

interface Props {
  posts: Post[];
}

/* TODO: 카테고리별로 정렬 및 카테고리별 최대 2줄 하고 모바일 스크롤 효과 만들기 */
const PostsPage: FC<Props> = ({ posts }) => {
  return (
    <Root className="PostsPage">
      <PostList posts={posts} />
    </Root>
  );
};

export default PostsPage;

export const Root = styled.div``;

export const getStaticProps: GetStaticProps = async () => {
  const posts = getRecentPosts(); // 여기서 자름으로써, 번들 JSON 사이즈 줄이기
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};
