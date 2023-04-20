
let carrito = [];
let contenedor = document.getElementById("misProds");
let finalizarBtn = document.getElementById("finalizar");

let tituloPrinc = document.getElementById('tituloPrinc');
tituloPrinc.style.background = 'skyblue';

let tituloSec = document.getElementById('tituloSec');
tituloSec.style.background = 'skyblue';

//Luxon
const DateTime = luxon.DateTime;
//Cuando se ingresa a la web.
const inicio = DateTime.now(); 
console.log(inicio.toString());
console.log(inicio.weekday);
console.log(inicio.zoneName);
console.log(inicio.daysInMonth);
console.log(inicio.toLocaleString(DateTime.DATETIME_HUGE_WITH_SECONDS));

function mostrarProds(){
    for(const producto of productos){
        contenedor.innerHTML += `
            <div class="card col-md-3">
                <img src=${producto.foto} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.id}</h5>
                    <p class="card-text">${producto.nombre}</p>
                    <p class="card-text">$ ${producto.precio}</p>
                    <button id='btn${producto.id}' class="btn btn-primary align-bottom">Comprar</button>
                </div>
            </div>   
        `;
    }
    
    //EVENTOS
    productos.forEach((producto)=>{
        document.getElementById(`btn${producto.id}`).addEventListener('click',()=>{
            agregarProd(producto);
    });
});
}

mostrarProds();

function agregarProd(prodAAgregar){
    carrito.push(prodAAgregar);
    console.table(carrito);
    
    //Se agrega sweet alert 2.
    Swal.fire({
        title: 'Felicitaciones!',
        text: `Se agregó el producto ${prodAAgregar.nombre} al carrito.`,
        imageUrl: prodAAgregar.foto,
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: prodAAgregar.nombre,
      });
    
    //Se agrega una fila a la tabla del carrito.
    document.getElementById('tablaBody').innerHTML += `
        <tr>
            <td>${prodAAgregar.id}</td>
            <td>${prodAAgregar.nombre}</td>
            <td>$ ${prodAAgregar.precio}</td>
        </tr>
    `;
    //Incrementar el total
    let totalCompra = carrito.reduce((acumulador,producto)=>acumulador+producto.precio,0);
    document.getElementById('total').innerText = 'Total a pagar $: '+totalCompra;
}

finalizarBtn.onclick=()=>{
    carrito=[];
    document.getElementById('tablaBody').innerHTML='';
    document.getElementById('total').innerText = 'Total a pagar $:';
    //Toastify
    Toastify({
        text: "Recibirás el pedido dentro de los 3 días hábiles!",
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {
            background: 'linear-gradient(to right, #00b09b, #96c92d)'
        }
    }).showToast();
    
    //Luxon
    const fin = DateTime.now();
    const Interval = luxon.Interval;
    const tiempoParaComprar = Interval.fromDateTimes(inicio,fin);
    console.log(`Tiempo empleado en realizar la compra ${tiempoParaComprar.length('seconds')} segundos`);
}

const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

//Almacenar array completo
guardarLocal("listaProductos", JSON.stringify(productos));

