import styled from '@emotion/styled';
import { FC } from 'react';
import { Post } from '@src/server-functions/getCategoricalPosts';
import { dateFormat } from '@src/utils/time';
import WriteIcon from '@svg/write.svg';
import Markdown from '@src/components/post/Markdown';
import TagIcon from '@svg/tag.svg';

interface Props {
  post: Post;
}

const PostDetail: FC<Props> = ({ post }) => {
  const tags = post.meta.tags;
  return (
    <Root className="PostDetail">
      <section className={'header'}>
        <h1>{post.meta.title}</h1>
        <p className={'createdAt'}>
          <WriteIcon />
          {dateFormat(post.meta.createdAt)}
        </p>
        <div className="tags">
          <TagIcon />
          {tags.map((tag) => (
            <button className={'tag'} key={tag}>
              {tag}
            </button>
          ))}
        </div>
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
  padding-bottom: 100px;

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
        > svg {
          width: 16px;
          height: 16px;
        }
      }
      .tags {
        margin-top: 20px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        > svg {
          width: 16px;
          height: 16px;
        }

        .tag {
          padding: 4px 12px;
          border-radius: 8px;
          background: var(--dark-light2);
          color: var(--gray);
          font-size: 14px;
          transition: all 0.2s ease-in-out;

          &:hover,
          &.active {
            background: hsla(222deg 10% 17% / 1);
            color: var(--white);
          }
        }
      }
    }
  }
`;
