const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});


window.onload = function () {
    $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 80) {
            $('header').addClass('nav-fixed');
            $('.alert_fixed').addClass('fixed');
        } else {
            $('header').removeClass('nav-fixed');
            $('.alert_fixed').removeClass('fixed');;
        }

    });
    if (window.location.href.indexOf('Supermercado/Busqueda')==-1)
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "/cliente/Supermercado/GetProductos/",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            error: function (x, e) { alert(e.responseText); },
            success: function (objTrendList) {
                var datos = '';
                $.each(objTrendList, function (index, Data) {
                    console.log(Data)
                    let productos = Data[0];
                    productos.forEach((producto) => {
                        let precios = "", addClass = "";
                        let descu = producto.descuento * 100;
                        let Precio;
                        if (producto.descuento > 0) {
                            Precio = (producto.precio_de_Venta - (producto.precio_de_Venta * producto.descuento)).toFixed(2)
                            if (producto.descuento >= 0.7) {
                                addClass = "pr_flash bg_white";
                                descu = `<div class="fire">
									<div class="fire-left">
										<div class="main-fire"></div>
										<div class="particle-fire"></div>
									</div>
									<div class="fire-main">
										<div class="main-fire"></div>
										<div class="particle-fire"></div>
									</div>
									<div class="fire-right">
										<div class="main-fire"></div><span class="descuento">${producto.descuento * 100}%</span>
										<div class="particle-fire"></div>
									</div>
									<div class="fire-bottom">
										<div class="main-fire"></div>
									</div>
								</div>`
                            } else {
                                descu += '%'
                                addClass = "pr_flash bg_green";
                            }
                            precios += `<span class="price old">${producto.precio_de_Venta.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span><br>
                        <span class="price">$${Precio}</span>`

                        } else {
                            Precio = producto.precio_de_Venta;
                            precios += `<span class="price">${producto.precio_de_Venta.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>`
                        }

                        datos += ` <div class="col-xl-3 col-lg-4 col-sm-6" ><div class="product">
                    <span class="${producto.descuento > 0 ? addClass : ''}">${producto.descuento > 0 ? descu : ''}</span>
                    <div class="product_img">


                        <a href="#"><img src="${producto.foto}" alt="product_img1"></a>




                        <div class="product_action_box">
                            <ul class="list_none pr_action_btn">
                                <li>
								<a href="#0" class=" js-cd-add-to-cart" data-id="${producto.idProducto}" data-price="${Precio}">
                                   
                                        <span class="icon-add-to-cart carritoP"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span></span>
                                    </a>
                                </li>
                                <li><a href="/Cliente/Supermercado/Detalles/${producto.idProducto}" class="popup-ajax"><i class="fas fa-eye"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="product_info">
                        <h6><a href="#">${producto.nombre}</a></h6>
                        <div class="rating"><div class="product_rate" style="width:80%"></div></div>
                        ${precios}
                    </div>
                </div>
                </div>`
                    })

                    document.getElementById('mainProductos').innerHTML = datos;
                }
                )
            },
            complete: function () {
                carrito();
                document.querySelector('.loading').classList.add('hidden');
                setTimeout(() => {
                    document.querySelector('.loading').style.display = 'none';
                }, 1000)
            }
        });

    });
    if (window.location.href.indexOf('Supermercado/Busqueda') > -1) {
        let parabra = window.location.href.split('/').pop();
        $(document).ready(function () {
            $.ajax({
                type: "GET",
                url: "/cliente/Supermercado/BusquedaProductos/" + parabra,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                error: function (x, e) { alert(e.responseText); },
                success: function (objTrendList) {

                    if (objTrendList.error) {
                        console.log('Error')
                        document.querySelector('.loading').classList.add('hidden');
                        setTimeout(() => {
                            document.querySelector('.loading').style.display = 'none';
                        }, 1000)
                        return
                    }
                    if (objTrendList.datos.length == 0) {

                        $('#ResultadoText').text('No se encontraron productos')
                        document.querySelector('.loading').classList.add('hidden');
                        setTimeout(() => {
                            document.querySelector('.loading').style.display = 'none';
                        }, 1000)
                        console.log("HOLA", objTrendList.datos.length)

                        return
                    }
                    $('#ResultadoText').text('Mostrando resultados para: ' + parabra)
                    console.log(objTrendList.datos.length)

                    let productos = objTrendList.datos;
                    let datos = '';
                    productos.forEach((producto) => {
                        let precios = "", addClass = "";
                        let descu = producto.descuento * 100;
                        let Precio;
                        if (producto.descuento > 0) {
                            Precio = (producto.precio_de_Venta - (producto.precio_de_Venta * producto.descuento)).toFixed(2)
                            if (producto.descuento >= 0.7) {
                                addClass = "pr_flash bg_white";
                                descu = `<div class="fire">
									<div class="fire-left">
										<div class="main-fire"></div>
										<div class="particle-fire"></div>
									</div>
									<div class="fire-main">
										<div class="main-fire"></div>
										<div class="particle-fire"></div>
									</div>
									<div class="fire-right">
										<div class="main-fire"></div><span class="descuento">${producto.descuento * 100}%</span>
										<div class="particle-fire"></div>
									</div>
									<div class="fire-bottom">
										<div class="main-fire"></div>
									</div>
								</div>`
                            } else {
                                descu += '%'
                                addClass = "pr_flash bg_green";
                            }
                            precios += `<span class="price old">${producto.precio_de_Venta.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span><br>
                        <span class="price">$${Precio}</span>`

                        } else {
                            Precio = producto.precio_de_Venta;
                            precios += `<span class="price">${producto.precio_de_Venta.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>`
                        }

                        datos += ` <div class="col-xl-3 col-lg-4 col-sm-6" ><div class="product">
                    <span class="${producto.descuento > 0 ? addClass : ''}">${producto.descuento > 0 ? descu : ''}</span>
                    <div class="product_img">


                        <a href="#"><img src="${producto.foto}" alt="product_img1"></a>




                        <div class="product_action_box">
                            <ul class="list_none pr_action_btn">
                                <li>
								<a href="#0" class=" js-cd-add-to-cart" data-id="${producto.idProducto}" data-price="${Precio}">
                                   
                                        <span class="icon-add-to-cart carritoP"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span></span>
                                    </a>
                                </li>
                                <li><a href="/Cliente/Supermercado/Detalles/${producto.idProducto}" class="popup-ajax"><i class="fas fa-eye"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="product_info">
                        <h6><a href="#">${producto.nombre}</a></h6>
                        <div class="rating"><div class="product_rate" style="width:80%"></div></div>
                        ${precios}
                    </div>
                </div>
                </div>`
                    })
                    document.getElementById('mainProductos').innerHTML = datos;
                  
                
                },
                complete: function () {
                    carrito();
                    document.querySelector('.loading').classList.add('hidden');
                    setTimeout(() => {
                        document.querySelector('.loading').style.display = 'none';
                    }, 1000)
                }
            });

        });

    }


    $(function () {
        $("#picture-frame").zoomToo({
            magnify: 1,
            lensWidth: 200,
            lensHeight: 200
        });
    });

}