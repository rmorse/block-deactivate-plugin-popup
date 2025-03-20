function run() {
	// Only run on the plugins page
	if (!window.location.href.includes('plugins.php')) {
		return;
	}

	document.body.querySelectorAll( '.deactivate a' ).forEach( ( element ) => {
		preventPopup( element );
	} );
}

function preventPopup( element ) {
	element.addEventListener( 'click', ( event ) => {
		event.preventDefault();
		event.stopPropagation();
		// Get the href and navigtae  to it.
		const href = element.getAttribute( 'href' );
		if ( href ) {
			window.location.href = href;
		}
	} );
}

// Init.
if ( document.readyState === 'complete' ) {
	run();
} else {
	window.addEventListener( 'load', run );
}
