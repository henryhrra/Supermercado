var options = {
	valueNames: ['categoria-ID', 'categoria-Nombre', 'categoria-Descripcion'],
	page: 5,
	pagination: true,
	milton: 0,
	controller:'categoria',
	nuevasCategorias: null,
	cargandoCategorias:false
};
var elementos = ['Todo', 'ID', 'Nombre', 'Descripción']
var DataTable;
var reload = false
var globalId;

$("body").on("submit", "#RegistrarForm", function (e) {
	if (!validar()) return;
	if (document.getElementById('btnAdd').innerText == 'Actualizar') {
		document.getElementById('btnAdd').innerText = 'Registrar'
		var dataSumit = document.getElementById('btnAdd').getAttribute('data-submit');
		document.getElementById('btnAdd').setAttribute('data-submit','');
		var form = $("#RegistrarForm")[0];
		var formdata = new FormData();
		formdata.append("Nombre", form.Nombre.value.trim());
		formdata.append("Descripcion", form.Descripcion.value.trim());
		if (form['file-1[]'].files[0]!=undefined)
			formdata.append("Foto", form['file-1[]'].files[0]);
		else
			formdata.append("Foto", form["Url-imagen"].value.trim());
		formdata.append("idCategoria", form.idCategoria.value.trim());
		if (dataSumit == "S") {
			formdata.append("idSubCategoria", globalId);
		}
		$.ajax({
			type: "POST",
			url: "/Admin/Categorias/Actualizar" + dataSumit + "/" + globalId,
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
				options.nuevasCategorias = true;
				toastr["success"](data.message)
				cargarTodo();
				resetFormulario();

			}
		});
		return
	}
	var dataSumit = document.getElementById('btnAdd').getAttribute('data-submit');
	document.getElementById('btnAdd').setAttribute('data-submit',"");
	var form = $("#RegistrarForm")[0];	
	var formdata = new FormData();
	formdata.append("Nombre", form.Nombre.value.trim());
	formdata.append("Descripcion", form.Descripcion.value.trim());
	if (form['file-1[]'].files[0] != undefined)
		formdata.append("Foto", form['file-1[]'].files[0]);
	else
		formdata.append("Foto", form["Url-imagen"].value.trim());
	if (dataSumit == "S") {
		formdata.append("idCategoria", document.getElementById('ddCategoriaSpan').getAttribute('data-ID'));
	}
	$.ajax({
		type: "POST",
		url: "/Admin/Categorias/Registrar" + dataSumit,
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
			options.nuevasCategorias = true;
			toastr["success"](data.message)
			cargarTodo();
			resetFormulario();

		}
	});
});
function load(Cat = false) {
	if (DataTable != undefined) {
		DataTable.remove();
	}
	return $.ajax({
		type: "GET",
		url: "/Admin/Categorias/GetAll",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		error: function (x, e) { alert(e.responseText); },
		success: function (objTrendList) {
			var categorias = objTrendList.data[0];
			var subcategorias = objTrendList.data[1];
			categorias.forEach((categoria) => {
				let SubCategoriasDiv = '';
				subcategorias.forEach((subcategoria) => {
					if (subcategoria.idCategoria == categoria.idCategoria)
					SubCategoriasDiv+=`<div class="row itemRowSub">
						<div class="col-md-2">
							<img class="img-fluid zoomIMG" src="${subcategoria.foto}" alt="Id:${subcategoria.idSubCategoria} - ${subcategoria.nombre}" />
						</div>
						<div class="col-md-1 text-center">
							<h5 class="categoria-ID">${subcategoria.idSubCategoria}</h5>
						</div>
						<div class="col-md-3 text-center">
							<h5 class="categoria-Nombre">${subcategoria.nombre}</h5>
						</div>
						<div class="col-md-3 text-center">
							<p class="categoria-Descripcion">${subcategoria.descripcion == null ? '--' : subcategoria.descripcion}</p>
						</div>
						<div class="col-md-3 text-center">
							<ul class="nav">
								<li>
									<span onclick='EditS("/Admin/Categorias/GetS/${subcategoria.idSubCategoria}");formulario(this);' data-boton="Sub" class="iconFuente icon-edit"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span></span>
								</li>
								<li>
									<span onclick='Delete("/Admin/Categorias/DeleteS/${subcategoria.idSubCategoria}")'  data-boton="Sub" class=" iconFuente icon-remove"><span class="path1"></span><span class="path2"></span></span>
								</li>
								<li>
									<input class="checkZoom" type="checkbox" value="" />
								</li>
							</ul>
						</div>

					</div>`
				})
					var itemsTable = document.getElementById('itemsTable');
					var item = document.createElement('LI');
					item.innerHTML = `<div class="row itemRow">
                <div class="col-md-2">
                    <img class="img-fluid zoomIMG" src="${categoria.foto}" alt="Id:${categoria.idCategoria} - ${categoria.nombre}" />
                </div>
                <div class="col-md-1 text-center">
                    <h5 class="categoria-ID">${categoria.idCategoria}</h5>
                </div>
                <div class="col-md-3 text-center">
                    <h5 class="categoria-Nombre">${categoria.nombre}</h5>
                </div>
                <div class="col-md-4 text-center">
                    <p class="categoria-Descripcion">${categoria.descripcion == null ? '--' : categoria.descripcion}</p>
                </div>
                <div class="col-md-2 text-center">
                    <ul class="nav">
                        <li>
                            <span onclick='Edit("/Admin/Categorias/Get/${categoria.idCategoria}");formulario(this);' data-boton class="iconFuente icon-edit"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span></span>
                        </li>
                        <li>
                            <span onclick='Delete("/Admin/Categorias/Delete/${categoria.idCategoria}");' class=" iconFuente icon-remove"><span class="path1"></span><span class="path2"></span></span>
                        </li>
                        <li>
                            <input class="checkZoom" type="checkbox" value="" />
                        </li>
                    </ul>
                </div>


				<hr>
				<a class="mostrarSubcategorias" data-toggle="collapse" href="#collapse${categoria.idCategoria}" role="button" aria-expanded="false" aria-controls="collapse${categoria.idCategoria}">
				<hr>
				 Subcategorias
				</a>
            </div>
			<div class="collapse subCategorias" id="collapse${categoria.idCategoria}">
			${SubCategoriasDiv}
			</div>`
					itemsTable.appendChild(item);
				})

		}
	});
}
$(document).ready(cargarTodo);
function cargarTodo() {
	load().done(function () {
		try {
			DataTable = new List('Datalist', options);
			DataTable.on('updated', cargarVentanaFlotante);
		} catch (e) { console.log(e) }
		document.querySelector('.loading').classList.add('hidden');
		setTimeout(() => {
			document.querySelector('.loading').style.display = 'none';
		}, 1000)
		precargarDropdowns();
		cargarVentanaFlotante();
	});
}

