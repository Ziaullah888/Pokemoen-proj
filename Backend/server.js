const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pokemonRoutes = require('./routes/pokemon')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json())

app.use('/api/pokemon', pokemonRoutes);

app.use(express.static(path.join(__dirname, "../Frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/index.html"));
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})