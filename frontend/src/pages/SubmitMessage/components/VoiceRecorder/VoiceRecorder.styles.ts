import type { CSSProperties } from "react";
import styled, { css } from "styled-components";
import { Button as ButtonBase } from "@imforked/legos";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const VoiceInterfaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const Guidance = styled.p`
  margin: 0;
  font-size: 30px;
`;

export const Button = styled(ButtonBase)<{
  $customColor?: CSSProperties["color"];
}>`
  font-size: 30px;
  padding: 3px 18px;
  text-transform: capitalize;
  border: 3px solid #6b6b6bff;
  transition: background 0.1s ease-in-out;
  background: transparent;

  ${({ $customColor }) =>
    $customColor &&
    css`
      border: ${$customColor};
      background: ${$customColor};
    `}
`;

export const AudioPlayback = styled.audio``;

export const DeleteSubmitButtonsContainer = styled.div`
  display: flex;
  gap: 0 20px;
`;
