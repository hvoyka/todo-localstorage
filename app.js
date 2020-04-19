const todoList = document.querySelector('.todo__list');
const todoForm = document.querySelector('.todo__form');
const formInput = document.querySelector('.form__input');
const selectFilter = document.querySelector('#filter');
selectFilter.selectedIndex = 0;
let todos = [];

//check if local storage has data
if(localStorage.getItem("todos")){
  todos = JSON.parse(localStorage.getItem("todos"));
  for(const item of todos){
    createItem(item.text, item.marked, item.id);
  }
}

//save to local storage 
function saveToLs () {
  localStorage.setItem("todos", JSON.stringify(todos));
}

//create list element and return elem object
function createItem (text, marked = false , id = Date.now() + Math.random()) {
  const template =  tmpl.content.cloneNode(true);
  const textSpan = template.querySelector('.item__text');
  const elem = template.querySelector('.list__item');
  textSpan.textContent = text;
  if(marked){
    elem.classList.add('list__item--marked');
  }
  elem.dataset.id = id;
  todoList.appendChild(elem); 

  return {id, text, marked};
}

//ADD TODO
todoForm.addEventListener('submit', function(event) {
  event.preventDefault(); 
  todos.push(createItem(formInput.value));
  saveToLs()
  formInput.value = '';  
});

todoList.addEventListener('click' , function(event) {
  //REMOVE TODO
  if(event.target.classList.contains('item__delete')){
    event.target.closest('.list__item').remove()
   
    const newTodos = todos.filter(elem => {
      return elem.id != event.target.closest('.list__item').dataset.id;
    });
    todos = newTodos;
    saveToLs()
  }
   //MARK TODO
  if(event.target.classList.contains('item__mark')){
    event.target.closest('.list__item').classList.toggle('list__item--marked');
   
    const markTodo = todos.find(elem => {
      console.log(elem.id, event.target.closest('.list__item').dataset.id);
      return elem.id == event.target.closest('.list__item').dataset.id;
    });
    markTodo.marked = !markTodo.marked;
    saveToLs()
  }
});

//SELECT FILTER
selectFilter.addEventListener('change', function(e){
  console.log(e.target.value);
  const items = todoList.querySelectorAll('.list__item');
  if(e.target.value == 'marked'){   
    items.forEach(elem => {
      if(!elem.classList.contains('list__item--marked')){
        elem.classList.add('hide');
      } else {
        elem.classList.remove('hide');
      }
    });
  }
  if(e.target.value == 'unmarked'){
    items.forEach(elem => {
      if(elem.classList.contains('list__item--marked')){
        elem.classList.add('hide');
      } else {
        elem.classList.remove('hide');
      }
    });
  }
  if(e.target.value == 'all'){
    items.forEach(elem => {      
      elem.classList.remove('hide');
    });
  }
});