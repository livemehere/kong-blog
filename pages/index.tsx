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
      <Root>
        <div className={'search-wrapper'}>
          <Search />
        </div>
        <section>
          <PostList
            posts={posts}
            title={'최신 포스트'}
            description={'최근 게시된 게시물 목록이에요.'}
          />
        </section>
      </Root>
    </>
  );
}

const Root = styled.div`
  .search-wrapper {
    padding: 0 var(--main-padding);
  }
  > section {
    padding: 0 var(--main-padding);
  }
  .PostList {
    margin: 80px auto;
    width: 100%;
    max-width: var(--main-width);
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
