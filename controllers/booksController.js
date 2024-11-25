const supabase = require("../models/supabase");

// Criar um livro
const createBook = async (req, res) => {
  const { title, author_id, genre } = req.body;

  if (!title || !author_id || !genre) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    const { data, error } = await supabase
      .from("books")
      .insert([{ title, author_id, genre }])
      .select();

    if (error) throw error;

    res
      .status(201)
      .json({ message: "Livro criado com sucesso!", book: data[0] });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar livro." });
  }
};

// Obter todos os livros (com informações do autor)
const getBooks = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("books")
      .select(
        "id, title, genre, available, created_at, authors (name, country)"
      );

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar livros." });
  }
};

// Obter um livro por ID (com informações do autor)
const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("books")
      .select(
        "id, title, genre, available, created_at, authors (name, country)"
      )
      .eq("id", id)
      .single();

    if (error || !data)
      return res.status(404).json({ error: "Livro não encontrado." });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o livro." });
  }
};

// Atualizar um livro
const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, genre, available } = req.body;

  if (!title && !genre && available === undefined) {
    return res.status(400).json({ error: "Nada para atualizar." });
  }

  try {
    const updates = { title, genre, available };
    Object.keys(updates).forEach(
      (key) => updates[key] === undefined && delete updates[key]
    );

    const { data, error } = await supabase
      .from("books")
      .update(updates)
      .eq("id", id)
      .select();

    if (error || !data.length)
      return res.status(404).json({ error: "Livro não encontrado." });

    res.json({ message: "Livro atualizado com sucesso!", book: data[0] });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o livro." });
  }
};

// Excluir um livro
const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase.from("books").delete().eq("id", id);

    if (error || !data.length)
      return res.status(404).json({ error: "Livro não encontrado." });

    res.json({ message: "Livro excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir o livro." });
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};
