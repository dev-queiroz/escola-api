const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const supabase = require("../config/db");

// Função de login
const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  // Validação
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

  // Verificar se a senha é válida
  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    return res.status(401).json({ error: "Senha incorreta." });
  }

  // Gerar token JWT
  const token = jwt.sign(
    { id: usuario.id, papel: usuario.papel },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.json({ token });
};

// Função de registrar novo usuário
const registrarUsuario = async (req, res) => {
  const { nome, email, senha, papel } = req.body;
  // Validação
  if (!nome || !email || !senha || !papel) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }
  // Verificar se o email já está em uso
  const { data: usuarioExistente } = await supabase
    .from("usuarios")
    .select("*")
    .eq("email", email)
    .single();
  if (usuarioExistente) {
    return res.status(400).json({ error: "Email já cadastrado." });
  }
  // Hash da senha
  const hashedPassword = await bcrypt.hash(senha, 10);
  // Criar o usuário no banco
  const { error } = await supabase
    .from("usuarios")
    .insert([{ nome, email, senha: hashedPassword, papel }]);
  if (error) {
    return res.status(400).json({ error: "Erro ao criar usuário." });
  }
  res.status(201).json({ message: "Usuário criado com sucesso." });
};

module.exports = { loginUsuario, registrarUsuario };
