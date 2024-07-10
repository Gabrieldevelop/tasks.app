'use strict';

// Selecting elements
const formTask = document.querySelector('.formTask');
const taskContainer = document.querySelector('.tasks__container');
const welcomeMessage = document.querySelector('.welcomeMessage');
const errorMessageEle = document.querySelector('.error__message');
const newFormContainer = document.querySelector('.new_form-container');
const newFormTask = document.querySelector('.new_form-Task');
const updateTaskInput = document.querySelector('.update_task-input');
const updateTaskBtn = document.querySelector('.update_task-btn');
const titleUpdatedTask = document.querySelector('.title_updated-task');
const overlay = document.querySelector('.overlay');

let taskIndexToUpdate;

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
  renderTasks();

  // Clean input field
  taskInputValue.value = '';
});

const renderTasks = function () {
  // Clean before insert new tasks
  taskContainer.innerHTML = '';

  // Loop over array to show task
  taskArr.forEach((task, index, array) => {
    // Create elements for each task
    let listItem = document.createElement('li');
    const createDivBtnsContainer = document.createElement('div');
    const createDeleteButton = document.createElement('button');
    const createUpdateButton = document.createElement('button');

    // add array task to li elements
    listItem.textContent = task;
    createDeleteButton.textContent = 'Delete';
    createUpdateButton.textContent = 'Update';

    // Add classes to each task
    listItem.classList.add('task');
    createDeleteButton.classList.add('delete__btn');
    createUpdateButton.classList.add('update__btn');
    createDivBtnsContainer.classList.add('btns__tasks--container');

    createDivBtnsContainer.append(createDeleteButton);
    createDivBtnsContainer.append(createUpdateButton);
    listItem.append(createDivBtnsContainer);

    // Add btn to li elements
    // listItem.append(createDeleteButton);
    // listItem.append(createUpdateButton);

    // Show li elements
    taskContainer.append(listItem);

    // Functionlity to delete task
    createDeleteButton.addEventListener('click', function () {
      deleteTask(index);
    });

    //Functionality to update task
    createUpdateButton.addEventListener('click', function (e) {
      console.log('task updated', e);

      // Localize task element
      taskIndexToUpdate = index;
      console.log(taskIndexToUpdate);
      updateTaskInput.value = taskArr[taskIndexToUpdate];

      titleUpdatedTask.textContent = `Update your task at position: ${
        taskIndexToUpdate + 1
      }`;

      // Show new form task
      showNewFormTask();
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
  console.log(deletedItem);

  // Update tasks in localStorage
  persistTasks();

  // Each time an element is deleted, update the UI
  // Also re-render elements
  renderTasks();
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

  renderTasks();
};

window.addEventListener('load', function () {
  init();
});

//  Update tasks code

//Hide formContainer
const hideNewFormTask = function () {
  newFormContainer.classList.add('hidden');
  overlay.classList.add('hidden');
};
overlay.addEventListener('click', hideNewFormTask);

// Show formContainer
const showNewFormTask = function () {
  overlay.classList.remove('hidden');
  newFormContainer.classList.remove('hidden');
};

newFormTask.addEventListener('submit', function (e) {
  e.preventDefault();

  console.log(e, updateTaskInput.value);

  // Update the task in the array
  if (taskIndexToUpdate !== null) {
    taskArr[taskIndexToUpdate] = updateTaskInput.value;
    console.log(taskArr);

    // Persist the updated tasks
    persistTasks();

    // Re-Render tasks
    renderTasks();

    // Hide NEW form tasks container and overlay
    hideNewFormTask();
  }
});
