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

function validarOver85Corners() {
  // Obtener valores
  const favor_ultimos_10_partidos = parseFloat(document.getElementById("favor_ultimos_10_partidos").value);
  const contra_ultimos_10_partidos = parseFloat(document.getElementById("contra_ultimos_10_partidos").value);
  const favor_ultimos_5_casa_partidos = parseFloat(document.getElementById("favor_ultimos_5_casa_partidos").value);
  const favor_ultimos_3_partidos = parseFloat(document.getElementById("favor_ultimos_3_partidos").value);
  const contra_visitante_ultimos_10_partidos = parseFloat(document.getElementById("contra_visitante_ultimos_10_partidos").value);
  const contra_visitante_ultimos_5_partidos = parseFloat(document.getElementById("contra_visitante_ultimos_5_partidos").value);
  const contra_visitante_ultimos_3_partidos = parseFloat(document.getElementById("contra_visitante_ultimos_3_partidos").value);

  // Validación de datos
  if ([favor_ultimos_10_partidos, contra_ultimos_10_partidos, favor_ultimos_5_casa_partidos, favor_ultimos_3_partidos, contra_visitante_ultimos_10_partidos, contra_visitante_ultimos_5_partidos, contra_visitante_ultimos_3_partidos].some(isNaN)) {
    mostrarResultado("<p>❌ Error: completa todos los campos con números.</p>");
    return;
  }

  // Cálculos
  const total_10 = favor_ultimos_10_partidos + contra_visitante_ultimos_10_partidos;
const promedio_10 = (total_10 / 10).toFixed(2);
const contra_visitante_prom_ultimos_10 = (contra_visitante_ultimos_10_partidos / 10).toFixed(2);

const total_5 = favor_ultimos_5_casa_partidos + contra_visitante_ultimos_5_partidos;
const promedio_5 = (total_5 / 5).toFixed(2);

const total_3 = favor_ultimos_3_partidos + contra_visitante_ultimos_3_partidos;
const promedio_3 = (total_3 / 3).toFixed(2);

const favor_prom_casa = (favor_ultimos_5_casa_partidos / 5).toFixed(2);


  // Condiciones para +8.5 corners
  const condiciones = [
    promedio_10 >= 11.5, // Ajustado para +8.5
    favor_ultimos_10_partidos >= 50, // Ajustado para +8.5
    contra_ultimos_10_partidos >= 50, // Ajustado para +8.5
    contra_visitante_prom_ultimos_10 >= 5.5, // Ajustado para +8.5
    promedio_5 >= 11, // Ajustado para +8.5
    promedio_3 >= 11.5, // Ajustado para +8.5
    favor_prom_casa >= 5.5 // Ajustado para +8.5
  ];

const nombres = [
    `Promedio corners total (últimos 10 partidos) es de: ${promedio_10}${evaluarPromedio(promedio_10)}`,
    `Corners a favor del local últimos 10 partidos es de: ${favor_ultimos_10_partidos}${evaluarPromedio(favor_ultimos_10_partidos)}`,
    `Corners en contra del local últimos 10 partidos es de: ${contra_ultimos_10_partidos}${evaluarPromedio(contra_ultimos_10_partidos)}`,
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

  let html = `<h3>+8.5 Corners</h3>
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
