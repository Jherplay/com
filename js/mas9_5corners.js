function mostrarResultado(texto) {
    const contenedor = document.getElementById("resultado_unico");
    contenedor.innerHTML = texto; // limpia y pone el nuevo
}

// Función para evaluar si el promedio es muy bajo, medio o alto
function evaluarPromedio(valor) {
    const num = parseFloat(valor);
    if (num < 1) return " (Muy bajo 🔴)";
    if (num >= 1 && num < 2) return " (Medio 🟡)";
    return " (Alto 🟢)";
}

/* Lógica +9.5 corners (sin servidor) */
function validarOver95Corners() {
  // Obtener valores
  const favor_ultimos_10 = parseFloat(document.getElementById("favor_ultimos_10").value);
  const contra_ultimos_10 = parseFloat(document.getElementById("contra_ultimos_10").value);
  const favor_ultimos_5_casa = parseFloat(document.getElementById("favor_ultimos_5_casa").value);
  const favor_ultimos_3 = parseFloat(document.getElementById("favor_ultimos_3").value);
  const contra_visitante_ultimos_10 = parseFloat(document.getElementById("contra_visitante_ultimos_10").value);
  const contra_visitante_ultimos_5 = parseFloat(document.getElementById("contra_visitante_ultimos_5").value);
  const contra_visitante_ultimos_3 = parseFloat(document.getElementById("contra_visitante_ultimos_3").value);

  // Validación de datos
  if ([favor_ultimos_10, contra_ultimos_10, favor_ultimos_5_casa, favor_ultimos_3, contra_visitante_ultimos_10, contra_visitante_ultimos_5, contra_visitante_ultimos_3].some(isNaN)) {
    mostrarResultado("<p>❌ Error: completa todos los campos con números.</p>");
    return;
  }

  //// Cálculos
const total_10 = favor_ultimos_10 + contra_visitante_ultimos_10;
const promedio_10 = (total_10 / 10).toFixed(2);
const contra_visitante_prom_ultimos_10 = (contra_visitante_ultimos_10 / 10).toFixed(2);

const total_5 = favor_ultimos_5_casa + contra_visitante_ultimos_5;
const promedio_5 = (total_5 / 5).toFixed(2);

const total_3 = favor_ultimos_3 + contra_visitante_ultimos_3;
const promedio_3 = (total_3 / 3).toFixed(2);

const favor_prom_casa = (favor_ultimos_5_casa / 5).toFixed(2);


  // Condiciones
  const condiciones = [
    promedio_10 >= 13,
    favor_ultimos_10 >= 60,
    contra_ultimos_10 >= 60,
    contra_visitante_prom_ultimos_10 >= 6.5,
    promedio_5 >= 12.5,
    promedio_3 >= 13,
    favor_prom_casa >= 6.5
  ];

const nombres = [
    `Promedio corners total (últimos 10 partidos) es de: ${promedio_10}${evaluarPromedio(promedio_10)}`,
    `Corners a favor del local últimos 10 partidos es de: ${favor_ultimos_10}${evaluarPromedio(favor_ultimos_10)}`,
    `Corners en contra del local últimos 10 partidos es de: ${contra_ultimos_10}${evaluarPromedio(contra_ultimos_10)}`,
    `Promedio corners en contra del visitante (últimos 10 partidos) es de: ${contra_visitante_prom_ultimos_10}${evaluarPromedio(contra_visitante_prom_ultimos_10)}`,
    `Promedio total corners (últimos 5 partidos) es de: ${promedio_5}${evaluarPromedio(promedio_5)}`,
    `Promedio total corners (últimos 3 partidos) es de: ${promedio_3}${evaluarPromedio(promedio_3)}`,
    `Promedio corners a favor del local en casa (últimos 5 partidos) es de: ${favor_prom_casa}${evaluarPromedio(favor_prom_casa)}`,
];


  const cumplidas = condiciones.filter(c => c).length;
  const probabilidad = Math.min(100, 20 + cumplidas * 15);

  let semaforo = "";
  if (probabilidad >= 85) semaforo = "🟢 VERDE – Apuesta recomendada";
  else if (probabilidad >= 65) semaforo = "🟠 NARANJA – Apuesta con precaución";
  else semaforo = "🔴 ROJO – Apuesta no recomendada";

  let html = `<h3>+9.5 Corners</h3>
              <p>Probabilidad estimada: <strong>${probabilidad}%</strong></p>
              <p>${semaforo}</p>
              <ul>`;
  condiciones.forEach((ok, i) => html += `<li>${ok ? '✅' : '❌'} ${nombres[i]}</li>`);
  html += `</ul>`;
  html += `<p style="font-size:0.9rem; color:#555; margin-top:10px; background:#fff3cd; padding:10px; border-radius:6px; border:1px solid #ffeeba;">
💡 <strong>Recuerda:</strong> Las estadísticas nos guían, pero el fútbol siempre guarda sorpresas.  
Juega con responsabilidad, disfruta del deporte y nunca apuestes más de lo que estés dispuesto a perder.  
Aquí no hay culpables, solo pasión por el juego. ⚽❤️
</p>`;

  mostrarResultado(html);
}