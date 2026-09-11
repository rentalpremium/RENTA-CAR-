/* ==================================================
   RENTAL PREMIUM
   SCRIPT PRINCIPAL
================================================== */


/* ==================================================
   MENÚ HAMBURGUESA
================================================== */

function toggleMenu() {

    const menu = document.getElementById("menu");
    const boton = document.querySelector(".menu-toggle");

    if (!menu) {
        console.error("No se encontró el menú.");
        return;
    }

    menu.classList.toggle("activo");

    const abierto = menu.classList.contains("activo");

    if (boton) {

        boton.setAttribute(
            "aria-expanded",
            abierto ? "true" : "false"
        );

        boton.textContent = abierto ? "✕" : "☰";
    }
}


/* ==================================================
   INICIO
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const menu = document.getElementById("menu");
    const boton = document.querySelector(".menu-toggle");

    if (menu) {

        const enlaces = menu.querySelectorAll("a");

        enlaces.forEach(function (enlace) {

            enlace.addEventListener("click", function () {

                menu.classList.remove("activo");

                if (boton) {

                    boton.textContent = "☰";

                    boton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            });

        });

    }


    /* ==================================================
       FECHAS
    ================================================== */

    const fechaInicio =
        document.getElementById("fechaInicio");

    const fechaDevolucion =
        document.getElementById("fechaDevolucion");


    const hoy = new Date();

    const año = hoy.getFullYear();

    const mes =
        String(hoy.getMonth() + 1).padStart(2, "0");

    const dia =
        String(hoy.getDate()).padStart(2, "0");


    const fechaActual =
        `${año}-${mes}-${dia}`;


    if (fechaInicio) {

        fechaInicio.min = fechaActual;

    }


    if (fechaDevolucion) {

        fechaDevolucion.min = fechaActual;

    }


    /* ==================================================
       FECHA DE DEVOLUCIÓN
    ================================================== */

    if (fechaInicio && fechaDevolucion) {

        fechaInicio.addEventListener(
            "change",
            function () {

                fechaDevolucion.min =
                    fechaInicio.value;


                if (
                    fechaDevolucion.value &&
                    fechaDevolucion.value <
                    fechaInicio.value
                ) {

                    fechaDevolucion.value = "";

                }

            }
        );

    }

});


/* ==================================================
   RESERVA POR WHATSAPP
================================================== */

function enviarWhatsApp() {

    try {

        const nombre =
            document.getElementById("nombre");

        const telefono =
            document.getElementById("telefono");

        const vehiculo =
            document.getElementById("vehiculo");

        const fechaInicio =
            document.getElementById("fechaInicio");

        const fechaDevolucion =
            document.getElementById("fechaDevolucion");


        if (
            !nombre ||
            !telefono ||
            !vehiculo ||
            !fechaInicio ||
            !fechaDevolucion
        ) {

            alert(
                "No se pudo cargar correctamente el formulario."
            );

            return;

        }


        const nombreValor =
            nombre.value.trim();

        const telefonoValor =
            telefono.value.trim();

        const vehiculoValor =
            vehiculo.value;

        const inicioValor =
            fechaInicio.value;

        const devolucionValor =
            fechaDevolucion.value;


        /* =========================
           VALIDACIONES
        ========================= */

        if (nombreValor === "") {

            alert(
                "Por favor, ingresa tu nombre."
            );

            nombre.focus();

            return;
        }


        if (telefonoValor === "") {

            alert(
                "Por favor, ingresa tu número de teléfono."
            );

            telefono.focus();

            return;
        }


        if (vehiculoValor === "") {

            alert(
                "Por favor, selecciona un vehículo."
            );

            vehiculo.focus();

            return;
        }


        if (inicioValor === "") {

            alert(
                "Por favor, selecciona la fecha de inicio."
            );

            fechaInicio.focus();

            return;
        }


        if (devolucionValor === "") {

            alert(
                "Por favor, selecciona la fecha de devolución."
            );

            fechaDevolucion.focus();

            return;
        }


        /* =========================
           FECHAS
        ========================= */

        const fecha1 =
            new Date(inicioValor + "T00:00:00");

        const fecha2 =
            new Date(devolucionValor + "T00:00:00");


        if (
            isNaN(fecha1.getTime()) ||
            isNaN(fecha2.getTime())
        ) {

            alert(
                "Las fechas ingresadas no son válidas."
            );

            return;
        }


        if (fecha2 < fecha1) {

            alert(
                "La fecha de devolución no puede ser anterior a la fecha de inicio."
            );

            fechaDevolucion.focus();

            return;
        }


        /* =========================
           FORMATEAR FECHAS
        ========================= */

        const fechaInicioTexto =
            formatearFecha(fecha1);

        const fechaDevolucionTexto =
            formatearFecha(fecha2);


        /* =========================
           MENSAJE
        ========================= */

        const mensaje =
`Hola, RENTAL PREMIUM.

Quiero realizar una reserva de vehículo.

👤 Nombre: ${nombreValor}
📱 Teléfono: ${telefonoValor}
🚗 Vehículo: ${vehiculoValor}
📅 Fecha de inicio: ${fechaInicioTexto}
📅 Fecha de devolución: ${fechaDevolucionTexto}

Quisiera consultar la disponibilidad y realizar la reserva.`;


        /* =========================
           WHATSAPP
        ========================= */

        const numeroWhatsApp =
            "59172677730";


        const url =
            "https://wa.me/" +
            numeroWhatsApp +
            "?text=" +
            encodeURIComponent(mensaje);


        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );


    } catch (error) {

        console.error(
            "Error al enviar la reserva:",
            error
        );

        alert(
            "Ocurrió un problema. Intenta nuevamente."
        );

    }

}


