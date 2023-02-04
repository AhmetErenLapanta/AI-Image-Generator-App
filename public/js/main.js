// Event handler for form submit
const onSubmit = (e) => {
    // Prevent default form submission
    e.preventDefault();

    // Reset previous image and message
    document.querySelector(".msg").textContent = "";
    document.querySelector("#image").src = "";

    // Get user inputs
    const prompt = document.querySelector("#prompt").value;
    const size = document.querySelector("#size").value;

    // Check if text input is empty
    if (prompt === "") {
        alert("Text is required");
        return;
    }

    // Call image generation function
    generateImageRequest(prompt, size);
};

const generateImageRequest = async (prompt, size) => {
    try {
        showSpinner();

        const response = await fetch("/openai/generateimage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt,
                size,
            }),
        });

        // checking if request is appropriate
        if (!response.ok) {
            removeSpinner();
            throw new Error("That image is not allowed to generate");
        }

        // jsonify
        const data = await response.json();

        // getting url from response
        const imageUrl = data.data;

        // giving source URL to the image
        document.querySelector("#image").src = imageUrl;

        removeSpinner();
    } catch (error) {
        document.querySelector(".msg").textContent = error;
    }
};

const showSpinner = () =>
    document.querySelector(".spinner").classList.add("show");

const removeSpinner = () =>
    document.querySelector(".spinner").classList.remove("show");

document.querySelector("#image-form").addEventListener("submit", onSubmit);
