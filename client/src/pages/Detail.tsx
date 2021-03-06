import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useParams } from "react-router-dom";
import useMarkdown from "../hooks/useMarkdown";
import styled from "styled-components";

export default function Detail() {
  const params = useParams();
  const { markdown } = useMarkdown(params.filename!);

  return (
    <StyledMain>
      <Title>{params.filename!.split(".")[0]}</Title>
      <ReactMarkdown
        children={markdown}
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={atomDark as any}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </StyledMain>
  );
}

const Title = styled.h1`
  text-align: center;
`;

const StyledMain = styled.main`
  color: white;
  max-width: 90%;
  margin: auto;
`;
