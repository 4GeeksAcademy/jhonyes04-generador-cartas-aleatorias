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

const cartasGeneradas = [];

const TIEMPO = 2;
let tiempoRestante = TIEMPO;

const ANCHURA_PREDETERMINADA = '350';
const ALTURA_PREDETERMINADA = '500';

const NUMERO_CARTAS = 8;

const obtenerDatosCarta = () => {
    const numero = Math.floor(Math.random() * numerosCartas.length);
    const palo = Math.floor(Math.floor(Math.random() * palosCartas.length));

    return {
        numero: numerosCartas[numero],
        palo: palosCartas[palo],
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
        const palos = {
            heart: '♥',
            diamond: '♦',
            spade: '♠',
            club: '♣',
        };

        const columna = document.createElement('div');
        columna.className = 'col';

        columna.innerHTML = `
            <div class="card h-100 text-center border-secondary ${color}">
                <div class="card-body p-1">
                    <div class="fw-bold">${carta.numero} - ${palos[carta.palo]}</div>
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

    if (cartasGeneradas.length > NUMERO_CARTAS) {
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
    const btnRestablecerValores = document.getElementById(
        'restablecer-valores',
    );

    const numeroCartas = document.getElementById('numero-cartas');
    numeroCartas.textContent = `Últimas ${NUMERO_CARTAS} cartas`;

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
