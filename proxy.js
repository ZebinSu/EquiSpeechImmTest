const express = require("express");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specific methods
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow specific headers
    next();
});

// Serve static files from the current directory (e.g., index.html, styles.css)
app.use(express.static(__dirname));

// Route to serve the main HTML file (index.html)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html")); // Ensure index.html is in the same directory as this file
});

app.post("/proxy", async (req, res) => {
    const fetch = (await import("node-fetch")).default;

    try {
        const response = await fetch("https://fastapi-app-280288253402.us-central1.run.app/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body),
        });
        const data = await response.text();


    
        res.send(data);
    } catch (error) {
        console.error("Error in proxy:", error);
        res.status(500).send("Proxy server error");
    }
});

app.listen(3000, () => {
    console.log("Proxy server running at http://localhost:3000");
});
