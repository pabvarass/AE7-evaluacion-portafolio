$(document).ready(function () {

  // ==========================================
  // DASHBOARD GRÁFICOS
  // ==========================================
  var cursos = [
    "1.er Nivel Básico A",
    "1.er Nivel Básico B",
    "2.º Nivel Básico A",
    "2.º Nivel Básico B"
  ];

  var totalAlumnos = [15, 12, 10, 14];
  var alumnosConAccion = [5, 3, 2, 6];

  var ctxTotal = document.getElementById("graficoTotalAlumnos");
  if (ctxTotal) {
    new Chart(ctxTotal, {
      type: "bar",
      data: {
        labels: cursos,
        datasets: [{
          label: "Total Alumnos",
          data: totalAlumnos,
          backgroundColor: "rgba(13, 110, 253, 0.7)"
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Distribución de Total de Alumnos por Curso",
            font: { size: 18 }
          },
          legend: { display: false }
        }
      }
    });
  }

  var ctxAccion = document.getElementById("graficoAlumnosAccion");
  if (ctxAccion) {
    new Chart(ctxAccion, {
      type: "bar",
      data: {
        labels: cursos,
        datasets: [{
          label: "Alumnos con acciones",
          data: alumnosConAccion,
          backgroundColor: "rgba(220, 53, 69, 0.7)"
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Cantidad de Alumnos con Acciones Pedagógicas",
            font: { size: 18 }
          },
          legend: { display: false }
        }
      }
    });
  }

  var ctxPorcentaje = document.getElementById("graficoPorcentajeAccion");
  if (ctxPorcentaje) {
    var porcentaje = alumnosConAccion.map((val, i) => {
      if (totalAlumnos[i] === 0) return 0;
      return ((val / totalAlumnos[i]) * 100).toFixed(1);
    });
    new Chart(ctxPorcentaje, {
      type: "pie",
      data: {
        labels: cursos,
        datasets: [{
          data: porcentaje,
          backgroundColor: [
            "rgba(13, 110, 253, 0.7)",
            "rgba(220, 53, 69, 0.7)",
            "rgba(40, 167, 69, 0.7)",
            "rgba(255, 193, 7, 0.7)"
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Porcentaje de Alumnos con Acciones Pedagógicas",
            font: { size: 18 }
          },
          legend: { position: "bottom" }
        }
      }
    });
  }

  // ==========================================
  // GESTIÓN DE ALUMNOS
  // ==========================================
  var cursoId = $("body").attr("data-curso");
  var alumnos = [];

  if (cursoId) {
    if (localStorage.getItem("alumnos_" + cursoId)) {
      alumnos = JSON.parse(localStorage.getItem("alumnos_" + cursoId));
      renderizarLista();
    } else {
      alumnos = generarAlumnosAleatorios(3);
      guardarAlumnos();
      renderizarLista();
    }
  }

  $("#btn-agregar").click(function () {
    var nombre = $("#alumno-nombre").val().trim();
    if (nombre !== "") {
      alumnos.push({
        nombre: nombre,
        nacimiento: "",
        telefono: "",
        observaciones: "",
        accion: []
      });
      guardarAlumnos();
      renderizarLista();
      $("#alumno-nombre").val("");
    }
  });

  function guardarAlumnos() {
    if (cursoId) {
      localStorage.setItem("alumnos_" + cursoId, JSON.stringify(alumnos));
    }
  }

  function renderizarLista() {
    var lista = $("#alumnos-list");
    lista.empty();

    alumnos.forEach(function (alumno, index) {
      if (typeof alumno.accion === "string") {
        alumno.accion = alumno.accion ? [alumno.accion] : [];
      }

      var item = $("<li>").addClass("list-group-item d-flex justify-content-between align-items-center");
      var datos = $("<div>").addClass("d-flex align-items-center");
      var nombre = $("<span>").addClass("fw-bold").text(alumno.nombre);

      var accionText = "- Sin acción";
      if (alumno.accion && alumno.accion.length > 0) {
        accionText = "- " + alumno.accion.join(" -- ");
      }
      var accion = $("<small>").addClass("text-muted ms-2").text(accionText);

      datos.append(nombre, accion);
      item.append(datos);

      var botones = $("<div>");
      var btnEditar = $("<button>")
        .addClass("btn btn-sm btn-editar me-2")
        .text("Editar")
        .click(function () {
          abrirModalFicha(index);
        });

      var btnBorrar = $("<button>")
        .addClass("btn btn-sm btn-borrar")
        .text("Borrar")
        .click(function () {
          if (confirm("¿Seguro que deseas borrar a este alumno?")) {
            alumnos.splice(index, 1);
            guardarAlumnos();
            renderizarLista();
          }
        });

      botones.append(btnEditar, btnBorrar);
      item.append(botones);
      lista.append(item);
    });
  }

  function abrirModalFicha(index) {
    var alumno = alumnos[index];

    if (typeof alumno.accion === "string") {
      alumno.accion = alumno.accion ? [alumno.accion] : [];
    }

    $("#ficha-index").val(index);
    $("#ficha-nombre").val(alumno.nombre);
    $("#ficha-nacimiento").val(alumno.nacimiento);
    $("#ficha-telefono").val(alumno.telefono);
    $("#ficha-observaciones").val(alumno.observaciones);

    // Renderizar chips de acciones
    $("#acciones-list").empty();
    if (alumno.accion && alumno.accion.length > 0) {
      alumno.accion.forEach(function (accion, i) {
        var chip = $("<span>")
          .addClass("badge bg-primary me-2 mb-2")
          .text(accion)
          .css("cursor", "pointer")
          .click(function () {
            alumno.accion.splice(i, 1);
            guardarAlumnos();
            abrirModalFicha(index);
          });
        $("#acciones-list").append(chip);
      });
    }

    $("#modalFicha").modal("show");
  }

  $("#agregar-accion").click(function () {
    var nuevaAccion = $("#ficha-accion").val().trim();
    var index = $("#ficha-index").val();

    if (nuevaAccion !== "") {
      if (!alumnos[index].accion.includes(nuevaAccion)) {
        alumnos[index].accion.push(nuevaAccion);
      }
      guardarAlumnos();
      $("#ficha-accion").val("");
      abrirModalFicha(index);
    }
  });

  $("#guardar-ficha").click(function () {
    var index = $("#ficha-index").val();
    alumnos[index].nombre = $("#ficha-nombre").val().trim();
    alumnos[index].nacimiento = $("#ficha-nacimiento").val().trim();
    alumnos[index].telefono = $("#ficha-telefono").val().trim();
    alumnos[index].observaciones = $("#ficha-observaciones").val().trim();

    guardarAlumnos();
    renderizarLista();
    $("#modalFicha").modal("hide");
  });

  // ==========================================
  // EDICIÓN DE PROFESOR JEFE
  // ==========================================
  $("#editar-profesor").click(function () {
    var nombreActual = $("#nombre-profesor").text();
    $("#profesor-nombre").val(nombreActual);
    $("#modalProfesor").modal("show");
  });

  $("#guardar-profesor").click(function () {
    var nuevoNombre = $("#profesor-nombre").val().trim();
    if (nuevoNombre !== "") {
      $("#nombre-profesor").text(nuevoNombre);
      $("#modalProfesor").modal("hide");
    }
  });

  // ==========================================
  // FUNCIONES AUXILIARES
  // ==========================================
  function generarAlumnosAleatorios(cantidad) {
    var nombresEjemplo = [
      "Patricia Fuentes",
      "Carlos Gómez",
      "Ana Rojas",
      "Diego Pizarro",
      "Laura Contreras",
      "Ricardo Soto",
      "Javiera Muñoz",
      "Pedro Castillo",
      "Sofía Vera",
      "Miguel Araya"
    ];

    var accionesPosibles = [
      "Entrevista Apoderado",
      "Derivación Psicólogo",
      "Apoyo Pedagógico",
      "Visita Domiciliaria"
    ];

    var alumnos = [];

    for (var i = 0; i < cantidad; i++) {
      var nombre = nombresEjemplo[Math.floor(Math.random() * nombresEjemplo.length)];
      var nacimiento = randomFecha("1975-01-01", "2005-12-31");
      var telefono = "9" + Math.floor(10000000 + Math.random() * 90000000);
      var observaciones = "Alumno ingresado automáticamente.";
      var numAcciones = Math.floor(Math.random() * 3);
      var acciones = [];

      for (var j = 0; j < numAcciones; j++) {
        var accion = accionesPosibles[Math.floor(Math.random() * accionesPosibles.length)];
        if (!acciones.includes(accion)) {
          acciones.push(accion);
        }
      }

      alumnos.push({
        nombre: nombre,
        nacimiento: nacimiento,
        telefono: telefono,
        observaciones: observaciones,
        accion: acciones
      });
    }

    return alumnos;
  }

  function randomFecha(start, end) {
    var startDate = new Date(start);
    var endDate = new Date(end);
    var randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    var year = randomDate.getFullYear();
    var month = String(randomDate.getMonth() + 1).padStart(2, '0');
    var day = String(randomDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

});
