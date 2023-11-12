//objetivos
// 1- eliminar productos
// 2- manejar cantidades
// 3- agregar contador de articulos en el navbar

const shopContent = document.getElementById('shopContent');
const verCarrito = document.getElementById ('verCarrito');
const modalContainer = document.getElementById('modal-container');
const contadorCarrito = document.getElementById('cantidadCarrito');

const showAlertProductoAgregado = ()=> {
    Swal.fire({
        icon: 'success',
        title: 'Producto agregado!',
        text: 'Has agregado un producto a tu carrito.',
        toast: true,
        timer: 2000
    });
}

const showAlertProductoRemovido = ()=> {
    Swal.fire({
        icon: 'info',
        title: 'Producto removido!',
        text: 'Has quitado un producto de tu carrito',
        toast: true,
        timer: 2000
    });
}

const showAlertFinalizarCompra = ()=> {
    Swal.fire({
        icon: 'success',
        title: 'Compra Finalizada!',
        text:  'Gracias por su compra.',
        toast: true,
        timer: 2000
    });
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProducts = async ()=>{
    const response = await fetch("./data.json");
    const data = await response.json();
    
    
data.forEach((product) => {
    let content = document.createElement("div");
    
    content.className = "card";
    content.innerHTML = `
    <img src= "${product.img}" class="articuloImg"/>
    <h3> ${product.nombre}</h3>
    <p class="price"> ${product.precio} $ </p>
     `;

    shopContent.append(content);

    let agregar= document.createElement("button");
    agregar.innerText = "Agregar +";
    
    

    content.append(agregar);

    agregar.addEventListener("click", ()=> {

        const repeat = carrito.some((repeatProduct)=> repeatProduct.id === product.id);

        //Si el articulo ya esta en el carrito..
        if (repeat) {
            carrito.map((prod)=>{
                if(prod.id === product.id){
                    prod.cantidad++; //incrementamos cantidad
                };
            });
        } else { //Sino lo agregamos
            carrito.push({
                id:product.id,
                nombre:product.nombre,
                precio:product.precio,
                cantidad:product.cantidad,
            });
        };
            console.log(carrito);
            console.log(carrito.length);
            actualizarContadorCarrito();
            saveLocal();
            showAlertProductoAgregado();


    });
});


};

getProducts(); 



//set item

const saveLocal = () =>{
localStorage.setItem('carrito', JSON.stringify(carrito));
};

//get item

JSON.parse(localStorage.getItem('carrito'));











