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

function analizarMas2_5Goles() {
  // Obtener valores de los campos de entrada
  const goles_local_ultimos_10 = parseFloat(document.getElementById("goles_local_ultimos_10mas2.5").value);
  const goles_local_casa_ultimos_5 = parseFloat(document.getElementById("goles_local_casa_ultimos_5mas2.5").value);
  const goles_local_total_ultimos_3 = parseFloat(document.getElementById("goles_local_total_ultimos_3mas2.5").value);
  const goles_h2h_ultimos_3 = parseFloat(document.getElementById("goles_h2h_ultimos_3mas2.5").value);
  const goles_visitante_ultimos_10 = parseFloat(document.getElementById("goles_visitante_ultimos_10mas2.5").value);
  const goles_visitante_fuera_ultimos_5 = parseFloat(document.getElementById("goles_visitante_fuera_ultimos_5mas2.5").value);
  const goles_visitante_total_ultimos_3 = parseFloat(document.getElementById("goles_visitante_total_ultimos_3mas2.5").value);

  // Validación de datos
  if (
    isNaN(goles_local_ultimos_10) ||
    isNaN(goles_local_casa_ultimos_5) ||
    isNaN(goles_local_total_ultimos_3) ||
    isNaN(goles_h2h_ultimos_3) ||
    isNaN(goles_visitante_ultimos_10) ||
    isNaN(goles_visitante_fuera_ultimos_5) ||
    isNaN(goles_visitante_total_ultimos_3)
  ) {
    mostrarResultado("<p>❌ Error: completa todos los campos con números.</p>");
    return;
  }

  // Cálculos de promedios de goles
 const promedio_goles_local_10 = (goles_local_ultimos_10 / 10).toFixed(2);
const promedio_goles_local_casa_5 = (goles_local_casa_ultimos_5 / 5).toFixed(2);
const promedio_goles_local_total_3 = (goles_local_total_ultimos_3 / 3).toFixed(2);
const promedio_goles_h2h_3 = (goles_h2h_ultimos_3 / 3).toFixed(2);
const promedio_goles_visitante_10 = (goles_visitante_ultimos_10 / 10).toFixed(2);
const promedio_goles_visitante_fuera_5 = (goles_visitante_fuera_ultimos_5 / 5).toFixed(2);
const promedio_goles_visitante_total_3 = (goles_visitante_total_ultimos_3 / 3).toFixed(2);


  // Condiciones de alto nivel de exigencia
  const condiciones = [
    promedio_goles_local_10 >= 1.8, // Promedio de goles del local en últimos 10 partidos ≥ 1.8
    promedio_goles_local_casa_5 >= 1.8, // Promedio de goles del local en últimos 5 partidos en casa ≥ 1.8
    promedio_goles_local_total_3 >= 3, // Promedio de goles del local en últimos 3 partidos ≥ 1.8
    promedio_goles_h2h_3 >= 3, // Promedio de goles en últimos 3 enfrentamientos directos ≥ 3
    promedio_goles_visitante_10 >= 1.8, // Promedio de goles del visitante en últimos 10 partidos ≥ 1.8
    promedio_goles_visitante_fuera_5 >= 1.8, // Promedio de goles del visitante en últimos 5 partidos fuera de casa ≥ 1.8
    promedio_goles_visitante_total_3 >= 3, // Promedio de goles del visitante en últimos 3 partidos ≥ 3
  ];

  const nombres = [
      `Promedio de goles del local en últimos 10 partidos es de: ${promedio_goles_local_10}${evaluarPromedio(promedio_goles_local_10)}`,
      `Promedio de goles del local en últimos 5 partidos en casa es de: ${promedio_goles_local_casa_5}${evaluarPromedio(promedio_goles_local_casa_5)}`,
      `Promedio de goles del local en últimos 3 partidos es de: ${promedio_goles_local_total_3}${evaluarPromedio(promedio_goles_local_total_3)}`,
      `Promedio de goles en últimos 3 enfrentamientos directos es de: ${promedio_goles_h2h_3}${evaluarPromedio(promedio_goles_h2h_3)}`,
      `Promedio de goles del visitante en últimos 10 partidos es de: ${promedio_goles_visitante_10}${evaluarPromedio(promedio_goles_visitante_10)}`,
      `Promedio de goles del visitante en últimos 5 partidos fuera de casa es de: ${promedio_goles_visitante_fuera_5}${evaluarPromedio(promedio_goles_visitante_fuera_5)}`,
      `Promedio de goles del visitante en últimos 3 partidos es de: ${promedio_goles_visitante_total_3}${evaluarPromedio(promedio_goles_visitante_total_3)}`,
  ];


  const cumplidas = condiciones.filter(c => c).length;
  const probabilidad = Math.min(93, 13 + cumplidas * 15);

  let semaforo = "";
  if (probabilidad >= 85) semaforo = "🟢 VERDE – Apuesta recomendada";
  else if (probabilidad >= 65) semaforo = "🟠 NARANJA – Apuesta con precaución";
  else semaforo = "🔴 ROJO – Apuesta no recomendada";

  let html = `<h3>Análisis de Más de 2.5 Goles</h3>
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