function validate({ form, selectors, callback }) {
	const validator = {
		form: form,
		simulator: {},
		selectors: selectors,
		handleCondition(obj) {
			const validators = this.simulator[obj.selector];
			const inputElement = document.querySelector(this.form+" "+ obj.selector);
			let isError;
			for (let i = 0; i < validators.length; i++) {
				switch (inputElement.getAttribute('type')) {
					default:
						isError = validators[i](inputElement.value.trim());
				}
				if (isError) break;
			}
			let messageElement = inputElement.parentElement.querySelector('.message');
			if (isError) {
				inputElement.parentElement.classList.add('error');
				messageElement.innerText = isError;
			} else {
				inputElement.parentElement.classList.remove('error');
				messageElement.innerText = "";
			}
			return !isError;
		},
		handleSubmitForm() {
			const _this = this;
			document.querySelector(_this.form).addEventListener('submit',(e)=>{
				e.preventDefault();
				let isSubmit = true;
				_this.selectors.forEach(valueOfElement=>{
					const isValid = _this.handleCondition(valueOfElement);
					if (!isValid) {
						isSubmit = false;
					}
				})
				if (isSubmit) {
					let formData = document.querySelector(_this.form);
					callback(formData);

				} else {
					e.preventDefault();
				}
			})
		},
		handleCatchEvent() {
			const _this = this;
			this.selectors.forEach((element,index)=>{
				if (Array.isArray(_this.simulator[element.selector])) {
					_this.simulator[element.selector].push(element.validator);
				} else {
					_this.simulator[element.selector] = [element.validator];
				}
				document.querySelector(_this.form+" " + element.selector).addEventListener('blur',()=>{
					_this.handleCondition(element);
				})
				let inputElement = document.querySelector(_this.form + " " + element.selector);
				document.querySelector(_this.form+ " " + element.selector).addEventListener('input',()=>{
					inputElement.parentElement.querySelector('.message').innerText = "";
					inputElement.parentElement.classList.remove('error');
				})
			})
		},
		main() {
			this.handleCatchEvent();
			this.handleSubmitForm();
		}
	}
	validator.main();
}
function checkBlank(selector) {
	return {
		selector: selector,
		validator(value) {
			return value.length === 0 ? 'Không được để trống!' : undefined;
		}
	}
}
function checkLength(selector, min) {
	return {
		selector: selector,
		validator(value) {
			return value.length < min ? `Bắt buộc phải trên ${min} ký tự!` : undefined;
		}
	}
}
function checkWhiteSpace(selector) {
	return {
		selector: selector,
		validator(value) {
			value = value.split('');
			let found = false;
			let checkWhiteSpace = " ";
			for (let i = 0; i < value.length; i++) {
				if (value[i] === checkWhiteSpace) {
					found = true;
					break;
				}
			}
			return found ? `Không được chứa khoảng trắng!` : undefined;
		}
	}
}
function checkMatch(selector, callback) {
	return {
		selector: selector,
		validator(value) {
			return value !== callback() ? 'Mật khẩu không khớp!' : undefined;
		}
	}
}
function checkEmail(selector) {
	return {
		selector: selector,
		validator(value) {
			const regex_email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;;
			return !regex_email.test(value) ? 'Email không chính xác!' : undefined;
		}
	}
}
validate({
	form:'.authentication',
	selectors:[
		checkBlank('input[name="username"]'),
		checkLength('input[name="username"]',8),
		checkBlank('input[name="phoneNumber"]'),
		checkLength('input[name="phoneNumber"]',10),
		checkBlank('input[name="email"]'),
		checkEmail('input[name="email"]')
	],
	callback(forms){
		console.log(forms)
	}
});
const handleInputRangeEmoji = {
	handelCalculatorLocationEmoji(value){
		const emojies = document.querySelectorAll('.form-icons .form-icon');
		const inputRange = document.querySelector('input[type="range"]');
		emojies.forEach(emoji=>{
			emoji.classList.remove('active');
		})
		if(value === 0 || value <= 12){
			emojies[0].classList.add('active');
			inputRange.value = 7;
		}else if(value <= 25 ||value <= 35){
			emojies[1].classList.add('active');
			inputRange.value = 29;
		}else if(value <= 50 ||value <= 62){
			emojies[2].classList.add('active');
			inputRange.value = 51;
		}else if(value <= 70 ||value <= 83){
			emojies[3].classList.add('active');
			inputRange.value = 73;
		}else{
			emojies[4].classList.add('active');
			inputRange.value = 95;
		}
	},
	main(){
		const _this = this;
		const inputRange = document.querySelector('input[type="range"]');
		inputRange.addEventListener('change',(e)=>{
			_this.handelCalculatorLocationEmoji(parseInt(e.target.value))
		})
	}
}
handleInputRangeEmoji.main();