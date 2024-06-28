// # Funcionalidades

// Tenemos un botón `obtener chiste` en el que al clickar traeremos un chiste de chuck norris. Eso lo guardaremos en
// un listado de chistes en el DOM y se guardará en el LocalStorage. Si recargamos la página se tienen que mantener 
//los últimos chistes traidos (guardados en el LocalStorage). y podremos traer más y se seguirán añadiendo.  => OK

// Si da tiempo podremos también hacer un botón que borre todos los items, o también un botón por cada item y 
//se elimine individualmente. Todo esto deberá desaparecer del DOM y del LocalStorage => OK

// - **Obtener Chiste de Chuck Norris:** Al hacer clic en el botón "Obtener Chiste", se realiza una solicitud a la API de 
//Chuck Norris para obtener un chiste aleatorio. El chiste se agrega a la lista y se guarda en el almacenamiento local `localStorage`. => OK

// - **Cargar Chistes Almacenados:** Al cargar la página, se recuperan los chistes almacenados en el almacenamiento local y se muestran en la lista. => OK

// - **Eliminar Chiste:** Cada chiste en la lista tiene un botón "Eliminar". Al hacer clic en este botón, se elimina el chiste de la lista y se actualiza el almacenamiento local.

// Podrías ser algo como esto:
// ![chuck](./img/chuck.png)

// La idea podría ser la siguiente 
// - Manejador de click en el botón "Obtener Chiste" ==> OK
// - Una función para obtener un chiste de Chuck Norris desde la API ==> OK
// - Una función para renderizar la lista de chistes en el DOM => OK
// - Una función para guardar la lista de chistes en localStorage => OK
// - Una función para cargar la lista de chistes desde localStoragec=> OK


const fetchJoke = document.getElementById("fetchJoke")
const jokeListHTML = document.getElementById("jokeList")
const buttonDeleteAll = document.getElementById("deleteAllJokes")


const FetchJokeFuntion = () => {
    fetch("https://api.chucknorris.io/jokes/random")
        .then((res) => res.json())
        .then((data) => {
            localStorage.setItem(data.id, data.value)
            LoadJokes();
        })
        .catch((err) => console.error("Error 404"))
}

const LoadJokes = () => {
    jokeListHTML.innerHTML = ""
    const arrayJokes = []
    for(i = 0; i < localStorage.length; i++){
        arrayJokes.push(localStorage.key(i))
    }
    arrayJokes.forEach((jokeID) => {
        const template = `
            <li>
                <p class="joke">${localStorage.getItem(jokeID)}</p>
                <button class="deleteJoke" id="${jokeID}" onClick="deleteThisJoke('${jokeID}')">Borrar chiste</button>
            </li>
        `
        jokeListHTML.innerHTML += template
    })
    // document.getElementById(jokeID).addEventListener("click", () => {
    //     console.log(jokeID)
    //     localStorage.removeItem(jokeID)
    //     LoadJokes()
    //  })
}

function deleteThisJoke(joke) {
    console.log("funciona")
     localStorage.removeItem(joke)
     LoadJokes() 
 }

function main() {
    fetchJoke.addEventListener("click", () => {
        FetchJokeFuntion();
    })

    buttonDeleteAll.addEventListener("click", () => {
        localStorage.clear()
        LoadJokes()
    })

    LoadJokes()
}

main()