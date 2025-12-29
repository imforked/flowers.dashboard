import * as S from "./MicModalContent.styles";
import { Button } from "@imforked/legos";
import type { Dispatch, SetStateAction } from "react";

export const MicModalContent = ({
  setIsModalOpen,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleMicPermissionClick = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Permission granted!");
      setIsModalOpen(false);
    } catch (err) {
      console.log("Permission denied or error:", err);
    }
  };

  return (
    <S.Container>
      <S.Description>
        Your browser needs your okay to use your mic. Are you cool with this?
      </S.Description>
      <Button text="Sure" onClick={handleMicPermissionClick} />
    </S.Container>
  );
};
