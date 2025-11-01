import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const Status = styled.p<{ $isVisible: boolean }>`
  margin: 0;
  text-transform: uppercase;
  opacity: 0;

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      opacity: 1;
    `}
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const StartButton = styled.button``;

export const StopButton = styled.button``;

export const AudioPlayback = styled.audio``;
