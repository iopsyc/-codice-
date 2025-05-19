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

