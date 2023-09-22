﻿


var options = {
	valueNames: ['slider-ID', 'slider-Imagen', 'slider-Titulo', 'slider-Parrafo', 'slider-btn2', 'slider-btn1'],
	page: 5,
	pagination: true,
	milton: 0,
	controller: "slider"
};
var options2 = {
	valueNames: ['oferta-ID', 'oferta-Nombre', 'oferta-ID', 'oferta-Nombre'],
	page: 5,
	pagination: true,
	milton: 0,
	controller: "oferta"
};
var DataTable;
var DataTable2;
var reload = false
var globalId;

window.onload = (() => {

	document.querySelector("#content > div > ul > li:nth-child(1) > a").addEventListener('click', (() => {
		document.querySelector("#Descuentos").style.display = 'none';
	}));
	document.querySelector("#content > div > ul > li:nth-child(1) > a").click();
	document.querySelector("#descuentos").addEventListener('click', (() => {
		document.querySelector("#Descuentos").style.display = 'Block';
	}));

});

$("body").on("submit", "#RegistrarFormOferta", function (e) {



	if (document.getElementById('btnAdd').innerText == 'Actualizar') {
		document.getElementById('btnAdd').innerText = 'Registrar'
		noIplementado()
		return;

		var form = $("#RegistrarFormOferta")[0];
		var formdata = new FormData();
		formdata.append("Nombre", form.Nombre.value);
	
			formdata.append("idMunicipio", document.getElementById('ddlistadeMunicipiosSpan').getAttribute('data-id'));
			formdata.append("Ciudad", form.Ciudad.value);
			formdata.append("Direccion", form.Direccion.value);
			formdata.append("Telefono", form.Telefono.value);
			formdata.append("idSucursal", globalId);
		


		$.ajax({
			type: "POST",
			url: "/Admin/Slider_Descuentos/Registrar" + dataSumit + "/" + globalId,
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
					$('#sidebar').removeClass('active');
					$('.overlay').removeClass('active');
					reload = true;
					options.nuevosDepartamentos = true;
					toastr["success"](data.message)
					cargarTodo();
					resetFormulario();
				} else {
					toastr.error(data.message);
				}

			}
		});
		return
	}
	
	var form = $("#RegistrarFormOferta")[0];
	var formdata = new FormData();

		formdata.append("activo", form["oferta_activo"].value.trim());
	formdata.append("Filtro", form["oferta_Filtro"].value.trim());
	formdata.append("porcentaje", form["oferta_porcentaje"].value.trim());
	formdata.append("duracion_De_Oferta", form["oferta_duracion_De_Oferta"].value.trim());
	formdata.append("fecha_De_inicio", form["oferta_fecha_De_inicio"].value.trim());

	$.ajax({
		type: "POST",
		url: "/Admin/Slider_Descuentos/RegistrarO",
		data: formdata,
		processData: false,
		contentType: false,
		success: function (data) {
			console.log(data)
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
			if (data.success) {
				options.nuevosDepartamentos = true;
				toastr["success"](data.message)
				cargarTodo();
				resetFormulario();
			} else {
				toastr.error(data.message);
			}

		}
	});
});

