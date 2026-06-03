// 🚀 Cuando la página termine de cargar
document.addEventListener('DOMContentLoaded', function() {
    const contenedor = document.getElementById('listaProductos');
    contenedor.innerHTML = ''; // Borramos el mensaje de "Cargando..."

    //  USAMOS LOS DATOS QUE VINIERON DE productos.html
    if (productos.length === 0) {
        contenedor.innerHTML = '<p class="cargando">⚠️ No hay productos disponibles</p>';
        return;
    }

    //  MOSTRAMOS CADA PRODUCTO EN PANTALLA
    productos.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'producto'; // Usamos el estilo que definimos

        tarjeta.innerHTML = `
            <img src="imagenes/${producto.imagen}" alt="${producto.nombre}"
                 onerror="this.src='https://via.placeholder.com/300x220?text=Imagen+no+disponible'">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <div class="precio">$ ${producto.precio.toLocaleString('es-CO')}</div>
            <button class="boton-pedir" onclick="abrirFormularioPedido(
                ${producto.id},
                '${producto.nombre.replace(/'/g, "\\'")}',
                ${producto.precio}
            )">📝 Hacer Pedido</button>
        `;

        contenedor.appendChild(tarjeta);
    });
});

// 

//FUNCIÓN PARA ABRIR EL FORMULARIO DE PEDIDO
function abrirFormularioPedido(idProducto, nombreProducto, precioProducto) {
    // Creamos la ventana del formulario
    const ventana = document.createElement('div');
    ventana.id = 'ventanaPedido';
    ventana.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        padding: 20px;
    `;

    // Contenido del formulario
    ventana.innerHTML = `
        <div style="background-color: white; padding: 30px; border-radius: 10px; width: 100%; max-width: 450px;">
            <h3 style="color: #2c3e50; margin-bottom: 15px;">Pedido de: ${nombreProducto}</h3>
            <p style="color: #27ae60; font-size: 1.2rem; font-weight: bold; margin-bottom: 20px;">
                Precio unitario: $ ${precioProducto.toLocaleString('es-CO')}
            </p>

            <form action="procesar_pedido.html" method="GET">
                <input type="hidden" name="id_producto" value="${idProducto}">
                <input type="hidden" name="nombre_producto" value="${nombreProducto}">
                <input type="hidden" name="precio" value="${precioProducto}">

                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; color: #333;">Cantidad:</label>
                    <input type="number" name="cantidad" value="1" min="1" required
                           style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 1rem;">
                </div>

                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; color: #333;">Nombre Completo:</label>
                    <input type="text" name="nombre" required
                           style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 1rem;">
                </div>

                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; color: #333;">Teléfono:</label>
                    <input type="text" name="telefono" required
                           style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 1rem;">
                </div>

                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; color: #333;">Correo Electrónico:</label>
                    <input type="email" name="correo"
                           style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 1rem;">
                </div>

                <div style="margin-bottom: 25px;">
                    <label style="display: block; margin-bottom: 5px; color: #333;">Dirección de Entrega:</label>
                    <input type="text" name="direccion" required
                           style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 1rem;">
                </div>

                <div style="display: flex; gap: 15px;">
                    <button type="button" onclick="cerrarFormulario()"
                            style="flex: 1; padding: 12px; background-color: #bdc3c7; color: #333; border: none; border-radius: 5px; font-size: 1rem; cursor: pointer;">
                        Cancelar
                    </button>
                    <button type="submit"
                            style="flex: 1; padding: 12px; background-color: #27ae60; color: white; border: none; border-radius: 5px; font-size: 1rem; cursor: pointer;">
                        Confirmar Pedido
                    </button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(ventana);
}

// 🚪 FUNCIÓN PARA CERRAR EL FORMULARIO
function cerrarFormulario(){
    const ventana = document.getElementById('ventanaPedido');
    if(ventana){
        ventana.remove();
    }
}