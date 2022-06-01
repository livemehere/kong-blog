import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  return (
    <StyledHeader>
      <h1>
        <Link to={"/"}>Kong's Blog</Link>
      </h1>
      <SerachBar>
        <FiSearch color={"#E0E0E0"} />
        <StyledInput type="text" />
      </SerachBar>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5em 2em;

  & h1 {
    font-size: 2em;
    font-weight: 700;
    color: #815cf0;
  }
`;
const SerachBar = styled.div`
  font-size: 1.5em;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  padding-left: 0.4em;
`;

const StyledInput = styled.input`
  background: transparent;
  font-size: 1em;
  padding: 0.4em 0 0.4em 0.3em;
  border: none;
  color: white;
  width: 100%;
  outline: none;
`;
