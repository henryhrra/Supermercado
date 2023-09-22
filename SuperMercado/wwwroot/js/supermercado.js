

/*===================================
Author       : Bestwebcreator.
Template Name: Organiq - Organic Food HTML Template
Version      : 1.0
===================================*/

/*===================================*
PAGE JS
*===================================*/

(function ($) {
	'use strict';

	/*===================================*
	01. LOADING JS
	/*===================================*/
	$(window).on('load', function () {
		var preLoder = $("#preloader");
		preLoder.delay(700).fadeOut(500).addClass('loaded');
	});

	/*===================================*
	02. SMOOTH SCROLLING JS
	*===================================*/
	// Select all links with hashes
	var headerHeight = $(".header_wrap").height() - 10;
	$('a.page-scroll').on('click', function (event) {
		// On-page links
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
			// Figure out element to scroll to
			var target = $(this.hash),
				speed = $(this).data("speed") || 800;
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

			// Does a scroll target exist?
			if (target.length) {
				// Only prevent default if animation is actually gonna happen
				event.preventDefault();
				$('html, body').animate({
					scrollTop: target.offset().top - headerHeight
				}, speed);
			}
		}
	});

	$(window).on("load resize ready", function () {
		$(".header_wrap.fixed-top").css({ "padding-top": $(".alertbox").height() });
	})
	$('.alertbox .close').on("click", function () {
		$(".header_wrap ").css({ "padding-top": "0" });
	})

	$(function () {
		if ($('.header_wrap').hasClass('fixed-top')) {
			$('.alertbox').addClass('alert_fixed');
		}
	});

	/*===================================*
	03. MENU JS
	*===================================*/
	//Main navigation scroll spy for shadow
	$(window).on('scroll', function () {
		var scroll = $(window).scrollTop();

		if (scroll >= 80) {
			$('header').addClass('nav-fixed');
			$('.alert_fixed').addClass('fixed');
		} else {
			$('header').removeClass('nav-fixed');
			$('.alert_fixed').removeClass('fixed');;
		}

	});

	//Show Hide dropdown-menu Main navigation 
	$(document).ready(function () {
		$('.dropdown-menu a.dropdown-toggler').on('click', function (e) {
			var $el = $(this);
			var $parent = $(this).offsetParent(".dropdown-menu");
			if (!$(this).next().hasClass('show')) {
				$(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
			}
			var $subMenu = $(this).next(".dropdown-menu");
			$subMenu.toggleClass('show');

			$(this).parent("li").toggleClass('show');

			$(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
				$('.dropdown-menu .show').removeClass("show");
			});

			return false;
		});
	});

	//Hide Navbar Dropdown After Click On Links
	var navBar = $(".header_wrap");
	var navbarLinks = navBar.find(".navbar-collapse ul li a.page-scroll");

	$.each(navbarLinks, function (i, val) {

		var navbarLink = $(this);

		navbarLink.on('click', function () {
			navBar.find(".navbar-collapse").collapse('hide');
			$("header").removeClass("active");
		});

	});

	//Main navigation Active Class Add Remove
	$('.navbar-toggler').on('click', function () {
		$("header").toggleClass("active");
		if ($('.search-overlay').hasClass('open')) {
			$(".search-overlay").removeClass('open');
			$(".search_trigger").removeClass('open');
		}
	});

	$(window).on("load resize ready", function () {
		function getClass(element, startsWith) {

			var result = undefined;
			$(element.attr('class').split(' ')).each(function () {

				if (this.indexOf(startsWith) > -1) result = this;
			});
			return result;
		}
		$('.header_wrap').each(function () {
			var className = getClass($(this), 'bg_') || getClass($(this), 'bg-');
			if ($('.header_wrap').hasClass(className)) {
				Array.prototype.forEach.call(document.querySelectorAll(".dropdown-menu"), function (el) {
					el.classList.add(className);
				});
			}
			if ($(window).width() <= 992) {
				$('.navbar-nav').addClass(className);
			}
		});
	});

	$('.sidetoggle').on('click', function () {
		$('.sidebar_menu').addClass('active');
		$('body').addClass('active');
		$("body").append('<div id="header-overlay" class="header-overlay"></div>');
	});

	$(document).ready(function () {
		$(document).on('click', '#header-overlay, .sidemenu_close', function () {
			$('.sidebar_menu').removeClass('active');
			$('body').removeClass('active');
			$('#header-overlay').fadeOut('3000', function () {
				$('#header-overlay').remove();
			});
			return false;
		});
	});


	/*===================================*
	04. SEARCH JS
	*===================================*/
	$(".search_trigger").on("click", function () {
		$(".search-overlay").toggleClass('open');
		$(".search_trigger").toggleClass('open');
		if ($('.navbar-collapse').hasClass('show')) {
			$(".navbar-collapse").removeClass('show');
			$(".navbar-toggler").addClass('collapsed');
			$(".navbar-toggler").attr("aria-expanded", false);
		}

	});

	/*===================================*
	05. SLIDER JS
	*===================================*/
	/*
	var owl = $('.owl-thumbs-slider');
	owl.owlCarousel({
		loop: false,
		items: 4,
		dots: false,
		margin: 10,
		nav: true,
		navText: ['<i class="ion-ios-arrow-back"></i>', '<i class="ion-ios-arrow-forward"></i>'],
	});

	*/
	$(window).on("load", function () {
		$('.carousel_slide1').each(function () {
			var $carousel = $(this);
			$carousel.owlCarousel({
				dots: $carousel.data("dots"),
				loop: $carousel.data("loop"),
				margin: $carousel.data("margin"),
				mouseDrag: $carousel.data("mouse-drag"),
				touchDrag: $carousel.data("touch-drag"),
				items: 1,
				autoHeight: $carousel.data("autoheight"),
				nav: $carousel.data("nav"),
				navText: ['<i class="ion-ios-arrow-back"></i>', '<i class="ion-ios-arrow-forward"></i>'],
				autoplay: $carousel.data("autoplay"),
				animateIn: $carousel.data("animate-in"),
				animateOut: $carousel.data("animate-out"),
				autoplayTimeout: $carousel.data("autoplay-timeout"),
				smartSpeed: $carousel.data("smart-speed"),
			});
			var t = $(".testimonial_wrap")
			$carousel.on('changed.owl.carousel', function (event) {
				t.hasClass("active") ? t.removeClass("active") : (t.addClass("active"), setTimeout(function () {
					t.removeClass("active")
				}, 500))
			})
		});


		$('.carousel_slide2').each(function () {
			var $carousel = $(this);
			$carousel.owlCarousel({
				loop: $carousel.data("loop"),
				margin: $carousel.data("margin"),
				mouseDrag: $carousel.data("mouse-drag"),
				touchDrag: $carousel.data("touch-drag"),
				dots: $carousel.data("dots"),
				autoHeight: true,
				center: $carousel.data("center"),
				rewind: $carousel.data("rewind"),
				autoplay: $carousel.data("autoplay"),
				animateIn: $carousel.data("animate-in"),
				animateOut: $carousel.data("animate-out"),
				nav: $carousel.data("nav"),
				navText: ['<i class="ion-ios-arrow-back"></i>', '<i class="ion-ios-arrow-forward"></i>'],
				autoplayTimeout: $carousel.data("autoplay-timeout"),
				responsive: {
					0: {
						items: 1,
					},
					380: {
						items: 1,
					},
					576: {
						items: 2,
					},
					1000: {
						items: 2,
					},
					1199: {
						items: 2
					}
				}
			});
		});

		$('.carousel_slide3').each(function () {
			var $carousel = $(this);
			$carousel.owlCarousel({
				loop: $carousel.data("loop"),
				margin: $carousel.data("margin"),
				mouseDrag: $carousel.data("mouse-drag"),
				touchDrag: $carousel.data("touch-drag"),
				dots: $carousel.data("dots"),
				autoHeight: true,
				center: $carousel.data("center"),
				rewind: $carousel.data("rewind"),
				autoplay: $carousel.data("autoplay"),
				nav: $carousel.data("nav"),
				navText: ['<i class="ion-ios-arrow-back"></i>', '<i class="ion-ios-arrow-forward"></i>'],
				autoplayTimeout: $carousel.data("autoplay-timeout"),
				responsive: {
					0: {
						items: 1,
					},
					380: {
						items: 1,
					},
					576: {
						items: 2,
					},
					1000: {
						items: 3,
					},
					1199: {
						items: 3
					}
				}
			});
		});

		$('.carousel_slide4').each(function () {
			var $carousel = $(this);
			$carousel.owlCarousel({
				dots: $carousel.data("dots"),
				loop: $carousel.data("loop"),
				margin: $carousel.data("margin"),
				mouseDrag: $carousel.data("mouse-drag"),
				touchDrag: $carousel.data("touch-drag"),
				autoHeight: true,
				center: $carousel.data("center"),
				rewind: $carousel.data("rewind"),
				autoplay: $carousel.data("autoplay"),
				nav: $carousel.data("nav"),
				navText: ['<i class="ion-ios-arrow-back"></i>', '<i class="ion-ios-arrow-forward"></i>'],
				autoplayTimeout: $carousel.data("autoplay-timeout"),
				responsive: {
					0: {
						items: 1,
					},
					380: {
						items: 1,
					},
					576: {
						items: 2,
					},
					1000: {
						items: 3,
					},
					1199: {
						items: 4
					}
				}
			});
		});

		$('.carousel_slide5').each(function () {
			var $carousel = $(this);
			$carousel.owlCarousel({
				dots: $carousel.data("dots"),
				loop: $carousel.data("loop"),
				margin: $carousel.data("margin"),
				mouseDrag: $carousel.data("mouse-drag"),
				touchDrag: $carousel.data("touch-drag"),
				autoHeight: true,
				center: $carousel.data("center"),
				rewind: $carousel.data("rewind"),
				autoplay: $carousel.data("autoplay"),
				nav: $carousel.data("nav"),
				navText: ['<i class="ion-ios-arrow-back"></i>', '<i class="ion-ios-arrow-forward"></i>'],
				autoplayTimeout: $carousel.data("autoplay-timeout"),
				responsive: {
					0: {
						items: 2,
						margin: 15,
					},
					380: {
						items: 3,
					},
					576: {
						items: 4,
					},
					1000: {
						items: 5,
					},
					1199: {
						items: 5,
					}
				}
			});
		});

		$('.cl_logo_slider').each(function () {
			var $carousel = $(this);
			$carousel.owlCarousel({
				dots: $carousel.data("dots"),
				loop: $carousel.data("loop"),
				margin: $carousel.data("margin"),
				mouseDrag: $carousel.data("mouse-drag"),
				touchDrag: $carousel.data("touch-drag"),
				autoHeight: true,
				rewind: $carousel.data("rewind"),
				autoplay: $carousel.data("autoplay"),
				nav: $carousel.data("nav"),
				navText: ['<i class="ion-ios-arrow-back"></i>', '<i class="ion-ios-arrow-forward"></i>'],
				autoplayTimeout: $carousel.data("autoplay-timeout"),
				responsive: {
					0: {
						items: 2,
					},
					380: {
						items: 3,
					},
					600: {
						items: 4,
					},
					1000: {
						items: 5,
					},
					1199: {
						items: 6
					}
				}
			});
		});
	});


	/*===================================*
	09. SCROLLUP JS
	*===================================*/
	$(window).scroll(function () {
		if ($(this).scrollTop() > 150) {
			$('.scrollup').fadeIn();
		} else {
			$('.scrollup').fadeOut();
		}
	});

	$(".scrollup").on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 600);
		return false;
	});




	/*===================================*
	13. BACKGROUND IMAGE JS
	*===================================*/
	/*data image src*/
	$(".background_bg").each(function () {
		var attr = $(this).attr('data-img-src');
		if (typeof attr !== typeof undefined && attr !== false) {
			$(this).css('background-image', 'url(' + attr + ')');
			$(this).css('background-position', 'center center');
			$(this).css('background-size', 'cover');
		}
	});


	/*===================================*
	16. PARALLAX JS
	*===================================*/
	$(window).on('load', function () {
		$('.parallax_bg').parallaxBackground();
	});






})(jQuery);























    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "/cliente/Supermercado/GetProductos/",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            error: function (x, e) { alert(e.responseText); },
            success: function (objTrendList) {
                var datos = '';
                $.each(objTrendList, function (index, Data) {
                    console.log(Data)
                    let productos = Data[0];
                    productos.forEach((producto) => {
						let precios = "",addClass="";
						let descu = producto.descuento * 100;
						let Precio;
						if (producto.descuento > 0) {
							Precio = (producto.precio_de_Venta - (producto.precio_de_Venta * producto.descuento)).toFixed(2)
							if (producto.descuento >= 0.7) {
								addClass = "pr_flash bg_white";
								descu = `<div class="fire">
									<div class="fire-left">
										<div class="main-fire"></div>
										<div class="particle-fire"></div>
									</div>
									<div class="fire-main">
										<div class="main-fire"></div>
										<div class="particle-fire"></div>
									</div>
									<div class="fire-right">
										<div class="main-fire"></div><span class="descuento">${producto.descuento * 100}%</span>
										<div class="particle-fire"></div>
									</div>
									<div class="fire-bottom">
										<div class="main-fire"></div>
									</div>
								</div>`
							} else {
								descu += '%'
								addClass = "pr_flash bg_green";
							}
                            precios += `<span class="price old">${producto.precio_de_Venta.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span><br>
                        <span class="price">$${Precio}</span>`
							
						} else {
							Precio = producto.precio_de_Venta;
                            precios += `<span class="price">${producto.precio_de_Venta.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>`
                        }

                        datos += ` <div class="col-xl-3 col-lg-4 col-sm-6" ><div class="product">
                    <span class="${producto.descuento > 0 ? addClass : ''}">${producto.descuento > 0 ? descu:''}</span>
                    <div class="product_img">


                        <a href="#"><img src="${producto.foto}" alt="product_img1"></a>




                        <div class="product_action_box">
                            <ul class="list_none pr_action_btn">
                                <li>
								<a href="#0" class=" js-cd-add-to-cart" data-id="${producto.idProducto}" data-price="${Precio}">
                                   
                                        <span class="icon-add-to-cart carritoP"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span></span>
                                    </a>
                                </li>
                                <li><a href="/Cliente/Supermercado/Detalles/${producto.idProducto}" class="popup-ajax"><i class="fas fa-eye"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="product_info">
                        <h6><a href="#">${producto.nombre}</a></h6>
                        <div class="rating"><div class="product_rate" style="width:80%"></div></div>
                        ${precios}
                    </div>
                </div>
                </div>`
                    })
                    
                    document.getElementById('mainProductos').innerHTML=datos;
                }
                )
			},
			complete: function () {
				carrito();
				document.querySelector('.loading').classList.add('hidden');
				setTimeout(() => {
					document.querySelector('.loading').style.display='none';
				}, 1000)
			}
        });

    });
