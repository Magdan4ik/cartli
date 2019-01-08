window.addEventListener('DOMContentLoaded', function() {


	// Variability
	$("[data-id='style']").attr('href', '/assets/templates/cartli/css/main.css?' + Math.random());
	$("[data-id='script']").attr('src', '/assets/templates/cartli/js/scripts.js?' + Math.random());

	const            w = window,
					 d = document,
			lDeviceMin = w.innerWidth > 1200,
			lDeviceMax = w.innerWidth <= 1200,
			mDeviceMin = w.innerWidth > 992,
			mDeviceMax = w.innerWidth <= 992,
			sDeviceMin = w.innerWidth > 768,
			sDeviceMax = w.innerWidth <= 768;

	const   Bcase      = d.querySelector(".bcase"),
			Service    = d.querySelector(".service__page"),
			About      = d.querySelector(".company"),
			Vslider    = d.querySelector(".vacancy-c__slider"),
			Blog       = d.querySelector(".blog__main"),
			header     = d.querySelector("header");
			


	/*Sticky header */
	if (mDeviceMin) {
		const toggleNav = () => setTimeout(() => {(w.pageYOffset > 80) ? header.dataset.nav = false : header.dataset.nav = true}, 150);
		if(w.pageYOffset > 80) header.dataset.nav = false;
		w.addEventListener("scroll", toggleNav);
	};



	/*Scroll to top */
	if (mDeviceMin) {
		const up = document.getElementById('up');
		const toTop = () => setTimeout(() => {(w.pageYOffset > 500) ? up.dataset.visible = true : up.dataset.visible = false}, 150);
		up.addEventListener('click', () => window.scrollTo({top: 0,	behavior: 'smooth'}));
		w.addEventListener("scroll", toTop);
	};



	/* Burger Menu*/
		(function() {
			let burger  = d.querySelector('.header__burger'),
				nav     = d.querySelector('.header__nav'),
				overlay = d.createElement('div');
				overlay.className = 'overlay';

				function toggleMobmenu() {
					burger.classList.toggle('active');
					nav.classList.toggle('active');
					d.body.classList.toggle('hidden');
					(nav.classList.contains('active')) ? d.body.insertBefore(overlay, d.body.firstChild) : overlay.remove()
				};

				overlay.addEventListener("click", toggleMobmenu);
				burger.addEventListener("click", toggleMobmenu);
		}());




	/* Bcases tabs START*/
	if (Bcase) {

		let $bnav  =  $('.bcase__nav');
			$bnav.after('<div class="bcase__x-line"><div class="bcase__small-line"></div></div><div class="bcase__y-line"></div>');

		let $button     =  $bnav.find('li'),
			$lineX      =  $(Bcase).find(".bcase__x-line"),
			$lineY      =  $(Bcase).find(".bcase__y-line"),
			$lineS      =  $(Bcase).find('.bcase__small-line'),
			$more       =  $(Bcase).find(".bcase__all"),
			$bslider    =  $(Bcase).find('.bcase__content'),
			$center     =  Math.round($lineY.position().left);

			$button.on('click', function(e) {
				e.preventDefault();
				$(".bcase__nav li").removeClass('current');
				$(this).addClass('current');
				toggleCase();
				drawline();
			});

			toggleCase();

			function toggleCase() {
				$(".bcase__item").removeClass('active');
				$('.bcase__item[data-case=' + $(".bcase__nav li.current").attr('data-tab') + ']').addClass('active');
			};

			function drawline() {

				var $current = $(".bcase__nav li.current"),
					$left    = parseInt($current.position().left) + parseInt($current.outerWidth(true) / 2),
					$bwidth  = $(".bcase").innerWidth(),
					$bcaseH  = $(".bcase__content").innerHeight(),
					$lineSH  = $bnav.height() - $current.position().top + parseInt($bnav.css("padding-top"));

				if ($bwidth / 2 > $left) {
					$lineX.css({
						"width": $center - $left,
						"left": $left,
						"transform-origin": "center left"
					});
					$lineS.css({"left": "0", "right": "initial", "height": $lineSH});
				} else {
					$lineX.css({
						"width": $left - $center,
						"left": $left - ($left - $center),
						"transform-origin": "center right"
					});
					$lineS.css({"right": "0", "left": "initial", "height": $lineSH});
				}

				$lineY.removeClass('animated').height($bcaseH);
				$more.removeClass('done');
				$lineX.addClass('animated');
				$lineX.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					$(this).removeClass('animated');
					$lineY.addClass('animated');
				});
				$lineY.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					$more.addClass('done');
				});
			};

			drawline();



			if (lDeviceMax) {
				$bnav.slick({
					slidesToShow: 1,
					arrows: true,
					responsive: [
					{
					  breakpoint: 1201,
					  settings: {
						slidesToShow: 4,
					  }
					},
					{
					  breakpoint: 993,
					  settings: {
						slidesToShow: 3
					  }
					},
					{
					  breakpoint: 769,
					  settings: {
						slidesToShow: 1,
					  }
					}
				  ]
				}).on('afterChange ', function() {
					$(this).find('.slick-current').click();
					if (sDeviceMax) {
						$bslider.slick('refresh');
					}
				});
			};

			if (sDeviceMax) {

				$bslider.slick({
					infinite: false,
					focusOnSelect: true,
					centerMode: true,
					centerPadding: '0px',
					speed: 300,
					dots: true,
					arrows: false,
					autoplay: false,
					slide: '.bcase__item.active'
				});

				$button.on('click', function() {
					$bslider.slick('refresh');
				});
			};
	};
	/* Bcases tabs END*/


	/* Service tabs */
	(function () {
		let btn = d.querySelectorAll('.service__tabs li');
		let tab = d.querySelectorAll('.service__list');

		btn.forEach(el => {
			el.addEventListener('click', () => {
				btn.forEach(el => el.classList.remove('active'));
				tab.forEach(el => el.classList.remove('active'));
				el.classList.add('active');
				d.querySelector('.service__list[data-service='+ el.dataset.tab +']').classList.add('active');
			});
		});

	}());
	/* Service tabs END */



	/* Service Page tabs START */
	if (Service) {

		if (sDeviceMin) {
			$('.service__nav li').on('click', function(e) {
				e.preventDefault();
				let sdata = $(this).attr('data-tab');

				$(".service__nav li").removeClass('current');
				$(this).addClass('current');
				$('.service__item').hide();
				$('.service__item[data-serv=' + sdata + ']').fadeIn();
			});
		} else {
			$('.service__nav').slick({
				slidesToShow: 1,
				arrows: true
			}).on('afterChange', function() {

			var sdata = $(this).parents('.service__page').find('.slick-current').attr('data-tab');
				$(".service__nav li").removeClass('current');
				$('.service__nav .slick-current').addClass('current');
				$(this).parents('.service__page').find('.service__item').hide();
				$('.service__item[data-serv=' + sdata + ']').show();
			});
		}
	};
	/* Service Page tabs END */



	/* About Us Page START */
	if (About) {

		d.querySelectorAll(".profit__btn").forEach(el => el.addEventListener('click', () => el.classList.toggle('active')));

		$('.company__slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			arrows: false,
			dots: true
		});
	};
	/* About Us Page END */



	/* Vacancy Slider START */
	if (Vslider) {
		$(Vslider).slick({
			slidesToShow: 6,
			slidesToScroll: 1,
			autoplay: true,
			infinite: true,
			focusOnSelect: true,
			centerPadding: '0px',
			speed: 300,
			dots: false,
			arrows: false,
			responsive: [
			{
			  breakpoint: 1200,
			  settings: {
				slidesToShow: 5,
			  }
			},
			{
			  breakpoint: 992,
			  settings: {
				slidesToShow: 4
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 2,
			  }
			}
		  ]
		});
	};
	/* Vacancy Slider END */


	/* MODAL START */
	d.querySelectorAll('.open-modal').forEach(el => {
		el.addEventListener('click', () => {
			d.querySelector(el.dataset.modal).classList.add('is-open');
			d.querySelector(el.dataset.modal).classList.remove('is-close');
		});
	});

	d.querySelectorAll('.modal-box').forEach(el => {
		el.addEventListener('click', e => {
			if(e.target.classList.contains("modal-box") || e.target.classList.contains("modal-box__close")) {
				el.classList.remove('is-open');
				el.classList.add('is-close');
			}
		});
	});
	/* MODAL END */


	$("input[type='tel']").mask("+38 (099) 999 99 99");


	$('select[name="service"]').select2({
		language: {
			noResults: function () {return "Услуга не найдена"}
		}
	});


	if (sDeviceMin) {
		$('#callback-time').select2({
			placeholder: 'Желаемое время звонка',
			minimumResultsForSearch: Infinity,
			selected: false
		});
	} else {
		$('#callback-time option:empty').text('Желаемое время звонка').attr('hidden', true);
	};

	/* ALL FORMS START */
	let modalOk   = d.querySelector('#modalOk'),
		modalCall = d.querySelector('#modalCall');

	let forms = $('#callback-form, #contact-form, #consult-form, #service-form');

	$.each(forms, function() {

		let form  = $(this),
			submit = form.find("button[type='submit']");

		form.on('submit', function(e) {
			e.preventDefault();

			let	datas  = $(this).serialize(),
				action = $(this).attr('action'),
				inputs = $(this).find('input, textarea, select').filter('[data-r="required"]');
			var	valid  = true;

			function error() {
				$.each(inputs, function() {
					if(!$.trim(this.value)) {
						$(this).addClass('error').removeClass('success');
						valid = false;
					} else {
						$(this).removeClass('error').addClass('success');
					}
				});  
			}
			error();

			inputs.blur(error);

			// if (!grecaptcha.getResponse()) {
			// 	valid = false;
			// 	alert('Вы не заполнили поле Я не робот!');
			// }

			if(valid) {
				submit.prop("disabled", true);
				$.ajax({
					type: "POST",
					url: action,
					data: datas
					})
					.done(function (response, textStatus, jqXHR) {
						submit.prop("disabled", false);
						if (response == 'RobotDetected') {
							alert('Подтвердите, что вы не робот!');
						} else {
							modalCall.classList.remove('is-open');
							modalOk.classList.add('is-open');
							form.trigger('reset');
							inputs.removeClass('error success');
							grecaptcha.reset();
						}
					}).fail(function (jqXHR, textStatus, errorThrown) {
						submit.prop("disabled", false);
						console.error("The following error occured: "+ textStatus, errorThrown);
						form.trigger('reset');
						inputs.removeClass('error success');
						grecaptcha.reset();
						alert('Ошибка отправки формы!');
					});
			};
		});
	});
	/* ALL FORMS END */
});











// var ticket = $('input[name="ticket"]').val();
// var goal = 'contact_form4_kontakty';
// var logData = {};
// ga('send', 'event', 'kontaktu', 'otpravka', ticket);


// if (typeof ga == 'function') {
// 	ga('send', 'event', goal, 'send');
// 	logData['google_analytics'] = goal;
// }
// if (typeof window.yaCounter41566304.reachGoal == 'function') {
// 	window.yaCounter41566304.reachGoal(goal);
// 	logData['yandex_metrika'] = goal;
// }
// if (typeof fbq == 'function') {
// 	fbq('track', 'Lead');
// 	logData['facebook_pixel'] = goal;
// }



/*Make sure sw are supported*/
/*if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
	navigator.serviceWorker
	  .register('../sw.js')
	  .then(reg => console.log('Service Worker: Registered (Pages)'))
	  .catch(err => console.log(`Service Worker: Error: ${err}`));
  });
}*/
