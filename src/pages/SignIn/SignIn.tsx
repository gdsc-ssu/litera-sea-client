import styled, { keyframes } from "styled-components";
import { COLORS } from "@/styles/colors";
import { userApi } from "@/apis/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { TokenAtom } from "@/recoil/TokenAtom";
import { useSetRecoilState } from "recoil";
import GoogleIcon from "@/assets/SVGs/GoogleLogo.svg?react";
import BlueButton from "@/components/Button/BlueButton";

import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

const SignIn = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const setAccessToken = useSetRecoilState(TokenAtom);
  const clientId = import.meta.env.VITE_CLIENT_ID;

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.redirectedFrom?.pathname || "/";

  async function handleSingInButton() {
    event?.preventDefault();

    await userApi
      .signIn()
      .then((res) => {
        if (res.data.code === 200) {
          localStorage.setItem("accessToken", res.data.result.accessToken);
          setAccessToken(res.data.result.accessToken);
          navigate(from);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleGoogleSignInButton() {
    window.location.assign(import.meta.env.VITE_GOOGLE_OAUTH_URL);
  }

  return (
    <SignInContainer>
      <Title>
        Improve Your Literacy <br /> with Litera-sea
      </Title>
      <MaterialButton onClick={handleGoogleSignInButton}>
        <MaterialButtonContentWrapper>
          <MaterialButtonIcon>
            <GoogleIcon />
          </MaterialButtonIcon>
          <MaterialButtonContents>Sign in with Google</MaterialButtonContents>
        </MaterialButtonContentWrapper>
        <MaterialButtonState className="gsi-material-button-state" />
      </MaterialButton>
    </SignInContainer>
  );
};

export default SignIn;

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const changedColor = keyframes`    
0% {color: ${COLORS.primary};}
50% {color: ${COLORS.primaryDeep};}
100% {color: ${COLORS.primary};}
`;

const Title = styled.div`
  margin: 10rem 0 4rem;
  font-size: 50px;
  text-align: center;
  animation: ${changedColor} 2s linear infinite;
  font-weight: bolder;
`;

const MaterialButton = styled.button`
  transform: scale(1.6);
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-appearance: none;
  background-color: WHITE;
  background-image: none;
  border: 1px solid #747775;
  border-radius: 4px;
  box-sizing: border-box;
  color: #1f1f1f;
  cursor: pointer;
  font-family: "Roboto", arial, sans-serif;
  font-size: 14px;
  height: 40px;
  letter-spacing: 0.25px;
  outline: none;
  overflow: hidden;
  padding: 0 12px;
  position: relative;
  text-align: center;
  transition: background-color 0.218s, border-color 0.218s, box-shadow 0.218s;
  vertical-align: middle;
  white-space: nowrap;
  width: auto;
  max-width: 400px;
  min-width: min-content;

  &:disabled {
    cursor: default;
    background-color: #ffffff61;
    border-color: #1f1f1f1f;

    .gsi-material-button-contents {
      opacity: 38%;
    }

    .gsi-material-button-icon {
      opacity: 38%;
    }
  }

  &:not(:disabled):active .gsi-material-button-state,
  &:not(:disabled):focus .gsi-material-button-state {
    background-color: #303030;
    opacity: 12%;
  }

  &:hover {
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
      0 1px 3px 1px rgba(60, 64, 67, 0.15);
  }

  &:hover .gsi-material-button-state {
    background-color: #303030;
    opacity: 8%;
  }
`;

const MaterialButtonIcon = styled.span`
  height: 20px;
  margin-right: 12px;
  min-width: 20px;
  width: 20px;
`;

const MaterialButtonContentWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 100%;
  justify-content: space-between;
  position: relative;
  width: 100%;
`;

const MaterialButtonContents = styled.span`
  flex-grow: 1;
  font-family: "Roboto", arial, sans-serif;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
`;

const MaterialButtonState = styled.div`
  transition: opacity 0.218s;
  bottom: 0;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

function useReciolState(TokenAtom: RecoilState<undefined>): [any, any] {
  throw new Error("Function not implemented.");
}
