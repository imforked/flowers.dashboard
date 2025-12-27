import type { Dispatch, SetStateAction } from "react";

export type VoiceRecorderProps = {
  setHasBeenSubmitted: Dispatch<SetStateAction<boolean>>;
  setErrorMessage: Dispatch<SetStateAction<string | undefined>>;
};

export enum ButtonControl {
  Start = "start",
  Stop = "stop",
}
