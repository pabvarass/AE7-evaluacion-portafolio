$(document).ready(function () {
  // ==========================================
  // DASHBOARD GRÁFICOS
  // ==========================================

  var cursos = ["1.er Nivel Básico A", "1.er Nivel Básico B", "2.º Nivel Básico A", "2.º Nivel Básico B"];
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

  if (cursoId && localStorage.getItem("alumnos_" + cursoId)) {
    alumnos = JSON.parse(localStorage.getItem("alumnos_" + cursoId));
    renderizarLista();
  }

  $("#btn-agregar").click(function () {
    var nombre = $("#alumno-nombre").val().trim();
    if (nombre !== "") {
      alumnos.push({
        nombre: nombre,
        nacimiento: "",
        telefono: "",
        observaciones: "",
        accion: ""
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
      var item = $("<li>").addClass("list-group-item d-flex justify-content-between align-items-center");

      var datos = $("<div>").addClass("d-flex align-items-center");
      var nombre = $("<span>").addClass("fw-bold").text(alumno.nombre);
      var accion = $("<small>").addClass("text-muted ms-2").text(
        alumno.accion ? "- " + alumno.accion : "- Sin acción"
      );
      datos.append(nombre, accion);
      item.append(datos);

      var botones = $("<div>");

      var btnEditar = $("<button>")
        .addClass("btn btn-sm btn-editar me-2")
        .html('<i class="bi bi-pencil"></i>')
        .click(function () {
          abrirModalFicha(index);
        });

      var btnBorrar = $("<button>")
        .addClass("btn btn-sm btn-borrar")
        .html('<i class="bi bi-trash"></i>')
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
    $("#ficha-index").val(index);
    $("#ficha-nombre").val(alumno.nombre);
    $("#ficha-nacimiento").val(alumno.nacimiento);
    $("#ficha-telefono").val(alumno.telefono);
    $("#ficha-observaciones").val(alumno.observaciones);
    $("#ficha-accion").val(alumno.accion);
    $("#modalFicha").modal("show");
  }

  $("#guardar-ficha").click(function () {
    var index = $("#ficha-index").val();
    alumnos[index].nombre = $("#ficha-nombre").val().trim();
    alumnos[index].nacimiento = $("#ficha-nacimiento").val().trim();
    alumnos[index].telefono = $("#ficha-telefono").val().trim();
    alumnos[index].observaciones = $("#ficha-observaciones").val().trim();
    alumnos[index].accion = $("#ficha-accion").val();

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
});
