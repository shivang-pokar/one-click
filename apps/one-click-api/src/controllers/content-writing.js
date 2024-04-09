import openai from './chat-gpt';


export const writingContent = async (req, res, next) => {
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: req.body.content.messages,
            user: req.body.UID
        });
        res.send(completion.data);
    }
    catch (e) {
        console.log(e);
        next(e);
    }
}