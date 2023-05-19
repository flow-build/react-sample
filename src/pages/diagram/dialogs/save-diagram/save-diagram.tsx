import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import jwt_decode from "jwt-decode";

import { IPayload } from "pages/diagram/dialogs/save-diagram/types/IPayload";

import { TUser } from "models/user";

import { create } from "services/resources/diagrams/create";

import { SessionStorage } from "shared/utils/base-storage/session-storage";

import * as S from "./styles";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  xml: string;
};

export const SaveDiagram: React.FC<Props> = ({ isOpen, onClose, xml }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { workflowId } = useParams();

  function getUserInfo() {
    const token = SessionStorage.getInstance().getValueByKey<string>("TOKEN");

    if (!token) {
      return;
    }

    const decoded = jwt_decode(token) as TUser;
    SessionStorage.getInstance().setValue("TOKEN", token);
    return decoded;
  }

  const [payload, setPayload] = useState<IPayload>({
    name: "",
    isDefault: false,
  });

  const onChangeDiagramName = (value: string, field: keyof IPayload) => {
    setPayload((prev) => ({ ...prev, [field]: value }));
  };

  const onChangeDiagramIsDefault = (value: boolean, field: keyof IPayload) => {
    setPayload((prev) => ({ ...prev, [field]: value }));
  };

  function createDiagramSuccess(message: string) {
    enqueueSnackbar(`Diagrama ${message} criado!`, {
      autoHideDuration: 2000,
      variant: "success",
    });
  }

  async function handleClickDiagramName() {
    const info = getUserInfo();

    if (!info) {
      return;
    }

    const diagramName = payload?.name;

    await create({
      name: payload.name,
      isDefault: payload.isDefault,
      workflowId: workflowId as string,
      userId: info.actor_id,
      xml,
    });

    createDiagramSuccess(diagramName);

    if (onClose) {
      onClose();
    }
  }

  return (
    <S.DiagramWrapper open={isOpen} onClose={onClose}>
      <S.DiagramBackground>
        <S.DiagramTitle>
          Salvar Diagrama
          <S.CloseDiagramButton onClick={onClose} />
        </S.DiagramTitle>

        <S.DiagramContent>
          <S.DiagramInput
            value={payload?.name}
            onChange={(event) =>
              onChangeDiagramName(event.target.value, "name")
            }
          />
          <S.CheckboxWrapper>
            <S.DiagramCheckbox
              aria-label="Default?"
              checked={payload?.isDefault}
              onChange={(event) =>
                onChangeDiagramIsDefault(event.target.checked, "isDefault")
              }
            />
          </S.CheckboxWrapper>
        </S.DiagramContent>

        <S.DiagramDivider />

        <S.ButtonWrapper>
          <S.CancelDiagramButton onClick={onClose}>
            Cancelar
          </S.CancelDiagramButton>

          <S.ButtonDivider />

          <S.SaveDiagramButton onClick={handleClickDiagramName}>
            Salvar
          </S.SaveDiagramButton>
        </S.ButtonWrapper>
      </S.DiagramBackground>
    </S.DiagramWrapper>
  );
};
