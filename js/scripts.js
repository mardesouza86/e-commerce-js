// Defino objeto de productos
class Producto {
    constructor(nombre, imagen, descripcion, stock, cantidad, id, envios, starts, ofertas, cuotas) {
      this.nombre = nombre;
      this.imagen = imagen;
      this.descripcion = descripcion;
      this.stock = stock;
      this.cantidad = cantidad;
      this.id = id;
      this.envios = envios;
      this.starts = starts;
      this.ofertas = ofertas;
      this.cuotas = cuotas;
    }
}

var todosLosProductos = []
// uso fetch para leer archivo json local
fetch('/json/productos.json', {
    method: 'GET'
})
    .then(respuesta => respuesta.json())
    .then(arrayProductos => {
        todosLosProductos = arrayProductos.slice(1, arrayProductos.length)
        MostrarHTML(arrayProductos)   
    })


function MostrarHTML(arrayProductos)  {

    let mostrar = ""
    let starts  = ""
    let cuotas = ""
    let envios  = ""
    let ofertas = ""

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
            cuotas = `<img src="./img/images.png" alt="New Product">`
        } else {
            cuotas = ''
                }
          if (producto.cuotas) {
        ofertas = `<img src="./img/images.png" alt="New Product">`
        } else {
        ofertas = ''
        }
        envios = ''
        for (let i = 0; i<1; i++) {
            if(i < producto.starts) {
                envios += `<p class="envios">Llega gratis <span class="enviosBold">mañana</span></p>`
            } else {
                envios += `<div class="bi-star"></div>`
            }   
        }
        mostrar += `<div class= "col mb-5" >
        <div class="card h-100">
            <!--Producto Full-->
            <div class="badge bg-success text-white position-absolute" style="top: 0.5rem; right: 0.5rem">
            FULL
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
                        <li>${producto.descripcion}</li>
                    </ul>
                    <ul class="moreDetails"
                        <li>${producto.cuotas}</li>
                        <li>${producto.ofertas}</li>     
                    </ul>
                <!-- Product reviews-->
                    <div class="d-flex justify-content-center small text-warning mb-2">
                        ${starts}
                    </div>
                <!-- Product price-->
                <h5><span>u$$${producto.precio}</span></h5>
                ${envios}
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center"><a class="btn btn-outline-dark mt-auto addToCart" data-id="${producto.id}" href="#">Add to
                cart</a></div>
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

function filterProducts(param){
    let result = []
    switch (param) {
        case 'new':     
        console.log('entro al new') 
            result = todosLosProductos.filter(producto => producto.productoNuevo===true);
            break
        case 'all':      
        console.log('entro al all') 
            result = todosLosProductos;
            break
        case 'popular':
            console.log('entro al popular') 
            result = todosLosProductos.filter(producto => producto.productoMejor===true);
            break
    }
    console.log(result)
    MostrarHTML(result) 
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

    let titulo = $('.fw-bolder')

    $(".title1").hide();
    $(".title2").hide();
    $(".title1").slideDown(2000, function () {
        $(".title2").fadeIn(3000, function () {
            $(".title2").animate({
                marginLeft: '300px'
            }, 2000)
                .animate({
                    marginLeft: '-600px'
                }, 2000)
                .animate({
                    marginLeft: '0px'
                }, 2000)
        });  
    });
   
});

