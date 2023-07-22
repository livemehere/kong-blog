import styled from '@emotion/styled';
import { FC } from 'react';

interface Props {
  title: string;
  description: string;
}

const Title: FC<Props> = ({ title, description }) => {
  return (
    <Root className="Title">
      {title} <span>{description}</span>
    </Root>
  );
};

export default Title;

export const Root = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  span {
    margin-left: 8px;
    font-size: 16px;
    color: var(--gray);
    font-weight: 400;
  }
`;
