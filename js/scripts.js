window.addEventListener('DOMContentLoaded', () => {

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
			header     = d.querySelector("header"),
			briefcase  = d.querySelector(".briefcase");


	if (mDeviceMin) {
		/*Toggle shrink of header */
		const shrinkHeader = () => setTimeout(() => {(w.pageYOffset > 80) ? header.dataset.shrink = true : header.dataset.shrink = false}, 150);
		w.addEventListener("scroll", shrinkHeader);

		/* Scroll site to top */
		const up = document.getElementById('up');
		const toTop = () => setTimeout(() => {(w.pageYOffset > 500) ? up.dataset.visible = true : up.dataset.visible = false}, 150);
		up.addEventListener('click', () => window.scrollTo({top: 0,	behavior: 'smooth'}));
		w.addEventListener("scroll", toTop);
	};

	/* Service section start */
	{
		const li = d.querySelectorAll('.servblock__service li');
		const sv = d.querySelectorAll('.servblock__infolist');
		const bg = d.querySelector('.servblock__service-selected');
		const st = d.querySelector('.servblock__service .selected');

		li.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault();
				selectServ(el);
				showServ(el);
			})
		});

		function selectServ(el) {
			bg.style.top    = el.offsetTop + "px";
			bg.style.height = el.offsetHeight + "px";
		}
		function showServ(el) {
			li.forEach(el => el.classList.remove('selected'));
			sv.forEach(el => el.classList.remove('servblock__infolist--active'));
			el.classList.add('selected');
			d.querySelector('.servblock__infolist[data-serv='+ el.dataset.serv +']').classList.add('servblock__infolist--active');
		}
		selectServ(st);


	}
	/* Service section end*/



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

			[overlay, burger].forEach(el => el.addEventListener('click', toggleMobmenu));
	}());



	let slickObj = {
		clientDesc: {
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			speed: 500,
			fade: true,
			swipe: false,
			asNavFor: '.clients__slider-img',
			responsive: [
				{
					breakpoint: 769,
					settings: {
						swipe: true,
						speed: 500,
						adaptiveHeight: true
					}
				}
			]
		},
		clientImg: {
			slidesToShow: 5,
			arrows: true,
			slidesToScroll: 1,
			asNavFor: '.clients__slider-desc',
			focusOnSelect: true,
			centerMode: true,
			centerPadding: 0,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 4
					},
					breakpoint: 992,
					settings: {
						slidesToShow: 2
					},
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						dots: false
					}
				}
			]
		}
	};
	$('.clients__slider-desc').slick(slickObj.clientDesc);
	$('.clients__slider-img').slick(slickObj.clientImg);




	/* Bcases START*/
	if(briefcase) {
		const btn    = briefcase.querySelectorAll('.briefcase__navitem');
		const slider = briefcase.querySelector('.briefcase__content');
		const slides = briefcase.querySelectorAll('.briefcase__article');

		$(slider)
		.on('init', function(event, slick, currentSlide) {
			let cur = $(slick.$slides[slick.currentSlide]);
			let next = cur.next();
			let prev = cur.prev();
				prev.addClass('slick-sprev');
				next.addClass('slick-snext');
				cur.removeClass('slick-snext').removeClass('slick-sprev');
				slick.$prev = prev;
				slick.$next = next;
		})
		.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		let cur = $(slick.$slides[nextSlide]);
			slick.$prev.removeClass('slick-sprev');
				slick.$next.removeClass('slick-snext');
			next = cur.next(),
			prev = cur.prev();
				prev.addClass('slick-sprev');
				next.addClass('slick-snext');
				slick.$prev = prev;
				slick.$next = next;
				cur.removeClass('slick-next').removeClass('slick-sprev');
		});
		$(slider).slick({
			speed: 1000,
			arrows: true,
			dots: false,
			focusOnSelect: true,
			prevArrow: '<button class="slick-arrow--prev"> prev</button>',
			nextArrow: '<button class="slick-arrow--next"> next</button>',
			infinite: true,
			centerMode: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			centerPadding: '0',
			swipe: true,
			slide: '.briefcase__article--active'
		});

		btn.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault();
				console.log(el);
				btn.forEach(ell => ell.classList.remove('briefcase__navitem--active'));
				el.classList.add('briefcase__navitem--active');
				newBriefcases(el);
			});
		});

		function newBriefcases(el) {
			if(!el) el = briefcase.querySelector('.briefcase__navitem--active');
			briefcase.querySelectorAll('.briefcase__article').forEach(el => el.classList.remove('briefcase__article--active'));
			if (el.dataset.case == 'case-all') {
				$('.briefcase__article').removeClass('slick-sprev slick-snext');
				slides.forEach(el => el.classList.add('briefcase__article--active'));
				$(slider).slick('refresh');
			} else {
				let thisSlider = briefcase.querySelectorAll('.briefcase__article[data-case='+ el.dataset.case +']');
				thisSlider.forEach(el => el.classList.add('briefcase__article--active'));
				$(slider).slick('refresh');
			}

		};
		newBriefcases();
	};






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
