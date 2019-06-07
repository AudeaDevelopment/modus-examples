import { createUser, confirmUser, authenticateUser } from "../../util";

export const submit = async (email, password, userName, val, code) => {
  if (code) {
    const confirmedUser = await confirmUser(code, userName, password);
    await console.log("is it confirmed in the submit?", confirmedUser);
    return confirmedUser;
  }
  if (val === 0) {
    const user = authenticateUser(userName, password);
    return user;
  }
  if (val === 1) {
    const createdUser = await createUser(email, password, userName);
    return createdUser;
  }
};
