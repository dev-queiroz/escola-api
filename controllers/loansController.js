const supabase = require("../models/supabase");

// Criar um empréstimo
const createLoan = async (req, res) => {
  const { user_id, book_id, due_date } = req.body;

  if (!user_id || !book_id || !due_date) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    // Verificar se o livro está disponível
    const { data: book, error: bookError } = await supabase
      .from("Books")
      .select("available")
      .eq("id", book_id)
      .single();

    if (bookError || !book)
      return res.status(404).json({ error: "Livro não encontrado." });
    if (!book.available)
      return res.status(400).json({ error: "Livro não está disponível." });

    // Registrar o empréstimo
    const { data, error } = await supabase
      .from("Loans")
      .insert([{ user_id, book_id, due_date }])
      .select();

    if (error) throw error;

    // Atualizar a disponibilidade do livro
    await supabase.from("Books").update({ available: false }).eq("id", book_id);

    res
      .status(201)
      .json({ message: "Empréstimo registrado com sucesso!", loan: data[0] });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar o empréstimo." });
  }
};

// Obter todos os empréstimos (incluindo informações do livro e do usuário)
const getLoans = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("Loans")
      .select(
        "id, due_date, returned, created_at, Users (name, email), Books (title, genre)"
      );

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar empréstimos." });
  }
};

// Obter um empréstimo por ID
const getLoanById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("Loans")
      .select(
        "id, due_date, returned, created_at, Users (name, email), Books (title, genre)"
      )
      .eq("id", id)
      .single();

    if (error || !data)
      return res.status(404).json({ error: "Empréstimo não encontrado." });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o empréstimo." });
  }
};

// Atualizar status do empréstimo (marcar como devolvido)
const returnLoan = async (req, res) => {
  const { id } = req.params;

  try {
    // Atualizar o status do empréstimo
    const { data: loan, error: loanError } = await supabase
      .from("Loans")
      .update({ returned: true })
      .eq("id", id)
      .select()
      .single();

    if (loanError || !loan)
      return res.status(404).json({ error: "Empréstimo não encontrado." });

    // Atualizar a disponibilidade do livro
    await supabase
      .from("Books")
      .update({ available: true })
      .eq("id", loan.book_id);

    res.json({ message: "Empréstimo devolvido com sucesso!", loan });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o empréstimo." });
  }
};

// Excluir um empréstimo
const deleteLoan = async (req, res) => {
  const { id } = req.params;

  try {
    const { data: loan, error: loanError } = await supabase
      .from("Loans")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (loanError || !loan)
      return res.status(404).json({ error: "Empréstimo não encontrado." });

    // Atualizar a disponibilidade do livro caso não tenha sido devolvido
    if (!loan.returned) {
      await supabase
        .from("Books")
        .update({ available: true })
        .eq("id", loan.book_id);
    }

    res.json({ message: "Empréstimo excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir o empréstimo." });
  }
};

module.exports = {
  createLoan,
  getLoans,
  getLoanById,
  returnLoan,
  deleteLoan,
};
