import 'bootstrap';
import './style.css';

import './assets/img/rigo-baby.jpg';
import './assets/img/4geeks.ico';

const numerosCartas = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
];
const palosCartas = ['heart', 'diamond', 'spade', 'club'];

const TIEMPO = 10;
let tiempoRestante = TIEMPO;

const ANCHURA_PREDETERMINADA = '350';
const ALTURA_PREDETERMINADA = '500';

const obtenerDatosCarta = () => {
    const numero = Math.floor(Math.random() * numerosCartas.length);
    const palo = Math.floor(Math.floor(Math.random() * palosCartas.length));

    return {
        numero: numerosCartas[numero],
        palo: palosCartas[palo],
    };
};

const generarCarta = (contenedorCarta) => {
    const carta = obtenerDatosCarta();

    contenedorCarta.textContent = carta.numero;
    contenedorCarta.className = '';
    contenedorCarta.classList.add(carta.palo);

    tiempoRestante = TIEMPO;
};

const temporizador = (contenedorCarta, cuentaAtras) => {
    cuentaAtras.textContent = `Siguiente carta en: ${tiempoRestante}`;
    tiempoRestante <= 0 ? generarCarta(contenedorCarta) : tiempoRestante--;

    setTimeout(() => temporizador(contenedorCarta, cuentaAtras), 1000);
};

const valoresPredeterminados = (contenedorCard, formulario) => {
    contenedorCard.style.width = `${ANCHURA_PREDETERMINADA}px`;
    contenedorCard.style.height = `${ALTURA_PREDETERMINADA}px`;

    formulario.reset();
};

window.onload = function () {
    const card = document.getElementById('card');
    const cardContent = document.getElementById('card-content');
    const cuentaAtras = document.getElementById('cuenta-atras');
    const btnGenerarCarta = document.getElementById('generarCarta');

    const formDimensiones = document.getElementById('form-dimensiones');
    // const anchura = document.getElementById('anchura');
    // const altura = document.getElementById('altura');
    const btnRestablecerValores = document.getElementById(
        'restablecer-valores',
    );

    generarCarta(cardContent);

    temporizador(cardContent, cuentaAtras);

    formDimensiones.addEventListener('submit', (event) => {
        event.preventDefault();

        const nuevaAnchura = document.getElementById('anchura').value;
        const nuevaAltura = document.getElementById('altura').value;

        if (nuevaAnchura) card.style.width = `${nuevaAnchura}px`;
        if (nuevaAltura) card.style.height = `${nuevaAltura}px`;
    });

    btnGenerarCarta.addEventListener('click', () => {
        generarCarta(cardContent);
    });

    btnRestablecerValores.addEventListener('click', (event) => {
        event.preventDefault();

        valoresPredeterminados(card, formDimensiones);
    });
};
