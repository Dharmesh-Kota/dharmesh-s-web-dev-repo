var input = document.querySelectorAll('.input-borders');
var divs = document.querySelectorAll('.hover');

document.addEventListener('mouseover', function(){
    for(let inp = 0; inp < input.length; inp++){
            input[inp].addEventListener('mouseover', function(){
            divs[inp].style.backgroundColor = 'rgb(230, 229, 229)';
        })
            input[inp].addEventListener('mouseleave', function(){
            divs[inp].style.backgroundColor = 'aliceblue';
            // input[inp].style.outline = 'none';
        })
    }
});

// Background color of Category

var catgry = document.querySelectorAll('#card #cat button');
for(let cat of catgry){
    if(cat.innerHTML == "PERSONAL"){
        cat.style.backgroundColor = "violet";
    } else if(cat.innerHTML == "WORK"){
        cat.style.backgroundColor = "darkgreen";
    } else if(cat.innerHTML == "SCHOOL"){
        cat.style.backgroundColor = "red";
    } else if(cat.innerHTML == "CLEANING"){
        cat.style.backgroundColor = "orange";
    } else {
        cat.style.backgroundColor = "blue";
    }
}

// Removing Tasks

var ids = document.querySelectorAll('#card #radio input');

document.addEventListener('click', function(){
    for(let id of ids){
        if(id.checked == true){
            document.querySelector('#remove-todo button a').href += id.value + "&id=";
        }
    }
});