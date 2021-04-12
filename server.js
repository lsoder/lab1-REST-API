const express = require("express");
const app = express();
const port = 3000;

const movies = [
  {
    id: 1,
    title: "Ett nytt hopp",
    episod: "IV",
    year: 1977,
  },
  {
    id: 20,
    title: "Rymdimperiet slår tillbaka",
    episod: "V",
    year: 1980,
  },
  {
    id: 30,
    title: "Jedins återkomst",
    episod: "VI",
    year: 1983,
  },
  {
    id: 40,
    title: "Det mörka hotet",
    episod: "I",
    year: 1999,
  },
];

app.use(express.static("./client"));

app.use(express.json());

// skriver ut en välkomsttext
app.get("/api", (_, res) => {
  res.json("Välkommen till mitt API med filmer!");
});

// hämtar alla filmer som är sparade på objektet movies
app.get("/api/movies", (_, res) => {
  res.json(movies);
});

// hämtar den filmen med det id:et efter /
app.get("/api/movies/:id", (req, res) => {
  const id = req.params.id;
  const foundMovieId = movies.find((movie) => {
    return movie.id == id; // om den är true, kommer den spara id:et
  });
  // om man skriver ett id som inte finns på objektet visas detta...
  if (!foundMovieId) {
    return res.status(404).json("Tyvärr, detta id finns ej");
  }

  res.json(foundMovieId);
});

// lägger till en ny film i objektet
app.post("/api/movies", (req, res) => {
  if (!req.body.title) {
    res.status(400).json({ error: "Titel är felstavat eller finns ej..." });
  } else if (!req.body.episod) {
    res.status(400).json({ error: "Episod är felstavat eller finns ej..." });
  } else if (!req.body.year) {
    res.status(400).json({ error: "År är felstavat eller finns ej..." });
  }

  const titleToSave = req.body.title;
  const episodToSave = req.body.episod;
  const yearToSave = req.body.year;

  let idToSave = 0;
  movies.forEach((movie) => {
    if (movie.id > idToSave) {
      idToSave = movie.id;
    }
  });

  idToSave++;

  // spara i en vaiabel för att kunna visa det som är tillagt
  const newMovie = {
      id: idToSave,
      title: titleToSave,
      episod: episodToSave,
      year: yearToSave
  }
  
  movies.push(newMovie)

  // visar den nya tillagda filmen
  res.status(201).json(newMovie);
});

// tar bort filmen med det specifika id:et efter /
app.delete("/api/movies/:id", (req, res) => {
  const id = req.params.id;
  const foundMovieId = movies.find((movie) => {
    return movie.id == id; // om den är true, kommer den spara id:et
  });
  
// om man skriver ett id som inte finns på objektet visas detta...
  if(!foundMovieId) {
    res.status(404).json("Det finns inget sådant id")
    return;
  }

  const index = movies.indexOf(foundMovieId);
  const removedMovie = movies.splice(index, 1);
  // visar den borttagna filmen
  res.json(removedMovie);
});

// ändrar titeln, episod och år på en film med det id:et
app.put("/api/movies/:id", (req, res) => {
  const id = req.params.id;
  const foundMovieId = movies.find((movie) => {
    return movie.id == id; // om den är true, kommer den spara id:et
  });
  // om man skriver ett id som inte finns på objektet visas detta...
  if (!foundMovieId) {
    res.status(404).json("Tyvärr, detta id finns ej");
  }

  foundMovieId.title = req.body.title;
  foundMovieId.episod = req.body.episod;
  foundMovieId.year = req.body.year;
  
  res.json({ status: "Filmen är uppdaterad" });
  //res.status(204).json("Filmen är uppdaterad!");

});

app.listen(port, () => {
  console.log("App is running on port: ", port);
});
