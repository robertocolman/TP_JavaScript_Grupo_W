import fs from 'node:fs/promises';

const API_URL = 'https://thronesapi.com/api/v2/Characters';

//1.a) Taemos todos los personajer de la API mediante GET y d)) Persistimos los datos obtenidos en un archivo personajes.json

async function obtenerYPersistirPersonajes() {
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) throw new Error("Fallo en la conexión con la API");
        
        const personajes = await respuesta.json();
        
        // Guardamos los datos crudos para cumplir con la persistencia inicial 
        await fs.writeFile('personajes.json', JSON.stringify(personajes, null, 2));
        console.log("Punto 1.a y 1.d: Datos recuperados y guardados en personajes.json");
        return personajes;
    } catch (error) {
        console.error("Error en punto 1.a/d:", error.message); 
    }    
}

//1.b) Agregado de un nuevo personaje mediante POST.

async function agregarNuevoPersonajeAPI(nuevoPersonaje) {
    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoPersonaje)
        });
        //await respuesta.json(); // No es necesario procesar la respuesta para este ejercicio ya que no podemos subir datos reales a la API
        console.log("Punto 1.b: Peticion POST enviada con exito");
    } catch (error) {
        console.error("Error en punto 1.b:", error.message);
    }
 }

 //1.c) Buscamos un personaje especifico con el ID (GET).

async function buscarPersonajePorId(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);
        const personaje = await respuesta.json();
        console.log(`Punto 1.c: Personaje encontrado (ID ${id}):`, personaje.fullName);
    } catch (error) {
        console.error("Error en punto 1.c:", error.message);
    }
}

// 2.a) Agregar un personaje al final del archivo personajes.json
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

// Ejecución:

async function ejecutarTP(){
    await obtenerYPersistirPersonajes();
    const personajeMaradona = {
        id: 999,
        firstName: "Diego",
        lastName: "Maradona",
        fullName: "Diego Maradona",
        title: "Programador UNER"
    };
    await agregarPersonajeAlFinal(personajeMaradona);
}

ejecutarTP();
