const express = require('express');
const app = express();
const port = 3000;

const movies = [
    {
        "id": 1,
        "title": "Ett nytt hopp",
        "Year": 1977
    },
    {
        "id": 2,
        "title": "Rymdimperiet slår tillbaka",
        "Year": 1980
    },
    {
        "id": 3,
        "title": "Jedins återkomst",
        "Year": 1983
    }
];

app.use(express.json());

// define endpoints here
app.get("/api/movies", (req, res) => {
    res.json(movies)
});
app.get("/api/:id", (req, res) => {
    const id = req.params.id;
    const foundMovieId = movies.find((movie) => {
        return movie.id == id // om den är true, kommer den spara id:et
    })
    
    res.json(foundMovieId)
});

// add new movie to list
app.post("/api/movies", (req, res) => {
    movies.push(req.body);
    res.status(201).json(req.body);
});

app.get("/api", (req, res) => {
    res.json("Välkommen till mitt första API")
})

app.listen(port, () => {
    console.log ("App is running on port: ", port)
})