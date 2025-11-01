import * as S from "./VoiceRecorder.styles";
import { useReactMediaRecorder } from "react-media-recorder";

export const VoiceRecorder = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });

  return (
    <S.Container>
      <S.Status $isVisible={status !== "idle"}>{status}</S.Status>
      <S.ButtonContainer>
        <S.Button onClick={startRecording}>Start</S.Button>
        <S.Button onClick={stopRecording}>Stop</S.Button>
      </S.ButtonContainer>
      <S.AudioPlayback src={mediaBlobUrl} controls autoPlay loop />
    </S.Container>
  );
};
