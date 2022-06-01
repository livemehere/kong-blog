import PostList from "../components/PostList";
import styled from "styled-components";
import useMarkdownList from "../hooks/useMarkdownList";

export default function Home() {
  const { list } = useMarkdownList();
  return (
    <Container>
      <h1>{list.length} posts</h1>
      <PostList />
    </Container>
  );
}

const Container = styled.div`
  max-width: 1300px;
  margin: auto;
  padding: 1em;
  & > h1 {
    color: white;
    font-size: 1.3em;
    margin: 2em 0;
  }
`;
