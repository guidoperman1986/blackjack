/* 
    2C = 2 de clubs
    2D = 2 de diamonds
    2H = 2 de Hearts
    2S = 2 de Spades
*/

let deck         = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K']

let puntosJugador = 0;
let puntosComputadora = 0;

//referencias htmls
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const smalls = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');


const crearDeck = () => {    
    for (let i = 2; i <= 10; i++) {
        for (const tipo of tipos) {
            deck.push(i+tipo);            
        }
    }

    for (const tipo of tipos) {
        for (const esp of especiales) {
            deck.push(esp + tipo);
        }
    }
    
    deck = _.shuffle(deck);    
    console.log(deck);
}

crearDeck();

//Esta funcion me permite tomar una carta
const pedirCarta = () => {
    if (deck.length === 0){
        throw 'No hay mas cartas en el deck'
    }

    let carta = deck.shift();    
    return carta;
}

//pedirCarta();

const valorCarta = (carta)=>{//para saber cual es el valor de una carta
    const valor = carta.substring(0,carta.length-1);
    let puntos = 0;

    /* if (isNaN(valor)){
        puntos = (valor === 'A') ? 11 : 10
    }else{
        puntos = valor * 1;
    } */

    return (isNaN(valor)) ? 
            (valor === 'A') ? 11 : 10 
            : valor * 1;  

}

/* const valor = valorCarta(pedirCarta()); */

// turno de la computadora
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();    
        puntosComputadora = puntosComputadora + valorCarta(carta);
        smalls[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');    
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21){
            break;
        }

    }while ((puntosComputadora < puntosMinimos) && (puntosMinimos < 21));

    setTimeout(()=>{
        if (puntosComputadora === puntosMinimos){
            alert('Nadie gano')
        }else if(puntosMinimos > 21){
            alert('La computadora gano')
        }else if (puntosComputadora > 21) {
            alert ('Ganaste')
        }

    },30)

}

//Eventos
btnPedir.addEventListener('click', ()=>{
    const carta = pedirCarta();    
    puntosJugador = puntosJugador + valorCarta(carta);
    smalls[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');    
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21){
        console.warn('Perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador == 21) {
        console.warn('21, genial');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    }

})

btnDetener.addEventListener('click', ()=>{
    btnPedir.disabled   = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);   
    
})

btnNuevo.addEventListener('click', ()=>{

    console.clear();
    deck = []
    deck = crearDeck();    

    puntosJugador = 0;
    puntosComputadora = 0;

    smalls[0].innerText = 0;
    smalls[1].innerText = 0;

    divCartasJugador.innerHTML = ''
    divCartasComputadora.innerHTML = ''

    btnPedir.disabled = false;
    btnDetener.disabled = false;

})