function mostrarResultado(texto) {
    const contenedor = document.getElementById("resultado_unico");
    contenedor.innerHTML = texto; // limpia y pone el nuevo
}

// Nueva función evaluadora de promedios
function evaluarPromedio(valor) {
    const num = parseFloat(valor);
    if (num < 3) return " (Muy bajo 🔴)";
    if (num >= 3 && num < 6) return " (Medio 🟡)";
    return " (Alto 🟢)";
}

/* Lógica +3.5 corners (sin servidor) */
function analizarCorners() {
    // Obtener valores
    const favor5   = parseFloat(document.getElementById("favor5").value);
    const favor3   = parseFloat(document.getElementById("favor3").value);
    const favorCasa = parseFloat(document.getElementById("favor_casa").value);
    const contra5  = parseFloat(document.getElementById("contra5").value);
    const contra3  = parseFloat(document.getElementById("contra3").value);

    if ([favor5, favor3, favorCasa, contra5, contra3].some(isNaN)) {
        mostrarResultado("<p>❌ Error: completa todos los campos con números.</p>");
        return;
    }

    // Cálculos
    const contraProm5 = (contra5 / 5).toFixed(2);
    const total5 = favor5 + contra5;
    const prom5 = (favor5 / 5).toFixed(2);
    const total3 = favor3 + contra3;
    const prom3 = (favor3 / 3).toFixed(2);
    const promFavorCasa = (favorCasa / 5).toFixed(2);

    const condiciones = [
        prom5 >= 4.6,
        prom3 >= 4.2,
        promFavorCasa >= 4.2,
        total5 >= 38,
        contraProm5 >= 4.2,
        total3 >= 20
    ];

    const nombres = [
        `Promedio corners total (últimos 5 partidos) es de: ${prom5}${evaluarPromedio(prom5)}`,
        `Promedio corners total (últimos 3 partidos) es de: ${prom3}${evaluarPromedio(prom3)}`,
        `Promedio corners a favor como local es de: ${promFavorCasa}${evaluarPromedio(promFavorCasa)}`,
        `Total corners últimos 5 partidos es de: ${total5}`,
        `Promedio corners en contra del visitante (últimos 5) es de: ${contraProm5}${evaluarPromedio(contraProm5)}`,
        `Total corners últimos 3 partidos es de: ${total3}`
    ];

    const cumplidas = condiciones.filter(c => c).length;
    const probabilidad = Math.min(95, 13 + cumplidas * 10);

    let semaforo = "";
    if (probabilidad >= 75) semaforo = "🟢 VERDE – Apuesta recomendada";
    else if (probabilidad >= 55) semaforo = "🟠 NARANJA – Apuesta con precaución";
    else semaforo = "🔴 ROJO – Apuesta no recomendada";

    let html = `<h3>+3.5 Corners</h3>
                <p>Probabilidad estimada: <strong>${probabilidad}%</strong></p>
                <p>${semaforo}</p>
                <ul>`;
    condiciones.forEach((ok, i) => {
        html += `<li>${ok ? '✅' : '❌'} ${nombres[i]}</li>`;
    });
    html += `</ul>`;
    html += `<p style="font-size:0.9rem; color:#555; margin-top:10px; background:#fff3cd; padding:10px; border-radius:6px; border:1px solid #ffeeba;">
💡 <strong>Recuerda:</strong> Las estadísticas nos guían, pero el fútbol siempre guarda sorpresas.  
Juega con responsabilidad, disfruta del deporte y nunca apuestes más de lo que estés dispuesto a perder.  
Aquí no hay culpables, solo pasión por el juego. ⚽❤️
</p>`;

    mostrarResultado(html);
}
