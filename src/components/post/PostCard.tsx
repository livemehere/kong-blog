import styled from '@emotion/styled';
import { FC } from 'react';
import { Post } from '@src/server-functions/getCategoricalPosts';
import Link from 'next/link';
import LogoIcon from '@svg/logo.svg';

interface Props {
  post: Post;
}

const PostCard: FC<Props> = ({ post }) => {
  const thumbnailUrl = post.meta.thumbnailUrl;

  return (
    <Root className="PostCard">
      <Link href={`/posts/${post.meta.title}`}>
        <figure>
          {thumbnailUrl ? (
            <img src={post.meta.thumbnailUrl} alt="thumbnail" />
          ) : (
            <div className="thumbnail-placeholder">
              <LogoIcon />
            </div>
          )}
        </figure>
        <h3>{post.meta.title}</h3>
      </Link>
    </Root>
  );
};

export default PostCard;

export const Root = styled.article`
  a {
    display: flex;
    flex-direction: column;
    gap: 12px;
    figure {
      aspect-ratio: 6 / 7;
      max-height: 222px;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--dark-light2);
      .thumbnail-placeholder {
        background-color: var(--dark-light1);
        svg {
          path {
            fill: var(--gray);
          }
        }
      }
      transition: transform 0.2s var(--easing);
      &:hover {
        transform: scale(1.05);
      }
    }
    h3 {
      padding-left: 6px;
      color: var(--white);
    }
  }
  &:hover figure {
    outline: 1px solid var(--gray);
  }
`;
