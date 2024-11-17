const supabase = require("../config/db");
const enviarEmail = require("../utils/email");

// Adicionar Nota
const adicionarNota = async (req, res) => {
  const { aluno_id, materia, nota, tipo } = req.body;

  // Verificar se o usuário é professor
  if (req.user.papel !== "professor") {
    return res.status(403).json({ error: "Permissão negada." });
  }

  // Validação
  if (!aluno_id || !materia || nota === undefined || !tipo) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const { error } = await supabase
    .from("notas")
    .insert([{ aluno_id, materia, nota, tipo }]);

  if (error) {
    return res.status(400).json({ error: "Erro ao adicionar nota." });
  } else {
    res.status(201).json({ message: "Nota adicionada com sucesso." });

    // Envio de e-mail para o pai
    const { data: aluno } = await supabase
      .from("alunos")
      .select("usuario_id")
      .eq("id", aluno_id)
      .single();

    const { data: pai } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id", aluno.usuario_id)
      .single();

    await enviarEmail(
      pai.email,
      "Nova Nota Adicionada",
      `Uma nova nota foi adicionada para o aluno ${aluno.nome}: ${nota}.`
    );
  }
};

// Listar Notas do Aluno
const listarNotas = async (req, res) => {
  const { aluno_id } = req.params;

  const { data: notas, error } = await supabase
    .from("notas")
    .select("*")
    .eq("aluno_id", aluno_id);

  if (error) {
    return res.status(400).json({ error: "Erro ao listar notas." });
  }

  res.json(notas);
};

module.exports = { adicionarNota, listarNotas };
