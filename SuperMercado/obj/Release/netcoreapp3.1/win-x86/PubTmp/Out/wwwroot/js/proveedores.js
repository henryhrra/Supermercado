var options = {
    valueNames: ['proveedor-ID', 'proveedor-Nombre', 'proveedor-Contacto', 'proveedor-Telefono-Contacto', 'proveedor-Telefono'],
    page: 5,
    pagination: true,
    milton: 0
};
var tooltips = $('#RegistrarForm > div > div > div:nth-child(1) > div:nth-child(1) > label').tooltip({
    position: {
        my: "left top",
        at: "right+5 top-5",
        collision: "none"
    },
    content: "Nombre no válido"
});
var DataTable;
var reload = false
var globalId;
$("body").on("submit", "#RegistrarForm", function (e) {
    if (!validar()) return;
    if (document.getElementById('btnAdd').innerText == 'Actualizar') {
       

        var form = $("#RegistrarForm")[0];
        var formdata = new FormData();
        formdata.append("Nombre", form.Nombre.value);
        if (form['file-1[]'].files[0] != undefined)
            formdata.append("Foto", form['file-1[]'].files[0]);
        else
            formdata.append("Foto", form["Url-imagen"].value.trim());
        formdata.append("Giro", form.Giro.value);
        formdata.append("NombreContacto", form.NombreContacto.value);
        formdata.append("Direccion", form.Direccion.value);
        formdata.append("telefono", form.telefono.value);
        formdata.append("telefonoContacto", form.telefonoContacto.value);
        formdata.append("Correo", form.Correo.value);
        formdata.append("pagina_Web", form.pagina_Web.value);
        formdata.append("idProveedor", globalId);
        formdata.append("Url-imagen", form["Url-imagen"].value.trim());


        $.ajax({
            type: "POST",
            url: "/Admin/Proveedores/Actualizar/" + globalId,
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

                    $('#sidebar').removeClass('active');
                    $('.overlay').removeClass('active');
                } else {
                    let error = Object.keys(data.message[0]);
                    let msg = '';
                    error.forEach((er) => {
                        console.log(data.message[0][er])
                        msg += data.message[0][er].errorMessage+'\n'
                    })
                    console.log(msg)
                    toastr["error"](msg)
                }
            }
        });

        return
    }

    var form = $("#RegistrarForm")[0];
    var formdata = new FormData();
    formdata.append("Nombre", form.Nombre.value);
    if (form['file-1[]'].files[0] != undefined)
        formdata.append("Foto", form['file-1[]'].files[0]);
    else
        formdata.append("Foto", form["Url-imagen"].value.trim());
    formdata.append("Giro", form.Giro.value);
    formdata.append("NombreContacto", form.NombreContacto.value);
    formdata.append("Direccion", form.Direccion.value);
    formdata.append("telefono", form.telefono.value);
    formdata.append("telefonoContacto", form.telefonoContacto.value);
    formdata.append("Correo", form.Correo.value);
    formdata.append("pagina_Web", form.pagina_Web.value);
    $.ajax({
        type: "POST",
        url: "/Admin/Proveedores/Registrar",
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
        url: "/Admin/Proveedores/GetAll",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        error: function (x, e) { alert(e.responseText); },
        success: function (objTrendList) {
            $.each(objTrendList, function (index, Proveedores) {
                Proveedores.forEach((proveedor) => {
                    var itemsTable = document.getElementById('itemsTable');
                    var item = document.createElement('LI');
                    item.innerHTML = `

<div class="row itemRow">
    <div class="col-md-1">
        <img class="img-fluid zoomIMG" src="${proveedor.foto}" alt="" />
    </div>
    <div class="d-md-none d-sm-block d-lg-block col-md-1 text-center">
        <h5 class="proveedor-ID">${proveedor.idProveedor}</h5>
    </div>
    <div class="col-md-3 col-lg-2 text-center">
        <h5 class="proveedor-Nombre">${proveedor.nombre}</h5>
    </div>
    <div class="col-md-2 text-center">
        <p class="proveedor-Contacto">${proveedor.nombreContacto}</p>
    </div>
    <div class="col-md-2 text-center">
        <p class="proveedor-Telefono-Contacto">${proveedor.telefonoContacto}</p>
    </div>
    <div class="col-md-2 text-center">
        <span class="proveedor-Telefono">${proveedor.telefono}</span>
    </div>
    <div class="col-md-1 col-lg-2 text-center">
        <ul class="nav">

            <li>
                <span onclick='Edit("/Admin/Proveedores/Get/${proveedor.idProveedor}")' class="iconFuente icon-edit d-md-inline"><span class="path1 d-md-inline"></span><span class="path2 d-md-inline"></span><span class="path3 d-md-inline"></span><span class="path4 d-md-inline"></span><span class="path5 d-md-inline"></span></span>
            </li>
            <li>
                <span onclick='Delete("/Admin/Proveedores/Delete/${proveedor.idProveedor}")' class=" iconFuente icon-remove d-md-inline"><span class="path1 d-md-inline"></span><span class="path2 d-md-inline"></span></span>
            </li>
            <li>
                <input class="checkZoom d-md-inline" type="checkbox" value="" />
            </li>
        </ul>
    </div>

    <hr>
    <a class="mostrarSubcategorias" data-toggle="collapse" href="#collapse${proveedor.idProveedor}" role="button" aria-expanded="false" aria-controls="collapse${proveedor.idProveedor}">
        <hr>
        Detalles
    </a>
</div>

<div class="collapse subCategorias" id="collapse${proveedor.idProveedor}">



    <div class="detallesContainer">
        <div class="row itemDetalles">
            <div class="col-4"><span>Dirección:</span ><strong class="infoSpan">${proveedor.direccion}</strong ></div>
            <div class="col-4"><span>Nombre de contacto:</strong></span><strong class="infoSpan">${proveedor.nombreContacto}</strong></div>
            <div class="col-4"><span>Teléfono de contacto:</span><strong class="infoSpan">${proveedor.telefonoContacto}</strong></div>
        </div>


        <hr style="
    width: 100%;
    background: #959595;
    height: 1px;
">
        <div class="row itemDetalles">
            <div class="col-4"><span>Giro:</span><strong class="infoSpan">${proveedor.giro}</strong></div>
            <div class="col-4"><span>Correo Electrónico:</span><strong class="infoSpan">${proveedor.correo == null ? '--' : `<a href="mailto:${proveedor.pagina_Web}" target="_blank" class="text-primary text-wrap">${proveedor.correo}</a>`}</strong></div>
            <div class="col-4">	<span>Página Web:</span><strong class="infoSpan text-wrap">${proveedor.pagina_Web == null ? '--' : `<a href="${proveedor.pagina_Web}" target="_blank" class="text-primary">${proveedor.pagina_Web}</a>`}</strong></div>
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
    var elementos = ['Todo', 'ID', 'Nombre', 'Giro', 'Fecha', 'Teléfono']
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
        if (DataTable.size() < 5) {
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
                console.log('sdfsdfsdfsd')
                if (opt.text().trim() == "Administrar") {
                    window.location.href = "/Admin/admin";
                }
                if (opt.text().trim() == "Salir") {
                    this.children[0].submit();
                }
                return
            }
            if (obj.dd[0].id == 'ddMostrar') {
                let error = mostrar(opt.text());
                if (error == 'error') return;
                extra = 'Mostrar ' + error
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
            form.Giro.value = data.giro;
            form.Direccion.value = data.direccion;
            form.telefono.value = data.telefono;
            form.telefonoContacto.value = data.telefonoContacto;
            form.NombreContacto.value = data.nombreContacto;
            form.Correo.value = data.correo;
            form.pagina_Web.value = data.pagina_Web;
            document.getElementById("btnAdd").innerText = 'Actualizar'
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
    $('.invalidName')[0].scrollIntoView();
    cancelarArchivos('#file-1', document.getElementById('cancelarArchivos'));
}
function obligatorio(e) {
    if (e.target.parentElement.parentElement.children[0].children[1] != undefined) {
        e.target.parentElement.parentElement.children[0].children[1].innerText = '';
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
    let nombreApellidoRegex = /^[A-Za-zÀ-ÿ ]*$/;
    let telefonoRegex = /^\(?([0-9]{4})\)?[-]([0-9]{4})$/;
    let correoRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
    let nombreComercial = /^[A-Za-zÀ-ÿ0-9 \&*.(),']+$/;
    let imageRegex = /.jpg$|.png$|.jpeg$/gi;
    var form = document.getElementById('RegistrarForm');
    if (form.Nombre.value.length === 0) {
        let nombre = $('.invalidName');
        nombre.text('Campo Obligatorio vacío');
        nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
        form.Nombre.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
        form.Nombre.addEventListener('click', obligatorio);
        return false;
    }
    if (!nombreComercial.test(form.Nombre.value)) {
        let nombre = $('.invalidName');
        nombre.text('Nombre Inválido, No se permiten caracteres especiales');
        nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
        form.Nombre.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
        form.Nombre.addEventListener('click', obligatorio);
        return false;
    }
    if (form.telefono.value.length > 0) {
        if (!telefonoRegex.test(form.telefono.value)) {
            let telefono = $('.invalidPhone');
            telefono.text('Formato Inválido debe ser ####-####');
            telefono[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
            form.telefono.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
            form.telefono.addEventListener('click', obligatorio);
            return false;
        }
    }
    if (form.NombreContacto.value.length === 0) {
        let nombre = $('.invalidName2');
        nombre.text('Campo Obligatorio');
        nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
        form.NombreContacto.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
        form.NombreContacto.addEventListener('click', obligatorio);
        return false;
    }
    if (!nombreApellidoRegex.test(form.NombreContacto.value)) {
        let nombre = $('.invalidName2');
        nombre.text('Nombre Inválido, No se permiten caracteres especiales');
        nombre[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
        form.NombreContacto.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
        form.NombreContacto.addEventListener('click', obligatorio);
        return false;
    }
    if (form.telefonoContacto.value.length === 0) {
        let telefonoContacto = $('.invalidPhone2');
        telefonoContacto.text('Campo Obligatorio');
        telefonoContacto[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
        form.telefonoContacto.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
        form.telefonoContacto.addEventListener('click', obligatorio);
        return false;
    }
    if (!telefonoRegex.test(form.telefonoContacto.value)) {
        let telefonoContacto = $('.invalidPhone2');
        telefonoContacto.text('Formato Inválido debe ser ####-####');
        telefonoContacto[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
        form.telefonoContacto.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
        form.telefonoContacto.addEventListener('click', obligatorio);
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
    if (form.Correo.value.length > 0)
        if (!correoRegex.test(form.Correo.value)) {
            let Correo = $('.invalidCorreo');
            Correo.text('Campo Obligatorio');
            Correo[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
            form.Correo.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
            form.Correo.addEventListener('click', obligatorio);
            return false;
        }
    if (form.pagina_Web.value.length > 0)
        if (!urlRegex.test(form.pagina_Web.value)) {
            let pagina_Web = $('.invalidUrl');
            pagina_Web.text('Correo Inválido');
            pagina_Web[0].scrollIntoView({ top: 100, behavior: "smooth", center: true });
            form.pagina_Web.setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
            form.pagina_Web.addEventListener('click', obligatorio);
            return false;
        }
    return true;
}