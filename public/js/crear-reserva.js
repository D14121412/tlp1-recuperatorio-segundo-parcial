const formCrearReserva = document.querySelector("#formNuevaReserva");

formCrearReserva.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.querySelector("#nombre").value;
  const apellido = document.querySelector("#apellido").value;
  const fecha_reserva = document.querySelector("#fecha_reserva").value;
  const fecha_salida = document.querySelector("#fecha_salida").value;
  const fecha_llegada = document.querySelector("#fecha_llegada").value;
  const origen = document.querySelector("#origen").value;
  const destino = document.querySelector("#destino").value;
  const precio_total = document.querySelector("#precio_total").value;
  const telefono = document.querySelector("#telefono").value;
  const email = document.querySelector("#email").value;

  const reserva = {
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
  };
  const response = await fetch("http://localhost:4000/api", {
    method: "POST",
    body: JSON.stringify(reserva),
    headers: {
      "Content-Type": "application/json", // Cuando se envían datos JSON al servidor
    },
  });

  if (response.status !== 201) {
    return Swal.fire({
      title: "Error",
      text: "Hubo un error al crear la reserva",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }

  const data = await response.json();

  Swal.fire({
    title: "Reserva creada",
    text: data.message,
    icon: "success",
    confirmButtonText: "Aceptar",
  });

  setTimeout(() => {
    window.location.href = "/";
  }, 2000);
});
