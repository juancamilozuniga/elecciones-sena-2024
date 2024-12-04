let urlCandidatos = "https://raw.githubusercontent.com/cesarmcuellar/Elecciones/refs/heads/main/candidatos.json";


let votos = {};


async function cargarCandidatos() {
    try {
        
        let respuesta = await fetch(urlCandidatos);
        
        
        
        if (!respuesta.ok) {
            throw new Error("No se pudo cargar la lista de candidatos.");
        }
        
        
        let candidatos = await respuesta.json();

        if (!Array.isArray(candidatos)) {
            throw new Error("La respuesta de la API no es un array.");
        }

        
        candidatos.forEach(candidato => {
            votos[candidato.nombre] = 0; 
        });

        let contenedor = document.getElementById("candidatos");
        contenedor.innerHTML = ''; 

       
        candidatos.forEach(candidato => {
          
            
            let div = document.createElement("div");
            
            div.classList.add("candidato");

            
            const foto = candidato.foto || 'ruta/default.jpg'; 
            
            const nombre = candidato.nombre || 'Nombre no disponible';
            
            
            const programa = candidato.programa || 'Programa no disponible';

            div.innerHTML = `
                <img src="${foto}" alt="Foto de ${nombre}" onclick="votar('${nombre}')">
                <h3>${nombre}</h3>
                <p>${programa}</p>
            `;
            contenedor.appendChild(div);
        });
    } catch (error) {
        
        
        console.error("Error al cargar los candidatos:", error);
        
        
        alert("Hubo un problema al cargar los datos. Inténtalo más tarde.");
    }
}


function votar(nombre) {
let confirmacion = confirm(`¿quiere votar por ${nombre}? `);
    if (confirmacion) {
        if (votos[nombre] !== undefined) {
            
            
            votos[nombre]++; 
           
            
            alert( `voto por ${nombre}. `);
        } else {
            
            
            alert("Hubo un problema al registrar tu voto.");
        }
    }
}


cargarCandidatos();