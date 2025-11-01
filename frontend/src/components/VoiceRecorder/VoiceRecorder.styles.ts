import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const Status = styled.p<{ $isVisible: boolean }>`
  margin: 0;
  text-transform: uppercase;
  opacity: 0;
  font-size: 30px;

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      opacity: 1;
    `}
`;

export const Button = styled.button`
  font-size: 30px;
  padding: 3px 18px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const AudioPlayback = styled.audio``;
