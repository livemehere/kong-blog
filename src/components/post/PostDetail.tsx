import styled from '@emotion/styled';
import { FC } from 'react';
import { Post } from '@src/server-functions/getCategoricalPosts';
import { dateFormat } from '@src/utils/time';
import WriteIcon from '@svg/write.svg';
import ReactMarkdown from 'react-markdown';
import Markdown from '@src/components/post/Markdown';

interface Props {
  post: Post;
}

const PostDetail: FC<Props> = ({ post }) => {
  return (
    <Root className="PostDetail">
      <section className={'header'}>
        <h1>{post.meta.title}</h1>
        <p className={'createdAt'}>
          <WriteIcon />
          {dateFormat(post.meta.createdAt)}
        </p>
      </section>
      <section className={'content'}>
        <Markdown content={post.content} />
      </section>
    </Root>
  );
};

export default PostDetail;

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  section {
    &.header {
      h1 {
        font-size: 2rem;
        font-weight: 700;
      }
      .createdAt {
        margin-top: 12px;
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.8rem;
      }
    }
  }
`;
