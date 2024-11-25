const supabase = require("../config");

exports.createProvider = async (req, res) => {
  try {
    const { name, specialty } = req.body;

    const { data, error: insertError } = await supabase
      .from("providers")
      .insert([{ name, specialty }]);

    if (insertError) {
      return res.status(500).json({ message: insertError.message });
    }

    res
      .status(201)
      .json({ message: "Provider created successfully", provider: data[0] });
  } catch (err) {
    console.error("Error in createProvider:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProviders = async (req, res) => {
  try {
    const { data, error } = await supabase.from("providers").select("*");
    if (error) return res.status(500).json({ message: error.message });
    res.status(200).json(data);
  } catch (err) {
    console.error("Error in getProviders:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateProvider = async (req, res) => {
  const { id } = req.params;
  const { name, specialty } = req.body;

  try {
    const { data, error } = await supabase
      .from("providers")
      .update({ name, specialty })
      .eq("id", id);

    if (error) return res.status(500).json({ message: error.message });
    res
      .status(200)
      .json({ message: "Provider updated successfully", provider: data[0] });
  } catch (err) {
    console.error("Error in updateProvider:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteProvider = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("providers")
      .delete()
      .eq("id", id);

    if (error) return res.status(500).json({ message: error.message });
    res.status(200).json({ message: "Provider deleted successfully" });
  } catch (err) {
    console.error("Error in deleteProvider:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