$("body").on("submit", "#RegistrarFormSlider", function (e) {
	noIplementado()
	return;
	if (!validar()) return
	var dataSumit = ''
	if (document.getElementById('btnAdd').innerText == 'Actualizar') {
		document.getElementById('btnAdd').innerText = 'Registrar'
		dataSumit = document.getElementById('btnAdd').getAttribute('data-submit');
		document.getElementById('btnAdd').setAttribute('data-submit', '');

		var form = $("#RegistrarForm")[0];
		var formdata = new FormData();
		formdata.append("Nombre", form.Nombre.value);
		if (dataSumit == '') {
			formdata.append("idMunicipio", document.getElementById('ddlistadeMunicipiosSpan').getAttribute('data-id'));
			formdata.append("Ciudad", form.Ciudad.value);
			formdata.append("Direccion", form.Direccion.value);
			formdata.append("Telefono", form.Telefono.value);
			formdata.append("idSucursal", globalId);
		} else if (dataSumit == 'M') {
			formdata.append("Nombre", form.Nombre.value);
			formdata.append("idDepartamento", document.getElementById('ddlistadeDepartamentosSpan').getAttribute('data-id'));
			formdata.append("idMunicipio", globalId);
		} else if (dataSumit == 'D') {
			formdata.append("idDepartamento", globalId);
		}

		$.ajax({
			type: "POST",
			url: "/Admin/Slider_Descuentos/Registrar" + dataSumit + "/" + globalId,
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
					$('#sidebar').removeClass('active');
					$('.overlay').removeClass('active');
					reload = true;
					options.nuevosDepartamentos = true;
					toastr["success"](data.message)
					cargarTodo();
					resetFormulario();
				} else {
					toastr.error(data.message);
				}

			}
		});
		return
	}
	var dataSumit = document.getElementById('btnAdd').getAttribute('data-submit');
	document.getElementById('btnAdd').setAttribute('data-submit', "");
	var form = $("#RegistrarForm")[0];
	var formdata = new FormData();
	formdata.append("Nombre", form.Nombre.value);
	if (dataSumit == '') {
		formdata.append("activo", form.activo);
		formdata.append("Ciudad", form.Ciudad.value);
		formdata.append("Direccion", form.Direccion.value);
		formdata.append("Telefono", form.Telefono.value);
	} else if (dataSumit == 'M') {
		formdata.append("idDepartamento", document.getElementById('ddlistadeDepartamentosSpan').getAttribute('data-id'));
	}
	$.ajax({
		type: "POST",
		url: "/Admin/Slider_Descuentos/Registrar" + dataSumit,
		data: formdata,
		processData: false,
		contentType: false,
		success: function (data) {
			console.log(data)
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
			if (data.success) {
				options.nuevosDepartamentos = true;
				toastr["success"](data.message)
				cargarTodo();
				resetFormulario();
			} else {
				toastr.error(data.message);
			}

		}
	});
});
function load(Cat = false) {
	if (DataTable != undefined) {
		DataTable.remove();
	}
	if (DataTable2 != undefined) {
		DataTable2.remove();
	}
	return $.ajax({
		type: "GET",
		url: "/Admin/Slider_Descuentos/GetAll",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		error: function (x, e) { alert(e.responseText); },
		success: function (objTrendList) {

			var slider = objTrendList.data[0];
			var ofertas = objTrendList.data[1];
			console.log(objTrendList)
			slider.forEach((slider) => {

				var itemsTable = document.getElementById('itemsTable');
				var item = document.createElement('LI');
				item.innerHTML = `<div class="row itemRow">
                <div class="col-md-1 text-center">
                    <h5 class="sucursal-ID">${slider.idSlider}</h5>
                </div>
                <div class="col-md-3 text-center">
                    <img class="slider-Nombre" src="${slider.imagenPrincipal}"/>
                </div>
                <div class="col-md-2 text-center">
                    <p class="slider-Departamento">${slider.titulo}</p>
                </div>
 <div class="col-md-2 text-center">
                    <p class="slider-Municipio">${slider.parrafo}</p>
                </div>
 <div class="col-md-2 text-center">
                    <p class="slider-btn1">${slider.boton1}</p>
                </div>
 <div class="col-md-2 text-center">
                    <p class="slider-btn2">${slider.boton2}</p>
                </div>
                <div class="col-md-2 text-center">
                    <ul class="nav">
                       
                        <li>
                            <span onclick='noIplementado()' class="iconFuente icon-edit"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span></span>
                        </li>
                        <li>
                            <span onclick='noIplementado()' class=" iconFuente icon-remove"><span class="path1"></span><span class="path2"></span></span>
                        </li>
                        <li>
                            <input class="checkZoom" type="checkbox" value="" />
                        </li>
                    </ul>
                </div>
	<hr>
				<a class="mostrarSubcategorias" data-toggle="collapse" href="#collapse${slider.idDepartamento}" role="button" aria-expanded="false" aria-controls="collapse${slider.idDepartamento}">
				<hr>
				 Municipios
				</a>
            </div>
			<div class="collapse subCategorias" id="collapse${slider.idDepartamento}">
			${4545454}
			</div>
            </div>`
				itemsTable.appendChild(item);
			})

			ofertas.forEach((oferta) => {
				let strong = [`<strong class="d-none d-sm-inline d-md-none">`,`: </strong>`];
				var itemsTable2 = document.getElementById('itemsTable2');
				var item = document.createElement('LI');
				var Fecha = ((fecha) => { return new Date(fecha).toLocaleDateString('es', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })});
				item.innerHTML = `<div class="row itemRow">
                <div class="col-md-1 text-center">
                    <h5 class="oferta-ID">${strong[0] +'ID'+strong[1]+oferta.idOferta}</h5>
                </div>
                <div class="col-md-1 text-center">
                    <h5 class="oferta-Activo">${(strong[0] + 'Activo' + strong[1])+(oferta.activo ? `<i class="fas fa-check text-success"></i>` : `<i class="fas fa-times text-danger "></i>`)}</h5>
                </div>
 <div class="col-md-3 text-center">
					 <h5 class="oferta-Descripcion">${strong[0] + 'Descripcion' + strong[1] +oferta.descripcion}</h5>
                </div>
 <div class="col-md-1 text-center">
					 <h5 class="oferta-Porcentaje">${strong[0] + 'Porcentaje' + strong[1] +oferta.porcentaje + "%"}</h5>
                </div>
 <div class="col-md-2 text-center">
					 <h5 class="oferta-Duracion">${strong[0] + 'Duracion' + strong[1] +oferta.duracion_De_Oferta+" Días"}</h5>
                </div>

 <div class="col-md-2 text-center">
					 <h5 class="oferta-Inicio">${strong[0] + 'Inicio' + strong[1] +Fecha(oferta.fecha_De_inicio)}</h5>
                </div>
                <div class="col-md-2 text-center">
                    <ul class="nav">
                        <li>
                            <span onclick='noIplementado()' data-boton="Det" class="iconFuente icon-edit"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span></span>
                        </li>
                        <li>
                            <span onclick='noIplementado()' class=" iconFuente icon-remove"><span class="path1"></span><span class="path2"></span></span>
                        </li>
                        <li>
                            <input class="checkZoom" type="checkbox" value="" />
                        </li>
                    </ul>
                </div>
	
            </div>`
				itemsTable2.appendChild(item);
			})

		}
	});
}
$(document).ready(cargarTodo);
function cargarTodo() {
	load().done(function () {
		document.querySelector('.loading').classList.add('hidden');
		setTimeout(() => {
			document.querySelector('.loading').style.display = 'none';
		}, 1000)
		precargarDropdowns();
		cargarVentanaFlotante();

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
			console.log(this)

			var modalImg = document.getElementById("img01");
			var captionText = document.getElementById("captionPopUpImg");
			modal.style.display = "block";
			modalImg.src = this.src;
			captionText.innerHTML = this.alt;

		}
	})
}
function precargarDropdowns() {
	try {
		DataTable = new List('Datalist', options);
	} catch (e) { }
	try {
		DataTable2 = new List('Datalist2', options2);
	} catch (e) { }
	var elementos = ['Todo', 'ID', 'Nombre', 'Departamento', 'Municipio', 'Telefono']
	var elementos2 = ['Todo', 'ID', 'Departamento', 'Municipio']
	var DDMostrar = document.getElementById('mostrarDD');
	var DDMostrar2 = document.getElementById('mostrarDD2');
	var DDFiltro = document.getElementById('DDFiltro');
	var DDFiltro2 = document.getElementById('DDFiltro2');
	var DDMostrarText = document.getElementById('MostrarContent');
	var DDMostrarText2 = document.getElementById('MostrarContent2');
	let html = '';
	let html2 = '';
	elementos.forEach((EL, index) => {
		html += `<li><a >${EL}</a></li>`
	});
	elementos2.forEach((EL, index) => {
		html2 += `<li><a >${EL}</a></li>`
	});
	DDFiltro.innerHTML = html;
	DDFiltro2.innerHTML = html2;
	html = '';
	html2 = '';
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


	if (DataTable2 == undefined) {
		DDMostrarText2.innerText = 'Sin registros'
		html2 += `<li><a >No hay registros</a></li>`;
		DDMostrar2.innerHTML = html2;

	} else {
		if (DataTable2.size() <= 5) {
			DDMostrarText2.innerText = 'Mostrar ' + DataTable2.size()
			html2 += `<li><a >${DataTable2.size()}</a></li>`;
		} else {
			if (DataTable2.size() == options.page)
				DDMostrarText2.innerText = 'Todos'
			if (DataTable2.size() > 20 && options.page < DataTable2.size())
				DDMostrarText2.innerText = 'Mostrar ' + options.page
			if (options.page == 5)
				DDMostrarText2.innerText = 'Mostrar 5'
		}
		if (DataTable2.size() >= 5)
			html2 += `<li><a >5</a></li>`;
		if (DataTable2.size() >= 10)
			html2 += `<li><a >10</a></li>`;
		if (DataTable2.size() >= 20)
			html2 += `<li><a >20</a></li>`;
		if (DataTable2.size() >= 50)
			html2 += `<li><a >50</a></li>`;
		html2 += `<li><a >Todos</a></li>
            <li><a >Personalizado</a></li>`;
		DDMostrar2.innerHTML = html2;
	}
	if (!reload) {
		reload = false;
		prepararDropdowns();
	} else {
		prepararDropdowns();
		prepararDropdowns();
	}

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
	$('.agregarForm').on('click', formulario);
	var dd = new DropDown($('#dd'));
	$(document).click(function () {
		$('.wrapper-dropdown-3').removeClass('active');
	});
	var dd2 = new DropDown($('#dd2'));
	$(document).click(function () {
		$('.wrapper-dropdown-3').removeClass('active');
	});
	var dd = new DropDown($('#ddMostrar'));
	$(document).click(function () {
		$('.wrapper-dropdown-3').removeClass('active');
	});
	var dd = new DropDown($('#ddMostrar2'));
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

	var ddUser = new DropDown($('#ddCheck2'));
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

			if (obj.dd[0].id == 'ddlistadeDepartamentos') {
				obj.placeholder[0].setAttribute('data-ID', opt[0].children[0].getAttribute('data-ID'))
				document.getElementById('listadeMunicipiosForm').innerHTML = '';
				var div = document.createElement('DIV');
				div.innerHTML = `<div id="ddlistadeMunicipios" class="wrapper-dropdown-3" tabindex="1" style="min-width: 260px;">
				<span id="ddlistadeMunicipiosSpan" data-ID>Seleccionar Municipio</span>
                <ul class="dropdown" id="DDlistadeMunicipios"></ul>
             </div>`;
				document.getElementById('listadeMunicipiosForm').appendChild(div);

				$('#DDlistadeMunicipios').html(options.detMun.municipios[opt[0].children[0].innerText.replaceAll(' ', '')]);

				var ddlistadeMunicipios = new DropDown($('#ddlistadeMunicipios'));
				$(document).click(function () {
					$('.wrapper-dropdown-3').removeClass('active');
				});

			}


			if (obj.dd[0].id == 'ddlistadeMunicipios') {
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
function buscar(texto, from) {
	if (DataTable == undefined) return
	toastr.options = {
		"closeButton": true,
		"debug": false,
		"newestOnTop": true,
		"progressBar": true,
		"positionClass": "toast-top-right",
		"preventDuplicates": true,
		"onclick": null,
		"showDuration": "300",
		"hideDuration": "1000",
		"timeOut": "1000",
		"extendedTimeOut": "2000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	}
	if (!document.querySelector('#automaticoCheck').checked && from == 'input') return;
	var filtro = document.querySelector('#FiltroContent');
	if (filtro.innerText == "Todo") {
		DataTable.search(texto)
		if (DataTable.matchingItems.length == 0) {
			DataTable.search()
			toastr["warning"]("No se encontraron registros para :" + texto, "No encontrado")
		}
	}
	else {
		DataTable.search(texto, [options.valueNames[options.milton - 1]])
		if (DataTable.matchingItems.length == 0) toastr["warning"]("No se encontraron registros para :" + texto, "No encontrado")
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
	console.log(C, toast, c)
	if (C == "") return 'error'
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
				else {
					let tst = mostrar(document.getElementById('swal-input1').value, true, + document.getElementById('swal-input1').value)
					if (tst == 'error') return;
					document.getElementById('MostrarContent').innerText = 'Mostrar ' + tst

				}
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
function buscar2(texto, from) {
	if (DataTable2 == undefined) return
	toastr.options = {
		"closeButton": true,
		"debug": false,
		"newestOnTop": true,
		"progressBar": true,
		"positionClass": "toast-top-right",
		"preventDuplicates": true,
		"onclick": null,
		"showDuration": "300",
		"hideDuration": "1000",
		"timeOut": "1000",
		"extendedTimeOut": "2000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	}
	if (!document.querySelector('#automaticoCheck2').checked && from == 'input') return;
	var filtro = document.querySelector('#FiltroContent2');
	if (filtro.innerText == "Todo") {
		DataTable2.search(texto)
		if (DataTable2.matchingItems.length == 0) {
			DataTable2.search()
			toastr["warning"]("No se encontraron registros para :" + texto, "No encontrado")
		}
	}
	else {
		DataTable2.search(texto, [options2.valueNames[options2.milton - 1]])
		if (DataTable2.matchingItems.length == 0) toastr["warning"]("No se encontraron registros para :" + texto, "No encontrado")
	}
}
function ordenar2(por, id, el) {
	if (DataTable2 == undefined) return
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
		DataTable2.sort(por, { order: "asc" })
		el.id = id.replace('none', 'asc')
		el.children[0].children[0].classList.replace('icon-sort-none', 'icon-sort-asc')
	} else if (id.indexOf('asc') > 1) {
		DataTable2.sort(por, { order: "desc" })
		el.id = id.replace('asc', 'desc')
		el.children[0].children[0].classList.replace('icon-sort-none', 'icon-sort-desc')
	} else {
		DataTable2.sort(por, { order: "asc" })
		el.id = id.replace('desc', 'asc')
		el.children[0].children[0].classList.replace('icon-sort-none', 'icon-sort-asc')
	}
}
function mostrar2(C, toast = false, c = 0) {
	if (C == "") return 'error'
	if (DataTable2 == undefined) return 'error'
	if (C == "Todos") {
		options2.page = DataTable2.size();
		DataTable2.show(1, DataTable2.size());
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
				else {
					let tst = mostrar(document.getElementById('swal-input1').value, true, + document.getElementById('swal-input1').value)
					if (tst == 'error') return;
					document.getElementById('MostrarContent').innerText = 'Mostrar ' + tst

				}
			}
		})
		return 'error'
	} else if (toast) {
		if (c > DataTable2.size()) {
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
			toastr["error"]("La cantidad especificada excede los registros maximos:" + DataTable2.size(), "Error")
			return 'error'
		}
		DataTable2.show(1, c);
		options2.page = c;
		return +c
	} else if (C == 'No hay registros') {
		return 'error'
	} else {
		DataTable2.show(1, (+C));
		options2.page = +C
		return ''
	}
}
function toaster() {
	if (document.getElementById('floatInput').value === 0)
		mostrar(document.getElementById('floatInput').value, true, 0)
	else
		mostrar(document.getElementById('floatInput').value, true, + document.getElementById('floatInput').value)
	//toastr.clear();
}
function toastFuncion(C, toast, c) {
	mostrar(C, toast, c);
}
function registrar(form) {
	evt.preventDefault();
}
function formulario(dataBtn = '') {

	if (dataBtn == "oferta") {

		$('#RegistrarFormSlider').hide();
		$('#RegistrarFormOferta').show();
		document.querySelector("#sidebar > div.sidebar-header > h3").innerText="Agregar Descuento"
	}
	if (dataBtn == "slider") {
		document.querySelector("#sidebar > div.sidebar-header > h3").innerText="Agregar Slider"
		$('#RegistrarFormSlider').show();
		$('#RegistrarFormOferta').hide();
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
			data = data.data[0]
			console.log(data)
			var form = $("#RegistrarForm")[0];
			form.Nombre.value = data.nombre;
			var DDlistadeDepartamentos = document.querySelector("#DDlistadeDepartamentos");
			DDlistadeDepartamentos.querySelector(`li > a[data-id="${data.municipio.departamento.idDepartamento}"]`).click();
			setTimeout(function () {
				var DDlistadeMunicipios = document.querySelector("#DDlistadeMunicipios");
				DDlistadeMunicipios.querySelector(`li > a[data-id="${data.idMunicipio}"]`).click();
				$('.wrapper-dropdown-3').removeClass('active');
				form.Ciudad.value = data.ciudad;
				form.Direccion.value = data.direccion;
				form.Telefono.value = data.telefono;
				/*
				form.idCategoria.value = data.idCategoria;
				 */

			}, 300);
			document.getElementById("btnAdd").innerText = 'Actualizar'
			formulario()

		}
	});
}

