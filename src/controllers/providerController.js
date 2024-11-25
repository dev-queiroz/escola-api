const supabase = require("../config/supabaseClient");
const { providerSchema } = require("../validations/providerValidation");

exports.createProvider = async (req, res) => {
  try {
    const { error } = providerSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { name, email, phone } = req.body;
    const { data, error: insertError } = await supabase
      .from("providers")
      .insert([{ name, email, phone }]);

    if (insertError)
      return res.status(500).json({ message: insertError.message });

    res
      .status(201)
      .json({ message: "Provider created successfully", provider: data[0] });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProviders = async (req, res) => {
  try {
    const { data, error } = await supabase.from("providers").select("*");
    if (error) return res.status(500).json({ message: error.message });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateProvider = async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = providerSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { name, email, phone } = req.body;
    const { data, error: updateError } = await supabase
      .from("providers")
      .update({ name, email, phone })
      .eq("id", id);

    if (updateError)
      return res.status(500).json({ message: updateError.message });

    res
      .status(200)
      .json({ message: "Provider updated successfully", provider: data[0] });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteProvider = async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await supabase.from("providers").delete().eq("id", id);

    if (error) return res.status(500).json({ message: error.message });

    res.status(200).json({ message: "Provider deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
