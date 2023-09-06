let todo = JSON.parse(localStorage.getItem('todo')) || [];
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const todoCount = document.getElementById('todo-count');
const addButton = document.querySelector('.btn');
const deleteButton = document.getElementById('delete-btn');

//Initialise the todo list
(function init() {
    'use strict';
    document.addEventListener('DOMContentLoaded', () => {
        addButton.addEventListener('click', addTask);
        todoInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                addTask();
            }
        });
        deleteButton.addEventListener('click', deleteAllTask);
        displayTasks();
    });
    function addTask() {
        const newTask = todoInput.value.trim();
        if (newTask !== '') {
            todo.push({ text: newTask, disabled: false });
            saveToLocalStorage();
            todoInput.value = '';
            displayTasks();
        }
    }
    function deleteAllTask() {
        todo = [];
        saveToLocalStorage();
        displayTasks();
    }
    function displayTasks() {
        todoList.innerHTML = '';
        todo.forEach((item, index) => {
            const p = document.createElement('p');
            p.innerHTML = `
                <div class="todo-container">
                    <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? 'checked' : ''}>
                    <p id="todo-${index}" class="${item.disabled ? "disabled" : ''}" onclick="editTask(${index})">${item.text}</p>
                </div>
            `;
            p.querySelector('.todo-checkbox').addEventListener('change', () => {
                toggleTask(index);
            });
            todoList.appendChild(p);
        });
        todoCount.textContent = todo.length;
    }
    function saveToLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(todo));
    }
    function toggleTask(index) {
        todo[index].disabled = !todo[index].disabled;
        saveToLocalStorage();
        displayTasks();
    }
    window.editTask = function (index) {
        const todoItem = document.getElementById(`todo-${index}`);
        const existingText = todo[index].text;
        const inputElement = document.createElement("input");
        inputElement.value = existingText;
        todoItem.replaceWith(inputElement);
        inputElement.focus();
        inputElement.addEventListener("blur", () => {
            const updatedText = inputElement.value.trim();
            if (updatedText) {
                todo[index].text = updatedText;
                saveToLocalStorage();
            }
            displayTasks();
        });
    };
})();

