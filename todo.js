const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");


const TODOS_LS = "toDos";



let toDos=[];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos=cleanToDos;
    saveTodos();
}

// JSON.stringfy
// JSON = JavaScript Object Notation 의 준말. 자바스크립트 오브젝트 표기법
// ex) Object 를 String으로 혹은 String을 Object로 바꿔주기도 한다.
// localStorage key값으로는 Object가 못들어간다. 오직 String만
// 그래서 String으로 변환해야 정상적으로 key값에 들어가는걸 확인할 수 있다.
function saveTodos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
}

function paintToDo(text) {
    const li= document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length+1
    delBtn.innerHTML="X";
    delBtn.addEventListener("click",deleteToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id=newId
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id : newId
    };
    toDos.push(toDoObj);
    saveTodos();
}


function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}
// forEach는 array를 위한 function이다.
// 이와 같은 예로 String도 function이 있고
// Object도 function이 있다.

function loadToDos(){
    const loadedToDos=localStorage.getItem(TODOS_LS)
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
       parsedToDos.forEach(function(toDo) {
           paintToDo(toDo.text);
       });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit)
}
init();