import axiosInstance from "./axiosInstance";

const analyzeIdea = async ({ field, intent, content, techStack, username }) => {
    try {
        const response = await axiosInstance.post("/idea/analyze", {
            field,
            intent,
            content,
            techStack,
            username
        });
        return response;
    } catch (error) {
        console.error(`Error analyzing idea: ${error}`);
        return error.response;
    }
};

export { analyzeIdea };

