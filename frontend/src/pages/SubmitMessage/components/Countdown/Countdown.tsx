import * as S from "./Countdown.styles";

export const COUNTDOWN_STARTING_NUMBER = 3;

const countdownValues = [
  ...Array.from(
    { length: COUNTDOWN_STARTING_NUMBER },
    (_, index) => index + 1
  ).reverse(),
  "GO!",
];

export const Countdown = () => {
  return countdownValues.map((number, index) => (
    <S.Number $index={index}>{number}</S.Number>
  ));
};
