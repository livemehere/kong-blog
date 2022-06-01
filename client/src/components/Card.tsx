import { Link } from "react-router-dom";
import styled from "styled-components";
import { ListType } from "../hooks/useMarkdownList";

interface Props {
  post: ListType;
}

export default function Card({ post }: Props) {
  return (
    <CardWrap key={post.file}>
      <Link to={`/detail/${post.file}`}>
        <img src={`thumbnails/${post.thumbnail}`} alt="thumbnail" />
        <h2>{post.file}</h2>
      </Link>
    </CardWrap>
  );
}

const CardWrap = styled.li`
  width: 300px;
  border-radius: 10px;
  background-color: #1e1e1e;
  transition: 250ms all;
  &:hover {
    transform: translateY(-3%);
  }

  & h2 {
    font-size: 1.2em;
    font-weight: 600;
    color: #e8e8e8;
    padding: 0.3em 0.3em 0.3em 0.5em;
  }

  & img {
    width: 100%;
    border-radius: 10px 10px 0 0;
  }
`;
