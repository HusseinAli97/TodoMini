const todoUrl = "https://jsonplaceholder.typicode.com/todos";
const addBtn = document.getElementById('addBtn');
const inputValue = document.querySelector('#toDo');

function getFetch() {
    fetch(todoUrl+'?_limit=10')
    .then((response)=>response.json())
    .then((data) => {
        data.forEach(todoItem => addToDom(todoItem));
    })
}
function addToDom(todoItem) {
    const div = document.createElement('div');
        div.classList.add('btn','btn-outline-dark','text-white','my-2','me-2','todoItems')
        
            div.appendChild(document.createTextNode(todoItem.title))
            if(todoItem.completed){
                div.classList.add('text-muted')
            }
            div.setAttribute('data-id',todoItem.id)
            document.getElementById('todoList').appendChild(div)
}
function createTodoItem(addTodo) {
    const inputData = {title : addTodo ,completed:false};
    fetch(todoUrl,{
        method:'post',
        body: JSON.stringify(inputData),
        headers:{
            'Content-Type':'application/json'
        },
    })
    .then((response) => response.json())
    .then((todoNew) => addToDom(todoNew))
}
function toggleDone(e) {
    if(e.target.classList.contains('todoItems')){
        e.target.classList.toggle('text-muted')
        updateData(e.target.dataset.id,e.target.classList.contains('text-muted'))
    }
}
function updateData(id,complete){
    fetch(`${todoUrl}/${id}`,{
        method:'PUT',
        body:JSON.stringify({complete}),
        headers:{
            'Content-Type':'application/json'
        }
    }).then((res) => res.json())
    .then((data)=>console.log(data))
    }
function deleteTodo(e){
    if(e.target.classList.contains('todoItems')){
        const id = e.target.dataset.id;
        fetch(`${todoUrl}/${id}`,{
            method:'Delete'
        }).then((res) => res.json())
        .then(() => e.target.remove())
    }
}

const initialization = () => {
    document.addEventListener('DOMContentLoaded',getFetch)
    addBtn.addEventListener('click',() => {
        if(inputValue.value){
            createTodoItem(inputValue.value)
        }
    })
    document.querySelector('#todoList').addEventListener('click', toggleDone)
    document.querySelector('#todoList').addEventListener('dblclick', deleteTodo)
}

initialization()