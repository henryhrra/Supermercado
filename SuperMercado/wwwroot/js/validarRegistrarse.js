
function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.dropdown > li');
    this.val = '';
    this.index = -1;
    this.initEvents();
}
DropDown.prototype = {
    initEvents: function () {
        var obj = this;

        obj.dd.on('click', function (event) {
            $(this).toggleClass('active');
            return false;
        });

        obj.opts.on('click', function () {
            var opt = $(this);
            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text(obj.val);
            document.getElementById('Input_Sexo').value = obj.val[0];
        });
    },
    getValue: function () {
        return this.val;
    },
    getIndex: function () {
        return this.index;
    }
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
function validar(i) {
    $('.validationSpan').html('')
    $('.invalidCampo').text('')
    $('input').attr('style','')
    let nombreApellidoRegex = /^[A-Za-zÀ-ÿ ]*$/;
    let telefonoRegex = /^\(?([0-9]{4})\)?[-]([0-9]{4})$/;
    let correoRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let imageRegex = /.jpg$|.png$|.jpeg$/gi;
    let pass = /^(?=.*\d)(?=(.*\W){1})(?=.*[a-zA-Z])(?!.*\s).{8,20}$/
    var form = document.getElementById('msform');

    if (form["Input_Email"].value.length === 0) {
        let correo = $('.invalidCorreo');
        correo.text('Campo Obligatorio vacío');
        form["Input_Email"].setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
        form["Input_Email"].addEventListener('click', obligatorio);
        return false;
    }
    if (!correoRegex.test(form["Input_Email"].value)) {
        let correo = $('.invalidCorreo');
        if (form["Input_Email"].value.indexOf('@') == -1) {
            correo.text('Correo no válido el correo debe incluir "@"');
        }else
        correo.text('Correo no válido');
        form["Input_Email"].setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
        form["Input_Email"].addEventListener('click', obligatorio);
        return false;
    }
    if (form["Input_Password"].value.length === 0) {
        let nombre = $('.invalidPass');
        nombre.text('Campo Obligatorio vacío');
        form["Input_Password"].setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
        form["Input_Password"].addEventListener('click', obligatorio);
        return false;
    }
    if (!pass.test(form["Input_Password"].value)) {
        let pass = $('.invalidPass');
        pass.html('Contraseña no válida debe contener al menos <br>1 Mayúscula<br>1 Minúscula<br>1 Número<br>1 Caracter especial<br>6 Caracteres mínimos y 20 máximo');
        form["Input_Password"].setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
        form["Input_Password"].addEventListener('click', obligatorio);
        return false;
    }
    if (form["Input_ConfirmPassword"].value.length === 0) {
        let pass = $('.invalidPassC');
        pass.text('Campo Obligatorio');
        form["Input_ConfirmPassword"].setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
        form["Input_ConfirmPassword"].addEventListener('click', obligatorio);
        return false;
    }
    if (!pass.test(form["Input_ConfirmPassword"].value)) {
        let pass = $('.invalidPassC');
        pass.html('Contraseña no válida debe contener al menos <br>1 Mayúscula<br>1 Minúscula<br>1 Número<br>1 Caracter especial<br>6 Caracteres mínimos'); nombre.html('Contraseña no válida debe contener al menos <br>1 Mayúscula<br>1 Minúscula<br>1 Número<br>1 Caracter especial<br>6 Caracteres mínimos');
        form["Input_ConfirmPassword"].setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
        form["Input_ConfirmPassword"].addEventListener('click', obligatorio);
        return false;
    }
    if (form["Input_ConfirmPassword"].value != form["Input_Password"].value) {
        let nombre = $('.invalidPassC');
        nombre.text('Las contraseñas no coinciden');
        form["Input_ConfirmPassword"].setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
        form["Input_ConfirmPassword"].addEventListener('click', obligatorio);
        return false;
    }
    if (i == 1) return true;


    if (form["Input_Nombres"].value.length === 0) {
        let nombre = $('.invalidName');
        nombre.text('Campo Obligatorio');
        form["Input_Nombres"].setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
        form["Input_Nombres"].addEventListener('click', obligatorio);
        return false;
    }
    if (!nombreApellidoRegex.test(form["Input_Nombres"].value)) {
        let nombre = $('.invalidName');
        nombre.text('Nombre no válido');
        form["Input_Nombres"].setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
        form["Input_Nombres"].addEventListener('click', obligatorio);
        return false;
    }
    if (form["Input_Apellidos"].value.length === 0) {
        let apellido = $('.invalidApellido');
        apellido.text('Campo Obligatorio');
        form["Input_Apellidos"].setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
        form["Input_Apellidos"].addEventListener('click', obligatorio);
        return false;
    }
    if (!nombreApellidoRegex.test(form["Input_Apellidos"].value)) {
        let nombre = $('.invalidApellido');
        nombre.text('Apellido no válido');
        form["Input_Apellidos"].setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
        form["Input_Apellidos"].addEventListener('click', obligatorio);
        return false;
    }
    if (form["Input_PhoneNumber"].value.length === 0) {
        let apellido = $('.invalidPhone');
        apellido.text('Campo Obligatorio');
        form["Input_PhoneNumber"].setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
        form["Input_PhoneNumber"].addEventListener('click', obligatorio);
        return false;
    }
    if (!telefonoRegex.test(form["Input_PhoneNumber"].value)) {
        let telefono = $('.invalidPhone');
        telefono.text('Número de contacto no válido el formato debe ser ####-####');
        form["Input_PhoneNumber"].setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
        form["Input_PhoneNumber"].addEventListener('click', obligatorio);
        return false;
    }

    let sexo = document.querySelector('#ddSexoSpan');
    if (sexo.innerText == 'Seleccionar Sexo') {
        let sex = $('.invalidSex');
        sex.text('Campo Obligatorio');
        sexo.setAttribute('style', 'background: #ff9494!important;border-radius: 12px; color: crimson;');
        sexo.addEventListener('click', obligatorio);
        return false;
    }
    if (form["Input_Fecha_nacimiento"].value.length === 0) {
        let nacimiento = $('.invalidFecha');
        nacimiento.html(`Campo obligatorio`);
        form["Input_Fecha_nacimiento"].setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
        form["Input_Fecha_nacimiento"].addEventListener('click', obligatorio);
        return false;
    }
    let edad = getAge(form["Input_Fecha_nacimiento"].value.split('-').join('/'));
    if (edad < 18) {
        if (edad < 0) {
            let nacimiento = $('.invalidFecha');
            nacimiento.html(`No se aceptan fechas futuras`);
            form["Input_Fecha_nacimiento"].setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
            form["Input_Fecha_nacimiento"].addEventListener('click', obligatorio);
              return false;
        }
        let nacimiento = $('.invalidFecha');
        nacimiento.html(`Debes ser mayor de Edad para poder registrarte`);
        form["Input_Fecha_nacimiento"].setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
        form["Input_Fecha_nacimiento"].addEventListener('click', obligatorio);
        return false;
    }


    if (i == 2) return true;
    if (form['file-1[]'].files.length > 0)
        if (!imageRegex.test(form['file-1[]'].files[0].name)) {
            let img = $('.invalidimg');
            img.text('Imagen no válida, sólo jpg y png');
            form['file-1[]'].labels[0].setAttribute('style', 'border: red 2px solid!important;background: #ff9494!important;');
            form['file-1[]'].labels[0].addEventListener('click', obligatorio);
            return false;
        }

    return true;
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}