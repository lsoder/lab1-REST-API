const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get("/api", (req, res) => {
    res.json("Välkommen till mitt första API")
})

app.listen(port, () => {
    console.log ("App is running on port: ", port)
})