/* ==================================================
   FORMATEAR FECHA
================================================== */

function formatearFecha(fecha) {

    if (
        !(fecha instanceof Date) ||
        isNaN(fecha.getTime())
    ) {

        return "Fecha no válida";

    }


    const dia =
        String(fecha.getDate()).padStart(2, "0");

    const mes =
        String(fecha.getMonth() + 1).padStart(2, "0");

    const año =
        fecha.getFullYear();


    return `${dia}/${mes}/${año}`;
}


/* ==================================================
   CAMBIAR IMAGEN DEL CARRUSEL
================================================== */

function cambiarImagen(boton, direccion) {

    try {

        const carrusel =
            boton.closest(".carrusel");


        if (!carrusel) {

            console.warn(
                "No se encontró el carrusel."
            );

            return;

        }


        const imagenes =
            carrusel.querySelectorAll(
                ".imagen-carrusel"
            );


        if (imagenes.length <= 1) {

            return;

        }


        let indiceActual = 0;


        imagenes.forEach(
            function (imagen, indice) {

                if (
                    !imagen.classList.contains(
                        "oculta"
                    )
                ) {

                    indiceActual = indice;

                }

            }
        );


        imagenes[indiceActual]
            .classList.add("oculta");


        let nuevoIndice =
            indiceActual + direccion;


        if (
            nuevoIndice >=
            imagenes.length
        ) {

            nuevoIndice = 0;

        }


        if (nuevoIndice < 0) {

            nuevoIndice =
                imagenes.length - 1;

        }


        imagenes[nuevoIndice]
            .classList.remove("oculta");


    } catch (error) {

        console.error(
            "Error en el carrusel:",
            error
        );

    }

}


/* ==================================================
   CARRUSEL AUTOMÁTICO
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const carruseles =
            document.querySelectorAll(
                ".carrusel"
            );


        carruseles.forEach(
            function (carrusel) {

                const imagenes =
                    carrusel.querySelectorAll(
                        ".imagen-carrusel"
                    );


                if (imagenes.length <= 1) {

                    return;

                }


                let indice = 0;


                setInterval(
                    function () {

                        imagenes[indice]
                            .classList.add(
                                "oculta"
                            );


                        indice++;


                        if (
                            indice >=
                            imagenes.length
                        ) {

                            indice = 0;

                        }


                        imagenes[indice]
                            .classList.remove(
                                "oculta"
                            );

                    },
                    5000
                );

            }
        );

    }
);


/* ==================================================
   CERRAR MENÚ AL CAMBIAR A PC
================================================== */

window.addEventListener(
    "resize",
    function () {

        if (window.innerWidth > 700) {

            const menu =
                document.getElementById("menu");

            const boton =
                document.querySelector(
                    ".menu-toggle"
                );


            if (menu) {

                menu.classList.remove(
                    "activo"
                );

            }


            if (boton) {

                boton.textContent = "☰";

                boton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    }
);