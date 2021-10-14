const cart = new Cart() 
// cart div node
const nCartDiv              = document.getElementById('carro')
// cart table node
const nTableBody            = document.querySelector('#tablaProductos tbody') 
// main products cards node
const nListaDeProductos  = document.getElementById('listaProductos') 
// button emptyCart node
const emptyCartBtn          = document.getElementById('emptyCart') 
// button Paid Order
const processRequestBtn     = document.getElementById('salesProcess') 


loadListenerEvents() 

function loadListenerEvents() {

    nListaDeProductos.addEventListener('click', (e)=>{cart.agregarACarro(e)}) 
    emptyCartBtn.addEventListener('click', (e)=>{cart.vaciarCarro(e)}) 

    nCartDiv.addEventListener("click", (event) => {

      const expr = event.target.getAttribute('name');
      switch (expr) {
        case 'qty':        
          cart.actualizaCantidad(
                  event.target.getAttribute('data-id'),
                  event.target.value
                  )            
          break;
        case 'deleteRow':
          cart.borrarProductoCarro(event)
          break;
      }

    })


    // nNewArrivalsMenu.addEventListener("click",(event) => {
    //     filterProducts('new')
    // })

    // nPopularProductsMenu.addEventListener("click",(event) => {
    //     filterProducts('popular')
    // })

    // nAllProductsMenu.addEventListener("click",(event) => {
    //     filterProducts('all')
    // })

    //Al cargar documento se muestra lo almacenado en LS
    document.addEventListener('DOMContentLoaded', cart.leerLS())     
}