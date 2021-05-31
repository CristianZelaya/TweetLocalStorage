// Variables
const formulario  = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// EventListeners
const eventListeners = () => {

    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {

        tweets = JSON.parse( localStorage.getItem('tweets')) || [];

        crearHtml();

    });

};

//Funciones
const agregarTweet = (e) => {

    e.preventDefault();
    const tweet = document.querySelector('#tweet').value;

    if ( tweet === '') {

        crearHtml();

        mostrarError('Un tweet no puede ir vacio');

        return;

    }

    const tweetObj = {

        id: Date.now(),
        tweet

    }

    tweets = [...tweets, tweetObj];

    crearHtml();

    // Reiniciar form
    formulario.reset();

}

const mostrarError = (error) => {

    const mensajeError = document.createElement('p');
    mensajeError.classList.add('error');
    mensajeError.innerHTML = error;
    formulario.appendChild(mensajeError);

    setTimeout(() => {

        mensajeError.remove();
        
    }, 3000);

}

const crearHtml = () => {

    limpiarHtml();

    if ( tweets.length > 0 ){

        tweets.forEach( tweet => {

            //boton eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerHTML = 'X';

            // añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            const li = document.createElement('li');
            li.innerHTML = tweet.tweet;
            listaTweets.appendChild(li);
            li.appendChild(btnEliminar);

        });
    }

    sincronizarStorage();

}

const limpiarHtml = () => {

    while (listaTweets.firstChild) {

        listaTweets.removeChild(listaTweets.firstChild);

    }
}

const sincronizarStorage = () => {

    localStorage.setItem('tweets', JSON.stringify(tweets));

}

const borrarTweet = (id) => {

    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHtml();
    
}

eventListeners();