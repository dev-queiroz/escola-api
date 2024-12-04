const supabase = require("../models/supabase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Registrar usuário
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, password: hashedPassword }])
      .select();

    if (error) throw error;

    res
      .status(201)
      .json({ message: "Usuário registrado com sucesso!", user: data[0] });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar usuário." });
  }
};

// Login de usuário
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios." });
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data)
      return res.status(401).json({ error: "Credenciais inválidas." });

    const isPasswordValid = await bcrypt.compare(password, data.password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Credenciais inválidas." });

    const token = jwt.sign(
      { id: data.id, email: data.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login bem-sucedido!", token });
  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar login." });
  }
};

// Obter todos os usuários
const getUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, created_at");

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários." });
  }
};

// Obter um único usuário
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, created_at")
      .eq("id", id)
      .single();

    if (error || !data)
      return res.status(404).json({ error: "Usuário não encontrado." });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o usuário." });
  }
};

// Atualizar usuário
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  if (!name && !email && !password) {
    return res.status(400).json({ error: "Nada para atualizar." });
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .update({ name, email, password })
      .eq("id", id)
      .select();

    if (error || !data.length)
      return res.status(404).json({ error: "Usuário não encontrado." });

    res.json({ message: "Usuário atualizado com sucesso!", user: data[0] });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o usuário." });
  }
};

// Excluir usuário
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("users")
      .delete("*")
      .eq("id", id);

    if (error || !data.length)
      return res.status(404).json({ error: "Usuário não encontrado." });

    res.json({ message: "Usuário excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir o usuário." });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
