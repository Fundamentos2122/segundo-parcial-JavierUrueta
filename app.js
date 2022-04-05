const inputGroup = document.getElementById("input-group");
const ingredientTempList = document.getElementById("ingredient-temp-list");
const keyList = "ingredientTempList"; //key siempre es const

//las demas variables pueden ser let o var

document.addEventListener("DOMContentLoaded", function() {
    //Agregar evento al formulario
    inputGroup.addEventListener("submit", submitTweet);

    paintTweets();
});

//byId: un solo dato
//TagName: regresa un arreglo de todas clas clases seleccionadas(div, h1..hn, form, button)

function submitTweet(e) { //simepre va la 'e', se ultiliza para formularios
    e.preventDefault(); //se pone 100pre
    e.stopPropagation(); //se pone 100pre


    //Se crea el objeto
    let tweet = {
        id: Date.now(), //se asigna id en base el dia, hora,segundo
        text: inputGroup["text"].value
    };

    let list = getTweets(); //se crea una lista con la funcion

    list.push(tweet); //se mete el 'tweet' con push a la lista

    localStorage.setItem(keyList, JSON.stringify(list));//actualiza el arreglo de localstorage (va siempre, solo cambia el objeto y la key)

    paintTweets();
}

function paintTweets() {
    let list = getTweets();

    let html = '';

    for(var i = 0; i < list.length; i++) {
        html += 
        `<li class="[ bg-white  color-gray ]">
            Ingrediente 1 ${list[i].text}
            <button class="close" type="button" onclick="deleteTweet(${list[i].id})" >X</button>
        </li>`;
    }

    ingredientTempList.innerHTML = html; //Inserta contenido despues del div 'tweetList' (como un push)
}

function getTweets() { //Se crea la lista con la funcion getTweets
    let list = JSON.parse(localStorage.getItem(keyList));

    if (list === null) {
        return [];
    }
    else {
        return list;
    }
}

function deleteTweet(id) {
    let list = getTweets();

    list = list.filter(i => i.id !== id);

    localStorage.setItem(keyList, JSON.stringify(list));

    let tweet = document.getElementById(id);

    tweet.className += ' hide';

    setTimeout(() => {
        tweet.remove();
    }, 300);
}