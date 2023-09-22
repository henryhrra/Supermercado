var options = {
	valueNames: ['sucursal-ID', 'sucursal-Nombre', 'sucursal-Departamento', 'sucursal-Municipio', 'sucursal-Telefono'],
	page: 5,
	pagination: true,
	milton: 0,
	nuevosDepartamentos: null,
	nuevosMunicipios: null,
	cargandoDepartamentos:false,
	cargandoMunicipios: false,
	detMun: {departamentos: '', municipios: {}}
};
var options2 = {
	valueNames: ['departamento-ID', 'departamento-Nombre', 'municipio-ID','municipio-Nombre'],
	page: 5,
	pagination: true,
	milton: 0,
	nuevosDepartamentos: null,
	nuevosMunicipios: null,
	cargandoDepartamentos:false,
	cargandoMunicipios: false,
	detMun: {departamentos: '', municipios: {}}
};
var DataTable;
var DataTable2;
var reload = false
var globalId;


function load(Cat = false) {
	if (DataTable != undefined) {
		DataTable.remove();
	}
	if (DataTable2 != undefined) {
		DataTable2.remove();
	}
	return $.ajax({
		type: "GET",
		url: "/Admin/Usuarios/GetAll",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		error: function (x, e) { alert(e.responseText); },
		success: function (objTrendList) {
			
			var usuarios = objTrendList.data;
			usuarios.forEach((usuario) => {
				
			
				var itemsTable = document.getElementById('itemsTable');
				var item = document.createElement('LI');
				item.innerHTML = `


<div class="row itemRow">
    <div class="col-md-2 text-center">
        <img src="${usuario.foto}" class="zoomIMG">
    </div>
    <div class="col-md-2 text-center">
        <h5 class="usuario-Nombre">${usuario.nombres}</h5>
    </div>
    <div class="col-md-2 text-center">
        <h5 class="usuario-Nombre">${usuario.apellidos}</h5>
    </div>
    <div class="col-md-2 text-center">
        <h5 class="usuario-Departamento">${usuario.email}</h5>
    </div>
    <div class="col-md-2 text-center">
        <h5 class="usuario-Telefono">${usuario.phoneNumber}</h5>
    </div>
    <div class="col-md-2 text-center">
        <ul class="nav">
            <li>
                <span onclick='Delete("/Admin/Usuarios/Delete/${usuario.id}")' class=" iconFuente icon-remove"><span class="path1"></span><span class="path2"></span></span>
            </li>
              <li>
				${usuario.lockoutEnd == null || (new Date(usuario.lockoutEnd)) < (new Date()) ? `<i onclick='Bloquear("${usuario.id}")' class="iconFuente text-danger fas fa-lock"></i>` : `<i onclick='Desbloquear("${usuario.id}")' class="iconFuente text-success fas fa-lock-open"></i>`}
            </li>
        </ul>
    </div>

    <hr>
    <a class="mostrarSubcategorias" data-toggle="collapse" href="#collapse${usuario.id}" role="button" aria-expanded="false" aria-controls="collapse${usuario.id}">
        <hr>
        Detalles
    </a>
</div>

<div class="collapse subCategorias" id="collapse${usuario.id}">



    <div class="detallesContainer">
        <div class="row itemDetalles">
            <div class="col-4"><span>Dirección:</span ><strong class="infoSpan">${usuario.direccion}</strong ></div>
            <div class="col-4"><span>Nombre de contacto:</strong></span><strong class="infoSpan">${usuario.nombreContacto}</strong></div>
            <div class="col-4"><span>Teléfono de contacto:</span><strong class="infoSpan">${usuario.telefonoContacto}</strong></div>
        </div>


        <hr style="
    width: 100%;
    background: #959595;
    height: 1px;
">
        <div class="row itemDetalles">
            <div class="col-4"><span>Giro:</span><strong class="infoSpan">${usuario.giro}</strong></div>
            <div class="col-4"><span>Correo Electrónico:</span><strong class="infoSpan">${usuario.correo == null ? '--' : `<a href="mailto:${usuario.pagina_Web}" target="_blank" class="text-primary text-wrap">${usuario.correo}</a>`}</strong></div>
            <div class="col-4">	<span>Página Web:</span><strong class="infoSpan text-wrap">${usuario.pagina_Web == null ? '--' : `<a href="${usuario.pagina_Web}" target="_blank" class="text-primary">${usuario.pagina_Web}</a>`}</strong></div>
        </div>
       


</div>
</div>
`
					itemsTable.appendChild(item);
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

	var elementos = ['Todo', 'ID', 'Nombre', 'Departamento','Municipio','Telefono']
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
function Bloquear(id) {
	$.ajax({
		type: "POST",
		url: "/Admin/Usuarios/Bloquear/" + id,
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
				toastr["success"](data.message)
				cargarTodo();
			} else {
				toastr["error"](data.message)
			}
		}
	});


}
function Desbloquear(id) {
	$.ajax({
		type: "POST",
		url: "/Admin/Usuarios/Desbloquear/" + id,
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
				toastr["success"](data.message)
				cargarTodo();
			} else {
				toastr["error"](data.message)
			}
		}
	});


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
function formulario(dataBtn='') {
	let municipios = document.querySelector("#RegistrarForm > div > div > div:nth-child(3)");
	let departamentos = document.querySelector("#RegistrarForm > div > div > div:nth-child(2)");
	let demas = document.querySelector("#RegistrarForm > div > div > div:nth-child(4)");
	let label = document.querySelector("#RegistrarForm > div > div > div:nth-child(1) > div:nth-child(1) > label");
	try { dataBtn=this.getAttribute('data-boton') }
	catch (e) { }
	if (dataBtn == "Det" || dataBtn == "det") {
		if (dataBtn == "Det")
		document.querySelector("#Nombre").value = '';
		departamentos.style.display = 'none';
		municipios.style.display = 'none';
		demas.style.display = 'none';
		demas.querySelectorAll('input').forEach((input) => {
			input.required = false;
		});
		document.querySelector("#sidebar > div.sidebar-header > h3").innerText = "Agregar Departamento";
		document.querySelector("#RegistrarForm > div > div > div:nth-child(1) > div:nth-child(1) > label").innerText = "Seccione Departamento";
		label.innerText = 'Nombre del Departamento';
		document.getElementById('btnAdd').setAttribute('data-submit', "D");
	} else 
		if (dataBtn == "Mun" || dataBtn == "mun") {
			if (dataBtn == "Mun") 
			document.querySelector("#Nombre").value = '';
			departamentos.style.display = 'block';
			municipios.style.display = 'none';
			demas.style.display = 'none';
			demas.querySelectorAll('input').forEach((input) => {
				input.required = false;
			});
			document.querySelector("#sidebar > div.sidebar-header > h3").innerText = "Agregar Municipio";
			document.querySelector("#RegistrarForm > div > div > div:nth-child(1) > div:nth-child(1) > label").innerText = "Nombre del Municipio";
			document.getElementById('btnAdd').setAttribute('data-submit', "M");
			label.innerText = 'Nombre del Municipio';
		}
		else {
			demas.querySelectorAll('input').forEach((input) => {
				input.required = true;
			});
			label.innerText = 'Nombre de la Sucursal';
			departamentos.style.display = 'block';
			municipios.style.display = 'block';
			demas.style.display = 'block';
		document.getElementById('btnAdd').setAttribute('data-submit',"");
		document.querySelector("#sidebar > div.sidebar-header > h3").innerText="Agregar Sucursal"
		document.querySelector("#RegistrarForm > div > div > div:nth-child(1) > div:nth-child(1) > label").innerText="Nombre de Sucursal"
    }
	
	$('#sidebar').addClass('active');
	$('.overlay').addClass('active');
	$('.collapse.in').toggleClass('in');
	$('a[aria-expanded=true]').attr('aria-expanded', 'false');
}

function resetFormulario() {
	if (document.getElementById('btnAdd').innerText == 'Actualizar') {
		document.getElementById('btnAdd').innerText = 'Registrar'
	}
	$('#RegistrarForm input').removeAttr('style');
	$('.invalidCampo').text('');
	$('#sidebar').removeClass('active');
	$('.overlay').removeClass('active');
	$("#RegistrarForm")[0].reset();
}
