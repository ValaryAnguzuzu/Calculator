const display = document.getElementById("display");
let shouldReset = false;

// Append a value to the display
function appendToDisplay(input) {
  // If there's an error message, reset the display
  if (display.value === "Error") {
    display.value = "";
  }

  // If user starts typing a number after an evaluation, reset display
  if (shouldReset && !isNaN(input)) {
    display.value = ""; // Clear display for numbers only
  }
  shouldReset = false;
  display.value += input;

  // Call live calculation
//   liveCalculate();
}

// Function to calculate the result dynamically
// function liveCalculate() {
//   try {
//     const result = eval(display.value);
//     if (!isNaN(result) && display.value !== "") {
//       display.placeholder = `= ${result}`; // Show live result in placeholder
//     } else {
//       display.placeholder = ""; // Clear placeholder if invalid
//     }
//   } catch (error) {
//     display.placeholder = ""; // Don't show an error message, just hide it
//   }
// }


// Clear display
function clearDisplay() {
  display.value = "";
  shouldReset = false;
}

// Delete last character
function deleteLastChar() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    display.value = eval(display.value);
    shouldReset = true;
  } catch (error) {
    display.value = "Error";
    shouldReset = true;
  }
}

// Attach event listeners to all buttons
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    const action = button.getAttribute("data-action");

    if (action === "calculate") {
      calculate();
    } else if (action === "clear") {
      clearDisplay();
    } else if (action === "delete") {
      deleteLastChar();
    } else {
      appendToDisplay(value);
    }
  });
});

// Handle keyboard input
document.addEventListener("keydown", function (event) {
  const key = event.key;

  // Allow numbers and basic operators
  if (!isNaN(key) || "+-*/.".includes(key)) {
    appendToDisplay(key);
  }

  // Handle Enter (=)
  else if (key === "Enter") {
    event.preventDefault();
    calculate();
  }
  // Handle Backspace (Delete last character)
  else if (key === "Backspace") {
    deleteLastChar();
  }

  // Handle Escape (Clear display)
  else if (key === "Escape") {
    clearDisplay();
  }
});
