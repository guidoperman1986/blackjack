const miModulo = (()=>{ //patron modulo - funcion autoinvocada anonima
    'use strict'  //va a evaluar de forma extricta el codigo de javascript
        
    /* 
        2C = 2 de clubs
        2D = 2 de diamonds
        2H = 2 de Hearts
        2S = 2 de Spades
    */

    let deck         = [];
    const tipos      = ['C','D','H','S'], especiales = ['A','J','Q','K']

    //let puntosJugador = 0,
    //    puntosComputadora = 0;

    let puntosJugadores = [];

    //referencias htmls
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugador = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');


    const inicializarJuego = (numJugadores = 2)=> {
        
        deck = crearDeck();
        puntosJugadores = []
        
        for (let i= 0;i<numJugadores;i++){
            puntosJugadores.push(0);
        }        

        puntosHTML.forEach(elem=>elem.innerText = 0);
        divCartasJugador.forEach(elem=>elem.innerText = '')
        

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }


    const crearDeck = () => {    
        deck = [];

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
        
        return _.shuffle(deck);
    }
   

    //Esta funcion me permite tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0){
            throw 'No hay mas cartas en el deck'
        }

        return deck.shift();
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
    
    //Turno 0 = primer jugador y el ultimo sera la computadora
    const acumularPuntos = (carta,turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];

        if (turno != puntosJugadores.length-1){
            console.log(puntosJugadores[0]);
            console.log(puntosHTML[turno].innerText);


        }

        return puntosJugadores[turno];
    }

    const crearCarta = (carta,turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');    
        divCartasJugador[turno].append(imgCarta)
        /* divCartasComputadora.append(imgCarta); */
    }

    const determinarGanador = () =>{
        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(()=>{
            if (puntosComputadora === puntosMinimos){
                alert('Nadie gano')
            }else if(puntosMinimos > 21){
                alert('La computadora gano')
            }else if (puntosComputadora > 21) {
                alert ('Ganaste')
            }
        },100)
    }

    // turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            acumularPuntos(carta,puntosJugadores.length-1);

            puntosComputadora = crearCarta(carta,puntosJugadores.length-1)

            if (puntosMinimos > 21){
                break;
            }

        }while ((puntosComputadora < puntosMinimos));

        determinarGanador();
    }

    //Eventos
    btnPedir.addEventListener('click', ()=>{
        const carta = pedirCarta();    
        
        const puntosJugador = acumularPuntos(carta,0);
        crearCarta(carta,0);

        if (puntosJugador > 21){
            console.warn('Perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador == 21) {
            console.warn('21, genial');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            determinarGanador();
        }

    })

    btnDetener.addEventListener('click', ()=>{
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);   
        
    })

    /* btnNuevo.addEventListener('click', ()=>{

        console.clear();
        inicializarJuego();


    }) */

    return {
        nuevoJuego : inicializarJuego
    }

})();


