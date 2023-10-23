// ---------------------------------------------------------------------------------------------
// REFERENCIA DE ELEMENTOS DEL DOM
// ---------------------------------------------------------------------------------------------
const spanEmpleadosRegistrados = document.getElementById('spanEmpleadosRegistrados');
const btnRegistrar = document.getElementById('btnRegistrar');
const btnMostrar = document.getElementById('btnMostrar');

// ---------------------------------------------------------------------------------------------
// VARIABLES GLOBALES
// ---------------------------------------------------------------------------------------------
let nombre, apellido, fechaIngreso, cargo;
let codigo = 0;
let valoresEmpleado = [];
let empleadosRegistradosArr = [];

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
  imagen.src='../imagenes/user.png';
  imagen.style.width='50px';
  imagen.style.height='50px';


  // Creo contenedor y agrego texto
  const texto = document.createElement('div');
  texto.style.lineHeight='1.2em';
  texto.innerHTML = elemento;

  // Agrego imagen y texto a la tarjeta
  tarjeta.append(imagen,texto);

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

// ---------------------------------------------------------------------------------------------
// PROGRAMA PRINCIPAL
// ---------------------------------------------------------------------------------------------
btnRegistrar.addEventListener('click', () => {

  // Limpio array para evitar tarjetas duplicadas
  empleadosRegistradosArr = [];

  // obtengo el array con los valores de la instancia
  let campos = extraerValoresInputs();

  // Evaluo si algno esta vacio y muestro mensaje
  if(campos.some(campo=>campo==='')){
    alert('llena todos los campos!');
  }else{
    // Destructuro array con datos para instanciar objetos
    [nombre, apellido, fechaIngreso, cargo] = extraerValoresInputs();
    codigo+=1;

    // Instancio empleados y los guardo en array (empleadosRegistradosArr)
    instanciarEmpleado(codigo, nombre, apellido, fechaIngreso, cargo);
  
    // Limpio los inputs
    document.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
  }

})

btnMostrar.addEventListener('click', () => {
  // Imprimo datos de empleado en tarjeta
  imprimirEmpleado();

  // Limpio array para evitar tarjetas duplicadas
  empleadosRegistradosArr = [];
})


