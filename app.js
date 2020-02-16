var express = require("express");
var path = require("path");
var fs = require("fs");
var data = fs.readFileSync("./db/db.json", "utf8");
var jsonDB = JSON.parse(data);

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    return res.json(jsonDB);
});

app.post("/api/notes", function(req, res) {
    var newNote = req.body;

    newNote.id = newNote.title.replace(/\s+/g, "").toLowerCase();

    jsonDB.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(jsonDB), function(err) {
        if (err) {
            return err;
        };
    })

    res.json(jsonDB);
});

app.delete('api/notes/:note', function(req, res) {

    for (let i = 0; i <= jsonDB.length; i++) {
        if (jsonDb[i].id === req.params.note.id) {
            jsonDB = jsonDB.splice(i);
        }
    };
    console.log(jsonDB);
    fs.writeFileSync('./db/db.json', JSON.stringify(jsonDB), function(err) {
        if (err) {
            return err;
        };
    })

    res.json(jsonDB);
})

app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
});