const supabase = require("../config/supabaseClient");
const { serviceSchema } = require("../validations/serviceValidation");

exports.createService = async (req, res) => {
  try {
    const { error } = serviceSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { name, description, duration, price } = req.body;
    const { data, error: insertError } = await supabase
      .from("services")
      .insert([{ name, description, duration, price }]);

    if (insertError)
      return res.status(500).json({ message: insertError.message });

    res
      .status(201)
      .json({ message: "Service created successfully", service: data[0] });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getServices = async (req, res) => {
  try {
    const { data, error } = await supabase.from("services").select("*");
    if (error) return res.status(500).json({ message: error.message });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateService = async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = serviceSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { name, description, duration, price } = req.body;
    const { data, error: updateError } = await supabase
      .from("services")
      .update({ name, description, duration, price })
      .eq("id", id);

    if (updateError)
      return res.status(500).json({ message: updateError.message });

    res
      .status(200)
      .json({ message: "Service updated successfully", service: data[0] });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await supabase.from("services").delete().eq("id", id);

    if (error) return res.status(500).json({ message: error.message });

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
