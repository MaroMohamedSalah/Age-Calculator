let form = document.querySelector(".my-form");
let errors = Array.from(document.querySelectorAll(".error"));
let yearsRes = document.getElementById("years-res");
let monthsRes = document.getElementById("months-res");
let daysRes = document.getElementById("days-res");

form.onsubmit = (event) => {
	event.preventDefault(); // Prevent the default form submission
	let hasError = false; // Flag to track if there are any errors

	// Loop through each input element
	form.querySelectorAll("input").forEach((input) => {
		// Check if the input is empty
		if (input.value.trim() === "") {
			setError(input, "This Field is required");
			hasError = true; // Set the flag to true if there is an error
		} else {
			const error = input.nextElementSibling; // Get the error element
			const heading = input.previousElementSibling; // Get the heading element

			input.style.borderColor = ""; // Remove border color from input
			heading.style.color = ""; // Remove color from heading element
			error.style.opacity = "0"; // Hide the error message

			// Validate the day, month, and year values
			const value = parseInt(input.value);
			if (
				isNaN(value) ||
				(input.name === "day" && (value < 1 || value > 31)) ||
				(input.name === "month" && (value < 1 || value > 12)) ||
				(input.name === "year" && value < 0)
			) {
				setError(input, `Must be a valid ${input.name}`);
				hasError = true; // Set the flag to true if there is an error
				return; // Exit the loop for this input
			}
			if (input.name === "year" && value > getCurrentYear())
				setError(input, "Must be in the past");
		}
	});

	// Validate the date format
	// if (!isValidDateFormat(form.day.value, form.month.value, form.year.value)) {
	// 	setError(form.day, "Must be a valid date");
	// 	hasError = true; // Set the flag to true if there is an error
	// }

	if (!hasError) {
		// setRes(form.year.value, form.month.value, form.day.value);
	}
};

function setError(inputElement, errorMessage) {
	const errorElement = inputElement.nextElementSibling; // Get the error element
	const headingElement = inputElement.previousElementSibling; // Get the heading element

	inputElement.style.borderColor = "var(--error-color)"; // Apply red border color to input
	headingElement.style.color = "var(--error-color)"; // Apply red color to the heading element
	errorElement.textContent = errorMessage; // Update the error message
	errorElement.style.opacity = "1"; // Display the error message
}

function getCurrentYear() {
	return new Date().getFullYear();
}

function isValidDateFormat(day, month, year) {
	const dateStr = `${year}-${month}-${day}`;
	const date = new Date(dateStr);
	return (
		date.getFullYear().toString() === year &&
		(date.getMonth() + 1).toString().padStart(2, "0") === month &&
		date.getDate().toString().padStart(2, "0") === day
	);
}

// const setRes = (yearsIn, monthsIn, daysIn) => {
// 	const date = new Date();
// 	yearsRes.textContent = date.getFullYear() - yearsIn;
// 	monthsRes.textContent = Math.abs(date.getMonth() - monthsIn + 1);
// 	daysRes.textContent = date.getDate() - daysIn;
// 	console.log(date.getMonth());
// };
