const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input')

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s], //letras
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	clave: /^.{0,8}$/, //hasta 8 digitos
}

//definición de todos los campos del formulario antes de rellenar
const campos = {
	nombre: false,
	email: false,
	clave: false,
}

//comprobación campos
const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo (expresiones.nombre, e.target, 'nombre');
		break;
		case "email":
			validarCampo (expresiones.email, e.target, 'email');
		break;
		case "clave":
			validarCampo (expresiones.clave, e.target, 'clave');
			validarCampo2 (expresiones.clave, e.target, 'clave');
		break;
		case "clave2":
			validarClave2();
		break;
	}
}

//se comprueba que nombre cumple con los requisitos
const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-sharp fa-solid fa-circle-exclamation');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-solid fa-circle-check');
		campos[campo] = true;
	} else { //si está mal
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-solid fa-circle-check');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-sharp fa-solid fa-circle-exclamation');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = false;
	}
}

//se comprueba que las claves son iguales
const validarClave2 = () => {
	const inputClave = document.getElementById('clave');
	const inputClave2 = document.getElementById('clave2');

	if(inputClave.value !== inputClave2.value){
		document.getElementById(`grupo__clave2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__clave2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__clave2 i`).classList.remove('fa-solid fa-circle-check');
		document.querySelector(`#grupo__clave2 i`).classList.add('fa-sharp fa-solid fa-circle-exclamation');
		document.querySelector(`#grupo__clave2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['clave'] = false;
	}else { //si coinciden
		document.getElementById(`grupo__clave2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__clave2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__clave2 i`).classList.add('fa-solid fa-circle-check');
		document.querySelector(`#grupo__clave2 i`).classList.remove('fa-sharp fa-solid fa-circle-exclamation');
		document.querySelector(`#grupo__clave2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['clave'] = true;
	}
}


//validación del formulario y reseteo al darle a enviar
inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario); 
});
formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	if(campos.nombre && campos.email && campos.clave){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
	
		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('.formulario__grupo-correcto');
		})
	}
});