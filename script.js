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
}
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
  }
}

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
