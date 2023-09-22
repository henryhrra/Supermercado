

var options = {
	valueNames: [
		'compra-ID',
		'compra-Producto',
		'compra-Proveedor',
		'compra-Cantidad',
		{ name: 'compra-Precio', attr: 'data-price' },
		{ name: 'compra-Total', attr: 'data-price' }],
	milton: 0,
	controller: 'compra',
	page: 5,
	pagination: true,
	milton: 0,
};

var DataTable;
var reload = false
var globalId;
$("body").on("submit", "#RegistrarForm", function (e) {
	if (!validar()) return;
	if (document.getElementById('btnAdd').innerText == 'Actualizar') {
		document.getElementById('btnAdd').innerText = 'Registrar'

		var form = $("#RegistrarForm")[0];
		var formdata = new FormData();
		formdata.append("idProducto", document.querySelector('#ddlistadeProductosSpan').getAttribute('data-id'));
		formdata.append("precio_de_Venta", form.precio_de_Venta.value);
		formdata.append("Descripcion", form.Descripcion.value);
		formdata.append("Fecha_compra", form.Fecha_compra.value);
		formdata.append("Cantidad", form.Cantidad.value);
		formdata.append("idCompra", globalId);

		$.ajax({
			type: "POST",
			url: "/Admin/Compras/Actualizar/",
			data: formdata,
			processData: false,
			contentType: false,
			success: function (data) {
				reload = true;
				$('#sidebar').removeClass('active');
				$('.overlay').removeClass('active');
				toastr.options = {
					"closeButton": true,
					"debug": false,
					"newestOnTop": true,
					"progressBar": true,
					"positionClass": "toast-top-right",
					"preventDuplicates": true,
					"onclick": null,
					"showDuration": "300",
					"hideDuration": "500",
					"timeOut": "3000",
					"extendedTimeOut": "1000",
					"showEasing": "swing",
					"hideEasing": "linear",
					"showMethod": "fadeIn",
					"hideMethod": "fadeOut"
				}
				toastr["success"](data.message)
				cargarTodo();
				resetFormulario();
				$('#sidebar').removeClass('active');
				$('.overlay').removeClass('active');

			}
		});
		return
	}
	var form = $("#RegistrarForm")[0];
	var formdata = new FormData();
	formdata.append("idProducto", document.querySelector('#ddlistadeProductosSpan').getAttribute('data-id'));
	formdata.append("precio_de_Venta", form.precio_de_Venta.value.trim());
	formdata.append("Descripcion", form.Descripcion.value.trim());
	formdata.append("Fecha_compra", form.Fecha_compra.value.trim());
	formdata.append("Cantidad", form.Cantidad.value.trim());
	$.ajax({
		type: "POST",
		url: "/Admin/Compras/Registrar",
		data: formdata,
		processData: false,
		contentType: false,
		success: function (data) {
			toastr.options = {
				"closeButton": true,
				"debug": false,
				"newestOnTop": true,
				"progressBar": true,
				"positionClass": "toast-top-right",
				"preventDuplicates": true,
				"onclick": null,
				"showDuration": "300",
				"hideDuration": "500",
				"timeOut": "3000",
				"extendedTimeOut": "1000",
				"showEasing": "swing",
				"hideEasing": "linear",
				"showMethod": "fadeIn",
				"hideMethod": "fadeOut"
			}
			console.log(data)
			if (data.success) {
				reload = true;
				$('#sidebar').removeClass('active');
				$('.overlay').removeClass('active');
				toastr["success"](data.message)
				cargarTodo();
				resetFormulario();
			} else {
				toastr["error"](data.message)
			}
		}
	});
});

