import styled from '@emotion/styled';
import { FC } from 'react';
import ContructIcon from '@svg/construct.svg';
interface Props {}

const NotReady: FC<Props> = () => {
  return (
    <Root className="NotReady">
      <ContructIcon />
      <h2>준비중 입니다</h2>
    </Root>
  );
};

export default NotReady;

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px 0;
  svg {
    width: 100px;
    height: 100px;
    animation: shake 0.1s ease-in-out infinite;
  }
  h2 {
    font-size: 1.2rem;
    font-weight: 700;
  }

  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-4px);
    }
    50% {
      transform: translateX(0);
    }
    75% {
      transform: translateX(4px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;
