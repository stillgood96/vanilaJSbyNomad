const listNum=document.querySelector("select"),
    option=listNum.querySelectorAll("option");


function save(){
    if(option.value==="1"){
        localStorage.setItem("country","KR");
    }
}

function event () {
    listNum.addEventListener('change',save);
}


function init(){
    save();
}
init();