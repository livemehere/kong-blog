import useMarkdownList from "../hooks/useMarkdownList";
import styled from "styled-components";
import Card from "./Card";

export default function PostList() {
  const { list, setList } = useMarkdownList();

  return (
    <PostWrap>
      {list.map((post) => (
        <Card key={post.file} post={post} />
      ))}
    </PostWrap>
  );
}

const PostWrap = styled.ul`
  padding-left: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  margin: auto;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;
