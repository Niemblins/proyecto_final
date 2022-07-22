class Personaje {
    constructor(name, image, homeworld, gender) {
        this.name = name;
        this.image = image;
        this.homeworld = homeworld;
        this.gender = gender;
    }

    obtenerNombre() {
        return this.name;
    }
    obtenerFoto() {
        return this.image;
    }
    obtenerOrigen() {
        return this.homeworld;
    }
    obtenerGenero(){
        return this.gender;
    }
}

let personajes = [];
let elemento = document.getElementById("personajes-wrapper");

async function getPersonajes() {
    let url = "https://akabab.github.io/starwars-api/api/all.json";

    const response = await fetch(url);
    const data = await response.json();

    data.forEach(datum => {
        let nuevoPersonaje = new Personaje(datum.name, datum.image, datum.homeworld, datum.gender)
        personajes.push(nuevoPersonaje);
    });

    personajes.forEach((personaje) => {

        elemento.innerHTML += `
        <div class="card " style="width: 18rem;">
  <img src="${personaje.obtenerFoto()}" class="card-img-top h-50" alt="...">
  <div class="card-body">
    <h5 class="card-title" class="tpersonaje">${personaje.obtenerNombre()}</h5>
    <p class="card-text">Origen ${personaje.obtenerOrigen()} Genero ${personaje.obtenerGenero()} </p>
    <a href="#" class="btn btn-primary">Mas información</a>
  </div>
</div>
        `
    })
}

function reiniciarData() {
    personajes.length = 0;
    elemento.innerHTML = null;
    getPersonajes();
}

function llamarBusqueda() {
    console.log('llamarBusqueda')
    const consulta = document.getElementById("buscador").value;
    const personajesFiltrados = personajes.filter(personaje => personaje.name === consulta)

    if (personajesFiltrados.length > 0) {
        personajesFiltrados.forEach((personajeFiltrado) => {
            elemento.innerHTML = `
          <div class="card " style="width: 18rem;">
  <img src="${personajeFiltrado.obtenerFoto()}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title" class="tpersonaje">${personajeFiltrado.obtenerNombre()}</h5>
    <p class="card-text">Origen ${personajeFiltrado.obtenerOrigen()} Genero: ${personajeFiltrado.obtenerGenero()}</p>
    <a href="#" class="btn btn-primary">Mas información</a>
  </div>
</div>
        `
        })

    }

    // console.log(consulta);

}

getPersonajes();