const express = require('express');
const app = express();
const port = 3000;

const movies = [
    {
        "id": 1,
        "title": "Ett nytt hopp",
        "episod": "IV",
        "Year": 1977
    },
    {
        "id": 2,
        "title": "Rymdimperiet slår tillbaka",
        "episod": "V",
        "Year": 1980
    },
    {
        "id": 3,
        "title": "Jedins återkomst",
        "episod": "VI",
        "Year": 1983
    }
];

app.use(express.json());

// skriver ut en välkomsttext
app.get("/api", (req, res) => {
    res.json("Välkommen till mitt API med filmer!")
})

// hämtar alla filmer som är sparade på objektet movies
app.get("/api/movies", (req, res) => {
    res.json(movies)
});

// hämtar den filmen med det id:et efter /
app.get("/api/:id", (req, res) => {
    const id = req.params.id;
    const foundMovieId = movies.find((movie) => {
        return movie.id == id // om den är true, kommer den spara id:et
    })
    // om man skriver ett id som inte finns på objektet visas detta...
    if(!foundMovieId) {
        res.json({ "error": "Tyvärr, detta id finns ej" })
    }
    
    res.json(foundMovieId)
});

// lägger till en ny film i objektet
/* app.post("/api/movies", (req, res) => {
    movies.push(req.body);
    res.status(201).json(req.body);
}); */

// lägger till en ny film i objektet
app.post("/api", (req, res) => {
    
    if (!req.body.title) {
        res.json({ "error": "Titel är felstavat eller finns ej..." })
    } else if (!req.body.episod) {
        res.json({ "error": "Episod är felstavat eller finns ej..." })
    } else if (!req.body.year) {
        res.json({ "error": "År är felstavat eller finns ej..." })
    }
    
    const titleToSave = req.body.title
    const episodToSave = req.body.episod
    const yearToSave = req.body.year

    let idToSave = 0;
    movies.forEach((movie) => {
        if (movie.id > idToSave) {
            idToSave = movie.id
        }
    })

    idToSave++;

    movies.push({
        id: idToSave,
        title: titleToSave,
        episod: episodToSave,
        year: yearToSave
    })

    res.json({
        status: "Ny film är tillagd!"
    });
});

// tar bort en film med den titeln
/* app.delete("/api/movies", (req, res) => {
    const index = movies.findIndex(p => p.title == "Ett nytt hopp");
    const deletedMovies = movies.splice(index, 1);
    res.json(deletedMovies);
}) */

// tar bort filmen med det specifika id:et efter /
app.delete("/api/:id", (req, res) => {
    const id = req.params.id;
    const foundMovieId = movies.find((movie) => {
        return movie.id == id // om den är true, kommer den spara id:et
    })
    // om man skriver ett id som inte finns på objektet visas detta...
    if(!foundMovieId) {
        res.json({ "error": "Tyvärr, detta id finns ej" })
    }
    
    const index = movies.indexOf(foundMovieId);
    movies.splice(index, 1)
    res.json({ "status": "Filmen med det id:et är borttaget" })
    
});

// ändrar titeln på en film med det id:et
app.put("/api/:id", (req, res) => {
    const id = req.params.id;
    const foundMovieId = movies.find((movie) => {
        return movie.id == id // om den är true, kommer den spara id:et
    })
    // om man skriver ett id som inte finns på objektet visas detta...
    if(!foundMovieId) {
        res.json({ "error": "Tyvärr, detta id finns ej" })
    }

    foundMovieId.title = req.body.title;
    res.json({ "status": "Titel är ändrad!" });
});

app.listen(port, () => {
    console.log ("App is running on port: ", port)
})