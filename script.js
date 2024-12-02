function submitText() {
    const inputText = document.getElementById('textInput').value;
    const outputBox = document.getElementById('outputBox');

    if (!inputText) {
        outputBox.textContent = 'Please enter some text!';
        return;
    }

    // API request setup
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ text: inputText });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://localhost:3000/proxy", requestOptions) // Use your proxy endpoint
        .then(response => response.json()) // Parse response as JSON
        .then(result => {
            // Format the predictions array into a readable string
            const predictionsString = result.predictions
                ? result.predictions.map((val, index) => `Class ${index + 1}: ${val.toFixed(6)}`).join("<br>")
                : 'N/A';

            // Format the output
            const formattedOutput = `
                <strong>Toxicity Score:</strong> ${result.toxicity_score ? result.toxicity_score.toFixed(6) : 'N/A'}<br>
                <strong>Predictions:</strong><br>${predictionsString}<br>
                <strong>Topic:</strong> ${result.topic || 'N/A'}<br>
                <strong>Sentiment:</strong> ${result.sentiment || 'N/A'}
            `;
            outputBox.innerHTML = formattedOutput;
        })
        .catch(error => {
            console.error(error);
            outputBox.textContent = 'An error occurred while fetching the response.';
        });
}
