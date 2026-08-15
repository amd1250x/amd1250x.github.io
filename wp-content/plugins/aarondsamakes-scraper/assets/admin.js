( function ( $ ) {
	'use strict';

	function appendLog( lines ) {
		var $log = $( '#ads-log' );
		var text = Array.isArray( lines ) ? lines.join( '\n' ) : String( lines );
		$log.text( $log.text() + ( $log.text() ? '\n' : '' ) + text );
		$log.scrollTop( $log[ 0 ].scrollHeight );
	}

	$( function () {
		// Tabs.
		$( '.nav-tab-wrapper a' ).on( 'click', function ( e ) {
			e.preventDefault();
			var tab = $( this ).data( 'tab' );
			$( '.nav-tab-wrapper a' ).removeClass( 'nav-tab-active' );
			$( this ).addClass( 'nav-tab-active' );
			$( '.ads-tab-panel' ).hide();
			$( '#ads-tab-' + tab ).show();
		} );

		$( '#ads-build-btn' ).on( 'click', function () {
			var $btn = $( this ).prop( 'disabled', true );
			$( '#ads-build-spinner' ).addClass( 'is-active' );
			appendLog( '--- Build started ---' );

			$.post( adsScraper.ajaxUrl, {
				action: 'ads_scraper_build',
				nonce: adsScraper.buildNonce
			} ).done( function ( resp ) {
				if ( resp.success ) {
					appendLog( resp.data.log );
					appendLog( 'Done: ' + resp.data.pages + ' page(s), ' + resp.data.warnings.length + ' warning(s).' );
					$( '#ads-push-btn' ).prop( 'disabled', false );
				} else {
					appendLog( 'Build failed: ' + ( resp.data && resp.data.message ? resp.data.message : 'unknown error' ) );
				}
			} ).fail( function ( xhr ) {
				appendLog( 'Build request failed: ' + xhr.status + ' ' + xhr.statusText );
			} ).always( function () {
				$btn.prop( 'disabled', false );
				$( '#ads-build-spinner' ).removeClass( 'is-active' );
			} );
		} );

		$( '#ads-push-btn' ).on( 'click', function () {
			if ( ! window.confirm( adsScraper.confirmPush ) ) {
				return;
			}
			var $btn = $( this ).prop( 'disabled', true );
			$( '#ads-push-spinner' ).addClass( 'is-active' );
			appendLog( '--- Push started ---' );

			$.post( adsScraper.ajaxUrl, {
				action: 'ads_scraper_push',
				nonce: adsScraper.pushNonce
			} ).done( function ( resp ) {
				var data = resp.data || {};
				appendLog( data.log || [] );
				if ( resp.success ) {
					appendLog( data.pushed ? 'Push complete.' : 'Nothing to push.' );
				} else {
					appendLog( 'Push failed.' );
				}
			} ).fail( function ( xhr ) {
				appendLog( 'Push request failed: ' + xhr.status + ' ' + xhr.statusText );
			} ).always( function () {
				$btn.prop( 'disabled', false );
				$( '#ads-push-spinner' ).removeClass( 'is-active' );
			} );
		} );
	} );
} )( jQuery );
