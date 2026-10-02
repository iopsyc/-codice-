// ===================== Escáner =====================
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
  output.classList.remove("aparecer");
  void output.offsetWidth;
  output.classList.add("aparecer");
}

// ===================== Estado Tamagotchi =====================
const CLAVE_MASCOTA = 'rya-mascota';
const VALOR_ANIMO = { Hambriento: 2, Cansado: 3, Tranquilo: 6, Contento: 8, Inspirado: 10 };
const ICONO_ANIMO = { Hambriento: '🍽', Cansado: '☾', Tranquilo: '✦', Contento: '♡', Inspirado: '✺' };
const BURBUJA_ANIMO = { Hambriento: '🍎?', Cansado: 'z z z', Tranquilo: '', Contento: '♡', Inspirado: '✦' };

const mascota = {
  animo: 'Tranquilo',
  hambre: 5,
  energia: 5
};

function limitar(n) {
  return Math.max(0, Math.min(10, Math.round(Number(n) || 0)));
}

function guardarMascota() {
  try {
    localStorage.setItem(CLAVE_MASCOTA, JSON.stringify({ ...mascota, t: Date.now() }));
  } catch (e) { /* almacenamiento no disponible */ }
}

function cargarMascota() {
  let data = null;
  try { data = JSON.parse(localStorage.getItem(CLAVE_MASCOTA)); } catch (e) { data = null; }
  if (!data) return;
  mascota.animo = VALOR_ANIMO[data.animo] !== undefined ? data.animo : 'Tranquilo';
  mascota.hambre = limitar(data.hambre);
  mascota.energia = limitar(data.energia);
  // El tiempo pasa aunque la página esté cerrada: 1 punto por minuto
  const minutos = Math.floor((Date.now() - (data.t || Date.now())) / 60000);
  if (minutos > 0) {
    mascota.hambre = limitar(mascota.hambre + minutos);
    mascota.energia = limitar(mascota.energia - minutos);
    ajustarAnimo();
  }
}

function actualizarVista() {
  document.getElementById('estado-animo').textContent = mascota.animo;
  document.getElementById('estado-hambre').textContent = mascota.hambre;
  document.getElementById('estado-energia').textContent = mascota.energia;

  const valorAnimo = VALOR_ANIMO[mascota.animo] ?? 6;
  document.getElementById('valor-animo').textContent = valorAnimo;
  document.getElementById('icono-animo').textContent = ICONO_ANIMO[mascota.animo] || '✦';
  document.getElementById('barra-animo').style.setProperty('--nivel', valorAnimo / 10);
  document.getElementById('barra-hambre').style.setProperty('--nivel', mascota.hambre / 10);
  document.getElementById('barra-energia').style.setProperty('--nivel', mascota.energia / 10);

  const dispositivo = document.getElementById('dispositivo');
  if (dispositivo) {
    dispositivo.dataset.animo = mascota.animo;
    dispositivo.classList.toggle('alerta-hambre', mascota.hambre > 7);
    dispositivo.classList.toggle('alerta-energia', mascota.energia < 3);
  }
  const burbuja = document.getElementById('burbuja');
  if (burbuja) {
    const texto = BURBUJA_ANIMO[mascota.animo] || '';
    burbuja.textContent = texto;
    burbuja.classList.toggle('visible', texto !== '');
  }
  guardarMascota();
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
  reaccionar('comer', '¡Ñam! Hambre −2', ['🍎', '✨', '🍎', '✨', '♡']);
}

function meditar() {
  mascota.energia = Math.min(10, mascota.energia + 2);
  ajustarAnimo();
  actualizarVista();
  reaccionar('meditar', 'Respira… Energía +2', []);
}

function musica() {
  mascota.animo = 'Inspirado';
  actualizarVista();
  reaccionar('musica', '♪ Inspiración dorada', ['♪', '♫', '♬', '♪', '♫', '♩']);
}

setInterval(() => {
  mascota.hambre = Math.min(10, mascota.hambre + 1);
  mascota.energia = Math.max(0, mascota.energia - 1);
  ajustarAnimo();
  actualizarVista();
}, 60000);

// ----- Reacciones en pantalla -----
let temporizadorAviso = null;
let temporizadorReaccion = null;

