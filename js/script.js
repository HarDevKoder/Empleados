// ---------------------------------------------------------------------------------------------
// REFERENCIA DE ELEMENTOS DEL DOM
// ---------------------------------------------------------------------------------------------
const spanEmpleadosRegistrados = document.getElementById('spanEmpleadosRegistrados');
const listadoEmpleados = document.getElementById('listadoEmpleados');
const btnRegistrar = document.getElementById('btnRegistrar');
const btnMostrar = document.getElementById('btnMostrar');

// ---------------------------------------------------------------------------------------------
// VARIABLES GLOBALES
// ---------------------------------------------------------------------------------------------
let nombre, apellido, fechaIngreso, cargo;
let codigo = 0;
let valoresEmpleado = [];
let campos = [];
let empleadosRegistradosArr = [];
let isTextoBtnMostrar = true;

// ---------------------------------------------------------------------------------------------
// FUNCIONES
// ---------------------------------------------------------------------------------------------
// Función que extrae los valores de los inputs
const extraerValoresInputs = () => {
  valoresEmpleado = [];
  for (let i = 1; i <= 4; i++) {
    const input = document.getElementById(`input${i}`);
    let valor = input.value;
    valoresEmpleado.push(valor);
  }
  return valoresEmpleado;
}

// Constructor de Objetos de Empleados
function Empleado(codigo, nombre, apellido, fechaIngreso, cargo) {
  this.codigo = codigo;
  this.nombre = nombre;
  this.apellido = apellido;
  this.fechaIngreso = fechaIngreso;
  this.cargo = cargo;
}

// Función que instancia Empleados
const instanciarEmpleado = (codigo, nombre, apellido, fechaIngreso, cargo) => {
  let empleado = new Empleado(codigo, nombre, apellido, fechaIngreso, cargo);
  empleadosRegistradosArr.push(empleado);
}

// Funcion para generar card para mostrar datos de empleado
const generarTarjeta = (elemento) => {
  // Creo la tarjeta y le asigno estilos
  const tarjeta = document.createElement('div');
  tarjeta.style.width = '200px';
  tarjeta.style.height = 'auto';
  tarjeta.style.border = '1px solid silver';
  tarjeta.style.marginBottom = '5px';
  tarjeta.style.marginRight = '5px';
  tarjeta.style.background = 'green';
  tarjeta.style.borderRadius = '10px';
  tarjeta.style.color = 'azure';
  tarjeta.style.padding = '10px';
  tarjeta.style.display = 'flex';
  tarjeta.style.flexDirection = 'column';
  tarjeta.style.justifyContent = 'spaceAround';
  tarjeta.style.alignItems = 'center';
  tarjeta.style.gap = '10px';

  //  Creo la Imagen y asigno estilos y atributos 
  const imagen = document.createElement('img');
  imagen.src = '../imagenes/user.png';
  imagen.style.width = '50px';
  imagen.style.height = '50px';


  // Creo contenedor y agrego texto
  const texto = document.createElement('div');
  texto.style.lineHeight = '1.2em';
  texto.innerHTML = elemento;

  // Agrego imagen y texto a la tarjeta
  tarjeta.append(imagen, texto);

  // Agrego tarjeta al div contenedor general
  spanEmpleadosRegistrados.append(tarjeta);
}

// Función que Imprime datos del empleado en la tarjeta
const imprimirEmpleado = () => {
  for (x of empleadosRegistradosArr) {
    let elemento = `Codigo: E00${x.codigo}<br>
                    Nombre: ${x.nombre}<br>
                    Apellido: ${x.apellido}<br>
                    Ingreso: ${x.fechaIngreso}<br>
                    Cargo: ${x.cargo}`;
    generarTarjeta(elemento);
  }
}

// Función que cambia el texto del boton mostrar (mostrar/ocultar)
const cambiarTextoBtnMostrar = () => {
  let textoBtnMostrar = (btnMostrar.textContent === 'Mostrar') ? 'Ocultar' : 'Mostrar';
  btnMostrar.textContent = textoBtnMostrar;
  return textoBtnMostrar;
}

// Función que valida datos numericos y formato de fecha
const validaInputs = (campos) => {
  if (campos.some(campo => campo === '')) {
    alert('llena todos los campos!');
  } else {
    let campoFecha = campos.splice(2, 1)[0];
    let regex = /[\d]/g;
    if (campos.some(campo => regex.test(campo))) {
      alert('El input contiene números!');
    } else {
      let regexFecha = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
      if (regexFecha.test(campoFecha)) {
        let partesFecha = campoFecha.split('/');
        let dia = parseInt(partesFecha[0]);
        let mes = parseInt(partesFecha[1]);
        let año = parseInt(partesFecha[2]);
        if (mes === 2 && dia > 29) {
          alert('Febrero no puede tener más de 29 días!');
        } else if (mes === 2 && dia === 29 && !(año % 4 === 0 && (año % 100 !== 0 || año % 400 === 0))) {
          alert('Febrero solo puede tener 29 días en un año bisiesto!');
        } else {
          alert('Registro Exitoso!');
          campos.splice(2, 0, campoFecha);
          let res = campos;
          return res;
        }
      } else {
        alert('Fecha no valida!');
      }
    }
  }
}

// ---------------------------------------------------------------------------------------------
// PROGRAMA PRINCIPAL
// ---------------------------------------------------------------------------------------------

// Botón para realizar el regstro de los Empleados
btnRegistrar.addEventListener('click', () => {

  // Limpio array para evitar tarjetas duplicadas
  // empleadosRegistradosArr = [];

  // obtengo el array con los valores de los inputs sin validar
  campos = extraerValoresInputs();

  // Valido vacíos, valores numericos y formato de fecha ingresados
  campos = validaInputs(campos); //Campos validados

  // Destructuro array para instanciar objetos
  [nombre, apellido, fechaIngreso, cargo] = campos;

  // Genero consecutivo automatico para codigo
  codigo++;

  // Instancio empleados y los guardo en array (empleadosRegistradosArr)
  instanciarEmpleado(codigo, nombre, apellido, fechaIngreso, cargo);

  // Limpio los inputs
  document.querySelectorAll('input[type="text"]').forEach(input => input.value = '');

})

// Botón para mostrar/Ocultar Resultados
btnMostrar.addEventListener('click', () => {
  // Verifico el texto del boton
  let textoBoton = cambiarTextoBtnMostrar();

  if (textoBoton === 'Mostrar') {
    listadoEmpleados.style.visibility = 'hidden';
  } else {
    // Imprimo datos de empleado en tarjeta
    imprimirEmpleado();

    // Muestro el contenedor de resultados
    listadoEmpleados.style.visibility = 'visible';

    // Limpio array para evitar tarjetas duplicadas
    empleadosRegistradosArr = [];
  }
})