function resetFormulario() {
	if (document.getElementById('btnAdd').innerText == 'Actualizar') {
		document.getElementById('btnAdd').innerText = 'Registrar'
	}
	$('#RegistrarForm input').removeAttr('style');
	$('.invalidCampo').text('');
	$('#sidebar').removeClass('active');
	$('.overlay').removeClass('active');
	$("#RegistrarFormSlider")[0].reset();
	$("#RegistrarFormOferta")[0].reset();
}
function validar() {
	$('#RegistrarForm input').removeAttr('style');
	$('.invalidCampo').text('');
	let dataSumit = document.getElementById('btnAdd').getAttribute('data-submit');
	let nombre = /^[A-Za-zÀ-ÿ ]*$/;
	let telefonoRegex = /^\(?([0-9]{4})\)?[-]([0-9]{4})$/;
	let departamento = document.querySelector("#ddlistadeDepartamentosSpan");
	let Municipio = document.querySelector("#ddlistadeMunicipiosSpan");

	var form = document.getElementById('RegistrarForm');

	if (form.Nombre.value.length === 0) {
		let nombre = $('.invalidName');
		nombre.text('Campo Obligatorio');
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		form.Nombre.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
		form.Nombre.addEventListener('click', obligatorio);
		return false;
	}

	if (!nombre.test(form.Nombre.value)) {
		let nombre = $('.invalidName');
		nombre.html(`No se aceptan caracteres especiales ni números`);
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		form.Nombre.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
		form.Nombre.addEventListener('click', obligatorio);
		return false;
	}
	if (dataSumit == 'D') return true;

	if (departamento.getAttribute('data-id').length === 0) {
		let nombre = $('.invalidDepartamento');
		nombre.text('Campo Obligatorio');
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		departamento.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;color: crimson;');
		departamento.addEventListener('click', obligatorio);
		return false;
	}
	if (dataSumit == 'M') return true;
	if (Municipio.getAttribute('data-id').length === 0) {
		let nombre = $('.invalidMunicipio');
		nombre.text('Campo Obligatorio');
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		Municipio.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;color: crimson;');
		Municipio.addEventListener('click', obligatorio);
		return false;
	}


	if (form.Ciudad.value.length === 0) {
		let nombre = $('.invalidCiudad');
		nombre.text('Campo Obligatorio');
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		form.Ciudad.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
		form.Ciudad.addEventListener('click', obligatorio);
		return false;

	}
	if (!nombre.test(form.Ciudad.value)) {
		let nombre = $('.invalidCiudad');
		nombre.html(`No se aceptan caracteres especiales ni números`);
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		form.Ciudad.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
		form.Ciudad.addEventListener('click', obligatorio);
		return false;
	}

	if (form.Direccion.value.length === 0) {
		let nombre = $('.invalidDir');
		nombre.text('Campo Obligatorio');
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		form.Direccion.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
		form.Direccion.addEventListener('click', obligatorio);
		return false;
	}
	if (form.telefono.value.length === 0) {
		let nombre = $('.invalidPhone');
		nombre.text('Campo Obligatorio');
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		form.telefono.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
		form.telefono.addEventListener('click', obligatorio);
		return false;
	}
	if (!telefonoRegex.test(form.telefono.value)) {
		let nombre = $('.invalidPhone');
		nombre.text('Formato Inválido debe ser ####-####');
		nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
		form.telefono.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
		form.telefono.addEventListener('click', obligatorio);
		return false;
	}

	return true;
}

