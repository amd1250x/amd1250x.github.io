( function ( $ ) {
	'use strict';

	function appendLog( lines ) {
		var $log = $( '#dsa-log' );
		var text = Array.isArray( lines ) ? lines.join( '\n' ) : String( lines );
		$log.text( $log.text() + ( $log.text() ? '\n' : '' ) + text );
		$log.scrollTop( $log[ 0 ].scrollHeight );
	}

	function clearLog() {
		$( '#dsa-log' ).text( '' );
	}

	$( function () {
		$( '#dsa-log-clear' ).on( 'click', clearLog );

		// Tabs.
		$( '.nav-tab-wrapper a' ).on( 'click', function ( e ) {
			e.preventDefault();
			var tab = $( this ).data( 'tab' );
			$( '.nav-tab-wrapper a' ).removeClass( 'nav-tab-active' );
			$( this ).addClass( 'nav-tab-active' );
			$( '.dsa-tab-panel' ).hide();
			$( '#dsa-tab-' + tab ).show();
		} );

		$( '#dsa-build-btn' ).on( 'click', function () {
			var $btn = $( this ).prop( 'disabled', true );
			$( '#dsa-build-spinner' ).addClass( 'is-active' );
			clearLog();
			appendLog( '--- Build started ---' );

			$.post( dsaScraper.ajaxUrl, {
				action: 'ads_scraper_build',
				nonce: dsaScraper.buildNonce
			} ).done( function ( resp ) {
				if ( resp.success ) {
					appendLog( resp.data.log );
					appendLog( 'Done: ' + resp.data.pages + ' page(s), ' + resp.data.warnings.length + ' warning(s).' );
					$( '#dsa-push-btn' ).prop( 'disabled', false );
				} else {
					appendLog( 'Build failed: ' + ( resp.data && resp.data.message ? resp.data.message : 'unknown error' ) );
				}
			} ).fail( function ( xhr ) {
				appendLog( 'Build request failed: ' + xhr.status + ' ' + xhr.statusText );
			} ).always( function () {
				$btn.prop( 'disabled', false );
				$( '#dsa-build-spinner' ).removeClass( 'is-active' );
			} );
		} );

		$( '#dsa-push-btn' ).on( 'click', function () {
			if ( ! window.confirm( dsaScraper.confirmPush ) ) {
				return;
			}
			var $btn = $( this ).prop( 'disabled', true );
			$( '#dsa-push-spinner' ).addClass( 'is-active' );
			clearLog();
			appendLog( '--- Push started ---' );

			$.post( dsaScraper.ajaxUrl, {
				action: 'ads_scraper_push',
				nonce: dsaScraper.pushNonce
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
				$( '#dsa-push-spinner' ).removeClass( 'is-active' );
			} );
		} );
	} );
} )( jQuery );
