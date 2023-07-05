const Reserva = require("../models/Reserva");
const ctrl = {};

ctrl.renderIndex = (req, res) => {
  res.render("lista-reserva");
};

ctrl.renderFormNuevaReserva = (req, res) => {
  res.render("nueva-reserva");
};

ctrl.renderFormEditarReservas = (req, res) => {
  const { id } = req.params;
  res.render("editar-reserva", { id });
};

// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

// Obtener todas las reservas
ctrl.obtenerReserva = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      where: {
        estado: true,
      },
    });
    return res.json(reservas);
  } catch (error) {
    console.log("Error al obtener las reservas", error);
    return res.status(500).json({
      message: "Error al obtener las reservas",
    });
  }
};

// Crear una reserva
ctrl.crearReserva = async (req, res) => {
  const {
    nombre,
    apellido,
    fecha_reserva,
    fecha_salida,
    fecha_llegada,
    origen,
    destino,
    precio_total,
    telefono,
    email,
  } = req.body;

  try {
    // se crea una nueva instacia
    const nuevaReserva = new Reserva({
      nombre,
      codigo: new Date().getTime(),
      apellido,
      fecha_reserva,
      fecha_salida,
      fecha_llegada,
      origen,
      destino,
      precio_total,
      telefono,
      email,
    });

    // se guarda en la base de datos
    await nuevaReserva.save();

    return res.status(201).json({
      message: "Reserva creada con exito",
    });
  } catch (error) {
    console.log("Error al crear la reserva", error);
    return res.status(500).json({ message: "Error al crear la reserva" });
  }
};

// Actualizar una reserva
ctrl.actualizarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await Reserva.findByPk(id);
    await reserva.update(req.body);
    return res.json({
      message: "Reserva actualizada exitosamente",
    });
  } catch (error) {
    console.log("Error al actualizar la reserva", error);
    return res.status(error.status || 500).json({
      message: error.message,
    });
  }
};

// Eliminar una reserva de forma lógica
ctrl.eliminarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw {
        status: 400,
        message: "No se ha enviado el id de la reserva",
      };
    }
    const reserva = await Reserva.findByPk(id);
    await reserva.update({ estado: false });
    return res.json({ message: "Reserva se eliminó correctamente" });
  } catch (error) {
    console.log("Error al eliminar la reserva", error);
    return res.status(error.status || 500).json({
      message: error.message || "Error al eliminar la reserva",
    });
  }
};

module.exports = ctrl;
