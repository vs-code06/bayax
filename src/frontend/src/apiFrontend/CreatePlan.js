import axiosInstance from "./axiosInstance";

const genereatePlan = async ({ subject, topic, grade, duration }) => {
  try {
    const username = localStorage.getItem("username");
    // console.log(username);

    const response = await axiosInstance.post(
      "/lesson/createPlan",
      {
        subject,
        topic,
        grade,
        duration,
        username,
      }
    );

    return response;
  } catch (error) {
    console.log(`error while creating the user : ${error}`);
    return error.response;
  }
};

export { genereatePlan };
