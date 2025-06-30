# Sistema de Control de Alumnos UTP EPJA

Sistema web para el control de alumnos y gestión de acciones pedagógicas, diseñado para la Jefatura UTP de Educación de Personas Jóvenes y Adultas (EPJA) en Chile.

---

## 📑 Descripción

Este proyecto permite:

✅ Gestionar cursos (1° Básico A, 1° Básico B, 2° Básico A, 2° Básico B).  
✅ Agregar, editar y borrar alumnos.  
✅ Registrar acciones pedagógicas específicas para cada alumno.  
✅ Visualizar información en gráficos dinámicos (Dashboard).  
✅ Editar el nombre del Profesor Jefe de cada curso.  
✅ Guardar datos en LocalStorage para persistencia entre sesiones.

---

## ⚙️ Tecnologías utilizadas

- **HTML5** → Estructura semántica.
- **CSS3** → Estilos personalizados y responsive design.
- **Bootstrap 5** → Layout flexible y componentes visuales.
- **JavaScript** → Lógica de interacción y manipulación de datos.
- **jQuery** → Manejo de DOM y eventos.
- **Chart.js** → Generación de gráficos dinámicos.
- **Git/GitHub** → Control de versiones y trabajo colaborativo.

---

## 🚀 Funcionalidades

### Dashboard

- Gráfico de barras: Total de alumnos por curso.
- Gráfico de barras: Alumnos con acciones pedagógicas.
- Gráfico circular: Porcentaje de alumnos con acciones pedagógicas.

### Gestión de Cursos

- Visualización de todos los cursos en tarjetas.
- Acceso individual a cada curso.

### Gestión de Alumnos

- Agregar nuevo alumno.
- Editar datos del alumno:
  - Nombre.
  - Fecha de nacimiento.
  - Teléfono.
  - Observaciones.
  - Acciones pedagógicas.
- Acciones pedagógicas mostradas como “chips” eliminables.
- Borrar alumno del listado.

### Gestión Profesor Jefe

- Editar el nombre del profesor jefe para cada curso.

---

## 🗂 Estructura del Proyecto

```plaintext
📁 / (root)
├── index.html
├── cursos.html
├── 1erbasicoA.html
├── 1erbasicoB.html
├── 2dobasicoA.html
├── 2dobasicoB.html
├── css/
│   └── styles.css
├── js/
│   └── scripts.js
└── README.md
```

---

## 💻 Requisitos Funcionales Cumplidos

- ✅ Uso de HTML5.
- ✅ Uso de CSS y media queries para diseño responsive.
- ✅ Implementación de Bootstrap.
- ✅ Uso de JavaScript para eventos dinámicos.
- ✅ Uso de jQuery para manipulación del DOM.
- ✅ Preparado para repositorio GitHub.

---


## 🚀 Cómo usar

1. Clona este repositorio:

```bash
git clone https://github.com/usuario/repositorio.git
```

2. Abre `index.html` en tu navegador.

3. Navega entre Dashboard y Cursos.

4. Administra los datos según las opciones disponibles.

---

## 🤝 Autor

Pablo Varas Salamanca

Proyecto desarrollado como solución educativa para EPJA.

---

## 📄 Licencia

MIT License
