
var options = {
	valueNames: [
		'producto-ID',
		'producto-Nombre',
		'producto-Categoria',
		{name: 'producto-Precio', attr: 'data-price' },
		'producto-Existencias',
		'producto-subcategoria'],
	page: 5,
	pagination: true,
	milton: 0,
	controller:'producto',
	nuevosDepartamentos: null,
	nuevossubcategorias: null,
	cargandoDepartamentos: false,
	cargandosubcategorias: false,
	detSubca: { categorias: '', subcategorias: {} }
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
		formdata.append("Nombre", form.Nombre.value.trim());
		if (form['file-1[]'].files[0] != undefined)
			formdata.append("Foto", form['file-1[]'].files[0]);
		else
			formdata.append("Foto", form["Url-imagen"].value.trim());
		formdata.append("Descripcion", form.Descripcion.value.trim());
		formdata.append("Precio_de_Venta", parseFloat(form.Precio_de_Venta.value).toFixed(2));
		formdata.append("idSubCategoria", document.querySelector('#ddlistadeSubcategoriasSpan').getAttribute('data-id'));
		formdata.append("idSucursal", document.querySelector('#ddlistadeSucursalesSpan').getAttribute('data-id'));
		formdata.append("idProveedor", document.querySelector('#ddlistadeProveedoresSpan').getAttribute('data-id'));
		formdata.append("idProducto", globalId);

		$.ajax({
			type: "POST",
			url: "/Admin/Productos/Actualizar/" + globalId,
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
	formdata.append("Nombre", form.Nombre.value.trim());
	if (form['file-1[]'].files[0] != undefined)
		formdata.append("Foto", form['file-1[]'].files[0]);
	else
		formdata.append("Foto", form["Url-imagen"].value.trim());
	formdata.append("Descripcion", form.Descripcion.value.trim());
	formdata.append("Precio_de_Venta", parseFloat(form.Precio_de_Venta.value).toFixed(2));
	formdata.append("idSubCategoria", document.querySelector('#ddlistadeSubcategoriasSpan').getAttribute('data-id'));
	formdata.append("idSucursal", document.querySelector('#ddlistadeSucursalesSpan').getAttribute('data-id'));
	formdata.append("idProveedor", document.querySelector('#ddlistadeProveedoresSpan').getAttribute('data-id'));
	$.ajax({
		type: "POST",
		url: "/Admin/Productos/Registrar",
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
		url: "/Admin/Productos/GetAll",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		error: function (x, e) { alert(e.responseText); },
		success: function (objTrendList) {
			$.each(objTrendList, function (index, Data) {
				let Productos = Data[0];
				Productos.forEach((producto) => {
					var itemsTable = document.getElementById('itemsTable');
					var item = document.createElement('LI');
					item.innerHTML = `<div class="row itemRow">
                <div class="col-md-1">
                    <img class="img-fluid zoomIMG" src="${producto.foto}" alt="" />
                </div>
                <div class="col-md-1 text-center">
                    <h5 class="producto-ID">${producto.idProducto}</h5>
                </div>
                <div class="col-md-2 text-center">
                    <h5 class="${options.controller}-Nombre">${producto.nombre}</h5>
                </div>
                <div class="col-md-2 text-center">
                    <p class="${options.controller}-Categoria">${producto.subCategoria.nombre}</p>
                </div>
					<div class="col-md-2 text-center">
                    <p class="${options.controller}-Precio" data-price="${producto.precio_de_Venta.toFixed(2).replaceAll('.','d')}">${producto.precio_de_Venta.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                </div>
					<div class="col-md-2 text-center">
                    <span class="${options.controller}-Existencias">${producto.existencias}</span>
                </div>
                <div class="col-md-1 col-lg-2 text-center">
                    <ul class="nav">
                       
                        <li>
                            <span onclick='Edit("/Admin/Productos/Get/${producto.idProducto}")' class="iconFuente icon-edit d-md-inline"><span class="path1 d-md-inline"></span><span class="path2 d-md-inline"></span><span class="path3 d-md-inline"></span><span class="path4 d-md-inline"></span><span class="path5 d-md-inline"></span></span>
                        </li>
                        <li>
                            <span onclick='Delete("/Admin/Productos/Delete/${producto.idProducto}")' class=" iconFuente icon-remove d-md-inline"><span class="path1 d-md-inline"></span><span class="path2 d-md-inline"></span></span>
                        </li>
                        <li>
                            <input class="checkZoom d-md-inline" type="checkbox" value="" />
                        </li>
                    </ul>
                </div>


				<hr>
				<a class="mostrarSubcategorias" data-toggle="collapse" href="#collapse${producto.idProducto}" role="button" aria-expanded="false" aria-controls="collapse${producto.idProducto}">
				<hr>
				 Detalles
				</a>
            </div>
			<div class="collapse subCategorias" id="collapse${producto.idProducto}">



			<div class="detallesContainer">
<div class="row itemDetalles">
			<div class="col-4"><span>Categoria:<strong class="infoSpan">${producto.subCategoria.categoria.nombre}</strong></span><img src="${producto.subCategoria.categoria.foto}" class="img-fluid zoomIMG"></div>
				<div class="col-4"><span>Subcategoría:<strong class="infoSpan">${producto.subCategoria.nombre}</strong></strong></span><img src="${producto.subCategoria.foto}" class="img-fluid zoomIMG"></div>
			<div class="col-4"><span>Proveedor:<strong class="infoSpan">${producto.proveedor.nombre}</strong></span><img src="${producto.proveedor.foto}" class="img-fluid zoomIMG"></div></div>
			
			
<hr style="
    width: 100%;
    background: #959595;
    height: 1px;
">
<div class="row itemDetalles">
			<div class="col-4"><span>Existencias Minimas:<strong class="infoSpan">${producto.existencias_Minimas == null ? 0 : producto.existencias_Minimas}</strong></span></div>
			<div class="col-4"><span>Sucursal:<strong class="infoSpan">${producto.sucursal.nombre}</strong></span></div>
			<div class="col-4">	<span>Descripción:<strong class="infoSpan">${producto.descripcion}</strong></span></div></div>
<hr style="
    width: 100%;
    background: #959595;
    height: 1px;
">
<div class="row itemDetalles">
			<div class="col-4"><span>Fecha de Registro:<strong class="infoSpan">${producto.fecha_registro}</strong></span></div>
			<div class="col-4">	<span>Precio de Compra:<strong class="infoSpan">${producto.precio_de_Compra == null ? 'No especificado' : producto.precio_de_Compra.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</strong></span></div>
			<div class="col-4">	<span>Proveedor Contacto:<strong class="infoSpan">${producto.proveedor.nombreContacto}</strong></span></div>
			</div></div>


</div>`
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
	var elementos = ['Todo', 'producto-ID', 'Nombre', 'Categoría', 'Precio', 'Existencias']
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
                                <li><a>Borrar</a></li>
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
		html += `<li><a>${EL}</a></li>`
	});
	DDFiltro.innerHTML = html;
	html = '';
	if (DataTable == undefined) {
		DDMostrarText.innerText = 'Sin registros'
		html += `<li><a>No hay registros</a></li>`;
		DDMostrar.innerHTML = html;

	} else {
		if (DataTable.size() <= 5) {
			DDMostrarText.innerText = 'Mostrar ' + DataTable.size()
			html += `<li><a>${DataTable.size()}</a></li>`;
		} else {
			if (DataTable.size() == options.page)
				DDMostrarText.innerText = 'Todos'
			if (DataTable.size() > 20 && options.page < DataTable.size())
				DDMostrarText.innerText = 'Mostrar ' + options.page
			if (options.page == 5)
				DDMostrarText.innerText = 'Mostrar 5'
		}
		if (DataTable.size() >= 5)
			html += `<li><a>5</a></li>`;
		if (DataTable.size() >= 10)
			html += `<li><a>10</a></li>`;
		if (DataTable.size() >= 20)
			html += `<li><a>20</a></li>`;
		if (DataTable.size() >= 50)
			html += `<li><a>50</a></li>`;
		html += `<li><a>Todos</a></li>
            <li><a>Personalizado</a></li>`;
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
				if (error == 'error') return;
				extra = 'Mostrar ' + error
			}

			if (obj.dd[0].id == 'ddlistadeCategorias') {
				obj.placeholder[0].setAttribute('data-ID', opt[0].children[0].getAttribute('data-ID'))
				document.getElementById('listadeSubcategoriasForm').innerHTML = '';
				var div = document.createElement('DIV');
				div.innerHTML = `<div id="ddlistadeSubcategorias" class="wrapper-dropdown-3" tabindex="1" style="min-width: 260px;">
				<span id="ddlistadeSubcategoriasSpan" data-ID>Seleccionar subcategoria</span>
                <ul class="dropdown" id="DDlistadeSubcategorias"></ul>
             </div>`;
				document.getElementById('listadeSubcategoriasForm').appendChild(div);

				$('#DDlistadeSubcategorias').html(options.detSubca.subcategorias[opt[0].children[0].innerText.replaceAll(' ', '')]);

				var ddlistadeSubcategorias = new DropDown($('#ddlistadeSubcategorias'));
				$(document).click(function () {
					$('.wrapper-dropdown-3').removeClass('active');
				});

			}


			if (obj.dd[0].id == 'ddlistadeSubcategorias' ||
				obj.dd[0].id == 'ddlistadeSucursales' ||
				obj.dd[0].id == 'ddlistadeProveedores') {
				obj.placeholder[0].setAttribute('data-ID', opt[0].children[0].getAttribute('data-ID'))
			}
			obj.val = opt.text() == 'Personalizado' ? '' : opt.text();
			if (obj.dd[0].id=="dd")
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
	if (DataTable == undefined) returnñ
	console.log(id)
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
function registrar(form) {
	evt.preventDefault();
}
function formulario() {
	$('#sidebar').addClass('active');
	$('.overlay').addClass('active');
	$('.collapse.in').toggleClass('in');
	$('a[aria-expanded=true]').attr('aria-expanded', 'false');
}
function Edit(url) {
	cargarCategoriasSubcategoriasSucursales();
	globalId = url.split('/').pop()
	$.ajax({
		type: 'GET',
		url: url,
		success: function (data) {
			data = data.data[0];
			var form = $("#RegistrarForm")[0];
			var DDlistadeCategorias = document.getElementById('DDlistadeCategorias');
			
			
			form["Nombre"].value = data.nombre;
			form["Precio_de_Venta"].value = data.precio_de_Venta.toFixed(2);
			form["Descripcion"].value = data.descripcion;
			DDlistadeCategorias.querySelector(`li > a[data-id="${data.subCategoria.categoria.idCategoria}"]`).click();
			setTimeout(function () {
				var ddlistadeProveedoresSpan = document.getElementById('ddlistadeProveedoresSpan');
				var ddlistadeSucursalesSpan = document.getElementById('ddlistadeSucursalesSpan');
				var ddlistadeSubcategoriasSpan = document.querySelector("#ddlistadeSubcategoriasSpan");

				ddlistadeSubcategoriasSpan.innerText = ddlistadeSubcategoriasSpan.innerText = data.subCategoria.nombre;;
				ddlistadeSubcategoriasSpan.setAttribute('data-id', data.subCategoria.idSubCategoria);

				ddlistadeProveedoresSpan.innerText = ddlistadeProveedoresSpan.innerText = data.proveedor.nombre;;
				ddlistadeProveedoresSpan.setAttribute('data-id', data.proveedor.idProveedor);

				ddlistadeSucursalesSpan.innerText = ddlistadeSucursalesSpan.innerText = data.sucursal.nombre;;
				ddlistadeSucursalesSpan.setAttribute('data-id', data.sucursal.idSucursal);
			},300);

			document.getElementById("btnAdd").innerText = 'Actualizar'
			$('.wrapper-dropdown-3').removeClass('active');
			formulario();
		}
	});
}
function resetFormulario() {
	if (document.getElementById('btnAdd').innerText == 'Actualizar') {
		document.getElementById('btnAdd').innerText = 'Registrar'
	}

	$('#sidebar').removeClass('active');
	$('.overlay').removeClass('active');
	$("#RegistrarForm")[0].reset();
	$('#RegistrarForm input').removeAttr('style');
	$('.invalidCampo').text('');
	$('.invalidName')[0].scrollIntoView()

	cancelarArchivos('#file-1', document.getElementById('cancelarArchivos'))
}
function validar() {
	let nombreApellidoRegex = /^[A-Za-z ]*$/;
	let telefonoRegex = /^\(?([0-9]{4})\)?[-]([0-9]{4})$/;
	let correoRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	let urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
	let imageRegex = /.jpg$|.png$|.jpeg$/gi;
	let dinero = /^\d{1,5}(?:[.]\d{3})*(?:[.,]\d{2})$/
	var form = document.getElementById('RegistrarForm');
	var subCategoria = document.querySelector('#ddlistadeSubcategoriasSpan');
	var Sucursal = document.querySelector('#ddlistadeSucursalesSpan');
	var Proveedor = document.querySelector('#ddlistadeProveedoresSpan');
	if (form.Nombre.value.length === 0) {
		let nombre = $('.invalidName');
		nombre.text('Campo Obligatorio');
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		form.Nombre.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
		form.Nombre.addEventListener('click', obligatorio);
		return false;
	}
	if (form.Precio_de_Venta.value.length === 0) {
		let nombre = $('.invalidPrecioVenta');
		nombre.text('Campo Obligatorio');
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		form.Precio_de_Venta.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
		form.Precio_de_Venta.addEventListener('click', obligatorio);
		return false;
	}

	if (!dinero.test(form.Precio_de_Venta.value)) {
		let nombre = $('.invalidPrecioVenta');
		nombre.html(`Precio inválido debe ser <strong style="color:yellow;">#####.##</strong>`);
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		form.Precio_de_Venta.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
		form.Precio_de_Venta.addEventListener('click', obligatorio);
		return false;
	}


	if (subCategoria.getAttribute('data-id').length === 0) {
		let nombre = $('.invalidSubcategoria');
		nombre.text('Campo Obligatorio');
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		subCategoria.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important; color:crimson!important;');
		subCategoria.addEventListener('click', obligatorio);
		return false;
	}
	if (Sucursal.getAttribute('data-id').length === 0) {
		let nombre = $('.invalidSucursal');
		nombre.text('Campo Obligatorio');
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		Sucursal.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;color:crimson!important;');
		Sucursal.addEventListener('click', obligatorio);
		return false;
	}
	if (Proveedor.getAttribute('data-id').length === 0) {
		let nombre = $('.invalidProveedor');
		nombre.text('Campo Obligatorio');
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		Proveedor.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;color:crimson!important;');
		Proveedor.addEventListener('click', obligatorio);
		return false;
	}
	if (form['file-1[]'].files.length > 0)
		if (!imageRegex.test(form['file-1[]'].files[0].name)) {
			let img = $('.invalidimg');
			img.text('Imagen no válida, sólo jpg y png');
			img[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
			form['file-1[]'].labels[0].setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
			form['file-1[]'].labels[0].addEventListener('click', obligatorio);
			return false;
		}


	return true;
}
function cargarCategoriasSubcategoriasSucursales() {
	options.cargandosubcategorias = true;
	let html = '', htmlSubca = '';

	$.ajax({
		type: "GET",
		url: "/Admin/Categorias/GetCategoriasSubcategorias",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		error: function (x, e) { alert(e.responseText); },
		success: function (objTrendList) {
			$.each(objTrendList, function (index, data) {
				let categorias = data[1];
				let subcategorias = data[0];
				categorias.forEach((categoria) => {
					subcategorias.forEach((subcategoria) => {
						if (categoria.idCategoria == subcategoria.categoria.idCategoria)
							htmlSubca += `<li><a data-ID="${subcategoria.idSubCategoria}">${subcategoria.nombre}</a></li>`
					});
					options.detSubca.subcategorias[categoria.nombre.replaceAll(' ', '')] = htmlSubca;
					htmlSubca = '';
					html += `<li><a data-ID="${categoria.idCategoria}">${categoria.nombre}</a></li>`;
				})
			});
			options.detSubca.categorias = html;
			document.getElementById('listadeCategoriasForm').innerHTML = '';
			document.getElementById('listadeSubcategoriasForm').innerHTML = '';
			var div = document.createElement('DIV');
			var div2 = document.createElement('DIV');
			div.innerHTML = `<div id="ddlistadeCategorias" class="wrapper-dropdown-3" tabindex="1" style="min-width: 260px;">
				<span id="ddlistadeCategoriasSpan" data-ID>Categorias</span>
                <ul class="dropdown" id="DDlistadeCategorias"></ul>
             </div>`;
			div2.innerHTML = `<div id="ddlistadeSubcategorias" class="wrapper-dropdown-3" tabindex="1" style="min-width: 260px;">
				<span id="ddlistadeSubcategoriasSpan" data-ID>Seleccionar subcategoria</span>
                <ul class="dropdown" id="DDlistadeSubcategorias"></ul>
             </div>`;
			document.getElementById('listadeCategoriasForm').appendChild(div);
			document.getElementById('listadeSubcategoriasForm').appendChild(div2);

			//options.cargandoCategorias = false;
			$('#DDlistadeCategorias').html(html);
			$('#DDlistadeSubcategorias').html('`<li><a data-ID="">Primero Seleccionar categoria</a></li>');

			var ddlistadeSubcategorias = new DropDown($('#ddlistadeSubcategorias'));
			var ddlistadeCategorias = new DropDown($('#ddlistadeCategorias'));
			options.nuevosDepartamentos = false;
			options.nuevossubcategorias = false;
			$(document).click(function () {
				$('.wrapper-dropdown-3').removeClass('active');
			});
			$.ajax({
				type: "GET",
				url: "/Admin/Sucursales/GetAll",
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				error: function (x, e) { alert(e.responseText); },
				success: function (objTrendList) {
					$.each(objTrendList, function (index, data) {
						let sucursales = data[0];
						html = '';
						sucursales.forEach((sucursal) => {
							html += `<li><a data-ID="${sucursal.idSucursal}">${sucursal.nombre}</a></li>`;
						})
					});
					document.getElementById('listadeSucursalesForm').innerHTML = '';
					var div = document.createElement('DIV');
					div.innerHTML = `<div id="ddlistadeSucursales" class="wrapper-dropdown-3" tabindex="1" style="min-width: 260px;">
				<span id="ddlistadeSucursalesSpan" data-ID>Seleccionar Sucursal</span>
                <ul class="dropdown" id="DDlistadeSucursales"></ul>
             </div>`;
					document.getElementById('listadeSucursalesForm').appendChild(div);
					//options.cargandoCategorias = false;
					$('#DDlistadeSucursales').html(html);
					var ddlistadeSucursales = new DropDown($('#ddlistadeSucursales'));
					$(document).click(function () {
						$('.wrapper-dropdown-3').removeClass('active');
					});
				}
			});
			html = '';
			$.ajax({
				type: "GET",
				url: "/Admin/Proveedores/GetAll",
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				error: function (x, e) { alert(e.responseText); },
				success: function (objTrendList) {
					$.each(objTrendList, function (index, data) {
						let proveedores = data;
						proveedores.forEach((proveedor) => {
							html += `<li><a data-ID="${proveedor.idProveedor}">${proveedor.nombre}</a></li>`;
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
					options.cargandosubcategorias = false;
				}

			});
		}
	});
	return false
}

$("body").on("click", "#sidebarCollapse", function () {
	cargarCategoriasSubcategoriasSucursales()
	return
	if (options.nuevasCategorias == false) return;
	if (options.cargandoCategorias == true) return;
	options.cargandoCategorias = true;
	html = '';
	$.ajax({
		type: "GET",
		url: "/Admin/Categorias/GetAllCategorias",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		error: function (x, e) { alert(e.responseText); },
		success: function (objTrendList) {
			$.each(objTrendList, function (index, categorias) {
				categorias.forEach((categoria) => {
					html += `<li><a data-ID="${categoria.value}">${categoria.text}</a></li>`;
				})
			});
			document.getElementById('listadeCategoriasForm').innerHTML = '';
			var div = document.createElement('DIV');
			div.innerHTML = `<div id="ddCategoria" class="wrapper-dropdown-3" tabindex="1" style="min-width: 251px;">
				<span id="ddCategoriaSpan" data-ID>Seleccionar Categoria</span>
                <ul class="dropdown" id="DDCategoria"></ul>
             </div>`;
			document.getElementById('listadeCategoriasForm').appendChild(div);

			options.cargandoCategorias = false;
			$('#DDCategoria').html(html);
			var ddCategorias = new DropDown($('#ddCategoria'));
			options.nuevasCategorias = false;
			$(document).click(function () {
				$('.wrapper-dropdown-3').removeClass('active');
			});

		}
	});

});
