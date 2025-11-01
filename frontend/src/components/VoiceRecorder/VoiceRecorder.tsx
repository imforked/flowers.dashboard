import { useRef, useState } from "react";
import * as S from "./VoiceRecorder.styles";
import { useReactMediaRecorder } from "react-media-recorder";
import { ButtonControl } from "./VoiceRecorder.types";

export const VoiceRecorder = () => {
  const [lastClickedButton, setLastClickedButton] =
    useState<ButtonControl | null>(null);

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    clearBlobUrl: reactMediaRecorderClearBlobUrl,
  } = useReactMediaRecorder({ audio: true });

  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  const clickHandlerStartButton = () => {
    audioPlayerRef.current?.pause();
    setLastClickedButton(ButtonControl.Start);
    startRecording();
  };

  const clickHandlerStopButton = () => {
    setLastClickedButton(ButtonControl.Stop);
    stopRecording();
  };

  const clearBlobUrl = () => {
    reactMediaRecorderClearBlobUrl();
    audioPlayerRef.current?.load();
  };

  return (
    <S.Container>
      <S.Status $isVisible={status !== "idle"}>{status}</S.Status>
      <S.ButtonContainer>
        <S.Button
          $isLastClicked={lastClickedButton === ButtonControl.Start}
          onClick={clickHandlerStartButton}
        >
          {ButtonControl.Start}
        </S.Button>
        <S.Button
          $isLastClicked={lastClickedButton === ButtonControl.Stop}
          onClick={clickHandlerStopButton}
        >
          {ButtonControl.Stop}
        </S.Button>
      </S.ButtonContainer>
      <S.AudioPlayback
        ref={audioPlayerRef}
        src={mediaBlobUrl}
        controls
        autoPlay
        loop
      />
      {mediaBlobUrl && (
        <>
          <S.Button $customColor="#c94b4b" onClick={clearBlobUrl}>
            Delete
          </S.Button>
          <S.Button $customColor="#4bc96c">Submit</S.Button>
        </>
      )}
    </S.Container>
  );
};
