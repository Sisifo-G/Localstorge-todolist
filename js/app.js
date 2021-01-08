// variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


// EventListeners
eventListeners();

function eventListeners() {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    });
}





// Funciones
function agregarTweet(e) {
    e.preventDefault();

    // Textarea donde el ususario escribe
    const tweet = document.querySelector('#tweet').value;
    
    // validación
    if(tweet ===''){
        mostrarError('Mensaje no puede ir vacío');
        return; // Evita que se ejecuten más líneas de código (funciona en If siempre y cuando esté dentro de una función)
    }

    const tweetObj = {
        id: Date.now(),
        tweet // es igial que escribir (tweet: tweet)
    }
    // Añadir al arreglo de tweet
    tweets = [...tweets, tweetObj];
    
    // Una vez agregado vamos a crear el HTML
    crearHTML();

    // Reiniciar el Formulario
    formulario.reset();
}

// Mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertar mensaje en el contenido 
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elimina el mensaje de error después de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

// Función para mostrar Tweets en la página
function crearHTML(){
    limpiarHTML();

    if(tweets.length> 0){
        tweets.forEach( tweet =>{
            // Agregar botón de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'x';

            // Añadir función de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // Crear el HTML
            const li = document.createElement('li');

            // añadir el texto
            li.innerText = tweet.tweet;

            // añadir el botón
            li.appendChild(btnEliminar);

            // Insertarlo en el HTML
            listaTweets.appendChild(li); 

        });
    }

    sincronizarStorage();
}

// Agrega los Tweets actuales al localstorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Elimina un Tweet
function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML();
}

// Limpiar el HTML
function limpiarHTML(){
    while( listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}