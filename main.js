let bill = document.querySelector(".inputs-section__bill-input");
let billNumber = parseInt(bill.value);
let people = document.querySelector(".inputs-section__people-input");
let peopleNumber = parseInt(people.value);
let btn = document.querySelectorAll(".buttons__button");
let tipResult = document.querySelector(".results__tip-value");
let totalResult = document.querySelector(".results__total-value");
let alert = document.querySelector("#alert");

// iteramos los botones disponibles //
let tipValue = 5;
btn.forEach((element) => {
	// escuchamos por el evento click, que ejecuta las siguientes acciones//
	element.addEventListener("click", (event) => {
		// remueve la clase active para eliminar los estilos de los demas botones //
		btn.forEach((element) => {
			element.classList.remove("buttons__button--selected");
		});
		// agrega la clase active para agregar los estilos al boton seleccionado //
		element.classList.add("buttons__button--selected");
		// modifica el texto de los botones quitandoles el simbolo y convirtiendo la cadena a numero //
		tipValue = parseInt(event.target.innerText.slice(0, -1));
		calculateTip();
	});
});

// Actualizando Custom
let custom = document.querySelector(".buttons__custom");
//eliminamos los elementos actives de los demas botones al seleccionar el custom//
custom.addEventListener("click", () => {
	btn.forEach((element) => {
		element.classList.remove("buttons__button--selected");
	});
});
// escuchamos por los valores para calcular los montos fuera de las excepciones //
custom.addEventListener("input", () => {
	tipValue = parseInt(custom.value);
	if (!isNaN(tipValue)) {
		calculateTip();
	}
});
// Actualizamos el bill //
bill.addEventListener("input", () => {
	billNumber = parseFloat(bill.value);
	calculateTip();
});
// Actualizando personas
people.addEventListener("input", () => {
	peopleNumber = parseFloat(people.value);

	if (peopleNumber == 0 || isNaN(peopleNumber)) {
		people.style.borderColor = "rgb(164, 68, 68)";
		alert.classList.add("error");
	} else {
		people.style.borderColor = "hsl(189, 41%, 97%)";
		alert.classList.remove("error");
		calculateTip();
	}
});

// Funcionalidad del boton reset
let resetbtn = document.querySelector(".result-section__reset");
resetbtn.addEventListener("click", () => {
	bill.value = 0;
	billNumber = 0;
	people.value = 1;
	peopleNumber = 1;
	custom.value = "Custom";
	calculateTip();
});
function calculateTip() {
	// calculo del total de la propina //
	tipResult.innerText = ((billNumber * (tipValue / 100)) / peopleNumber).toFixed(0);
	// calculo del total por persona //
	totalResult.innerText = ((billNumber + billNumber * (tipValue / 100)) / peopleNumber).toFixed(0);
}
