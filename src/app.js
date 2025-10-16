const express = require("express");
const userRoutes = require("./routes/movie.routes");

const app = express();
app.use(express.json());

app.use("/api/movie",userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor escuhando en el puerto vallarta: "+PORT);
});