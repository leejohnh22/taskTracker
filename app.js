// Last edited date : 06-03-2019

// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Define loadEventListeners function
function loadEventListeners(){
	// DOM load event
	document.addEventListener('DOMContentLoaded', getTasks);
	// Add task event
	form.addEventListener('submit', addTask);
	// Remove task event
	// use event delegation to target the delete link icons
	taskList.addEventListener('click', removeTask);
	// Clear tasks
	clearButton.addEventListener('click', clearTasks);
	// Filter tasks
	filter.addEventListener('keyup', filterTasks)
}

// Get Tasks from Local Storage
function getTasks() {
	// intialize task variable
	let tasks;
	// verify if tasks exist or not
	if(localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	// Loop through tasks and create the element in UI
	tasks.forEach(function(task) {
		const li = document.createElement('li');
		li.className = 'collection-item';
		li.appendChild(document.createTextNode(task));

		// Create new link element
		const link = document.createElement('a');
		link.className = 'delete-item secondary-content';
		// Add icon html (x icon)
		link.innerHTML = '<i class="fa fa-remove"></i>'
		// Append link to li
		li.appendChild(link);

		// Append li to ul
		taskList.appendChild(li);
	})
}

// Add Task function
function addTask(e){
	// error checking
	if(taskInput.value === ''){
		alert('Add a task');
	}
	// Create li item
	const li = document.createElement('li');
	li.className = 'collection-item' // materialize class to stylize
	// Create text node and append to li
	li.appendChild(document.createTextNode(taskInput.value));

	// Create new link element
	 const link = document.createElement('a');
	 link.className = 'delete-item secondary-content';
	 // Add icon html (x icon)
	 link.innerHTML = '<i class="fa fa-remove"></i>'
	 // Append link to li
	 li.appendChild(link);

	 // Append li to ul
	 taskList.appendChild(li);

	 // Store Task in Local Storage
	 storeTaskInLocalStorage(taskInput.value);

	 // Clear input
	 taskInput.value = '';

	// prevent default form submit
	e.preventDefault();
}

// Remove Task
function removeTask(e) {
	// If we target the delete element
	if(e.target.parentElement.classList.contains('delete-item')){
		// Remove li if user conirms
		if(confirm('Are you sure?')){
			e.target.parentElement.parentElement.remove();

			// Remove task (li) from local storage
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

// define function to remove tasks
function removeTaskFromLocalStorage(taskItem) {
	// check local storage
	let tasks;
	// check to see if its null
	if(localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	// loop through tasks
	tasks.forEach(function(task, index) {
		// verify if text content of taskItem is equal to the current task
		if(taskItem.textContent === task) {
			// remove task from the tasks array using specified index
			tasks.splice(index, 1);
		}
	})
	// set local storage
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
	// method one
	//taskList.innerHTML = '';

	// while taskList has any elements, delete them (loop)
	// faster
	while(taskList.firstChild){
		taskList.removeChild(taskList.firstChild);
	}

	// clear local storage
	localStorage.clear();

	// clear task filter
	filter.value = '';
}

// Filter Tasks
function filterTasks(e) {
	// Capture filter input
	const text = e.target.value.toLowerCase(); 

	// Get all list items -- returns a node list so we can loop
	document.querySelectorAll('.collection-item').forEach(function(task){
		// get actual task text
		const item = task.firstChild.textContent;
		// if it matches the filtered text
		// indexOf returns -1 if there is no match
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	})
}

function storeTaskInLocalStorage(taskInput) {
	// initialize task array
	let tasks;

	// check if task list already exists
	if(localStorage.getItem('tasks') === null) {
		// if it does not create a new array
		tasks = [];
	} else {
		// if it does we need to convert the strings to array
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	// push task into array
	tasks.push(taskInput);

	// save the array -- must convert back to string first
	localStorage.setItem('tasks', JSON.stringify(tasks));

	// save alert
	// alert(`Task [${taskInput}] was saved`);
}