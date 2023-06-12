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
			if (input.name === "year" && value > getCurrentYear()) {
				setError(input, "Must be in the past");
				hasError = true;
			}
		}
	});

	// Validate the date format
	if (!isValidDateFormat(form.day.value, form.month.value, form.year.value)) {
		setError(form.day, "Must be a valid date");
		setError(form.month, "");
		setError(form.year, "");

		hasError = true; // Set the flag to true if there is an error
	}

	if (!hasError) {
		setRes(form.year.value, form.month.value, form.day.value);
	}
};

function setError(inputElement, errorMessage) {
	const errorElement = inputElement.nextElementSibling; // Get the error element
	const headingElement = inputElement.previousElementSibling; // Get the heading element

	inputElement.style.borderColor = "var(--error-color)"; // Apply red border color to input
	headingElement.style.color = "var(--error-color)"; // Apply red color to the heading element
	if (errorMessage !== "") {
		errorElement.textContent = errorMessage; // Update the error message
		errorElement.style.opacity = "1"; // Display the error message
	}
}

function getCurrentYear() {
	return new Date().getFullYear();
}

function isValidDateFormat(day, month, year) {
	let isValid = true;
	day = parseInt(day);
	month = parseInt(month);
	year = parseInt(year);

	if (
		(month === 2 && isLeapYear(year) && day > 29) ||
		(month === 2 && day > 28) ||
		((month === 4 || month === 6 || month === 9 || month === 11) && day > 30)
	) {
		isValid = false;
	}
	return isValid;
}

function isLeapYear(year) {
	if (year % 4 === 0) {
		if (year % 100 === 0) {
			if (year % 400 === 0) {
				return true; // Divisible by 400, leap year
			} else {
				return false; // Divisible by 100 but not by 400, not a leap year
			}
		} else {
			return true; // Divisible by 4 but not by 100, leap year
		}
	} else {
		return false; // Not divisible by 4, not a leap year
	}
}

const setRes = (yearInput, monthInput, dayInput) => {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month
	const currentDay = currentDate.getDate();

	const birthYear = parseInt(yearInput);
	const birthMonth = parseInt(monthInput);
	const birthDay = parseInt(dayInput);

	let years = currentYear - birthYear;
	let months = currentMonth - birthMonth;
	let days = currentDay - birthDay;

	// Adjust the age if the current month and day are less than the birth month and day
	if (
		currentMonth < birthMonth ||
		(currentMonth === birthMonth && currentDay < birthDay)
	) {
		years--;
		if (currentMonth < birthMonth) {
			months = 12 - birthMonth + currentMonth;
		} else {
			months = 11; // 11 months remaining in the current year
		}
	}

	// Adjust the age if the birth day is greater than the current day
	if (currentDay < birthDay) {
		months--;
		const daysInLastMonth = daysInMonth(currentMonth - 1, currentYear);
		days = daysInLastMonth - birthDay + currentDay;
	}

	yearsRes.textContent = years;
	// data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-delay="300"
	yearsRes.setAttribute("data-aos", "fade-up");
	yearsRes.setAttribute("data-aos-anchor-placement", "top-bottom");
	yearsRes.setAttribute("data-aos-delay", "300");
	monthsRes.textContent = months;
	daysRes.textContent = days;
};

// Function to get the number of days in a specific month and year
function daysInMonth(month, year) {
	return new Date(year, month, 0).getDate();
}

AOS.init();