function mostrarAviso(texto) {
  const aviso = document.getElementById('aviso');
  if (!aviso) return;
  aviso.textContent = texto;
  aviso.classList.remove('visible');
  void aviso.offsetWidth;
  aviso.classList.add('visible');
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(() => aviso.classList.remove('visible'), 1900);
}

function reaccionar(tipo, texto, particulas) {
  const dispositivo = document.getElementById('dispositivo');
  const efectos = document.getElementById('efectos');
  if (!dispositivo || !efectos) return;

  mostrarAviso(texto);

  dispositivo.classList.remove('reaccion-comer', 'reaccion-meditar', 'reaccion-musica');
  void dispositivo.offsetWidth;
  dispositivo.classList.add('reaccion-' + tipo);
  clearTimeout(temporizadorReaccion);
  temporizadorReaccion = setTimeout(() => {
    dispositivo.classList.remove('reaccion-' + tipo);
  }, 1600);

  if (tipo === 'meditar') {
    for (let i = 0; i < 3; i++) {
      const anillo = document.createElement('span');
      anillo.className = 'anillo';
      anillo.style.animationDelay = (i * 0.32) + 's';
      efectos.appendChild(anillo);
      setTimeout(() => anillo.remove(), 2200 + i * 320);
    }
  }

  particulas.forEach((simbolo, i) => {
    const p = document.createElement('span');
    p.className = 'particula particula-' + tipo;
    p.textContent = simbolo;
    p.style.left = (30 + Math.random() * 40) + '%';
    p.style.setProperty('--deriva', (Math.random() * 60 - 30).toFixed(0) + 'px');
    p.style.animationDelay = (i * 0.12) + 's';
    efectos.appendChild(p);
    setTimeout(() => p.remove(), 2000 + i * 120);
  });

  if (navigator.vibrate) {
    try { navigator.vibrate(12); } catch (e) { /* sin vibración */ }
  }
}

function actualizarHora() {
  const hora = document.getElementById('hora');
  if (!hora) return;
  const ahora = new Date();
  hora.textContent = ahora.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
}

// ===================== Jardín estelar =====================
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
  const semillas = cargarSemillas();
  if (!semillas.length) {
    lista.appendChild(itemVacio('Aún no hay semillas. Siembra tu primera intención.'));
    return;
  }
  semillas.forEach((s, i) => {
    const li = document.createElement('li');
    li.className = 'item';
    const cuerpo = document.createElement('div');
    cuerpo.className = 'item-cuerpo';
    const texto = document.createElement('span');
    texto.className = 'item-texto';
    texto.textContent = s.texto;
    const meta = document.createElement('span');
    meta.className = 'item-meta';
    meta.textContent = s.fecha;
    const estado = document.createElement('span');
    estado.className = 'etiqueta-estado ' + (s.estado === 'listo' ? 'listo' : 'germinando');
    estado.textContent = s.estado === 'listo' ? '✦ listo' : '🌱 germinando';
    meta.appendChild(estado);
    cuerpo.append(texto, meta);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'boton-sutil';
    btn.textContent = 'Cambiar estado';
    btn.onclick = () => {
      const semillas = cargarSemillas();
      semillas[i].estado = semillas[i].estado === 'germinando' ? 'listo' : 'germinando';
      guardarSemillas(semillas);
      renderSemillas();
    };
    li.append(cuerpo, btn);
    lista.appendChild(li);
  });
}

function agregarSemilla() {
  const input = document.getElementById('nueva-semilla');
  if (!input.value.trim()) return;
  const semillas = cargarSemillas();
  semillas.push({
    texto: input.value.trim(),
    fecha: new Date().toLocaleDateString(),
    estado: 'germinando'
  });
  guardarSemillas(semillas);
  input.value = '';
  renderSemillas();
}

