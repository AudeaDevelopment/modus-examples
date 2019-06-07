import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser
} from "amazon-cognito-identity-js";

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

const poolData = {};

const userPool = new CognitoUserPool(poolData);

export const authenticateUser = async (Username, Password) => {
  const authenticationData = { Username, Password };
  const userData = { Username, Pool: userPool };
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  );
  return new Promise(resolve =>
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess(result) {
        console.log("success authenticating", result);
        const accessToken = result.getAccessToken().getJwtToken();
        const idToken = result.idToken.jwtToken;
        chrome.storage.sync.set({ accessToken, idToken, authenticated: true });
        resolve(result);
      },

      onFailure(err) {
        console.log(err);
        return resolve({ err: err.message });
      }
    })
  );
};

export const getCurrentUser = async () => {
  const pool = new AmazonCognitoIdentity.CognitoUserPool(userPool);
  const cognitoUser = pool.getCurrentUser();

  if (cognitoUser != null) {
    cognitoUser.getSession((err, session) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`session validity: ${session.isValid()}`);
    });
  }
};

export const createUser = (email, password, userName) => {
  console.log("hit create user", email, password, userName);
  chrome.storage.sync.set({ email, userName, password });
  chrome.storage.sync.get(data => console.log("IS IT STORED", data));
  const dataEmail = {
    Name: "email",
    Value: email
  };

  const attributeList = [new CognitoUserAttribute(dataEmail)];

  return new Promise(resolve =>
    userPool.signUp(userName, password, attributeList, null, (err, res) =>
      err ? resolve({ error: true, message: err.message }) : resolve(res)
    )
  );
};

export const confirmUser = (code, userName, password) => {
  console.log("CONFIRM CODE", code, userName, password);

  const userData = { Username: userName, Pool: userPool };
  const cognitoUser = new CognitoUser(userData);

  return new Promise(resolve =>
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        console.log("hit err in confirmUser", err);
        return resolve({ error: true, message: err.message });
      }
      chrome.storage.sync.set({ confirmed: result });
      console.log("successfully confirmed", result);
      return resolve(authenticateUser(userName, password));
    })
  );
};
