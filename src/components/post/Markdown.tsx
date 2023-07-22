import styled from '@emotion/styled';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import 'github-markdown-css';
import qs from 'qs';

interface Props {
  content: string;
}

const Markdown: FC<Props> = ({ content }) => {
  return (
    <ReactMarkdown
      className="markdown-body"
      remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              style={oneDark}
              language={match[1]}
              PreTag="div"
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
        img: ({ node, ...props }) => {
          const width = props.src.match(/width=(\d+)/)?.[1] || 'unset';
          const height = props.src.match(/height=(\d+)/)?.[1] || 'unset';
          const align = props.src.match(/align=(\w+)/)?.[1] || 'unset';
          const margin =
            align === 'left' || align === 'start'
              ? '0'
              : align === 'right' || align === 'end'
              ? '0 0 0 auto'
              : '0 auto';
          return (
            <img
              width={width}
              height={height}
              style={{ maxWidth: '100%', display: 'block', margin }}
              {...props}
            />
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;

export const Root = styled.div``;
