require('dotenv').config()
const express = require("express");
const verifyApiKey = require('./middlewares/apikey')
const userRoutes = require("./routes/movie.routes");

const app = express();
app.use(express.json());

app.use("/api/movie", verifyApiKey, userRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Recurso no encontrado' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor escuhando en el puerto vallarta: " + PORT);
});