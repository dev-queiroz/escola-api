const supabase = require("../config/supabaseClient");
const { appointmentSchema } = require("../validations/appointmentValidation");

exports.createAppointment = async (req, res) => {
  try {
    const { error } = appointmentSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const {
      service_id,
      provider_id,
      appointment_time,
      customer_name,
      customer_email,
    } = req.body;
    const { data, error: insertError } = await supabase
      .from("appointments")
      .insert([
        {
          service_id,
          provider_id,
          appointment_time,
          customer_name,
          customer_email,
        },
      ]);

    if (insertError)
      return res.status(500).json({ message: insertError.message });

    res
      .status(201)
      .json({
        message: "Appointment created successfully",
        appointment: data[0],
      });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const { data, error } = await supabase.from("appointments").select("*");
    if (error) return res.status(500).json({ message: error.message });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = appointmentSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const {
      service_id,
      provider_id,
      appointment_time,
      customer_name,
      customer_email,
    } = req.body;
    const { data, error: updateError } = await supabase
      .from("appointments")
      .update({
        service_id,
        provider_id,
        appointment_time,
        customer_name,
        customer_email,
      })
      .eq("id", id);

    if (updateError)
      return res.status(500).json({ message: updateError.message });

    res
      .status(200)
      .json({
        message: "Appointment updated successfully",
        appointment: data[0],
      });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await supabase.from("appointments").delete().eq("id", id);

    if (error) return res.status(500).json({ message: error.message });

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
