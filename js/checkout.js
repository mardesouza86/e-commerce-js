function paid() {

    $.get("/datos.json", (resultado, status) => {
        console.log(resultado);
    })

    const  productosLS = cart.obtenerProductoLS()

    const checkouProductos = productosLS.map((producto) => {
        return {
            title: producto.nombre,
            picture_url: producto.imagen,
            quantity: parseFloat(producto.qty),
            currency_id: "ARS",
            unit_price: parseFloat(producto.precio),
        };
    });

    console.log(checkouProductos)
    const elemento = { items: checkouProductos };
    
    $.ajaxSetup({
        headers: {
            Authorization:
                "Bearer TEST-684697565820871-092413-c2603593e9fb68df39164dbff6898810-93759575",
            "Content-Type": "application/json",
        },
    });

    $.post(
        "https://api.mercadopago.com/checkout/preferences",
        JSON.stringify(elemento),
        (respuesta, status) => {
            if (status == "success") {
                window.open(respuesta.init_point);
            }
        }
    );
}
