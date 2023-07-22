import styled from '@emotion/styled';
import { FC } from 'react';
import {
  getPostByFileName,
  Post,
  getRecentPosts,
} from '@src/server-functions/getCategoricalPosts';
import PostDetail from '@src/components/post/PostDetail';

interface Props {
  post: Post;
}

const PostDetailPage: FC<Props> = ({ post }) => {
  return (
    <Root className="PostDetailPage">
      <PostDetail post={post} />
    </Root>
  );
};

export default PostDetailPage;

export const Root = styled.div`
  margin-top: 60px;
`;

export const getStaticPaths = async () => {
  const paths = getRecentPosts().map((post) => ({
    params: {
      title: post.meta.title,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async (ctx) => {
  const title = ctx.params.title;
  const post = getPostByFileName(title);
  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};
