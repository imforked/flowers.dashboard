import { VoiceRecorder } from "./components/VoiceRecorder/VoiceRecorder";
import { SuccessState } from "../../__components/SuccessState/SuccessState";
import { ErrorState } from "../../__components/ErrorState/ErrorState";
import { useState } from "react";

export const SubmitMessage = () => {
  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const submitStatus = errorMessage ? (
    <ErrorState error={errorMessage} />
  ) : (
    <SuccessState />
  );

  return hasBeenSubmitted ? (
    submitStatus
  ) : (
    <VoiceRecorder
      setHasBeenSubmitted={setHasBeenSubmitted}
      setErrorMessage={setErrorMessage}
    />
  );
};
