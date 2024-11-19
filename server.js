const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(helmet()); // Segurança adicional
app.use(cors());
app.use(express.json());

const usuarioRoutes = require("./routes/usuarioRoutes");
const escolaRoutes = require("./routes/escolaRoutes");
const notaRoutes = require("./routes/notaRoutes");

app.use("/usuarios", usuarioRoutes);
app.use("/escolas", escolaRoutes);
app.use("/notas", notaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
