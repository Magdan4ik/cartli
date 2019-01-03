window.addEventListener('load', function() {

	const            w = window,
					 d = document,
			lDeviceMin = w.innerWidth > 1200,
			lDeviceMax = w.innerWidth <= 1200,
			mDeviceMin = w.innerWidth > 992,
			mDeviceMax = w.innerWidth <= 992,
			sDeviceMin = w.innerWidth > 768,
			sDeviceMax = w.innerWidth <= 768;

	const   Bcase      = document.querySelector(".bcase"),
			Service    = document.querySelector(".service__page"),
			About      = document.querySelector(".about_us"),
			Vslider    = document.querySelector(".vacancy-c__slider"),
			Blog       = document.querySelector(".blog__main"),
			$Body      = document.querySelector('body'),
			header     = document.querySelector("header");




	/*Sticky header */
	if (mDeviceMin) {
		let toggleNav = () => setTimeout(() => {(w.pageYOffset > 80) ? header.dataset.nav = false : header.dataset.nav = true}, 150);

		if(w.pageYOffset > 80) header.dataset.nav = false;
		w.addEventListener("scroll", toggleNav);
	};
	/*Sticky header End */



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
	/* Burger Menu End */


	/* TEST******************* */
	function isScrolledIntoView (el) {
	    let elemTop = el.getBoundingClientRect().top;
	    let elemBottom = el.getBoundingClientRect().bottom;

	    let isVisible = (elemTop>= 0) && (elemBottom <= window.innerHeight);
	    console.log(isVisible);
	}

	// window.addEventListener("scroll",  () => isScrolledIntoView(document.querySelector('.service__top-img')));

	/* TEST******************* */




	/*Sliding line on hover link menu */
	// if (mDeviceMin) {

	// 	let link    = d.querySelectorAll(".headbar__nav-list li a");
	// 	let current = d.querySelector(".headbar__nav-list li.current a");
	// 	let line    = d.querySelector(".headbar__line-indicator");

	// 	link.forEach( el => {
	// 		el.addEventListener('mouseover', () => sline(el));
	// 		el.addEventListener('mouseout', () => sline(current));
	// 		el.addEventListener('click', () => {
	// 			current = el;
	// 			link.forEach( el => el.parentNode.classList.remove('current'));
	// 			el.parentNode.classList.add('current');
	// 			sline(el);
	// 		});
	// 	});

	// 	function sline(el) {
	// 		let paddingL = parseInt(w.getComputedStyle(el).getPropertyValue('padding-left'));
	// 		let paddingR = parseInt(w.getComputedStyle(el).getPropertyValue('padding-right'));

	// 		line.style.width = el.offsetWidth - paddingL - paddingR + 'px';
	// 		line.style.left  = el.offsetLeft  + paddingL + 'px';
	// 	};
	// 	sline(current);

	// };
	/*Sliding line on hover link menu END*/

	/* Bcases tabs START*/
	if (document.querySelector(".bcase")) {
		let   $button  =  $(".bcase__nav li"),
			  $lineX   =  $(".bcase__x-line"),
			  $lineY   =  $(".bcase__y-line"),
			  $more    =  $(".bcase__all");
		const $center  =  $lineY.position().left;

		$button.on('click', function() {
			
			$button.removeClass('current');
			$(this).addClass('current');

			drawline();
		
		});

		function drawline() {
			let $current =  $(".bcase__nav li.current"),
				$left = parseInt($current.position().left) + parseInt($current.outerWidth(true) / 2),
				$bwidth = $(".bcase").innerWidth();

			if ($bwidth / 2 > $left) {
				$lineX.css({
					"width": $center - $left,
					"left": $left,
					"transform-origin": "center left"
				});
			} else {
				$lineX.css({
					"width": $left - $center,
					"left": $left - ($left - $center),
					"transform-origin": "center right"
				});
			}


			/* Show\hide content */
			$(".bcase__item").removeClass('active');
			$('.bcase__item[data-case=' + $current.attr('data-tab') + ']').addClass('active');
			let $bcaseH  =  $(".bcase__content").innerHeight();
			/* Show\hide content */

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
		}
		drawline();


		if ($(window).width() <= 768 ) {

			$button.on('click', function() {
				$('.bcase__content').slick('refresh');
			});

			$('.bcase__content').slick({
				infinite: false,
				focusOnSelect: true,
				centerMode: true,
	        	centerPadding: '0px',
				speed: 300,
				dots: true,
				arrows: false,
				autoplay: true,
				slide: '.bcase__item.active'
			});
		}
	}
	/* Bcases tabs END*/


	/* Service tabs */
	(function () {
		let btn = document.querySelectorAll('.service__tabs li');
		let tab = document.querySelectorAll('.service__list');

		btn.forEach(el => {
			el.addEventListener('click', () => {
				btn.forEach(el => el.classList.remove('active'));
				tab.forEach(el => el.classList.remove('active'));
				el.classList.add('active');
				document.querySelector('.service__list[data-service='+ el.dataset.tab +']').classList.add('active');
			});
		});

	}());
	/* Service tabs END */


	/* Service Page tabs START */
	if (document.querySelector(".service__page")) {
		$('.service__nav li').on('click', function(e) {
			e.preventDefault();
			let sdata = $(this).attr('data-tab');

			$(".service__nav li").removeClass('current');
			$(this).addClass('current');
			$('.service__item').hide();
			$('.service__item[data-serv=' + sdata + ']').fadeIn();
		});
		
	}
	/* Service Page tabs END */

	/* About Us Page START */
	if (document.querySelector(".company")) {

		var acc = document.getElementsByClassName("profit__btn");
		var i;

		for (i = 0; i < acc.length; i++) {
		    acc[i].addEventListener("click", function() {
		        this.classList.toggle("active");
		        var panel = this.nextElementSibling;
		        if (panel.style.display === "block") {
		            panel.style.display = "none";
		        } else {
		            panel.style.display = "block";
		        }
		    });
		};

		$('.company__slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			arrows: false,
			dots: true
		});

		// $('.about_us-c__custom-select input').on('click', function() {
		// 	$('.about_us-c__custom-select').toggleClass('open-custom-select');
		// });
		// $('.about_us-c__custom-select ul li').on('click', function() {
		// 	$('.about_us-c__custom-select input').val( $(this).text() );
		// 	$('.about_us-c__custom-select').removeClass('open-custom-select');
		// });

		// $('.about_us-c__custom-select input').on('keydown', function(e) {
		// 	e.preventDefault();
		// });
 

		// $(document).on('click', function(e) {
		// 	if(e.target.className !== 'about_us-c__custom-select--input' && e.target.className !== 'about_us-c__custom-select--li') {
		// 		$('.about_us-c__custom-select').removeClass('open-custom-select');
		// 	};
		// });

	}
	/* About Us Page END */


	/* Vacancy page START */
	if (document.querySelector(".vacancy-c__slider")) {
		$('.vacancy-c__slider').slick({
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
		        slidesToScroll: 1
		      }
		    }
		  ]
		});
	}
	/* Vacancy page END */

	// if (document.querySelector(".blog")) {

	// 	var article = document.querySelectorAll(".blog__main--item");
	// 	var i;
	// 	for (i = 0; i < article.length; i++) {
	// 		article[i].style.setProperty('--weight',  parseInt(article[i].scrollHeight / 5));
	// 	}
	// }

	$("input[type='tel']").mask("+38 (099) 999 99 99");


	/* Modal START */
	$(".open-modal").on("click", function() {
	  var modal = $(this).data("modal");
	  $(modal).fadeIn();
	});

	$(".modal-box").on("click", function(e) {
	  var className = e.target.className;
	  if(className === "modal-box" || className === "modal-box__close"){
	    $(this).closest(".modal-box").fadeOut();
	  }
	});
	/* Modal END */



	/* FORMS START */
	var modalOk = $('#modalOk'),
		modalCall = $('#modalCall');

	if(document.querySelector('#modalCall')) {

 		let form  = $("#modalCall form"),
			submit = form.find("button[type='submit']");

		form.on('submit', function(e) {
		    e.preventDefault();

		    let	datas  = $(this).serialize(),
				action = $(this).attr('action'),
				inputs = $(this).find('input').filter('[data-r="required"]');
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

			if(valid) {
				submit.prop("disabled", true);
				$.ajax({
					type: "POST",
					url: action,
					data: datas,
					success: function(data) {
								submit.prop("disabled", false);
								modalCall.hide();
								modalOk.fadeIn();
								form.trigger('reset');
								inputs.removeClass('error success');
								console.log('success');
							}
				});
		    }
		});
	}

	if(document.querySelector('#contact-form')) {

		let form  = $("#contact-form"),
			submit = form.find("button[type='submit']");

		form.on('submit', function(e) {
		    e.preventDefault();

		    let	datas  = $(this).serialize(),
				action = $(this).attr('action'),
				inputs = $(this).find('input, textarea').filter('[data-r="required"]');
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

			if(valid) {
				submit.prop("disabled", true);
				$.ajax({
					type: "POST",
					url: action,
					data: datas,
					success: function(data) {
								submit.prop("disabled", false);
								modalCall.hide();
								modalOk.fadeIn();
								form.trigger('reset');
								inputs.removeClass('error success');
								console.log('success');
							}
				});
		    }
		});
	}

	if(document.querySelector('#consult-form')) {

		let form  = $("#consult-form"),
			submit = form.find("button[type='submit']");

		form.on('submit', function(e) {
		    e.preventDefault();

		    let	datas  = $(this).serialize(),
				action = $(this).attr('action'),
				inputs = $(this).find('input, textarea').filter('[data-r="required"]');
			var	valid  = true;

			function error() {
			  $.each(inputs, function() {
			    if(!$.trim(this.value)) {
			      $(this).addClass('error').removeClass('success');
			      valid  = false;
			    } else {
			      $(this).removeClass('error').addClass('success');
			    }
			 });
			}
			error();

			inputs.blur(error);

			if(valid) {
				submit.prop("disabled", true);
				$.ajax({
					type: "POST",
					url: action,
					data: datas,
					success: function(data) {
								submit.prop("disabled", false);
								modalCall.hide();
								modalOk.fadeIn();
								form.trigger('reset');
								inputs.removeClass('error success');
								console.log('success');
							}
				});
		    }
		});
	}
	/* FORMS END */

});

// Make sure sw are supported
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('../sw.js')
//       .then(reg => console.log('Service Worker: Registered (Pages)'))
//       .catch(err => console.log(`Service Worker: Error: ${err}`));
//   });
// }
