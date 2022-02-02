import { UI_ELEMENTS } from "./view.js";

function initUiElem(inputBlock) {
  const inputTask = inputBlock.querySelector("[type='text']");
  const addTaskButton = inputBlock.querySelector("[type='image']");

  addTaskButton.addEventListener("click", createTask);
  inputTask.addEventListener("keydown", deleteErrorState);
}

function createTask() {
  const input = this.parentElement.querySelector("[type='text']");
  const text = input.value;
   try {
     if (!text) {
       throw new Error("Empty input value");
     }
   } catch (err) {
     input.parentElement.classList.add("error");
     return;
   }
   input.value = "";
  const task = new Task(text);

  task.renderTask();
  this.parentElement.insertAdjacentElement("afterend", task.element);
}

function Task(name) {
  this.name = name;
  this.renderTask = function () {

    const div = document.createElement("div");
    div.classList.add("input-task");
    div.innerHTML = `<label>
    <input type="checkbox">
    <span>${this.name}</span>
    </label>
    <input type="image" src="img/close-icon.svg">`;

    const checkbox = div.querySelector("[type='checkbox']");
    checkbox.addEventListener("change", function () {
      div.classList.toggle("input-task--checked");
    });

    const deleteButton = div.querySelector("[type='image']");
    deleteButton.addEventListener("click", () => {
      div.remove();
    });

    this.element = div;
  };
}


function deleteErrorState() {
  if (this.parentElement.classList.contains("error")) {
    this.parentElement.classList.remove("error");
  }
}

initUiElem(UI_ELEMENTS.HIGH_INPUT_FORM);
initUiElem(UI_ELEMENTS.LOW_INPUT_FORM);
