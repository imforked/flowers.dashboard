import { VoiceRecorder } from "./components/VoiceRecorder/VoiceRecorder";
import { SuccessState } from "../../__components/SuccessState/SuccessState";
import { ErrorState } from "../../__components/ErrorState/ErrorState";
import { Modal } from "@imforked/legos";
import { Fragment, useState, useEffect } from "react";
import { useMicPermission } from "../../hooks/useMicPermission";
import { MicModalContent } from "./components/MicModalContent/MicModalContent";

export const SubmitMessage = () => {
  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const micPermission = useMicPermission();

  useEffect(() => {
    if (micPermission === "prompt") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [micPermission]);

  const submitStatus = errorMessage ? (
    <ErrorState error={errorMessage} />
  ) : (
    <SuccessState />
  );

  return (
    <Fragment>
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        content={<MicModalContent setIsModalOpen={setIsModalOpen} />}
      />

      {hasBeenSubmitted ? (
        submitStatus
      ) : (
        <VoiceRecorder
          setHasBeenSubmitted={setHasBeenSubmitted}
          setErrorMessage={setErrorMessage}
        />
      )}
    </Fragment>
  );
};
