import styled from '@emotion/styled';
import { FC } from 'react';
import {
  getPostByFileName,
  Post,
  getRecentPosts,
} from '@src/server-functions/getCategoricalPosts';
import PostDetail from '@src/components/post/PostDetail';
import { css } from '@emotion/react';
import { NextSeo } from 'next-seo';

interface Props {
  post: Post;
}

const PostDetailPage: FC<Props> = ({ post }) => {
  const title = post.meta.title;
  const desc = post.content.slice(0, 100);
  return (
    <>
      <NextSeo title={title} description={desc} />
      <Root className="PostDetailPage">
        <div
          className="detail-page-bg"
          css={css`
            background: url(${post.meta.thumbnailUrl}) no-repeat center/cover;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 10%;
            z-index: -1;
            opacity: 0.04;
            filter: blur(10px);
          `}
        />
        <PostDetail post={post} />
      </Root>
    </>
  );
};

export default PostDetailPage;

export const Root = styled.div`
  padding: 0 var(--main-padding);
  max-width: var(--main-width);
  margin: 60px auto;
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
  const title = decodeURI(ctx.params.title);
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
