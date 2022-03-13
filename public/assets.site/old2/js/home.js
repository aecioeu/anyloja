enquire.register("screen and (min-width: 1200px)", [{
	match: function () {
		var motionHeaderContainer = document.getElementById('home-header-motion')
		var sceneOne = document.getElementById('features-boxes');
		var sceneTwo = document.getElementById('agency-box');

		var parallaxInstance = new Parallax(sceneOne);
		var parallaxInstanceTwo = new Parallax(sceneTwo);

		window.addEventListener("load", function(e) {
			homeMotion () 
		});

		function homeMotion () {
			let homeMotion = lottie.loadAnimation({
				container: motionHeaderContainer,
				renderer: 'svg',
				loop: true,
				prerender: true,
				autoplay: true, 
				path: '//assets.umbler.com/site/home/home-header-motion.json'
			})

			homeMotion.setSubframe(false); 
		}
	} 
}]);

window.dataLayer = window.dataLayer || [];

// $('#cta-home-header').click(function () {
// 	window.dataLayer.push({
// 		'event': 'click-event-home-header'
// 	})
// })

// $('#cta-lp-oportunidade-pre-captacao').click(function () { 
// 	window.dataLayer.push({		
// 		'event': 'click-event-cta-lp-telegram-pre-captacao'
// 	})
// })
