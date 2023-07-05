// TODO: Importar el modelo y controladores de reservas, luego vincular rutas con controladores
const { Router } = require("express");
const router = Router();

// importar controllers
const {
  renderIndex,
  renderFormNuevaReserva,
  renderFormEditarReservas,
  obtenerReserva,
  crearReserva,
  actualizarReserva,
  eliminarReserva,
} = require("../controllers/reserva.controllers");

// ==========================================
//         Rutas para renderizar vistas
// ==========================================

// Obtener todas las reservas
router.get("/", renderIndex);

// Formulario para crear una reserva
router.get("/crear-reserva", renderFormNuevaReserva);

// Formulario para actualizar una reserva
router.get("/actualizar-reserva/:id", renderFormEditarReservas);

// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

// Obtener todas las reservas
router.get("/api", obtenerReserva);

// Crear una reserva
router.post("/api", crearReserva);

// Actualizar una reserva
router.put("/api/:id", actualizarReserva);

// Eliminar una reserva de forma lógica
router.delete("/api/:id", eliminarReserva);

module.exports = router;
