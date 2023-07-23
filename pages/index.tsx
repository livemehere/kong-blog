import Head from 'next/head';
import Search from '@src/components/Search';
import PostList from '@src/components/post/PostList';
import styled from '@emotion/styled';
import {
  Post,
  getRecentPosts,
} from '@src/server-functions/getCategoricalPosts';
import { GetStaticProps } from 'next';

interface Props {
  posts: Post[];
}

export default function IndexPage({ posts }: Props) {
  return (
    <>
      <Head>
        {/* Default SEO 는 _app 에서 설정해주세요 */}
        <title>홈 페이지</title>
      </Head>
      <Root>
        <Search />
        <PostList
          posts={posts}
          title={'최신 포스트'}
          description={'최근 게시된 게시물 목록이에요.'}
        />
      </Root>
    </>
  );
}

const Root = styled.div`
  .PostList {
    margin-top: 80px;
  }
`;

export const getStaticProps: GetStaticProps = async () => {
  const posts = getRecentPosts().slice(0, 5); // 여기서 자름으로써, 번들 JSON 사이즈 줄이기
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};
