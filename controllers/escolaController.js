const supabase = require("../config/db");

// Criar nova escola
const criarEscola = async (req, res) => {
  const { nome, endereco, plano } = req.body;

  // Validação
  if (!nome || !endereco || !plano) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  if (req.user.papel !== "diretor" && req.user.papel !== "coordenador") {
    return res.status(403).json({
      error: "Apenas diretores ou coordenadores podem criar escolas.",
    });
  }

  const { error } = await supabase
    .from("escolas")
    .insert([{ nome, endereco, plano }]);

  if (error) {
    return res.status(400).json({ error: "Erro ao criar escola." });
  }

  res.status(201).json({ message: "Escola criada com sucesso." });
};

// Listar escolas
const listarEscolas = async (req, res) => {
  const { data: escolas, error } = await supabase.from("escolas").select("*");

  if (error) {
    return res.status(400).json({ error: "Erro ao listar escolas." });
  }

  res.json(escolas);
};

module.exports = { criarEscola, listarEscolas };
