const supabase = require("../config");

exports.createAppointment = async (req, res) => {
  try {
    const { service_id, provider_id, date, time } = req.body;

    const { data, error: insertError } = await supabase
      .from("appointments")
      .insert([{ service_id, provider_id, date, time }]);

    if (insertError) {
      return res.status(500).json({ message: insertError.message });
    }

    res.status(201).json({
      message: "Appointment created successfully",
      appointment: data[0],
    });
  } catch (err) {
    console.error("Error in createAppointment:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const { data, error } = await supabase.from("appointments").select("*");
    if (error) return res.status(500).json({ message: error.message });
    res.status(200).json(data);
  } catch (err) {
    console.error("Error in getAppointments:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { service_id, provider_id, date, time } = req.body;

  try {
    const { data, error } = await supabase
      .from("appointments")
      .update({ service_id, provider_id, date, time })
      .eq("id", id);

    if (error) return res.status(500).json({ message: error.message });
    res.status(200).json({
      message: "Appointment updated successfully",
      appointment: data[0],
    });
  } catch (err) {
    console.error("Error in updateAppointment:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", id);

    if (error) return res.status(500).json({ message: error.message });
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (err) {
    console.error("Error in deleteAppointment:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
