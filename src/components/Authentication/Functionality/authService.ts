import { CognitoIdentityProviderClient, InitiateAuthCommand, SignUpCommand, ConfirmSignUpCommand, ForgotPasswordCommand, ConfirmForgotPasswordCommand, InitiateAuthCommandInput  } from "@aws-sdk/client-cognito-identity-provider";
import config from "./config.json";

export const cognitoClient = new CognitoIdentityProviderClient({
  region: config.region,
});

export const signIn = async (username: string, password: string) => {
  const params: InitiateAuthCommandInput = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: config.clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };
  try {
    const command = new InitiateAuthCommand(params);
    const { AuthenticationResult } = await cognitoClient.send(command);
    if (AuthenticationResult) {
      sessionStorage.setItem("idToken", AuthenticationResult.IdToken || '');
      sessionStorage.setItem("accessToken", AuthenticationResult.AccessToken || '');
      sessionStorage.setItem("refreshToken", AuthenticationResult.RefreshToken || '');
      return AuthenticationResult;
    }
  } catch (error) {
    console.error("Error signing in: ", error);
    throw error;
  }
};

export const signUp = async (email: string, password: string) => {
  const params = {
    ClientId: config.clientId,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };
  try {
    const command = new SignUpCommand(params);
    const response = await cognitoClient.send(command);
    // console.log("Sign up success: ", response);
    return response;
  } catch (error) {
    // console.error("Error signing up: ", error);
    throw error;
  }
};

export const confirmSignUp = async (username: string, code: string) => {
  const params = {
    ClientId: config.clientId,
    Username: username,
    ConfirmationCode: code,
  };
  try {
    const command = new ConfirmSignUpCommand(params);
    await cognitoClient.send(command);
    // console.log("User confirmed successfully");
    return true;
  } catch (error) {
    // console.error("Error confirming sign up: ", error);
    throw error;
  }
};

export const forgotPasswordRequest = async (username: string) => {

  const command = new ForgotPasswordCommand({
    ClientId: config.clientId,
    Username: username,
  });

  try {
    const response = await cognitoClient.send(command);
    console.log("Forgot Password response:", response);
  } catch (error) {
    console.error("Error initiating forgot password process:", error);
  }
};

export const confirmForgotPassword = async (username: string, verificationCode: string, newPassword: string) => {
  const command = new ConfirmForgotPasswordCommand({
    ClientId: config.clientId,
    Username: username,
    ConfirmationCode: verificationCode,
    Password: newPassword,
  });

  try {
    const response = await cognitoClient.send(command);
    console.log("Confirm Forgot Password response:", response);
  } catch (error) {
    console.error("Error confirming forgot password:", error);
  }
};
