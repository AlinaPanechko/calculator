"use strict";

// calculator
const display = document.querySelector(".calcResult");
let operatorButton = document.querySelectorAll(".operatorButton");
let numButton = document.querySelectorAll(".numButton");

numButton.forEach(function (button) {
  button.addEventListener("click", function () {
    const value = button.textContent;
    if (["AC", "+/-", "%", "="].includes(value)) return;
    display.value += value;
  });
});

document.getElementById("ac").addEventListener("click", function () {
  display.value = "";
});

document
  .getElementById("switchOperator")
  .addEventListener("click", function () {
    if (display.value) {
      display.value = (parseFloat(display.value) * -1).toString();
    }
  });

document.getElementById("percent").addEventListener("click", function () {
  display.value += "%";
});

document.getElementById("equals").onclick = () => {
  let expression = display.value;
  expression = expression.replace(
    /(\d+(\.\d+)?)%/g,
    (_, num) => `(${num}/100)`
  );

  try {
    const result = math.evaluate(expression);

    if (!isFinite(result) || isNaN(result)) {
      display.value = "Error";
    } else {
      display.value = result.toString();
    }
  } catch (e) {
    display.value = "Error";
  }
};

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    document.getElementById("equals").click();
  }
});
// right section

const calculate = document.querySelector(".saveMoney");
const result = document.getElementById("result");

calculate.addEventListener("click", function calculateSaving() {
  const salary = Number(document.getElementById("salary").value);

  let totalExpense = 0;
  document.querySelectorAll(".costInput").forEach(function (el) {
    totalExpense += Number(el.value);
  });

  const saving = salary - totalExpense;

  if (saving < 0) {
    result.textContent = "Not enough money 🥲";
  } else {
    result.textContent = saving.toFixed(2);
  }
});

//add button
const add = document.getElementById("add");
const container = document.querySelector(".container");
add.addEventListener("click", function () {
  const containerelement = document.createElement("div");
  containerelement.classList.add("containerElement");
  const label = document.createElement("label");
  label.textContent = "New";

  const input = document.createElement("input");
  input.type = "number";
  input.classList.add("costInput");

  containerelement.appendChild(label);
  containerelement.appendChild(input);

  container.appendChild(containerelement);
});

//trash button
const trash = document.getElementById("trash");
let deleteMode = false;

trash.addEventListener("click", function () {
  deleteMode = !deleteMode;

  const inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    // Пропускаємо поле для калькулятора
    if (!input.classList.contains("calcResult")) {
      // Додаємо/знімаємо клас 'shaking'
      if (deleteMode) {
        input.classList.add("shaking");
      } else {
        input.classList.remove("shaking");
      }

      // Щоб не додавати багато разів один і той самий обробник:
      if (!input.dataset.deleteHandler) {
        input.addEventListener("click", function () {
          if (deleteMode) {
            const parent = input.parentElement;
            parent.remove();
          }
        });
        // Позначаємо, що обробник вже додано
        input.dataset.deleteHandler = "true";
      }
    }
  });
});

//edit button
const edit = document.getElementById("change");
let editMode = false;

edit.addEventListener("click", function () {
  editMode = !editMode;

  if (editMode) {
    // 🔁 Перетворення label → input
    const labels = document.querySelectorAll(".containerElement label");

    labels.forEach((label) => {
      const input = document.createElement("input");
      input.type = "text";
      input.value = label.textContent;

      // Копіюємо класи
      label.classList.forEach((cls) => input.classList.add(cls));

      input.classList.add("renamedLabel");
      input.classList.add("editLabel");

      // Замінюємо label на input
      label.replaceWith(input);
      input.focus();
    });
  } else {
    // 🔁 Перетворення input → label
    const inputs = document.querySelectorAll(
      ".containerElement input.renamedLabel"
    );

    inputs.forEach((input) => {
      const label = document.createElement("label");
      label.textContent = input.value;

      // Копіюємо класи назад
      input.classList.forEach((cls) => {
        if (cls !== "renamedLabel" && cls !== "editLabel") {
          label.classList.add(cls);
        }
      });
      input.replaceWith(label);
    });
  }
});
