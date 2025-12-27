import * as S from "./ErrorState.styles";
import { type ErrorStateProps } from "./ErrorState.types";
import { Button } from "@imforked/legos";

export const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <S.Container>
      <S.Title>An Error Occurred</S.Title>
      <S.Description>{error}</S.Description>
      <Button text="Try Again" onClick={() => window.location.reload()} />
    </S.Container>
  );
};
