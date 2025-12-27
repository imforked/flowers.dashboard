import * as S from "./ErrorState.styles";
import { type ErrorStateProps } from "./ErrorState.types";

export const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <S.Container>
      <S.Title>An Error Occurred</S.Title>
      <S.Description>{error}</S.Description>
    </S.Container>
  );
};
