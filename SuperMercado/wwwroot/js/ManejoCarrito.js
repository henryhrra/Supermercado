
function carrito() {


  // Add to Cart Interaction - by CodyHouse.co
  var cart = document.getElementsByClassName('js-cd-cart');
	if (cart.length > 0) {
		
  	var cartAddBtns = document.getElementsByClassName('js-cd-add-to-cart'),
  		cartBody = cart[0].getElementsByClassName('cd-cart__body')[0],
  		cartList = cartBody.getElementsByTagName('ul')[0],
  		cartListItems = cartList.getElementsByClassName('cd-cart__product'),
  		cartTotal = cart[0].getElementsByClassName('cd-cart__checkout')[0].getElementsByTagName('span')[0],
  		cartCount = cart[0].getElementsByClassName('cd-cart__count')[0],
  		cartCountItems = cartCount.getElementsByTagName('li'),
  		cartUndo = cart[0].getElementsByClassName('cd-cart__undo')[0],
  		cartTimeoutId = false,
  		animatingQuantity = false;
		initCartEvents();
	  cargarCarrito();

	  function initCartEvents() {

		 
			// add products to cart
			for(var i = 0; i < cartAddBtns.length; i++) {(function(i){
				cartAddBtns[i].addEventListener('click', addToCart);
			})(i);}

			// open/close cart
			cart[0].getElementsByClassName('cd-cart__trigger')[0].addEventListener('click', function(event){
				event.preventDefault();
				toggleCart();
			});
			
			cart[0].addEventListener('click', function(event) {
				if(event.target == cart[0]) { // close cart when clicking on bg layer
					toggleCart(true);
				} else if (event.target.closest('.cd-cart__delete-item')) { // remove product from cart
					event.preventDefault();

					removeProduct(event.target.closest('.cd-cart__product'));
					PrecioCart();
				}
			});

			// update product quantity inside cart
			cart[0].addEventListener('click', function (event) {
				console.log(event.target.getAttribute('data-click'))
				if (event.target.getAttribute('data-click') == "plus") {
					incre(document.getElementById(event.target.getAttribute('data-product')))
					PrecioCart();
				}
				if (event.target.getAttribute('data-click') == "minus") {
					
					decre(document.getElementById(event.target.getAttribute('data-product')));
					PrecioCart();
				}
			});

			//reinsert product deleted from the cart
			cartUndo.addEventListener('click', function(event) {
				if(event.target.tagName.toLowerCase() == 'a') {
					event.preventDefault();
					if(cartTimeoutId) clearInterval(cartTimeoutId);
					// reinsert deleted product
					var deletedProduct = cartList.getElementsByClassName('cd-cart__product--deleted')[0];
					Util.addClass(deletedProduct, 'cd-cart__product--undo');
					deletedProduct.addEventListener('animationend', function cb(){
						deletedProduct.removeEventListener('animationend', cb);
						Util.removeClass(deletedProduct, 'cd-cart__product--deleted cd-cart__product--undo');
						deletedProduct.removeAttribute('style');
						PrecioCart();
						updateCartCount(false, 1)
						cartCountItems[0].innerText = +cartCountItems[0].innerText + 1
					});
					Util.removeClass(cartUndo, 'cd-cart__undo--visible');
				}
			});
		};

		function addToCart(event) {
			event.preventDefault();
			if(animatingQuantity) return;
			var cartIsEmpty = Util.hasClass(cart[0], 'cd-cart--empty');
			//update cart product list
			addProduct(this);
			//update number of items 

			//update total price
			//updateCartTotal(this.getAttribute('data-price'), true);
			//show cart
			Util.removeClass(cart[0], 'cd-cart--empty');
		};

		function toggleCart(bool) { // toggle cart visibility
			var cartIsOpen = ( typeof bool === 'undefined' ) ? Util.hasClass(cart[0], 'cd-cart--open') : bool;
		
			if( cartIsOpen ) {
				Util.removeClass(cart[0], 'cd-cart--open');
				//reset undo
				if(cartTimeoutId) clearInterval(cartTimeoutId);
				Util.removeClass(cartUndo, 'cd-cart__undo--visible');
				removePreviousProduct(); // if a product was deleted, remove it definitively from the cart

				setTimeout(function(){
					cartBody.scrollTop = 0;
					//check if cart empty to hide it
					if( Number(cartCountItems[0].innerText) == 0) Util.addClass(cart[0], 'cd-cart--empty');
				}, 500);
			} else {
				Util.addClass(cart[0], 'cd-cart--open');
			}
		};
	  function cargarCarrito() {
		  if (window.localStorage != undefined) {

			  var carrito = JSON.parse(localStorage.getItem('Carrito'));
			  if (carrito == undefined) return;
			  var items = Object.keys(carrito);
			  items.forEach((key) => {
				  console.log(carrito[key])
				  addProduct("LocalStorage", carrito[key])
			  });
		  } else {
			  alert('Tu navegador esta desactualizado, el carrito no guardara los productos si la pagina recarga');
		  }
	  }

	  function incre(el) {
		  if (parseInt(el.innerText) >= 0) {
			  el.innerText = (+el.innerText + 1)
		  }
	  }
	  function decre(el) {
		  if (parseInt(el.innerText) > 1) {
			  el.innerText = (+el.innerText - 1)
		  }
	  }
	  function PrecioCart() {
		  let cartListItems = cartList.getElementsByClassName('cd-cart__product');
		  let precio = 0;
		  let items = 0;
		  console.log(precio.toFixed(2))
		  for (let i = 0; i < cartListItems.length; i++) {
			  if (cartListItems[i].classList.contains('cd-cart__product--deleted'))
				  continue
			  let data = cartListItems[i].querySelector('span[name="quantity"]');
			  precio += (parseFloat(data.innerText) * parseFloat(data.getAttribute('data-price')));
			  items++;
		  }
		  cartCountItems[0].innerText = items;
		  cartTotal.innerText = precio.toFixed(2);
	  }
	  function addProduct(target, local = null) {
		  if (target == "LocalStorage") {

			  var productAdded = `
<li class="cd-cart__product">
    <div class="cd-cart__image">
        <a href="#0"><img src="${local.foto}" alt="placeholder"></a>
    </div>
    <div class="cd-cart__details">
        <h3 class="truncate">
            <a href="#0">${local.nombre}</a>
        </h3>
        <span  class="cd-cart__price">$${local.precio}</span>
        <div class="cd-cart__actions">
            <a href="#0" class="cd-cart__delete-item">
			<img  src="/imgs/imagenes/delete.png"/>



</a>
            <div class="cd-cart__quantity">
                <span class="cd-cart__select">
					

<img data-click="minus" data-product="cd-product-${local.productId}" src="/imgs/imagenes/minus.png"/>
                    <span  class="reset" id="cd-product-${local.productId}" data-price="${local.precio}" name="quantity">${local.cantidad}</span>
			<img data-click="plus" data-product="cd-product-${local.productId}" src="/imgs/imagenes/plus.svg"/>
                  
                </span>
            </div>
        </div>
    </div>
</li>`;
			  cartList.insertAdjacentHTML('beforeend', productAdded);
			  PrecioCart();

			  return;
		  }

		let productId = target.getAttribute('data-id');
		  console.log(target)
			let producto = document.getElementById("cd-product-" + productId);
		  if (producto != undefined) {
			 
			  producto.innerText = (+producto.innerText + 1)
			  if (window.localStorage != undefined) {
				  var carrito = JSON.parse(localStorage.getItem('carrito'));
				  carrito["cd-product-" + productId].cantidad = producto.innerText;
				  localStorage.setItem('carrito', JSON.stringify(carrito))
			  }
			  PrecioCart();
			  updateCartCount(false, 0)
			  return;
		  }
		  $(document).ready(function () {
			  $.ajax({
				  type: "GET",
				  url: "/cliente/Supermercado/Get/" + productId,
				  dataType: "json",
				  contentType: "application/json; charset=utf-8",
				  error: function (x, e) { alert(e.responseText); },
				  success: function (objTrendList) {

					  var datos = '';
					  $.each(objTrendList, function (index, Data) {
						  console.log(Data)
						  let precio = Data.precio_de_Venta;
						  if (Data.descuento > 0) {
							  precio = (Data.precio_de_Venta-(Data.precio_de_Venta * Data.descuento)).toFixed(2);
						  }
						  var productAdded = `
<li class="cd-cart__product">
    <div class="cd-cart__image">
        <a href="#0"><img src="${Data.foto}" alt="placeholder"></a>
    </div>
    <div class="cd-cart__details">
        <h3 class="truncate">
            <a href="#0">${Data.nombre}</a>
        </h3>
        <span  class="cd-cart__price">$${precio}</span>
        <div class="cd-cart__actions">
            <a href="#0" class="cd-cart__delete-item">
			<img  src="/imgs/imagenes/delete.png"/>



</a>
            <div class="cd-cart__quantity">
                <span class="cd-cart__select">
					

<img data-click="minus" data-product="cd-product-${productId}" src="/imgs/imagenes/minus.png"/>
                    <span  class="reset" id="cd-product-${productId}" data-off="${Data.precio_de_Venta}" data-price="${precio}" name="quantity">1</span>
			<img data-click="plus" data-product="cd-product-${productId}" src="/imgs/imagenes/plus.svg"/>
                  
                </span>
            </div>
        </div>
    </div>
</li>`;
						  if (window.localStorage != undefined) {
							  var carrito = JSON.parse(localStorage.getItem('carrito'));
							  if (carrito == undefined) {
								  carrito = {};
								  carrito['cd-product-' + productId] = { foto: Data.foto, productId: productId, precio: precio, cantidad: 1 }
							  } else {
								  carrito['cd-product-' + productId] = { foto: Data.foto, productId: productId, precio: precio, cantidad: 1 }
							  }
							  localStorage.setItem('carrito', JSON.stringify(carrito))
						  }
						  cartList.insertAdjacentHTML('beforeend', productAdded);	
						  PrecioCart();
					  }
					  )
				  }
			  });

		  });

		};

		function removeProduct(product) {
			if(cartTimeoutId) clearInterval(cartTimeoutId);
			removePreviousProduct(); // prduct previously deleted -> definitively remove it from the cart
			
			var topPosition = product.offsetTop;
			product.style.top = topPosition+'px';
			Util.addClass(product, 'cd-cart__product--deleted');

			//update items count + total price

			Util.addClass(cartUndo, 'cd-cart__undo--visible');
			updateCartCount(false, -1)
			cartCountItems[0].innerText = +cartCountItems[0].innerText - 1
			//wait 8sec before completely remove the item
			cartTimeoutId = setTimeout(function(){
				Util.removeClass(cartUndo, 'cd-cart__undo--visible');
				removePreviousProduct();
			}, 8000);
		};

		function removePreviousProduct() { // definitively removed a product from the cart (undo not possible anymore)
			var deletedProduct = cartList.getElementsByClassName('cd-cart__product--deleted');
			if(deletedProduct.length > 0 ) deletedProduct[0].remove();
		};

		function updateCartCount(emptyCart, quantity) {

		
				var actual = (+cartCountItems[0].innerText);
				var next = actual + quantity;
				
				if( emptyCart ) {
					cartCountItems[0].innerText = 0;
					cartCountItems[1].innerText = 0;
					animatingQuantity = false;
				} else {
					Util.addClass(cartCount, 'cd-cart__count--update');

		
					setTimeout(function() {
						Util.removeClass(cartCount, 'cd-cart__count--update');
						console.log('C2')
					}, 200);

					setTimeout(function() {
						cartCountItems[0].innerText = next;
						cartCountItems[1].innerText = next;
						animatingQuantity = false;
						console.log('C3', cartCountItems[1],cartCountItems[0])
					}, 230);
				}
			
		};


  }
};

