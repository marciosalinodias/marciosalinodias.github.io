(function (window, undefined) {

	"use strict";



	window.BgBlinck = function(callback){
		$('body').animate({backgroundColor: '#74A5B5'}, 2000);
		$('body').animate({backgroundColor: '#FAFAFA'}, 2000, function(){
			if($.isFunction(callback))
				callback();
		});
	}

	window.ShowLogo = function(){
		$('#pontos').fadeIn(1500, function(){
			$('#nome').fadeIn(2000, function(){
				$('#glow').fadeIn(3000);
			});
		});
	}

	window.InitialAnimation = function () {
		//$('#fundoWings').animate({'opacity': 0.9}, 3000, function(){window.HideWings()});
		//$('#fundo').css('min-height', $('body').css('height'));
		window.BgBlinck(window.ShowLogo);
	}

	$(document).ready(function () {
		window.InitialAnimation();
	});

   

}(window));
