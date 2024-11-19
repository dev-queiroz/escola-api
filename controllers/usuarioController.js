const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const supabase = require("../config/db");

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios." });
  }

  const { data: usuario, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("email", email)
    .single();

  if (!usuario || error) {
    return res.status(400).json({ error: "Usuário não encontrado." });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    return res.status(401).json({ error: "Senha incorreta." });
  }

  const token = jwt.sign(
    { id: usuario.id, papel: usuario.papel },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.json({ token });
};

const registrarUsuario = async (req, res) => {
  const { nome, email, senha, papel } = req.body;

  if (!nome || !email || !senha || !papel) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const { data: usuarioExistente } = await supabase
    .from("usuarios")
    .select("*")
    .eq("email", email)
    .single();
  if (usuarioExistente) {
    return res.status(400).json({ error: "Email já cadastrado." });
  }

  const hashedPassword = await bcrypt.hash(senha, 10);

  const { error } = await supabase
    .from("usuarios")
    .insert([{ nome, email, senha: hashedPassword, papel }]);
  if (error) {
    return res.status(400).json({ error: "Erro ao criar usuário." });
  }
  res.status(201).json({ message: "Usuário criado com sucesso." });
};

const atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, papel } = req.body;

  if (!nome || !email || !senha || !papel) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const hashedPassword = await bcrypt.hash(senha, 10);

  const { error } = await supabase
    .from("usuarios")
    .update({ nome, email, senha: hashedPassword, papel })
    .eq("id", id);

  if (error) {
    return res.status(400).json({ error: "Erro ao atualizar usuário." });
  }

  res.status(200).json({ message: "Usuário atualizado com sucesso." });
};

const deletarUsuario = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from("usuarios").delete().eq("id", id);

  if (error) {
    return res.status(400).json({ error: "Erro ao deletar usuário." });
  }

  res.status(200).json({ message: "Usuário deletado com sucesso." });
};

module.exports = {
  loginUsuario,
  registrarUsuario,
  atualizarUsuario,
  deletarUsuario,
};
