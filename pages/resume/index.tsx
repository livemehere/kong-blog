import styled from '@emotion/styled';
import { FC } from 'react';
import NotReady from '@src/components/common/NotReady';

interface Props {}

const ResumePage: FC<Props> = () => {
  return (
    <Root className="ResumePage">
      <NotReady />
    </Root>
  );
};

export default ResumePage;

export const Root = styled.div``;
