import styled, { keyframes } from "styled-components";

const disappear = keyframes`
    0% {
        opacity: 1;
        transform: translateX(-50%) scale(1);
    }
    100% {
        opacity: 0;
        transform: translateX(-50%) scale(0);
    }
`;

export const Number = styled.span<{ $index: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  font-size: 60px;
  animation: ${disappear} 1s ease-in-out ${({ $index }) => $index}s 1 normal
    forwards;
`;
