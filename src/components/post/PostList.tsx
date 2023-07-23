import styled from '@emotion/styled';
import { FC, useMemo } from 'react';
import Title from '@src/components/common/Title';
import { Post } from '@src/server-functions/getCategoricalPosts';
import PostCard from '@src/components/post/PostCard';

interface Props {
  posts: Post[];
  n?: number;
  title: string;
  description: string;
}

const PostList: FC<Props> = ({ title, description, posts, n }) => {
  const displayPosts = useMemo(
    () => (n ? posts.slice(0, n) : posts),
    [posts, n]
  );

  return (
    <Root className="PostList">
      <Title title={title} description={description} />
      <section>
        <ul>
          {displayPosts.map((post) => (
            <PostCard key={post.meta.title} post={post} />
          ))}
        </ul>
      </section>
    </Root>
  );
};

export default PostList;

export const Root = styled.div`
  section {
    ul {
      margin-top: 20px;
      display: grid;
      gap: 12px;
      grid-template-columns: repeat(auto-fill, minmax(164px, 1fr));
    }
  }

  @media (width < 768px) {
    section {
      overflow-x: scroll;
      overflow-y: hidden;
      scroll-snap-type: x mandatory;
      &::-webkit-scrollbar {
        display: none;
      }

      ul {
        display: inline-flex;
        .PostCard {
          a {
            scroll-snap-align: start;
            width: 200px;
          }
        }
      }
    }
  }
`;
