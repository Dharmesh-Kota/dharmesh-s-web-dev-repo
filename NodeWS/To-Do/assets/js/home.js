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