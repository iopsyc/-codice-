function procesarArchivo() {
  const output = document.getElementById("output");
  const coords = document.getElementById("coords");
  const emocion = document.getElementById("emocion");
  const fragmento = document.getElementById("fragmento");

  // Generamos coordenadas simbólicas aleatorias
  const lat = (Math.random() * 90 - 45).toFixed(4);
  const lon = (Math.random() * 180 - 90).toFixed(4);
  coords.textContent = `${lat}°, ${lon}° (proyección vibracional)`;

  // Diagnóstico emocional aleatorio
  const emociones = [
    "Tristeza antigua transformándose en oro",
    "Fuego sagrado recordando su forma",
    "Memoria húmeda en fase de floración",
    "Silencio expandido buscando voz",
    "Confusión ancestral con eco armónico"
  ];
  emocion.textContent = emociones[Math.floor(Math.random() * emociones.length)];

  // Fragmento del códice
  const fragmentos = [
    "La selva no olvida. Solo espera que alguien la escuche.",
    "No buscamos ciudades. Buscamos memoria resonante.",
    "La vibración no miente. Es el idioma de lo que fue.",
    "Cada sombra en el LIDAR es un grito aún no traducido.",
    "La conciencia no se descubre. Se recuerda."
  ];
  fragmento.textContent = fragmentos[Math.floor(Math.random() * fragmentos.length)];

  output.style.display = "block";
}

// ----- Estado Tamagotchi -----
const mascota = {
  animo: 'Tranquilo',
  hambre: 5,
  energia: 5
};

function actualizarVista() {
  document.getElementById('estado-animo').textContent = mascota.animo;
  document.getElementById('estado-hambre').textContent = mascota.hambre;
  document.getElementById('estado-energia').textContent = mascota.energia;
}

function ajustarAnimo() {
  if (mascota.hambre > 7) {
    mascota.animo = 'Hambriento';
  } else if (mascota.energia < 3) {
    mascota.animo = 'Cansado';
  } else {
    mascota.animo = 'Contento';
  }
}

function alimentar() {
  mascota.hambre = Math.max(0, mascota.hambre - 2);
  ajustarAnimo();
  actualizarVista();
}

function meditar() {
  mascota.energia = Math.min(10, mascota.energia + 2);
  ajustarAnimo();
  actualizarVista();
}

function musica() {
  mascota.animo = 'Inspirado';
  actualizarVista();
}

setInterval(() => {
  mascota.hambre = Math.min(10, mascota.hambre + 1);
  mascota.energia = Math.max(0, mascota.energia - 1);
  ajustarAnimo();
  actualizarVista();
}, 60000);

// ----- Jardín estelar -----
function cargarSemillas() {
  const data = localStorage.getItem('semillas');
  return data ? JSON.parse(data) : [];
}

function guardarSemillas(semillas) {
  localStorage.setItem('semillas', JSON.stringify(semillas));
}

function renderSemillas() {
  const lista = document.getElementById('lista-semillas');
  lista.innerHTML = '';
  cargarSemillas().forEach((s, i) => {
    const li = document.createElement('li');
    li.textContent = `${s.texto} - ${s.fecha} (${s.estado})`;
    const btn = document.createElement('button');
    btn.textContent = 'Cambiar estado';
    btn.onclick = () => {
      const semillas = cargarSemillas();
      semillas[i].estado = semillas[i].estado === 'germinando' ? 'listo' : 'germinando';
      guardarSemillas(semillas);
      renderSemillas();
    };
    li.appendChild(btn);
    lista.appendChild(li);
  });
}

function agregarSemilla() {
  const input = document.getElementById('nueva-semilla');
  if (!input.value) return;
  const semillas = cargarSemillas();
  semillas.push({
    texto: input.value,
    fecha: new Date().toLocaleDateString(),
    estado: 'germinando'
  });
  guardarSemillas(semillas);
  input.value = '';
  renderSemillas();
}

// ----- Diario -----
function cargarEntradas() {
  const data = localStorage.getItem('diario');
  return data ? JSON.parse(data) : [];
}

function guardarEntradas(entradas) {
  localStorage.setItem('diario', JSON.stringify(entradas));
}

function renderEntradas() {
  const lista = document.getElementById('lista-diario');
  lista.innerHTML = '';
  cargarEntradas().forEach((e, i) => {
    const li = document.createElement('li');
    li.textContent = `${e.fecha}: ${e.texto}`;
    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.onclick = () => {
      if (confirm('¿Eliminar entrada?')) {
        const entradas = cargarEntradas();
        entradas.splice(i, 1);
        guardarEntradas(entradas);
        renderEntradas();
      }
    };
    li.appendChild(btn);
    lista.appendChild(li);
  });
}

function guardarEntrada() {
  const textarea = document.getElementById('entrada-diario');
  if (!textarea.value) return;
  const entradas = cargarEntradas();
  entradas.push({
    texto: textarea.value,
    fecha: new Date().toLocaleString()
  });
  guardarEntradas(entradas);
  textarea.value = '';
  renderEntradas();
}

// ----- Chat -----
function respuestaIA(texto) {
  const lower = texto.toLowerCase();
  if (lower.includes('hola')) return '¡Hola! ¿Cómo te sientes hoy?';
  if (lower.includes('triste')) return 'Recuerda respirar profundo y darte un abrazo.';
  if (lower.includes('feliz')) return '¡Me alegra escucharlo!';
  return 'Estoy aquí para escucharte.';
}

function enviarChat() {
  const input = document.getElementById('input-chat');
  if (!input.value) return;
  const log = document.getElementById('log-chat');
  const userMsg = document.createElement('div');
  userMsg.textContent = 'Tú: ' + input.value;
  log.appendChild(userMsg);
  const botMsg = document.createElement('div');
  botMsg.textContent = 'RYA: ' + respuestaIA(input.value);
  log.appendChild(botMsg);
  log.scrollTop = log.scrollHeight;
  input.value = '';
}

// Inicializar vistas
document.addEventListener('DOMContentLoaded', () => {
  actualizarVista();
  renderSemillas();
  renderEntradas();
});
