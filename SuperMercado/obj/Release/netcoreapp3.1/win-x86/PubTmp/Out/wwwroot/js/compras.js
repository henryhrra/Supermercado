

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
		formdata.append("Precio_Compra", form.Precio_Compra.value);
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
	formdata.append("Precio_Compra", form.Precio_Compra.value.trim());
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
		url: "/Admin/Compras/GetAll",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		error: function (x, e) { alert(e.responseText); },
		success: function (objTrendList) {
			$.each(objTrendList, function (index, Data) {
				let compras = Data[0];
				console.log('Data', compras)
				compras.forEach((compra) => {
					var itemsTable = document.getElementById('itemsTable');
					var item = document.createElement('LI');
					item.innerHTML = `
<div class="row itemRow">

    <div class="d-md-none d-sm-block d-lg-block col-md-1 text-center ">
        <h5 class="${options.controller}-ID"><strong class="d-none d-sm-inline d-md-none">ID: </strong>${compra.idCompra}</h5>
    </div>

    <div class="col-md-3 col-lg-4 text-center">
        <div>
            <img src="${compra.producto.foto}" class="img-thumbnail zoomIMG">
            <h5 class="${options.controller}-Producto"><strong class="d-none d-sm-inline d-md-none">Producto: </strong>${compra.producto.nombre}</h5>
        </div>
    </div>
    <div class="col-md-2 text-center">
        <h5 class="${options.controller}-Proveedor"><strong class="d-none d-sm-inline d-md-none">Proveedor: </strong>${compra.producto.proveedor.nombre}</h5>
    </div>
    <div class="col-md-2 col-lg-1 text-center">
        <h5 class="${options.controller}-Cantidad"><strong class="d-none d-sm-inline d-md-none">Cantidad: </strong>${compra.cantidad}</h5>
    </div>
    <div class="col-md-2 text-center">
        <h5 class="${options.controller}-Precio" data-price="${compra.precio_Compra.toFixed(2).replaceAll('.', 'd')}"><strong class="d-none d-sm-inline d-md-none">Precio: </strong>${compra.precio_Compra.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h5>
    </div>
    <div class="col-md-2 col-lg-1 text-center">
        <h5 class="${options.controller}-Total" data-price="${(compra.precio_Compra * compra.cantidad).toFixed(2).replaceAll('.', 'd')}"><strong class="d-none d-sm-inline d-md-none">Total:</strong>${(compra.precio_Compra * compra.cantidad).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h5>
    </div>
    <div class="col-md-1 text-center">
        <ul class="nav justify-content-center">
            <li>
                <span onclick='Edit("/Admin/Compras/Get/${compra.idCompra}")' class="iconFuente icon-edit d-md-inline"><span class="path1 d-md-inline"></span><span class="path2 d-md-inline"></span><span class="path3 d-md-inline"></span><span class="path4 d-md-inline"></span><span class="path5 d-md-inline"></span></span>
            </li>
        </ul>
    </div>

    <hr>
    <a class="mostrarSubcategorias" data-toggle="collapse" href="#collapse${compra.idCompra}" role="button" aria-expanded="false" aria-controls="collapse${compra.idCompra}">
        <hr>
        Detalles
    </a>
</div>

<div class="collapse subCategorias" id="collapse${compra.idCompra}">

    <div class="detallesContainer">
        <div class="row itemDetalles">
            <div class="col-4"><span>Dirección:</span><strong class="infoSpan">${compra.direccion}</strong></div>
            <div class="col-4"><span>Nombre de contacto:</strong></span><strong class="infoSpan">${compra.nombreContacto}</strong></div>
            <div class="col-4"><span>Teléfono de contacto:</span><strong class="infoSpan">${compra.telefonoContacto}</strong></div>
        </div>

        <hr style="
    width: 100%;
    background: #959595;
    height: 1px;
">
        <div class="row itemDetalles">
            <div class="col-4"><span>Giro:</span><strong class="infoSpan">${compra.giro}</strong></div>
            <div class="col-4"><span>Correo Electrónico:</span><strong class="infoSpan">${compra.correo == null ? '--' : `<a href="mailto:${compra.pagina_Web}" target="_blank" class="text-primary text-wrap">${compra.correo}</a>`}</strong></div>
            <div class="col-4">	<span>Página Web:</span><strong class="infoSpan text-wrap">${compra.pagina_Web == null ? '--' : `<a href="${compra.pagina_Web}" target="_blank" class="text-primary">${compra.pagina_Web}</a>`}</strong></div>
        </div>
    </div>
</div>

`
					itemsTable.appendChild(item);
				})
			});
		}
	});
}
$(document).ready(cargarTodo);
function cargarTodo() {
	load().done(function () {
		try {
			DataTable = new List('Datalist', options);
			DataTable.on('updated', cargarVentanaFlotante);
		} catch (e) { }
		document.querySelector('.loading').classList.add('hidden');
		setTimeout(() => {
			document.querySelector('.loading').style.display = 'none';
		}, 1000)
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
	document.querySelector('#ddCheckContainer').innerHTML = `<div class="wrapper-demo">
                        <div id="ddCheck" class="wrapper-dropdown-1" tabindex="1">
                            <ul class="dropdown" tabindex="1">
                                <li><a >Borrar</a></li>
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
	var ddUser = new DropDown($('#ddUser'));
	$(document).click(function () {
		$('.wrapper-dropdown-User').removeClass('active');
	});
	var ddUser = new DropDown($('#ddCheck'));
	$(document).click(function () {
		$('.wrapper-dropdown-1').removeClass('active');
	});

	var ddlistadeProductos = new DropDown($('#ddlistadeProductos'));
	$(document).click(function () {
		$('.wrapper-dropdown-3').removeClass('active');
	});
}
function DropDown(el) {
	this.dd = el;
	this.placeholder = this.dd.children('span');
	this.opts = this.dd.find('ul.dropdown > li');
	this.val = '';
	this.index = -1;
	this.initEvents();
	this.milton();
}
DropDown.prototype = {
	milton: function () {
		var obj = this;
		obj.dd.on('blur', function (event) {
			$(this).removeClass('active');
			$('.text-danger').removeAttr('style');
			$('#RegistrarForm input').removeAttr('style');
			$('.invalidCampo').text('');
			return false;
		});
	},
	initEvents: function () {
		var obj = this;
		var extra = '';

		obj.dd.on('click', function (event) {
			if (!$(this)[0].classList.contains('active'))
				$(this).toggleClass('active');
			else {
				$(this).removeClass('active');
			}
			return false;
		});
		obj.opts.on('click', function () {
			var opt = $(this);
			if (obj.dd[0].id == 'ddUser') {
				alertf(opt.text())
				return
			}
			if (obj.dd[0].id == 'ddMostrar') {
				let error = mostrar(opt.text());
				console.log('Error', error)
				if (error == 'error') return;
				extra = 'Mostrar ' + error
				console.log('EXTRA', extra)
			}

			

			if (obj.dd[0].id == 'ddlistadeProveedores') {
				
				obj.placeholder[0].setAttribute('data-ID', opt[0].children[0].getAttribute('data-ID'))
				getProductos(opt[0].children[0].getAttribute('data-ID'));
			} if (obj.dd[0].id == 'ddlistadeProductos') {
				
				obj.placeholder[0].setAttribute('data-ID', opt[0].children[0].getAttribute('data-ID'))
			}
			
			console.log(opt.text())
			obj.val = opt.text() == 'Personalizado' ? '' : opt.text();
			options.milton = obj.index = opt.index();
			obj.placeholder.text(extra + obj.val);
		});
	},
	getValue: function () {
		return this.val;
	},
	getIndex: function () {
		return this.index;
	}
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
function getProductos(idProveedor) {

	$.ajax({
		type: "GET",
		url: "/Admin/Compras/GetAllProductosPP/" + idProveedor,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		error: function (x, e) { alert(e.responseText); },
		success: function (objTrendList) {

			$.each(objTrendList, function (index, data) {
				let productos = data;
				html = '';
				productos.forEach((producto) => {
					html += `<li><a  data-ID="${producto.idProducto}">${producto.nombre}</a></li>`;
				})

			});
			document.getElementById('listadeProductosForm').innerHTML = '';
			var div = document.createElement('DIV');
			div.innerHTML = `<div id="ddlistadeProductos" class="wrapper-dropdown-3" tabindex="1" style="min-width: 260px;">
				<span id="ddlistadeProductosSpan" data-ID>Seleccionar Producto</span>
                <ul class="dropdown" id="DDlistadeProductos"></ul>
             </div>`;


			document.getElementById('listadeProductosForm').appendChild(div);

			//options.cargandoCategorias = false;
			$('#DDlistadeProductos').html(html);

			var ddlistadeProductos = new DropDown($('#ddlistadeProductos'));
			$(document).click(function () {
				$('.wrapper-dropdown-3').removeClass('active');
			});


		}
	});



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
			form.Precio_Compra.value = data.precio_Compra;
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
	if (form.Precio_Compra.value.length === 0) {
		let nombre = $('.invalidPrecioCompra');
		nombre.text('Campo Obligatorio');
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		form.Precio_Compra.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
		form.Precio_Compra.addEventListener('click', obligatorio);
		return false;
	}

	if (!dinero.test(form.Precio_Compra.value)) {
		let nombre = $('.invalidPrecioCompra');
		nombre.html(`Precio inválido debe ser <strong style="color:yellow;">#####.##</strong>`);
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		form.Precio_Compra.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
		form.Precio_Compra.addEventListener('click', obligatorio);
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



