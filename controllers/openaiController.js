const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
    const { prompt, size } = req.body;

    const imageSize =
        size === "small"
            ? "256x256"
            : size === "medium"
            ? "512x512"
            : "1024x1024";

    try {
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: imageSize,
        });

        const imageUrl = response.data.data[0].url;

        res.status(200).json({
            success: true,
            data: imageUrl,
        });
    } catch (error) {
        console.log(error);
        if (error.response) {
            console.log(error.response.status + "1");
            console.log(error.response.data + "2");
        } else {
            console.log(error.message + "3");
        }

        res.status(400).json({
            success: false,
            error: "The image could not be generated",
        });
    }
};

module.exports = { generateImage };
