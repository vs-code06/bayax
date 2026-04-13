import axiosInstance from "./axiosInstance";

const createUser = async ({ email, username, password }) => {
  try {
    const response = await axiosInstance.post("/user/signup", {
      email,
      username,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(`error while creating the user : ${error}`);
    return error.response?.data;
  }
};

const logInUser = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post("/user/signin", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(`error while logging in : ${error}`);
    return error.response?.data;
  }
};

const LogOutUser = async () => {
  try {
    await axiosInstance.get("/user/api/logOut");
  } catch (error) {
    console.log("logOut failed");
  }
};

export { createUser, logInUser, LogOutUser };
