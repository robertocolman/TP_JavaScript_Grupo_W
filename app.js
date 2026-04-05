import fs from 'node:fs/promises';

async function obtenerPersonajes() {
    try {
        const respuesta = await fetch('https://thronesapi.com/api/v2/Characters');
        const personajes = await respuesta.json();

        await fs.writeFile('personajes.json', JSON.stringify(personajes, null, 2));
        console.log("✅ Datos guardados en personajes.json");
        return personajes;
    } catch (error) {
        console.error("Error al obtener personajes:", error.message);
    }
}

async function manipularPersonajes() {
    try {
        const contenido = await fs.readFile('personajes.json', 'utf-8');
        let lista = JSON.parse(contenido);

        lista.push({ id: 999, fullName: "Nacho Novello", title: "Profesor" });

        lista.unshift(
            { id: 100, fullName: "Alguien 1" },
            { id: 101, fullName: "Alguien 2" }
        );

        const eliminado = lista.shift();
        console.log("🚫 Elemento eliminado:", eliminado);

        const resumido = lista.map(p => ({ id: p.id, nombre: p.fullName }));
        await fs.writeFile('resumen.json', JSON.stringify(resumido, null, 2));

        resumido.sort((a, b) => b.nombre.localeCompare(a.nombre));
        console.log("📉 Lista ordenada decreciente:", resumido);

    } catch (error) {
        console.error("Error manipulando el archivo:", error.message);
    }
}

async function ejecutarTP() {
    await obtenerPersonajes();
    await manipularPersonajes();
}

ejecutarTP();

/**
 * TP JavaScript - Programación III
 * Grupo N°: W
 * Integrantes: Colman, Roberto
 *              Valenzuela, Nahuel    
 */