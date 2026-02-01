import 'bootstrap';
import './style.css';

import './assets/img/rigo-baby.jpg';
import './assets/img/4geeks.ico';

const NUMEROS_CARTAS = [
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
const PALOS_CARTAS = ['heart', 'diamond', 'spade', 'club'];
const PALOS_ICONS = {
    heart: '♥',
    diamond: '♦',
    spade: '♠',
    club: '♣',
};

const ANCHURA_PREDETERMINADA = '350';
const ALTURA_PREDETERMINADA = '500';

const TIEMPO = 10;
let tiempoRestante = TIEMPO;

const ULTIMAS_CARTAS = 15;

const cartasGeneradas = [];

const obtenerDatosCarta = () => {
    const numero = Math.floor(Math.random() * NUMEROS_CARTAS.length);
    const palo = Math.floor(Math.floor(Math.random() * PALOS_CARTAS.length));

    return {
        numero: NUMEROS_CARTAS[numero],
        palo: PALOS_CARTAS[palo],
    };
};

const actualizarListaCartas = () => {
    const listaCartas = document.getElementById('lista-cartas');
    listaCartas.innerHTML = '';

    cartasGeneradas.forEach((carta) => {
        const color =
            carta.palo === 'heart' || carta.palo === 'diamond'
                ? 'text-danger'
                : 'text-dark';

        const columna = document.createElement('div');
        columna.className = 'col';

        columna.innerHTML = `
            <div class="card h-100 text-center border-secondary ${color}">
                <div class="card-body p-1">
                    <div class="fw-bold">${carta.numero} - ${PALOS_ICONS[carta.palo]}</div>
                </div>
            </div>
        `;

        listaCartas.appendChild(columna);
    });
};

const guardarCartaGenerada = (carta) => {
    const nuevaCarta = {
        palo: carta.palo,
        numero: carta.numero,
    };

    cartasGeneradas.push(nuevaCarta);

    if (cartasGeneradas.length > ULTIMAS_CARTAS) {
        cartasGeneradas.shift();
    }

    actualizarListaCartas();
};

const generarCarta = (contenedorCarta) => {
    const carta = obtenerDatosCarta();

    guardarCartaGenerada(carta);

    contenedorCarta.textContent = carta.numero;
    contenedorCarta.className = '';
    contenedorCarta.classList.add(carta.palo);

    tiempoRestante = TIEMPO;
};

const temporizador = (contenedorCarta, cuentaAtras) => {
    tiempoRestante <= 1 ? generarCarta(contenedorCarta) : tiempoRestante--;
    cuentaAtras.textContent = `Siguiente carta en: ${tiempoRestante}`;

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
    const btnRestablecerValores = document.getElementById(
        'restablecer-valores',
    );

    const anchura = document.getElementById('anchura');
    const altura = document.getElementById('altura');

    const anchuraLeyenda = document.getElementById('anchura-leyenda');
    const alturaLeyenda = document.getElementById('altura-leyenda');
    anchuraLeyenda.textContent = `Anchura entre ${anchura.min}px y ${anchura.max}px`;
    alturaLeyenda.textContent = `Altura entre ${altura.min}px y ${altura.max}px`;

    const numeroCartas = document.getElementById('numero-cartas');
    numeroCartas.textContent = `Últimas ${ULTIMAS_CARTAS} cartas`;

    generarCarta(cardContent);

    temporizador(cardContent, cuentaAtras);

    formDimensiones.addEventListener('submit', (event) => {
        event.preventDefault();

        if (anchura.value) card.style.width = `${anchura.value}px`;
        if (altura.value) card.style.height = `${altura.value}px`;
    });

    btnGenerarCarta.addEventListener('click', () => {
        generarCarta(cardContent);
    });

    btnRestablecerValores.addEventListener('click', (event) => {
        event.preventDefault();

        valoresPredeterminados(card, formDimensiones);
    });
};