function load(Cat = false) {
	if (DataTable != undefined) {
		DataTable.remove();
	}
	return $.ajax({
		type: "GET",
		url: "/Cliente/Compras/GetAll",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		error: function (x, e) { alert(e.responseText); },
		success: function (objTrendList) {
			document.querySelector('.loading').classList.add('hidden');
			setTimeout(() => {
				document.querySelector('.loading').style.display = 'none';
			}, 1000)
			$.each(objTrendList, function (index, Data) {
				console.log(Data)
				if (Data.length <= 0) {
					document.querySelector('.loading').classList.add('hidden');
					setTimeout(() => {
						document.querySelector('.loading').style.display = 'none';
					}, 1000)
					return;
				}
				let compras = Data;
				
				let totalApagar = 0;
				var itemsTable = document.getElementById('itemsTable');
				let ventaID,ventaFecha,ventaEstado;
				compras.forEach((compra) => {
					compra = compra[0];
					console.log(compra)
					var compraLI = document.createElement('LI');
					let productoDiv = '';
					compra.forEach((producto) => {
						ventaID = producto.venta.idVenta;
						ventaFecha = producto.venta.fecha_venta
						ventaEstado = producto.venta.aprobada
						let total = (producto.cantidad * (producto.producto.precio_de_Venta - (producto.producto.precio_de_Venta * producto.descuento)))
						totalApagar += total;
						productoDiv += `<div class="row itemRowSub">
						<div class="col-md-2">
							<img class="img-fluid zoomIMG" src="${producto.producto.foto}" alt="${producto.producto.nombre}" />
						</div>
						<div class="col-md-3 text-center">
							<h5 title="Descuento" class="categoria-ID">${producto.producto.nombre}</h5>
						</div>
						<div class="col-md-2 text-center">
							<h5 title="Precio Unitario" class="categoria-Nombre">${producto.producto.precio_de_Venta.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h5>
						</div>
						<div class="col-md-2 text-center">
							<p class="categoria-Descripcion">${(producto.descuento*100)+'%'}</p>
						</div>
						<div class="col-md-2 text-center">
							<h5 title="Total" class="categoria-Nombre">${total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h5>
						</div>
						

					</div>`
					})
					compraLI.innerHTML = `<div class="row itemRow">

    <div class=" d-sm-block d-lg-block col-md-3 text-center ">
        <h5 class="${options.controller}-ID"><strong class="d-none d-sm-inline d-md-none">ID: </strong>${(new Date(ventaFecha)).toLocaleDateString('es', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h5>
    </div>
     <div class=" d-sm-block d-lg-block col-md-3 text-center ">
        <h5 class="${options.controller}-ID"><strong class="d-none d-sm-inline d-md-none">ID: </strong>${ventaEstado ? 'AProbada' : ventaEstado==null?'Pendiente':'Rechazada'}</h5>
    </div>
     <div class=" d-sm-block d-lg-block col-md-3 text-center ">
        <h5 class="${options.controller}-ID"><strong class="d-none d-sm-inline d-md-none">ID: </strong>${totalApagar.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h5>
    </div>
     <div class=" d-sm-block d-lg-block col-md-3 text-center ">
							${ventaEstado ? `` : `<i class="fas fa-trash text-trash "></i>`}
    </div>


 <hr>
    <a class="mostrarSubcategorias" data-toggle="collapse" href="#collapse${ventaID}" role="button" aria-expanded="false" aria-controls="collapse${ventaID}">
        <hr>
        Detalles
    </a>
    </div>

<div class="collapse subCategorias" id="collapse${ventaID}">

    <div class="detallesContainer">
		${productoDiv}
    </div>
</div>

`


						;
					itemsTable.appendChild(compraLI)

				});
				

				/*
				compras.forEach((compra) => {
					var itemsTable = document.getElementById('itemsTable');
					var item = document.createElement('LI');
					var itemsTableProducto = document.createElement('UL');
					compra.forEach((producto) => {

					var item2 = document.createElement('LI');
						let total = (producto.cantidad * (producto.producto.precio_de_Venta - (producto.producto.precio_de_Venta * producto.descuento)))
						totalApagar += total;
						
						item2.innerHTML = `
<div class="row itemRow">

    <div class="d-md-none d-sm-block d-lg-block col-md-1 text-center ">
        <h5 class="${options.controller}-ID"><strong class="d-none d-sm-inline d-md-none">ID: </strong>${producto.idVenta}</h5>
    </div>

    <div class="col-md-3 col-lg-4 text-center">
        <div>
            <img src="${producto.foto}" class="img-thumbnail zoomIMG">
            <h5 class="${options.controller}-Producto"><strong class="d-none d-sm-inline d-md-none">Producto: </strong>${producto.nombre}</h5>
        </div>
    </div>
    <div class="col-md-2 text-center">
        <h5 class="${options.controller}-Proveedor"><strong class="d-none d-sm-inline d-md-none">Proveedor: </strong>${producto.nombre}</h5>
    </div>
    <div class="col-md-2 col-lg-1 text-center">
        <h5 class="${options.controller}-Cantidad"><strong class="d-none d-sm-inline d-md-none">Cantidad: </strong>${producto.cantidad}</h5>
    </div>

    <div class="col-md-2 col-lg-1 text-center">
        <h5 class="${options.controller}-Total" data-price="${(producto.producto.precio_de_Venta * producto.cantidad).toFixed(2).replaceAll('.', 'd')}"><strong class="d-none d-sm-inline d-md-none">Total:</strong>${(producto.producto.precio_de_Venta * producto.cantidad).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h5>
    </div>
    <div class="col-md-1 text-center">
        <ul class="nav justify-content-center">
            <li>
                <span onclick='Edit("/Admin/Compras/Get/${producto.idVenta}")' class="iconFuente icon-edit d-md-inline"><span class="path1 d-md-inline"></span><span class="path2 d-md-inline"></span><span class="path3 d-md-inline"></span><span class="path4 d-md-inline"></span><span class="path5 d-md-inline"></span></span>
            </li>
        </ul>
    </div>

    <hr>
    <a class="mostrarSubcategorias" data-toggle="collapse" href="#collapse${producto.idDetallesVenta}" role="button" aria-expanded="false" aria-controls="collapse${producto.idDetallesVenta}">
        <hr>
        Detalles
    </a>
</div>

<div class="collapse subCategorias" id="collapse${producto.idDetallesVenta}">

    <div class="detallesContainer">
         <div class="row itemDetalles">
        <div class="col-4"><img src="${producto.producto.foto}" /></div>
        <div class="col-4"><span><strong class="infoSpan">Nombre:</strong></span><strong class="infoSpan">${producto.producto.nombre}</strong></div>
        <div class="col-4"><span>Precio Unitario:</span><strong class="infoSpan">${producto.producto.precio_de_Venta.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</strong></div>
    </div>

        <hr style="
    width: 100%;
    background: #959595;
    height: 1px;
">
        <div class="row itemDetalles">
            <div class="col-4"><span>Descuento:</span><strong class="infoSpan">${(producto.descuento * 100) + "%"}</strong></div>
            <div class="col-4"><span>Cantidad:</span><strong class="infoSpan">${producto.cantidad}</strong></div>
            <div class="col-4">	<span>Total:</span><strong class="infoSpan text-wrap">${total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</strong><br><span>Ahorro:</span><strong class="infoSpan text-wrap">${((producto.cantidad * producto.producto.precio_de_Venta) - total).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</strong></span></span></div>
        </div>
    </div>
</div>`
						itemsTableProducto.appendChild(item2);
					item.appendChild(itemsTableProducto);
					})
					itemsTable.appendChild(item);
				});
				*/
			});
		}
	});
	document.querySelector('.loading').classList.add('hidden');
	setTimeout(() => {
		document.querySelector('.loading').style.display = 'none';
	}, 1000)
}
$(document).ready(cargarTodo);
function cargarTodo() {
	load().done(function () {
		try {
			DataTable = new List('Datalist', options);
			DataTable.on('updated', cargarVentanaFlotante);
		} catch (e) { }
		precargarDropdowns();
		cargarVentanaFlotante();
	});
}
function precargarDropdowns() {
	var elementos = ['Todo', 'ID', 'Producto', 'Proveedor', 'Cantidad', 'Precio']
	document.querySelector('#ddMostrarContainer').innerHTML = `<div class="wrapper-demo">
                <div id="ddMostrar" class="wrapper-dropdown-3" tabindex="1">
                    <span id="MostrarContent">Mostrar 5</span>
                    <ul class="dropdown" id="mostrarDD">
                    </ul>
                </div>
            </div>`;

	document.querySelector('#ddContainer').innerHTML = `<div class="wrapper-demo">
                <div id="dd" class="wrapper-dropdown-3" tabindex="1">
                    <span id="FiltroContent">Todo</span>
                    <ul class="dropdown" id="DDFiltro">
                    </ul>
                </div>
            </div>`;
	var DDMostrar = document.getElementById('mostrarDD');
	var DDFiltro = document.getElementById('DDFiltro');
	var DDMostrarText = document.getElementById('MostrarContent');
	let html = '';
	elementos.forEach((EL, index) => {
		html += `<li><a >${EL}</a></li>`
	});
	DDFiltro.innerHTML = html;
	html = '';
	if (DataTable == undefined) {
		DDMostrarText.innerText = 'Sin registros'
		html += `<li><a >No hay registros</a></li>`;
		DDMostrar.innerHTML = html;

	} else {
		if (DataTable.size() <= 5) {
			DDMostrarText.innerText = 'Mostrar ' + DataTable.size()
			html += `<li><a >${DataTable.size()}</a></li>`;
		} else {
			if (DataTable.size() == options.page)
				DDMostrarText.innerText = 'Todos'
			if (DataTable.size() > 20 && options.page < DataTable.size())
				DDMostrarText.innerText = 'Mostrar ' + options.page
			if (options.page == 5)
				DDMostrarText.innerText = 'Mostrar 5'
		}
		if (DataTable.size() >= 5)
			html += `<li><a >5</a></li>`;
		if (DataTable.size() >= 10)
			html += `<li><a >10</a></li>`;
		if (DataTable.size() >= 20)
			html += `<li><a >20</a></li>`;
		if (DataTable.size() >= 50)
			html += `<li><a >50</a></li>`;
		html += `<li><a >Todos</a></li>
            <li><a >Personalizado</a></li>`;
		DDMostrar.innerHTML = html;
	}
	prepararDropdowns();
}
function prepararDropdowns() {
	/*
	$("#sidebar").mCustomScrollbar({
		theme: "minimal"
	});
	*/
	$('#dismiss, .overlay').on('click', function () {

		resetFormulario()
	});
	$('#sidebarCollapse').on('click', formulario);
	var dd = new DropDown($('#dd'));
	$(document).click(function () {
		$('.wrapper-dropdown-3').removeClass('active');
	});
	var dd = new DropDown($('#ddMostrar'));
	$(document).click(function () {
		$('.wrapper-dropdown-3').removeClass('active');
	});

	var ddUser = new DropDown($('#ddCheck'));
	$(document).click(function () {
		$('.wrapper-dropdown-1').removeClass('active');
	});


}
function cargarVentanaFlotante() {
	var modal = document.getElementById("myModalPopUpImg");
	var span = document.getElementsByClassName("closePopUpImg")[0];
	span.onclick = function () {
		modal.style.display = "none";
	}
	document.querySelectorAll(".zoomIMG").forEach((image) => {
		image.onclick = function () {
			var img = this.src;
			var modalImg = document.getElementById("img01");
			var captionText = document.getElementById("captionPopUpImg");
			modal.style.display = "block";
			modalImg.src = this.src;
			captionText.innerHTML = this.alt;

		}
	})
}
function ordenar(por, id, el) {
	if (DataTable == undefined) return
	var asc = document.querySelectorAll('.icon-sort-asc');
	var desc = document.querySelectorAll('.icon-sort-desc');
	asc.forEach((ASC) => {
		ASC.classList.replace('icon-sort-asc', 'icon-sort-none');
		ASC.parentElement.parentElement.id = ASC.parentElement.parentElement.id.replaceAll('asc', 'none')
	})
	desc.forEach((DESC) => {
		DESC.classList.replace('icon-sort-desc', 'icon-sort-none');
		DESC.parentElement.parentElement.id = DESC.parentElement.parentElement.id.replaceAll('desc', 'none');
	})
	if (id.indexOf('none') > 1) {
		DataTable.sort(por, { order: "asc" })
		el.id = id.replace('none', 'asc')
		el.children[0].children[0].classList.replace('icon-sort-none', 'icon-sort-asc')
	} else if (id.indexOf('asc') > 1) {
		DataTable.sort(por, { order: "desc" })
		el.id = id.replace('asc', 'desc')
		el.children[0].children[0].classList.replace('icon-sort-none', 'icon-sort-desc')
	} else {
		DataTable.sort(por, { order: "asc" })
		el.id = id.replace('desc', 'asc')
		el.children[0].children[0].classList.replace('icon-sort-none', 'icon-sort-asc')
	}
}
function mostrar(C, toast = false, c = 0) {
	if (DataTable == undefined) return 'error'
	if (C == "Todos") {
		options.page = DataTable.size();
		DataTable.show(1, DataTable.size());
		return ''
	} else if (C == 'Personalizado' && !toast) {
		const Toast = Swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: true,
			timer: 0,
			timerProgressBar: false,
			showCancelButton: true
		})
		Toast.fire({
			html:
				'<span>Paginas a mostrar</span><input id="swal-input1" class="swal2-input" type="number" min=0>',
			focusConfirm: false,
			preConfirm: () => {
				if (document.getElementById('swal-input1').value === 0)
					mostrar(document.getElementById('swal-input1').value, true, 0)
				else
					mostrar(document.getElementById('swal-input1').value, true, +document.getElementById('swal-input1').value)
			}
		})
		return 'error'
	} else if (toast) {
		if (c > DataTable.size()) {
			toastr.options = {
				"closeButton": true,
				"debug": false,
				"newestOnTop": true,
				"progressBar": true,
				"positionClass": "toast-top-right",
				"preventDuplicates": true,
				"onclick": null,
				"showDuration": "300",
				"hideDuration": "500",
				"timeOut": "5000",
				"extendedTimeOut": "1000",
				"showEasing": "swing",
				"hideEasing": "linear",
				"showMethod": "fadeIn",
				"hideMethod": "fadeOut"
			}
			toastr["error"]("La cantidad especificada excede los registros maximos:" + DataTable.size(), "Error")
			return 'error'
		}
		DataTable.show(1, c);
		options.page = c;
		return +c
	} else if (C == 'No hay registros') {
		return 'error'
	} else {
		DataTable.show(1, (+C));
		options.page = +C
		return ''
	}
}
function toaster() {
	if (document.getElementById('floatInput').value === 0)
		mostrar(document.getElementById('floatInput').value, true, 0)
	else
		mostrar(document.getElementById('floatInput').value, true, +document.getElementById('floatInput').value)
	//toastr.clear();
}
function toastFuncion(C, toast, c) {
	mostrar(C, toast, c);
}
function formulario() {


	$.ajax({
		type: "GET",
		url: "/Admin/Compras/GetAllProveedores",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		error: function (x, e) { alert(e.responseText); },
		success: function (objTrendList) {

			$.each(objTrendList, function (index, data) {
				let proveedores = data;
				html = '';
				proveedores.forEach((proveedor) => {
					html += `<li><a  data-ID="${proveedor.idProveedor}">${proveedor.nombre}</a></li>`;
				})

			});
			document.getElementById('listadeProveedoresForm').innerHTML = '';
			var div = document.createElement('DIV');
			div.innerHTML = `<div id="ddlistadeProveedores" class="wrapper-dropdown-3" tabindex="1" style="min-width: 260px;">
				<span id="ddlistadeProveedoresSpan" data-ID>Seleccionar Proveedor</span>
                <ul class="dropdown" id="DDlistadeProveedores"></ul>
             </div>`;


			document.getElementById('listadeProveedoresForm').appendChild(div);

			//options.cargandoCategorias = false;
			$('#DDlistadeProveedores').html(html);

			var ddlistadeProveedores = new DropDown($('#ddlistadeProveedores'));
			$(document).click(function () {
				$('.wrapper-dropdown-3').removeClass('active');
			});


		}
	});





	$('#sidebar').addClass('active');
	$('.overlay').addClass('active');
	$('.collapse.in').toggleClass('in');
	$('a[aria-expanded=true]').attr('aria-expanded', 'false');
}
function Edit(url) {
	globalId = url.split('/').pop()
	console.log('globalId = ' + globalId)
			formulario();
	$.ajax({
		type: 'GET',
		url: url,
		success: function (data) {
			console.log(data)
			data = data.data[0];
			var DDlistadeProveedores = document.getElementById('DDlistadeProveedores');
			var form = $("#RegistrarForm")[0];
			form.precio_de_Venta.value = data.precio_de_Venta;
			form.Cantidad.value = data.cantidad;
			form.Descripcion.value = data.descripcion;
			form.Fecha_compra.value = data.fecha_compra;
			DDlistadeProveedores.querySelector(`li > a[data-id="${data.producto.idProveedor}"]`).click();
			setTimeout(function () {
				$('.wrapper-dropdown-3').removeClass('active');
				var ddlistadeProductosSpan = document.getElementById('ddlistadeProductosSpan');
				ddlistadeProductosSpan.innerText = ddlistadeProductosSpan.innerText = data.producto.nombre;;
				ddlistadeProductosSpan.setAttribute('data-id', data.producto.idProducto);
			}, 300);
			document.getElementById("btnAdd").innerText = 'Actualizar';
			
		}
	});
}
function resetFormulario() {
	if (document.getElementById('btnAdd').innerText == 'Actualizar') {
		document.getElementById('btnAdd').innerText = 'Registrar'
	}
	document.querySelector("#ddlistadeProductosSpan").setAttribute('data-id', '')
	document.querySelector("#ddlistadeProductosSpan").innerText = "Seleccionar Categoría"
	document.querySelector("#DDlistadeProductos").innerHTML =`<li><a  data-id="1">Primero Seleccionar Proveedor</a></li>`

	$('#RegistrarForm input').removeAttr('style')
	$('.invalidCampo').text('')
	$('#sidebar').removeClass('active');
	$('.overlay').removeClass('active');
	$("#RegistrarForm")[0].reset();
}
function obligatorio(e) {
	console.log(e.target)
	$('.invalidCampo').text('')
	if (e.target.parentElement.parentElement.children[0].children[1] != undefined) {
		e.target.removeEventListener('click', obligatorio);
		e.target.setAttribute('style', '');
	}
	else {
		e.target.parentElement.parentElement.parentElement.children[0].children[1].innerText = ''
		e.target.parentElement.setAttribute('style', '');
	}
	e.target.setAttribute('style', '');
	e.target.removeEventListener('click', obligatorio);
}
function validar() {
	let dinero = /^\d{1,5}(?:[.]\d{3})*(?:[.,]\d{2})$/
	let cantidad = /^([0-9]{1,4})$/
	var form = document.getElementById('RegistrarForm');
	var Producto = document.querySelector('#ddlistadeProductosSpan');
	if (Producto.getAttribute('data-id').length === 0) {
		let nombre = $('.invalidProducto');
		nombre.text('Campo Obligatorio');
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		Producto.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
		Producto.addEventListener('click', obligatorio);
		return false;
	}
	if (form.precio_de_Venta.value.length === 0) {
		let nombre = $('.invalidPrecioCompra');
		nombre.text('Campo Obligatorio');
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		form.precio_de_Venta.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
		form.precio_de_Venta.addEventListener('click', obligatorio);
		return false;
	}

	if (!dinero.test(form.precio_de_Venta.value)) {
		let nombre = $('.invalidPrecioCompra');
		nombre.html(`Precio inválido debe ser <strong style="color:yellow;">#####.##</strong>`);
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		form.precio_de_Venta.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
		form.precio_de_Venta.addEventListener('click', obligatorio);
		return false;
	}

    
	if (!cantidad.test(form.Cantidad.value)) {
		let nombre = $('.invalidCantidad');
		nombre.html(`Cantidad inválida debe ser entre <strong style="color:yellow;">0-9999</strong>`);
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		form.Cantidad.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
		form.Cantidad.addEventListener('click', obligatorio);
		return false;
	}
	if (form.Fecha_compra.value.length===0) {

		let nombre = $('.invalidFecha');
		nombre.html(`Campo obligatorio`);
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		form.Fecha_compra.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
		form.Fecha_compra.addEventListener('click', obligatorio);
		return false;
	}

	let fechaCompra = new Date(form.Fecha_compra.value);
	let hoy = new Date();
	if (fechaCompra>hoy) {
		let nombre = $('.invalidFecha');
		nombre.html(`Fecha no válida`);
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		form.Fecha_compra.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
		form.Fecha_compra.addEventListener('click', obligatorio);
			return false;
	}
	return true;
}



