const { Configuration, OpenAIApi } = require("openai");

// Initialize OpenAI Configuration with API Key
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    // Replace with your own OpenAI API Key
});
const openai = new OpenAIApi(configuration);

// Function to generate image using OpenAI API
const generateImage = async (req, res) => {
    // Extract prompt and size from request body
    const { prompt, size } = req.body;

    // Determine image size based on user input
    const imageSize =
        size === "small"
            ? "256x256"
            : size === "medium"
            ? "512x512"
            : "1024x1024";

    try {
        // Call OpenAI API to generate image
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: imageSize,
        });

        // Extract image URL from response data
        const imageUrl = response.data.data[0].url;

        // Return image URL in JSON response
        res.status(200).json({
            success: true,
            data: imageUrl,
        });
    } catch (error) {
        // Return error in JSON response
        res.status(400).json({
            success: false,
            error: "The image could not be generated",
        });
    }
};

module.exports = generateImage;
