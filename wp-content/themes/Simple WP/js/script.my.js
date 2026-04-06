$(function () {

	[].forEach.call(document.querySelectorAll('input[type="phone"]'), function (input) {
		let keyCode;
		function mask(event) {
		  event.keyCode && (keyCode = event.keyCode);
		  let pos = this.selectionStart;
		  if (pos < 3) event.preventDefault();
		  let matrix = '+7 (___) ___-__-__',
			 i = 0,
			 def = matrix.replace(/\D/g, ''),
			 val = this.value.replace(/\D/g, ''),
			 new_value = matrix.replace(/[_\d]/g, function (a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a
			 });
		  i = new_value.indexOf('_');
		  if (i != -1) {
			 i < 5 && (i = 3);
			 new_value = new_value.slice(0, i)
		  }
		  var reg = matrix.substr(0, this.value.length).replace(/_+/g,
			 function (a) {
				return '\\d{1,' + a.length + '}'
			 }).replace(/[+()]/g, '\\$&');
		  reg = new RegExp('^' + reg + '$');
		  if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
		  if (event.type == 'blur' && this.value.length < 5) this.value = ''
		}
		input.addEventListener('input', mask, false);
		input.addEventListener('focus', mask, false);
		input.addEventListener('blur', mask, false);
		input.addEventListener('keydown', mask, false);
	 });


	$('body').on('submit', '.perezvonite', function () {

		var error = false;
		var form = $(this);
		var error_text = "Пожалуйста, введите корректные данные";

		error = validateForm(form, error_text);

		if (error == false) {
			var str = form.serialize();
			str += '&pere=y';
			$('#popup__message').addClass('popup_show');

			$.post('/wp-content/themes/Simple WP/include/ajax.php', str, function (data) {
				if (data != false) {
					form[0].reset();
					$('#perezvonite').removeClass('popup_show');
					function closePopups() {
						$('#popup__message').removeClass('popup_show');
						$('body').css({'overflow-x': 'hidden', 'padding-right': '0'});
						$('body').removeClass('popup-show');
						$('html').removeClass('lock');
					}
					setTimeout(closePopups, 2000);
				}
			});

		}

		return false;
	});


	$('body').on('submit', '.zay', function () {

		var error = false;
		var form = $(this);
		var error_text = "Пожалуйста, введите корректные данные";

		error = validateForm(form, error_text);

		if (error == false) {
			var str = form.serialize();
			str += '&zay=y';
			$('#popup__message').addClass('popup_show');

			$.post('/wp-content/themes/Simple WP/include/ajax.php', str, function (data) {
				if (data != false) {
					form[0].reset();
					$('#zayav').removeClass('popup_show');
					function closePopups() {
						$('#popup__message').removeClass('popup_show');
						$('body').css({'overflow-x': 'hidden', 'padding-right': '0'});
						$('body').removeClass('popup-show');
						$('html').removeClass('lock');
					}
					setTimeout(closePopups, 2000);
				}
			});

		}

		return false;
	});

	$('body').on('submit', '.product', function () {

		var error = false;
		var form = $(this);
		var error_text = "Пожалуйста, введите корректные данные";

		error = validateForm(form, error_text);

		if (error == false) {
			var str = form.serialize();
			str += '&prod=y';
			$('#popup__message').addClass('popup_show');

			$.post('/wp-content/themes/Simple WP/include/ajax.php', str, function (data) {
				if (data != false) {
					form[0].reset();
					$('#product').removeClass('popup_show');
					function closePopups() {
						$('#popup__message').removeClass('popup_show');
						$('body').css({'overflow-x': 'hidden', 'padding-right': '0'});
						$('body').removeClass('popup-show');
						$('html').removeClass('lock');
					}
					setTimeout(closePopups, 2000);
				}
			});

		}

		return false;
	});

	$('body').on('submit', '.vakan', function () {

		var error = false;
		var form = $(this);
		var error_text = "Пожалуйста, введите корректные данные";

		error = validateForm(form, error_text);

		if (error == false) {
			var str = form.serialize();
			str += '&vakan=y';
			$('#popup__message').addClass('popup_show');

			$.post('/wp-content/themes/Simple WP/include/ajax.php', str, function (data) {
				if (data != false) {
					form[0].reset();
					$('#vakan').removeClass('popup_show');
					function closePopups() {
						$('#popup__message').removeClass('popup_show');
						$('body').css({'overflow-x': 'hidden', 'padding-right': '0'});
						$('body').removeClass('popup-show');
						$('html').removeClass('lock');
					}
					setTimeout(closePopups, 2000);
				}
			});

		}

		return false;
	});







	//form validate
	validateField = function (field) {
		var error = false;


		var pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		var regphone = /^[0-9\s\-\(\)\+]+$/;

		if (field.attr('type') == 'email' || field.attr('data-type') == 'email') {
			if (pattern.test(field.val()) == false) {
				error = true;
			}
			else {
				error = false;
			}
		} else if (field.attr('type') == 'phone') {

			if (regphone.test(field.val()) == false) {
				error = true;
			}
			if (field.val().length < 18) {
				error = true;
			}
			else {
				error = false;
			}
		} else if (field.attr('type') == 'checkbox' && field.attr('data-requared') == 'requared') {
			if (!field.is(':checked')) {
				error = true;
			}
			else {
				error = false;
			}
		} else {
			if (field.val() == '' || field.val() == field.attr('text')) {
				error = true;
			}
			else {
				error = false;
			}
		}



		return error;
	}


	validateForm = function (form, txt) {

		var error = 0;
		var error_text = '<span class="error_text">' + txt + '</span>';
		var error_class = '_form-error';
		var error_tag = $('.form__item>span.error_text, .custom_select>span.error_text');

		form.find(error_tag).remove();


		form.find('input').each(function () {
			var label = $(this).closest('.form__item');

			if (validateField($(this))) {
				error = errorTrue(label);
			} else {
				error = errorFalse(label);
			}
		});

		function errorTrue(label) {
			label.addClass(error_class);
			label.append(error_text);
			error = error + 1;
			return error;
		}
		function errorFalse(label) {
			label.removeClass(error_class);
			label.find(error_tag).remove();
			return error;
		}

		return error;
	}

});

$('.qsm_required_textmlwPhoneNumber').prop('type', 'phone');