import styled from '@emotion/styled';
import { FC } from 'react';
import NotReady from '@src/components/common/NotReady';

interface Props {}

const ToolsPage: FC<Props> = () => {
  return (
    <Root className="ToolsPage">
      <NotReady />
    </Root>
  );
};

export default ToolsPage;

export const Root = styled.div``;
