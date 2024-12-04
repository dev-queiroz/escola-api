const supabase = require("../models/supabase");

// Criar um autor
const createAuthor = async (req, res) => {
  const { name, country } = req.body;

  if (!name || !country) {
    return res.status(400).json({ error: "Nome e país são obrigatórios." });
  }

  try {
    const { data, error } = await supabase
      .from("authors")
      .insert([{ name, country }])
      .select();

    if (error) throw error;

    res
      .status(201)
      .json({ message: "Autor criado com sucesso!", author: data[0] });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar autor." });
  }
};

// Obter todos os autores
const getAuthors = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("authors")
      .select("id, name, country, created_at");

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar autores." });
  }
};

// Obter um autor por ID
const getAuthorById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("authors")
      .select("id, name, country, created_at")
      .eq("id", id)
      .single();

    if (error || !data)
      return res.status(404).json({ error: "Autor não encontrado." });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o autor." });
  }
};

// Atualizar um autor
const updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { name, country } = req.body;

  if (!name && !country) {
    return res.status(400).json({ error: "Nada para atualizar." });
  }

  try {
    const updates = { name, country };
    Object.keys(updates).forEach(
      (key) => updates[key] === undefined && delete updates[key]
    );

    const { data, error } = await supabase
      .from("authors")
      .update(updates)
      .eq("id", id)
      .select();

    if (error || !data.length)
      return res.status(404).json({ error: "Autor não encontrado." });

    res.json({ message: "Autor atualizado com sucesso!", author: data[0] });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o autor." });
  }
};

// Excluir um autor
const deleteAuthor = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("authors")
      .delete("*")
      .eq("id", id);

    if (error || !data.length)
      return res.status(404).json({ error: "Autor não encontrado." });

    res.json({ message: "Autor excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir o autor." });
  }
};

module.exports = {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
