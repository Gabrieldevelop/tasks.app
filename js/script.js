'use strict';

// Selecting elements
const formTask = document.querySelector('.formTask');
const taskContainer = document.querySelector('.tasks__container');
const welcomeMessage = document.querySelector('.welcomeMessage');
const errorMessageEle = document.querySelector('.error__message');

let taskInputValue = document.querySelector('.taskInput');
let taskArr = [];

formTask.addEventListener('submit', function (e) {
  // Do not reload page
  e.preventDefault();

  // Show error message
  showErrorMsg('Add a correct task');

  // Guard
  if (!taskInputValue.value) return;

  // push task to arrayTask
  taskArr.unshift(taskInputValue.value);

  // Add task to localStorage
  persistTasks();

  // Update DOM and taskArr
  updateTask();

  // Clean input field
  taskInputValue.value = '';
});

const updateTask = function () {
  // Clean before insert new tasks
  taskContainer.innerHTML = '';

  // Loop over array to show task
  taskArr.forEach((task, index, array) => {
    // Create elements for each task
    let listItem = document.createElement('li');
    const createDeleteButton = document.createElement('button');

    // add array task to li elements
    listItem.textContent = task;
    createDeleteButton.textContent = 'Delete';

    // Add classes to each task
    listItem.classList.add('task');
    createDeleteButton.classList.add('delete__btn');
    createDeleteButton.classList.add('btn');

    // Add btn to li elements
    listItem.append(createDeleteButton);

    // Show li elements
    taskContainer.append(listItem);

    // Functionlity to delete task
    createDeleteButton.addEventListener('click', function () {
      deleteTask(index);
    });
  });

  // Update welcome message based on tasks
  const isTask =
    taskArr.length > 0
      ? (welcomeMessage.textContent =
          'Dear user, these tasks needs to be fulfilled 😉')
      : (welcomeMessage.textContent = 'Add any task that you want to 😊');

  return isTask;
};

// Delete task
const deleteTask = function (index) {
  const deletedItem = taskArr.splice(index, 1);

  // Update tasks in localStorage
  persistTasks();

  // Each time an element is deleted, update the UI
  // Also re-render elements
  updateTask();
};

const persistTasks = function () {
  localStorage.setItem('tasks', JSON.stringify(taskArr));
};

const showErrorMsg = function (message) {
  if (!taskInputValue.value) {
    errorMessageEle.style.display = 'block';
    errorMessageEle.textContent = message;
  } else {
    errorMessageEle.style.display = 'none';
  }
};

const init = function () {
  const storage = localStorage.getItem('tasks');
  if (storage) taskArr = JSON.parse(storage);

  updateTask();
};

window.addEventListener('load', function () {
  init();
});
