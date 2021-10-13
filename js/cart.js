class Cart {

    // read and show products stored in the LS
    leerLS() {
        let productosLS
        productosLS = this.obtenerProductoLS()
        
        productosLS.forEach(function (producto) {
            // build template
            const row = document.createElement('tr')
            row.innerHTML = `
                    <td>
                        <img src="${producto.imagen}" width=100>
                    </td>
                    <td>${producto.nombre}</td>      
                    <input class="inputQty" type="number" size="2" min="1" max="10" name="qty" data-id="${producto.id}" name="qty" value=${producto.cantidad}>
                    <td>${producto.precio}</td>
                    <td>
                        <a href="#" class="deleteCartProduct fas fa-times-circle" data-id="${producto.id}" name="deleteRow"></a>
                    </td>
                `
            nTableBody.appendChild(row)
        }
        )
        document.getElementById("contador").innerHTML = productosLS.length
    }
   
    // delete product
    borrarProductoCarro(e) {
        e.preventDefault()
        const cartQty = parseInt(document.getElementById("contador").textContent)
        let producto,
            productoId
        if (e.target.classList.contains('deleteCartProduct')) {
            producto = e.target.parentElement.parentElement
            productoId = producto.querySelector('a').getAttribute('data-id')
            e.target.parentElement.parentElement.remove()
            document.getElementById("contador").innerHTML = cartQty - 1
            // lo tuve que ocmentar porque no funciona da error de funcion no definida
            borrarProductoLS(productoId)
        }    
    }

    // Obtain products in LS
    obtenerProductoLS() {
        let productoLS
        // verifiy if exists products in LS
        if (localStorage.getItem('products') === null) {
            productoLS = []
        }
        else {
            productoLS = JSON.parse(localStorage.getItem('products'))
        }
        return productoLS
    }

    // Update product Qty in LS 
    actualizaCantidadLS(id,value) {
        const productosLS = this.obtenerProductoLS()
        productosLS.forEach(function (producto) {
            if ( producto.id === id ) {
                producto.cantidad = value
                localStorage.setItem('products', JSON.stringify(productosLS))
            }
        })
    }

    // add product to cart
    agregarACarro(e) {
        e.preventDefault()
        if (e.target.classList.contains('addToCart')) {
            const producto = e.target.parentElement.parentElement.parentElement
            //Enviamos el producto seleccionado para tomar sus datos
            this.obtenerDatosProducto(producto)
        }
    }

    // read product data
    obtenerDatosProducto(producto) {
        const productoInfo = {
            imagen: producto.querySelector('img').src,
            nombre: producto.querySelector('h5').textContent,
            precio: producto.querySelector('h5 span').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }

        let productosLS
        productosLS = this.obtenerProductoLS()
        productosLS.forEach(function (productoLS) {
            if (productoLS.id === productoInfo.id) {
                productosLS = productoLS.id
            }
        })

        if (productosLS === productoInfo.id) {
            
            //ver como acumulo
        }
        else {
            this.AddCart(productoInfo)
        }
    }

    // add product to Cart
    AddCart(producto) {
        const cartQty = parseInt(document.getElementById("contador").textContent)
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
        <img src="${producto.imagen}" width=100>
        </td>
        <td>${producto.nombre}</td>      
        <input class="inputQty" type="number" size="2" min="1" max="10" data-id="${producto.id}" name="qty" value=1>
        <td>${producto.precio}</td>
        <td>
            <a href="#" class="deleteCartProduct fas fa-times-circle" data-id="${producto.id}" name="deleteRow"></a>
        </td>
            `
        nTableBody.appendChild(row)
        document.getElementById("contador").innerHTML = cartQty + 1
        this.guardarProductoLS(producto)
    }

    // delete all products in Cart
    vaciarCarro(e) {
        e.preventDefault()
        while (nTableBody.firstChild) {
            nTableBody.removeChild(nTableBody.firstChild)
        }
        // clear LS
        this.vaciarLS()
        document.getElementById("contador").innerHTML = 0
        return false
    }

    // save products in Local Storage
    guardarProductoLS(producto) {
        let productos
        productos = this.obtenerProductoLS()
        // add product to Cart
        productos.push(producto)
        // add product to LS
        localStorage.setItem('products', JSON.stringify(productos))
    }


    // delete all data in the LS
    vaciarLS() {
        localStorage.clear()
    }


}


function eliminarProductoLS(productoId) {
    let productoLS = cart.obtenerProductoLS()

    productoLS.forEach(function(producto,index){
        if(producto.id === productoId){
            productoLS.splice(index,1)
        }
    })
    localStorage.setItem('products',JSON.stringify(productoLS))
}

function actualizarProductoLS(productoId) {
    let productoLS = cart.obtenerProductoLS()

    productoLS.forEach(function(producto,index){
        if(producto.id === productoId){
            productoLS.splice(index,1)
        }
    })
    localStorage.setItem('products',JSON.stringify(productoLS))
}