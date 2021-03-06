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
                    <input class="inputQty" type="number" size="2" min="1" max="10" name="qty" data-id="${producto.id}" name="qty" value=${producto.qty}>
                    <td>${producto.precio}</td>
                    <td>
                        <a href="#" class="deleteCartProduct fas fa-times-circle" data-id="${producto.id}" name="deleteRow"></a>
                    </td>
                `
            nTableBody.appendChild(row)
        }
        )
        document.getElementById("contador").innerHTML = productosLS.length
        this. showTotalAmount()
    }
   
    // delete product
    borrarProductoCarro(e) {
        e.preventDefault()
        const cartQty = parseInt(document.getElementById("contador").textContent)
        let producto,
            productoId
        if (e.target.classList.contains('deleteCartProduct')) {
            producto = e.target.parentElement.parentElement
            console.log(producto)
            productoId = producto.querySelector('a').getAttribute('data-id')
            e.target.parentElement.parentElement.remove()
            document.getElementById("contador").innerHTML = cartQty - 1
            eliminarProductoLS(productoId)
            this. showTotalAmount()
        }    
    }

    // Obtain products in LS
    obtenerProductoLS() {
        let productosLS
        // verifiy if exists products in LS
        if (localStorage.getItem('products') === null) {
            productosLS = []
        }
        else {
            productosLS = JSON.parse(localStorage.getItem('products'))
        }
        return productosLS
    }

    // Update product Qty in LS 
    actualizaCantidad(id,value) {
        const productosLS = this.obtenerProductoLS()
        productosLS.forEach(function (producto) {
            if ( producto.id === id ) {
                producto.qty == value
                localStorage.setItem('products', JSON.stringify(productosLS))
            }
        })
        this. showTotalAmount()
    }

    // add product to cart
    agregarACarro(e) {
        e.preventDefault()
        if (e.target.classList.contains('addToCart')) {
            const producto = e.target.parentElement.parentElement.parentElement
            //Enviamos el producto seleccionado para tomar sus datos
            this.obtenerDatosProducto(producto)
        }
        this.showTotalAmount() 
    }

    // read product data
    obtenerDatosProducto(producto) {
        const productoInfo = {
            imagen: producto.querySelector('img').src,
            nombre: producto.querySelector('h5').textContent,
            precio: producto.querySelector('h5 span').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            qty: 1
        }

        let productosLS
        productosLS = this.obtenerProductoLS()
        productosLS.forEach(function (productosLS) {
            if (productosLS.id === productoInfo.id) {
                productosLS = productosLS.id
            }
        })

        if (productosLS === productoInfo.id) {
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
        this. showTotalAmount()
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
        document.getElementById("totalCart").innerHTML = 0
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


    calcTotalAmount() {

        let productoLS = cart.obtenerProductoLS()
        let totalAmount = 0;
    
        productoLS.forEach(function(producto,index){
            totalAmount = totalAmount + producto.precio * producto.qty
     
        })
        return totalAmount
    }

    showTotalAmount() {
        const totalAmount = this.calcTotalAmount()
        document.getElementById("totalCart").innerHTML = totalAmount
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

