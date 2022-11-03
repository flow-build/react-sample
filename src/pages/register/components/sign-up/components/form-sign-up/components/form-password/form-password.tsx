import { useState } from "react";

import _isEqual from "lodash/isEqual";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import * as S from "./styles";
import { InputLabel } from "@mui/material";

type Props = {
  onClick: (password: string) => void;
  handleBackButton: () => void;
};

export const FormPassword: React.FC<Props> = ({
  onClick,
  handleBackButton,
}) => {
  const [payload, setPayload] = useState({
    password: "",
    confirmPassword: "",
    showPassword: false,
    hasNumber: false,
    hasUppercase: false,
    hasLowercase: false,
    hasSpecialCharacters: false,
    hasMinimumCharacters: false,
  });

  function getIsDisabled() {
    const isEqual = _isEqual(payload.password, payload.confirmPassword);
    return (
      !payload.hasSpecialCharacters ||
      !payload.hasUppercase ||
      !payload.hasNumber ||
      !payload.hasMinimumCharacters ||
      !isEqual
    );
  }

  function handlePassword(name: string, value: string) {
    const password = value;
    const isSpecialCharacters = new RegExp("[@!#$%^&*()/]").test(password);
    const isUppercase = new RegExp("[A-Z]").test(password);
    const isLowercase = new RegExp("[a-z]").test(password);
    const isNumber = new RegExp("[0-9]").test(password);
    const haveMinimumCharacters = new RegExp("^.{8,256}$").test(password);

    setPayload((prev) => ({
      ...prev,
      [name]: value,
      hasSpecialCharacters: isSpecialCharacters,
      hasUppercase: isUppercase,
      hasLowercase: isLowercase,
      hasNumber: isNumber,
      hasMinimumCharacters: haveMinimumCharacters,
    }));
  }

  function handleChange(name: string, value: string) {
    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleClickShowPassword() {
    setPayload((prev) => ({
      ...prev,
      showPassword: !payload.showPassword,
    }));
  }

  function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  return (
    <>
    <InputLabel>Password</InputLabel>
      <S.Input
        label="Password"
        name="password"
        placeholder="Type your password"
        type={payload.showPassword ? "text" : "password"}
        value={payload.password}
        onChange={({ target }) => handlePassword(target.name, target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
              onMouseDown={handleMouseDownPassword}
            >
              {payload.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />

      <S.Input
        label="Confirm Password"
        name="confirmPassword"
        placeholder="Confirm your password"
        type="password"
        value={payload.confirmPassword}
        onChange={({ target }) => handleChange(target.name, target.value)}
      />
      <S.PasswordContainer>
        <S.PasswordItens isDisabled={payload.hasMinimumCharacters}>
          <S.Text> Length between 8 and 256</S.Text>
        </S.PasswordItens>
        <S.PasswordItens isDisabled={payload.hasUppercase}>
          <S.Text> Uppercase letter</S.Text>
        </S.PasswordItens>
        <S.PasswordItens isDisabled={payload.hasLowercase}>
          <S.Text> Lowercase letter</S.Text>
        </S.PasswordItens>
        <S.PasswordItens isDisabled={payload.hasNumber}>
          <S.Text> Has number </S.Text>
        </S.PasswordItens>
        <S.PasswordItens isDisabled={payload.hasSpecialCharacters}>
          <S.Text> Special character</S.Text>
        </S.PasswordItens>
      </S.PasswordContainer>

      <S.SubmitContainer>
        <S.BackButton onClick={handleBackButton}></S.BackButton>{" "}
        <S.SubmitButton
          disabled={getIsDisabled()}
          onClick={() => onClick(payload.password)}
        ></S.SubmitButton>
      </S.SubmitContainer>
    </>
  );
};