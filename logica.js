alert('Bienvenido!');

let realizarCompra = prompt('¿Quieres realizar una compra? (s-si / n-no)');
if(realizarCompra == 's' || realizarCompra == 'S'){    
    
const carrito = [];
let contenedor = document.getElementById("misProds");


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
    alert(`Se agregó el producto ${prodAAgregar.nombre} al carrito.`);
    
    //Se agrega una fila a la tabla del carrito.
    document.getElementById('tablabody').innerHTML += `
        <tr>
            <td>${prodAAgregar.id}</td>
            <td>${prodAAgregar.nombre}</td>
            <td>$ ${prodAAgregar.precio}</td>
        </tr>
    `;
    //incrementar el total
    let totalCompra = carrito.reduce((acumulador,producto)=>acumulador+producto.precio,0);
    document.getElementById('total').innerText = 'Total a pagar $: '+totalCompra;
}
}else{
    alert('Gracias por visitarnos. Regresa pronto para realizar una compra!');
}


