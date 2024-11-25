const supabase = require("../config");

exports.createService = async (req, res) => {
  try {
    const { name, description, duration, price } = req.body;

    const { data, error: insertError } = await supabase
      .from("services")
      .insert([{ name, description, duration, price }]);

    if (insertError) {
      return res.status(500).json({ message: insertError.message });
    }

    res
      .status(201)
      .json({ message: "Service created successfully", service: data[0] });
  } catch (err) {
    console.error("Error in createService:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getServices = async (req, res) => {
  try {
    const { data, error } = await supabase.from("services").select("*");
    if (error) return res.status(500).json({ message: error.message });
    res.status(200).json(data);
  } catch (err) {
    console.error("Error in getServices:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateService = async (req, res) => {
  const { id } = req.params;
  const { name, description, duration, price } = req.body;

  try {
    const { data, error } = await supabase
      .from("services")
      .update({ name, description, duration, price })
      .eq("id", id);

    if (error) return res.status(500).json({ message: error.message });
    res
      .status(200)
      .json({ message: "Service updated successfully", service: data[0] });
  } catch (err) {
    console.error("Error in updateService:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("services")
      .delete()
      .eq("id", id);

    if (error) return res.status(500).json({ message: error.message });
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (err) {
    console.error("Error in deleteService:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
