const supabase = require("../config/db");

const criarEscola = async (req, res) => {
  const { nome, endereco, plano } = req.body;

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

const listarEscolas = async (req, res) => {
  const { data: escolas, error } = await supabase.from("escolas").select("*");

  if (error) {
    return res.status(400).json({ error: "Erro ao listar escolas." });
  }

  res.json(escolas);
};

const atualizarEscola = async (req, res) => {
  const { id } = req.params;
  const { nome, endereco, plano } = req.body;

  if (!nome || !endereco || !plano) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const { error } = await supabase
    .from("escolas")
    .update({ nome, endereco, plano })
    .eq("id", id);

  if (error) {
    return res.status(400).json({ error: "Erro ao atualizar escola." });
  }

  res.status(200).json({ message: "Escola atualizada com sucesso." });
};

const deletarEscola = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from("escolas").delete().eq("id", id);

  if (error) {
    return res.status(400).json({ error: "Erro ao deletar escola." });
  }

  res.status(200).json({ message: "Escola deletada com sucesso." });
};

module.exports = { criarEscola, listarEscolas, atualizarEscola, deletarEscola };
