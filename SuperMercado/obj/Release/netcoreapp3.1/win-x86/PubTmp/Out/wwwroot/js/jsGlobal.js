function cancelarArchivos(selector,btn) {
    let input = document.querySelector(selector);
    var label = input.nextElementSibling;
    label.innerHTML =  `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg> <span style="display:inline;">Subir Archivo&hellip;</span>`;
    input.value = null;
    btn.style.display = 'none';
    document.querySelector('.invalidimg').innerText = '';
    document.querySelector('.labelFile').setAttribute('style', '');
}
function eliminarDiacriticos(texto) {
	return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
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
		let text = eliminarDiacriticos(texto).replaceAll('.', 'd');
		DataTable.search(text);
		if (DataTable.matchingItems.length == 0) {
			DataTable.search();
			toastr["warning"]("No se encontraron registros para :" + texto, "No encontrado")
		}
	}
	else {
		let text = eliminarDiacriticos(texto).replaceAll('.', 'd');
		let container = options.controller + '-' + eliminarDiacriticos(filtro.innerText);
		DataTable.search(text);
		if (DataTable.matchingItems.length == 0) {
			DataTable.search();
			toastr["warning"]("No se encontraron registros para :" + texto, "No encontrado")
		}
	}
}
function Delete(url) {
	swal.fire({
		title: "Esta seguro de borrar?",
		text: "Este contenido no se puede recuperar!",
		//type: "warning"
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "Si, borrar!"
		//closeOnconfirm: true
	}).then(function (result) {
		if (result.isConfirmed) {
			$.ajax({
				type: 'POST',
				url: url,
				success: function (data) {
					if (data.success) {
						toastr.success(data.message);
						reload = true;
						cargarTodo();
					}
					else {
						toastr.error(data.message);
					}
				}
			});
		}
	});
}
function noIplementado() {
	toastr.options = {
		"closeButton": true,
		"debug": false,
		"newestOnTop": true,
		"progressBar": true,
		"positionClass": "toast-top-right",
		"preventDuplicates": true,
		"onclick": null,
		"showDuration": "3000",
		"hideDuration": "500",
		"timeOut": "3000",
		"extendedTimeOut": "1000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	}
		toastr["info"]('Esta accion no ha sido Implementada')
}
