// Defino objeto de productos
class Producto {
    constructor(nombre, imagen, descripcion, stock, id, envios, starts, ofertas, cuotas, iphone, samsung, motorola, lg) {
      this.nombre = nombre;
      this.imagen = imagen;
      this.descripcion = descripcion;
      this.stock = stock;
      this.id = id;
      this.envios = envios;
      this.starts = starts;
      this.ofertas = ofertas;
      this.cuotas = cuotas;
      this.iphone = iphone;
      this.samsung = samsung;
      this.motorola= motorola;
      this.lg = lg;
    }
}
var todosLosProductos = []
// uso fetch para leer archivo json local
fetch('/json/productos.json', {
    method: 'GET'
})
    .then(respuesta => respuesta.json())
    .then(arrayProductos => {
        todosLosProductos = arrayProductos.slice(0, arrayProductos.length)
        MostrarHTML(arrayProductos)   
    })


function MostrarHTML(arrayProductos)  {

    let mostrar = ""
    let starts  = ""
    let cuotas = ""
    let envios  = ""
    

    // uso forEach para actualizar el DOM
    arrayProductos.forEach(producto => {
        starts = ''
        for (let i = 0; i<5; i++) {
            if(i < producto.starts) {
                starts += `<div class="bi-star-fill"></div>`
            } else {
                starts += `<div class="bi-star"></div>`
            }   
        }
        if (producto.cuotas) {
            cuotas = `<img src="/img/ahora12.jfif" alt="ahora12" width=100>`
        } else {
            cuotas = '<img src="/img/cuotas.jpg" alt="cuotas" width=90>'
        }

        envios = ''
        for (let i = 0; i<1; i++) {
            if(i < producto.envio) {
                envios += `<p class="envios">Llega gratis <span class="enviosBold">mañana</span></p>`
            } else {
                envios += `<p class="envios">Envio con Cargo <span class="enviosBold"></br>Envio 24 Horas</span></p>`
            }   
        }
        mostrar += `<div class= "col mb-5" >
        <div class="card h-100">
            <!--Producto Full-->
            <div class="badge bg-success text-white position-absolute" style="top: 0.5rem; right: 0.5rem">
            ⚡FULL
        </div>
        <!-- Product image-->
        <img src= ${producto.imagen}
            alt="${producto.nombre}" />
        <!-- Product details-->
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">${producto.nombre}</h5>
                <hr>
                <!-- Product details-->
                    <ul class="p-0" >
                        <li class = "description">| ${producto.descripcion} |</li>
                    </ul>
                    <!-- Cuotas-->
                    <div class="moreDetails" "d-flex justify-content-center small text-warning mb-2">
                        ${cuotas}
                        </div>                     
                <!-- Product reviews-->
                    <div class="d-flex justify-content-center small text-warning mb-2">
                        ${starts}
                    </div>
                <!-- Product price-->
                <h5><span>$${producto.precio}</span></h5>
                ${envios}
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center"><a class="btn btn-outline-dark mt-auto addToCart" data-id="${producto.id}" href="#">Agregar al Carrito</a></div>
            </div>
        </div>
    </div >   
    `
    }

    )
    // mostrar productos dinámicamente en página principal
    let contenedor = document.getElementById("listaProductos")
    contenedor.innerHTML = mostrar
}

function filtroProductos(parametros){
    let resultados = []
    switch (parametros) {
        case 'motorola':     
        console.log('filtro por motorola') 
            resultados = todosLosProductos.filter(producto => producto.motorola===true);
            break
            case 'samsung':     
            console.log('filtro por samsung') 
                resultados = todosLosProductos.filter(producto => producto.samsung===true);
                break
                case 'lg':     
                console.log('filtro por lg') 
                    resultados = todosLosProductos.filter(producto => producto.lg===true);
                    break
        case 'all':      
        console.log('filtro por all') 
            resultados = todosLosProductos;
            break
        case 'iphone':
            console.log('filtro por iphone') 
            resultados = todosLosProductos.filter(producto => producto.iphone===true);
            break
    }
    console.log(resultados)
    MostrarHTML(resultados) 
}


$(document).ready(function () {

    $('#allDetailCheck').prop('checked', true);

    $('input[type="checkbox"]').click(function () {
        if ($(this).prop("checked") == true) {
            $(".moreDetails").show();
        }
        else if ($(this).prop("checked") == false) {
            $(".moreDetails").hide();
        }
    });



});



function paid() {

    // information to send
    const elemento = {
        "items": [
            {
                "title": "Dummy Title",
                "description": "Dummy description",
                "picture_url": "http://www.myapp.com/myimage.jpg",
                "category_id": "cat123",
                "quantity": 1,
                "currency_id": "ARS",
                "unit_price": 10
            }
        ]
    }


    fetch("https://api.mercadopago.com/checkout/preferences", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Authorization': ' Bearer TEST-684697565820871-092413-c2603593e9fb68df39164dbff6898810-93759575',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(elemento)
    });

}