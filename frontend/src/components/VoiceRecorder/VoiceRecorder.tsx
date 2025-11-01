import * as S from "./VoiceRecorder.styles";
import { useReactMediaRecorder } from "react-media-recorder";

export const VoiceRecorder = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });

  return (
    <S.Container>
      <S.Status $isVisible={status !== "idle"}>{status} RECORDING</S.Status>
      <S.ButtonContainer>
        <S.StartButton onClick={startRecording}>Start</S.StartButton>
        <S.StopButton onClick={stopRecording}>Stop</S.StopButton>
      </S.ButtonContainer>
      <S.AudioPlayback src={mediaBlobUrl} controls autoPlay loop />
    </S.Container>
  );
};
