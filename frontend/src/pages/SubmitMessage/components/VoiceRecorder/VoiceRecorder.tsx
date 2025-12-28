import { useRef, useState } from "react";
import * as S from "./VoiceRecorder.styles";
import { useReactMediaRecorder } from "react-media-recorder";
import { ButtonControl, type VoiceRecorderProps } from "./VoiceRecorder.types";

export const VoiceRecorder = ({
  setErrorMessage,
  setHasBeenSubmitted,
}: VoiceRecorderProps) => {
  const [lastClickedButton, setLastClickedButton] =
    useState<ButtonControl | null>(null);

  const {
    startRecording,
    stopRecording,
    mediaBlobUrl,
    clearBlobUrl: reactMediaRecorderClearBlobUrl,
  } = useReactMediaRecorder({
    audio: true,
    blobPropertyBag: { type: "audio/wav" },
  });

  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  const displayStartButton =
    lastClickedButton === null || lastClickedButton === ButtonControl.Stop;

  const recordingExists = Boolean(mediaBlobUrl);

  const clickHandlerStartRecording = () => {
    audioPlayerRef.current?.pause();
    setLastClickedButton(ButtonControl.Start);
    startRecording();
  };

  const clickHandlerStopRecording = () => {
    setLastClickedButton(ButtonControl.Stop);
    stopRecording();
  };

  const recordingButtonValues: {
    text: ButtonControl;
    onClick: () => void;
  } = displayStartButton
    ? { text: ButtonControl.Start, onClick: clickHandlerStartRecording }
    : { text: ButtonControl.Stop, onClick: clickHandlerStopRecording };

  const clearBlobUrl = () => {
    reactMediaRecorderClearBlobUrl();
    audioPlayerRef.current?.load();
    setLastClickedButton(null);
  };

  const submitRecording = async () => {
    if (!mediaBlobUrl) return;

    try {
      const blob = await fetch(mediaBlobUrl).then((res) => res.blob());

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "audio/wav",
          },
          body: blob,
        }
      );

      if (!response.ok) throw new Error("Upload failed");

      console.log("Upload successful!");
      setHasBeenSubmitted(true);
    } catch (err) {
      console.error("Error uploading recording:", err);
      setHasBeenSubmitted(true);
      setErrorMessage(String(err));
    }
  };

  return (
    <S.Container>
      {!recordingExists && (
        <S.Guidance>
          {displayStartButton
            ? "Start recording when ready."
            : "Stop recording when finished."}
        </S.Guidance>
      )}

      {recordingExists && (
        <S.DeleteSubmitButtonsContainer>
          <S.Button
            $customColor="#c94b4b"
            text="Delete"
            onClick={clearBlobUrl}
          />
          <S.Button
            $customColor="#4bc96c"
            text="Submit"
            onClick={submitRecording}
          />
        </S.DeleteSubmitButtonsContainer>
      )}

      {!recordingExists && <S.Button {...recordingButtonValues} />}
      {recordingExists && (
        <S.AudioPlayback
          ref={audioPlayerRef}
          src={mediaBlobUrl}
          controls
          autoPlay
          loop
        />
      )}
    </S.Container>
  );
};
