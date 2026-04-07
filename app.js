import fs from 'node:fs/promises';

const API_URL = 'https://thronesapi.com/api/v2/Characters';

// 1.a y 1.d
async function obtenerYPersistirPersonajes() {
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) throw new Error("Fallo en la conexión con la API");
        
        const personajes = await respuesta.json();
        
        await fs.writeFile('personajes.json', JSON.stringify(personajes, null, 2));
        console.log("Punto 1.a y 1.d: Datos recuperados y guardados en personajes.json");
        return personajes;
    } catch (error) {
        console.error("Error en punto 1.a/d:", error.message); 
    }    
}

// 1.b
async function agregarNuevoPersonajeAPI(nuevoPersonaje) {
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoPersonaje)
        });

        console.log("Punto 1.b: Peticion POST enviada con exito");
    } catch (error) {
        console.error("Error en punto 1.b:", error.message);
    }
}

// 1.c
async function buscarPersonajePorId(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);
        const personaje = await respuesta.json();
        console.log(`Punto 1.c: Personaje encontrado (ID ${id}):`, personaje.fullName);
    } catch (error) {
        console.error("Error en punto 1.c:", error.message);
    }
}

// 2.a
async function agregarPersonajeAlFinal(nuevoPersonaje) {
    try {
        const data = await fs.readFile('personajes.json', 'utf-8');
        const personajes = JSON.parse(data);

        personajes.push(nuevoPersonaje);

        await fs.writeFile('personajes.json', JSON.stringify(personajes, null, 2));
        console.log('2.a) Personaje agregado al final:', nuevoPersonaje);
    } catch (error) {
        console.error('Error en 2.a:', error.message);
    }
}

// 2.b
async function agregarPersonajesAlInicio(nuevosPersonajes) {
    try {
        const data = await fs.readFile('personajes.json', 'utf-8');
        const personajes = JSON.parse(data);

        nuevosPersonajes.forEach(p => personajes.unshift(p));

        await fs.writeFile('personajes.json', JSON.stringify(personajes, null, 2));
        console.log('2.b) Personajes agregados al inicio correctamente.', nuevosPersonajes);
    } catch (error) {
        console.error('Error en punto 2.b:', error.message);
    }
}

// 2.c
async function eliminarPrimerPersonaje() {
    try {
        const data = await fs.readFile('personajes.json', 'utf-8');
        const personajes = JSON.parse(data);

        const eliminado = personajes.shift();

        console.log("2.c) Eliminado:", eliminado);

        await fs.writeFile('personajes.json', JSON.stringify(personajes, null, 2));
    } catch (error) {
        console.error("Error en 2.c:", error.message);
    }
}

// 2.d
async function crearArchivoReducido() {
    try {
        const data = await fs.readFile('personajes.json', 'utf-8');
        const personajes = JSON.parse(data);

        const reducido = personajes.map(p => ({
            id: p.id,
            nombre: p.fullName
        }));

        await fs.writeFile('personajes_reducido.json', JSON.stringify(reducido, null, 2));
        console.log("2.d) Archivo reducido creado correctamente");
    } catch (error) {
        console.error("Error en 2.d:", error.message);
    }
}

// 2.e
async function ordenarYMostrar() {
    try {
        const data = await fs.readFile('personajes_reducido.json', 'utf-8');
        const personajes = JSON.parse(data);

        personajes.sort((a, b) => b.nombre.localeCompare(a.nombre));

        console.log("2.e) Ordenados desc:", personajes);
    } catch (error) {
        console.error("Error en 2.e:", error.message);
    }
}

// FUNCIÓN PRINCIPAL (EJECUTA TODO)
async function ejecutarTP() {
    try {
        // 1.a + 1.d
        await obtenerYPersistirPersonajes();

        // 1.b
        const nuevoPersonajeAPI = {
            firstName: "Test",
            lastName: "API",
            fullName: "Test API",
            title: "Prueba POST"
        };
        await agregarNuevoPersonajeAPI(nuevoPersonajeAPI);

        // 1.c
        await buscarPersonajePorId(1);

        // 2.a
        const personajeMaradona = {
            id: 999,
            firstName: "Diego",
            lastName: "Maradona",
            fullName: "Diego Maradona",
            title: "Programador UNER"
        };
        await agregarPersonajeAlFinal(personajeMaradona);

        // 2.b
        const personajesParaInsertar = [
            { 
                id: 101, 
                firstName: "Marcos", 
                lastName: "Galperin", 
                fullName: "Marcos Galperin", 
                title: "Analista de Sistemas" 
            },
            { 
                id: 102, 
                firstName: "Gabriela", 
                lastName: "Sanchéz", 
                fullName: "Gabriela Sanchéz", 
                title: "Programadora"
            }
        ];
        await agregarPersonajesAlInicio(personajesParaInsertar);

        // 2.c
        await eliminarPrimerPersonaje();

        // 2.d
        await crearArchivoReducido();

        // 2.e
        await ordenarYMostrar();

        console.log("TP COMPLETADO CORRECTAMENTE");

    } catch (error) {
        console.error("Error en la ejecución:", error.message);
    }
}

// EJECUCIÓN FINAL
ejecutarTP();