// ===================== Diario =====================
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
  const entradas = cargarEntradas();
  if (!entradas.length) {
    lista.appendChild(itemVacio('Tu diario está esperando la primera reflexión.'));
    return;
  }
  entradas.forEach((e, i) => {
    const li = document.createElement('li');
    li.className = 'item';
    const cuerpo = document.createElement('div');
    cuerpo.className = 'item-cuerpo';
    const meta = document.createElement('span');
    meta.className = 'item-meta';
    meta.textContent = e.fecha;
    const texto = document.createElement('span');
    texto.className = 'item-texto';
    texto.textContent = e.texto;
    cuerpo.append(meta, texto);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'boton-sutil';
    btn.textContent = 'Eliminar';
    btn.onclick = () => {
      if (confirm('¿Eliminar entrada?')) {
        const entradas = cargarEntradas();
        entradas.splice(i, 1);
        guardarEntradas(entradas);
        renderEntradas();
      }
    };
    li.append(cuerpo, btn);
    lista.appendChild(li);
  });
}

function guardarEntrada() {
  const textarea = document.getElementById('entrada-diario');
  if (!textarea.value.trim()) return;
  const entradas = cargarEntradas();
  entradas.push({
    texto: textarea.value.trim(),
    fecha: new Date().toLocaleString()
  });
  guardarEntradas(entradas);
  textarea.value = '';
  renderEntradas();
}

function itemVacio(texto) {
  const li = document.createElement('li');
  li.className = 'item-vacio';
  li.textContent = texto;
  return li;
}

// ===================== Chat =====================
function respuestaIA(texto) {
  const lower = texto.toLowerCase();
  if (lower.includes('hola')) return '¡Hola! ¿Cómo te sientes hoy?';
  if (lower.includes('triste')) return 'Recuerda respirar profundo y darte un abrazo.';
  if (lower.includes('feliz')) return '¡Me alegra escucharlo!';
  return 'Estoy aquí para escucharte.';
}

function mensajeChat(autor, texto, clase) {
  const div = document.createElement('div');
  div.className = 'mensaje ' + clase;
  const quien = document.createElement('span');
  quien.className = 'mensaje-autor';
  quien.textContent = autor;
  const cuerpo = document.createElement('span');
  cuerpo.textContent = texto;
  div.append(quien, cuerpo);
  return div;
}

function enviarChat() {
  const input = document.getElementById('input-chat');
  if (!input.value.trim()) return;
  const log = document.getElementById('log-chat');
  log.appendChild(mensajeChat('Tú', input.value.trim(), 'mensaje-tu'));
  log.appendChild(mensajeChat('RYA', respuestaIA(input.value), 'mensaje-rya'));
  log.scrollTop = log.scrollHeight;
  input.value = '';
}

// ===================== Pestañas =====================
function activarPestana(tab, enfocar) {
  const tabs = document.querySelectorAll('.pestana');
  tabs.forEach((t) => {
    const activa = t === tab;
    t.setAttribute('aria-selected', String(activa));
    t.tabIndex = activa ? 0 : -1;
    const panel = document.getElementById(t.getAttribute('aria-controls'));
    if (panel) panel.hidden = !activa;
  });
  if (enfocar) tab.focus();
}

function iniciarPestanas() {
  const tabs = Array.from(document.querySelectorAll('.pestana'));
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activarPestana(tab, false));
    tab.addEventListener('keydown', (e) => {
      let destino = null;
      if (e.key === 'ArrowRight') destino = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') destino = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') destino = tabs[0];
      if (e.key === 'End') destino = tabs[tabs.length - 1];
      if (destino) { e.preventDefault(); activarPestana(destino, true); }
    });
  });
}

// ===================== Inicializar =====================
const ACCIONES = { procesarArchivo, alimentar, meditar, musica, agregarSemilla, guardarEntrada, enviarChat };

document.addEventListener('DOMContentLoaded', () => {
  cargarMascota();
  actualizarVista();
  renderSemillas();
  renderEntradas();
  actualizarHora();
  setInterval(actualizarHora, 15000);
  iniciarPestanas();

  document.querySelectorAll('[data-accion]').forEach((el) => {
    const fn = ACCIONES[el.dataset.accion];
    if (fn) el.addEventListener('click', fn);
  });

  const enter = (id, fn) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); fn(); } });
  };
  enter('nueva-semilla', agregarSemilla);
  enter('input-chat', enviarChat);

  const archivo = document.getElementById('inputFile');
  const nombre = document.getElementById('nombre-archivo');
  if (archivo && nombre) {
    archivo.addEventListener('change', () => {
      nombre.textContent = archivo.files.length ? archivo.files[0].name : 'Ningún archivo seleccionado';
    });
  }
});
