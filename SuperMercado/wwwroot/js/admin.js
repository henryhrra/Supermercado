window.onload = function () {
	load()
}

function load() {
$.ajax({
		type: "GET",
		url: "/Admin/Usuarios/GetTotal",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		error: function (x, e) { alert(e.responseText); },
		success: function (objTrendList) {
						document.querySelector('#cantidadDeUsuarios').innerText = objTrendList.data
			$('#productosEnExistencias').text('')
			var ddUser = new DropDown($('#ddUser'));
			$(document).click(function () {
				$('.wrapper-dropdown-User').removeClass('active');
			});
			$.ajax({
				type: "GET",
				url: "/Admin/Productos/GetTotalProductos",
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				error: function (x, e) { alert(e.responseText); },
				success: function (objTrendList) {
					$('#productosEnExistencias').text(objTrendList.data)
				}
			});
		}
});
	
	document.querySelector('.loading').classList.add('hidden');
	setTimeout(() => {
		document.querySelector('.loading').style.display = 'none';
	}, 1000)
	return
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