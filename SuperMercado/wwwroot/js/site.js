
    $(document).ready(function () {


    $('#dismiss, .overlay').on('click', function () {
        $('#sidebar').removeClass('active');
    $('.overlay').removeClass('active');
        });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').addClass('active');
    $('.overlay').addClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });


        var ddUser = new DropDown($('#ddUser'));
        $(document).click(function () {
            $('.wrapper-dropdown-User').removeClass('active');
        });
    });

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
            if (obj.dd[0].id == 'ddUser') {
                if (opt.text().trim() == "Administrar") {
                    window.location.href = this.children[0].getAttribute('hrefAdmin');
                } if (opt.text().trim() == "Mis Compras") {
                    window.location.href = this.children[0].getAttribute('hrefAdmin');
                }
                if (opt.text().trim() == "Salir") {
                    this.children[0].submit();
                }
                return
            }
            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text(obj.val);
        });
        
    },
    getValue: function () {
        return this.val;
    },
    getIndex: function () {
        return this.index;
    }
}
