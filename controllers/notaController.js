const supabase = require("../config/db");
const enviarEmail = require("../utils/email");

const adicionarNota = async (req, res) => {
  const { aluno_id, materia, nota, tipo } = req.body;

  if (req.user.papel !== "professor") {
    return res.status(403).json({ error: "Permissão negada." });
  }

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

    const { data: aluno } = await supabase
      .from("alunos")
      .select("email_pai")
      .eq("id", aluno_id)
      .single();

    await enviarEmail(
      aluno.email_pai,
      "Nova Nota Adicionada",
      `Uma nova nota foi adicionada para o aluno ${aluno_id}: ${nota}.`
    );
  }
};

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

const atualizarNota = async (req, res) => {
  const { id } = req.params;
  const { materia, nota, tipo } = req.body;

  if (!materia || nota === undefined || !tipo) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const { error } = await supabase
    .from("notas")
    .update({ materia, nota, tipo })
    .eq("id", id);

  if (error) {
    return res.status(400).json({ error: "Erro ao atualizar nota." });
  }

  res.status(200).json({ message: "Nota atualizada com sucesso." });
};

const deletarNota = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from("notas").delete().eq("id", id);

  if (error) {
    return res.status(400).json({ error: "Erro ao deletar nota." });
  }

  res.status(200).json({ message: "Nota deletada com sucesso." });
};

module.exports = { adicionarNota, listarNotas, atualizarNota, deletarNota };