function registrarVenta(a) {

	event.preventDefault();
	var cart = document.getElementsByClassName('js-cd-cart');
	var cartBody = cart[0].getElementsByClassName('cd-cart__body')[0],
		cartList = cartBody.getElementsByTagName('ul')[0],
		cartListItems = cartList.getElementsByClassName('cd-cart__product');
	var productos = [];
	for (let i = 0; i < cartListItems.length; i++) {
		if (cartListItems[i].classList.contains('cd-cart__product--deleted'))
			continue
		let data = cartListItems[i].querySelector('span[name="quantity"]');
		let id = data.id.split('-');
		productos.push(id.pop() +'|'+ data.innerText);
	}


	cart[0].className = "cd-cart js-cd-cart cd-cart--close";

	var formdata = new FormData();
	formdata.append("productos", productos);
	$.ajax({
		type: "POST",
		url: "/Admin/Ventas/Registrar/",
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
			if (!data.success) {
				toastr["warning"](data.message)
				if (data.message.indexOf('inistrativa para poder realizar compras desde lado cliente, las compras de avastecimiento se realizan desde e') > -1) {
					cartList.innerHTML = '';
					cart[0].className = "cd-cart js-cd-cart cd-cart--empty";
				}
				return;
			}
			cartList.innerHTML = '';
			cart[0].className = "cd-cart js-cd-cart cd-cart--empty";
			toastr["info"](data.message)
		}
	});

}