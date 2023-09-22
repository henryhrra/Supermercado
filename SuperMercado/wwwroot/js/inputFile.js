'use strict';

;( function ( document, window, index )
{
	var inputs = document.querySelectorAll( '.inputfile' );
	Array.prototype.forEach.call( inputs, function( input )
	{
		var label	 = input.nextElementSibling,
			labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if (this.files && this.files.length > 1) {
				fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
			}
			else {
				fileName = e.target.value.split( '\\' ).pop();
			}

			if (fileName) {
				document.getElementById('cancelarArchivos').style.display = 'block'
				label.querySelector('span').innerHTML = fileName;
			}
			else {
				document.getElementById('cancelarArchivos').style.display = 'none'
				console.log(document.querySelector('.invalidimg'))
				document.querySelector('.invalidimg').innerText = '';
				document.querySelector('.labelFile').setAttribute('style', '');
				label.innerHTML = labelVal;
			}
		});

		// correccion de bug en Firefox 
		input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
		input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
	});
}( document, window, 0 ));