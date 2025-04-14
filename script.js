document.addEventListener("DOMContentLoaded", function () {
  let display = document.getElementById("display");
  let currentInput = "0";
  let operator = null;
  let previousInput = null;

  function updateDisplay() {
    display.innerText = currentInput;
  }

  function handleNumberClick(number) {
    if (currentInput === "0") {
      currentInput = number;
    } else {
      currentInput += number;
    }
    updateDisplay();
  }

  function handleOperatorClick(op) {
    if (operator !== null) {
      calculate();
    }
    previousInput = currentInput;
    operator = op;
    currentInput = "0";
    updateDisplay();
  }

  function calculate() {
    if (operator && previousInput !== null) {
      let result;
      const prev = parseFloat(previousInput);
      const curr = parseFloat(currentInput);
      
      switch (operator) {
        case "+":
          result = prev + curr;
          break;
        case "-":
        case "−":
          result = prev - curr;
          break;
        case "*":
        case "×":
          result = prev * curr;
          break;
        case "/":
        case "÷":
          result = curr === 0 ? "Error" : prev / curr;
          break;
      }
      currentInput = result.toString();
      operator = null;
      updateDisplay();
    }
  }

  // Button click handlers
  document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      const value = button.textContent;
      
      if ("0123456789.".includes(value)) {
        handleNumberClick(value);
      } else if ("+-×÷".includes(value)) {
        handleOperatorClick(value);
      } else if (value === "=") {
        calculate();
      } else if (value === "AC") {
        currentInput = "0";
        operator = null;
        previousInput = null;
        updateDisplay();
      }
    });
  });

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    if ("0123456789".includes(e.key)) {
      handleNumberClick(e.key);
    } else if (e.key === ".") {
      handleNumberClick(".");
    } else if (["+", "-"].includes(e.key)) {
      handleOperatorClick(e.key);
    } else if (e.key === "*") {
      handleOperatorClick("×");
    } else if (e.key === "/") {
      handleOperatorClick("÷");
    } else if (e.key === "Enter" || e.key === "=") {
      calculate();
    } else if (e.key === "Escape") {
      currentInput = "0";
         operator = null;
      previousInput = null;
      updateDisplay();
    } else if (e.key === "Backspace") {
      if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
      } else {
        currentInput = "0";
      }
      updateDisplay();
    }
  });
});
