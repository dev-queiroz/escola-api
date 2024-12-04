require("dotenv").config();
const express = require("express");
const cors = require("cors");
const usersRoutes = require("./routes/usersRoutes");
const authorsRoutes = require("./routes/authorsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/authors", authorsRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: "Rota não encontrada." });
});

app.get("/", (req, res) => {
  res.status(201).send("Hello World!")
})

const PORT = process.env.PORT || 3000 || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