function precargarDropdowns() {
	
	document.querySelector('#ddMostrarContainer').innerHTML = `<div id="ddMostrar" class="wrapper-dropdown-3" tabindex="1">
                    <span id="MostrarContent">Mostrar 5</span>
                    <ul class="dropdown" id="mostrarDD">
                    </ul>`;
	document.querySelector('#ddCheckContainer').innerHTML = ` <div id="ddCheck" class="wrapper-dropdown-1" tabindex="1">
                            <ul class="dropdown" tabindex="1">
                                <li><a >Borrar</a></li>
                            </ul>
                        </div>`;
	document.querySelector('#ddContainer').innerHTML = `<div id="dd" class="wrapper-dropdown-3" tabindex="1">
                    <span id="FiltroContent">Todo</span>
                    <ul class="dropdown" id="DDFiltro">
                    </ul>
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
	$('.botonAgregar').on('click', formulario);
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

$("body").on("click", "#sidebarCollapse2", function () {
	if (options.nuevasCategorias==false) return;
	if (options.cargandoCategorias==true) return;
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
					html += `<li><a  data-ID="${categoria.value}">${categoria.text}</a></li>`;
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
			return false;
		});
	},
	initEvents: function () {
		var obj = this;
		var extra = '';
		obj.dd.on('click', function (event) {
			$(this).toggleClass('active');
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
			if (obj.dd[0].id == 'ddCategoria') {
				obj.placeholder[0].setAttribute('data-ID', opt[0].children[0].getAttribute('data-ID'))
			}
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
		cargarVentanaFlotante();
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
		cargarVentanaFlotante();
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

function formulario(btn) {
	if (options.cargandoCategorias)return
	let dataBtn=''
	try { dataBtn=this.getAttribute('data-boton') }
	catch (e) {
		dataBtn = btn.getAttribute('data-boton')}
	if (dataBtn == "Sub") {
		document.querySelector("#sidebar > div.menuStyky  div.sidebar-header > h3").innerText = "Agregar Subcategoría";
		document.querySelector("#RegistrarForm > div > div > div:nth-child(2) > div:nth-child(1) > label").innerText = "Nombre de Subcategoría";
		document.getElementById('btnAdd').setAttribute('data-submit', "S");
		document.getElementById('listadeCategoriasForm').style.display = 'Block';
	} else {
		document.getElementById('btnAdd').setAttribute('data-submit',"");
		document.getElementById('listadeCategoriasForm').style.display='none';
		document.querySelector("#sidebar > div.menuStyky  div.sidebar-header > h3").innerText="Agregar Categoría"
		document.querySelector("#RegistrarForm > div > div > div:nth-child(2) > div:nth-child(1) > label").innerText="Nombre de Categoría"
    }
	$('#sidebar').addClass('active');
	$('.overlay').addClass('active');
	$('.collapse.in').toggleClass('in');
	$('a[aria-expanded=true]').attr('aria-expanded', 'false');
}
function Edit(url) {
	globalId = url.split('/').pop()
	$.ajax({
		type: 'GET',
		url: url,
		success: function (data) {
			data = data.data
			var form = $("#RegistrarForm")[0];
			form.Nombre.value = data.nombre;
			form.Descripcion.value = data.descripcion;
			form.idCategoria.value = data.idCategoria;
			document.getElementById("btnAdd").innerText = 'Actualizar';
			document.querySelector("#sidebar > div.menuStyky div.sidebar-header > h3").innerText = "Actualizar Categoría"
		}
	});
}
function EditS(url) {
	globalId = url.split('/').pop()
	$.ajax({
		type: 'GET',
		url: url,
		success: function (data) {
			data = data.data
			var form = $("#RegistrarForm")[0];
			form.Nombre.value = data.nombre;
			form.Descripcion.value = data.descripcion;
			form.idCategoria.value = data.idCategoria;
			html = '';
			let id, name;
			$.ajax({
				type: "GET",
				url: "/Admin/Categorias/GetAllCategorias",
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				error: function (x, e) { alert(e.responseText); },
				success: function (objTrendList) {
					$.each(objTrendList, function (index, categorias) {
						categorias.forEach((categoria) => {
							html += `<li><a  data-ID="${categoria.value}">${categoria.text}</a></li>`;
							if (categoria.value == data.idCategoria) {
								id = categoria.value;
								name = categoria.text;
							}
						})
					});
					document.getElementById('listadeCategoriasForm').innerHTML = '';
					var div = document.createElement('DIV');
					div.innerHTML = `<div id="ddCategoria" class="wrapper-dropdown-3" tabindex="1" style="min-width: 251px;">
				<span id="ddCategoriaSpan" data-ID="${id}">${name}</span>
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

			document.getElementById("btnAdd").innerText = 'Actualizar'
			document.querySelector("#sidebar > div.menuStyky div.sidebar-header > h3").innerText = "Actualizar Subcategoría"
		}
	});
}
function resetFormulario() {
	if (document.getElementById('btnAdd').innerText == 'Actualizar') {
		document.getElementById('btnAdd').innerText = 'Registrar'
		document.querySelector("#sidebar > div.menuStyky div.sidebar-header > h3").innerText ="Agregar Categoría"
	}
	$('#RegistrarForm input').removeAttr('style')
	$('.invalidCampo').text('')
	$('#sidebar').removeClass('active');
	$('.overlay').removeClass('active');
	try {
		document.querySelector("#ddCategoriaSpan").setAttribute('data-id', '')
		document.querySelector("#ddCategoriaSpan").innerText = "Seleccionar Categoría"
	} catch (d) { }
	$("#RegistrarForm")[0].reset();
	cancelarArchivos('#file-1', document.getElementById('cancelarArchivos'));
}
function obligatorio(e) {

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
	let nombreApellidoRegex = /^[A-Za-zÀ-ÿ0-9 \&*.(),']+$/;
	let imageRegex = /.jpg$|.png$|.jpeg$/gi;
	var form = document.getElementById('RegistrarForm');
	var categorias = document.getElementById('listadeCategoriasForm');
	var categoriasSpan = document.getElementById('ddCategoriaSpan');
	if (categorias.style.display == 'block') {
		if (categoriasSpan.getAttribute('data-id').length === 0) {
			let nombre = $('.invalidSubcategoria');
			nombre.text('Campo Obligatorio');
			nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
			categoriasSpan.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;color:crimson;');
			categoriasSpan.addEventListener('click', obligatorio);
			return false;
		}
	}
	if (form.Nombre.value.length === 0) {
		let nombre = $('.invalidName');
		nombre.text('Campo Obligatorio');
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		form.Nombre.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
		form.Nombre.addEventListener('click', obligatorio);
		return false;
	}
	if (!nombreApellidoRegex.test(form.Nombre.value)) {
		let nombre = $('.invalidName');
		nombre.text('Nombre Inválido, No se permiten caracteres especiales');
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		form.Nombre.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
		form.Nombre.addEventListener('click', obligatorio);
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


