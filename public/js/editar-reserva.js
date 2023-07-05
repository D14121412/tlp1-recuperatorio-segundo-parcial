const formReserva = document.querySelector("#formNuevaReserva");
const reservaId = formReserva.dataset.id;

const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const fecha_reserva = document.querySelector("#fecha_reserva");
const fecha_salida = document.querySelector("#fecha_salida");
const fecha_llegada = document.querySelector("#fecha_llegada");
const origen = document.querySelector("#origen");
const destino = document.querySelector("#destino");
const precio_total = document.querySelector("#precio_total");
const telefono = document.querySelector("#telefono");
const email = document.querySelector("#email");

document.addEventListener("DOMContentLoaded", async () => {
  // Traemos la reserva que se va a editar
  const response = await fetch(`/api/${reservaId}`);
  const data = await response.json();

  // Mostrar en el formulario los datos de la reserva que se quiere actualizar
  nombre.value = data.nombre;
  apellido.value = data.apellido;
  fecha_reserva.value = data.fecha_reserva;
  fecha_reserva.value = dayjs(data.fecha_ingreso).format("DD-MM-YYYY HH:mm");
  fecha_salida.value = dayjs(data.fecha_salida).format("DD-MM-YYYY HH:mm");
  fecha_llegada.value = dayjs(data.fecha_llegada).format("DD-MM-YYYY HH:mm");
  origen.value = data.origen;
  destino.value = data.destino;
  precio_total.value = data.precio_total;
  telefono.value = data.telefono;
  email.value = data.email;
});

formReserva.addEventListener("submit", async (e) => {
  e.preventDefault();

  reservaActualizada = {
    nombre: nombre.value,
    apellido: apellido.value,
    fecha_reserva: fecha_reserva.value,
    fecha_salida: fecha_salida.value,
    fecha_llegada: fecha_llegada.value,
    origen: origen.value,
    destino: destino.value,
    precio_total: precio_total.value,
    telefono: telefono.value,
    email: email.value,
  };

  // Se envían los nuevos datos al servidor express
  const response = await fetch(`/api/${reservaId}`, {
    method: "PUT",
    body: JSON.stringify(reservaActualizada),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const respToJson = await response.json();

  if (response.status !== 200) {
    return Swal.fire({
      title: "Error",
      text: respToJson.message,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }

  // Mostrar mensajes al usuario
  Swal.fire({
    title: "Reserva actualizada",
    text: respToJson.message,
    icon: "success",
    confirmButtonText: "Aceptar",
  });

  setTimeout(() => {
    // Redireccionar al usuario
    window.location.href = "/";
  }, 2000);
});
