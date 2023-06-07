import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: process.env.ORGANIZATION_ID_GPT,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export default openai;