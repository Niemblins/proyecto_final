class Personaje {
  constructor(name, image, homeworld, gender, cybernetics, affiliations) {
    this.name = name;
    this.image = image;
    this.homeworld = homeworld;
    this.gender = gender;
    this.cybernetics = cybernetics;
    this.affiliations = affiliations;
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
  obtenerGenero() {
    return this.gender;
  }
  obtenerCiber() {
    return this.cybernetics;
  }
  obtenerAlianzas() {
    return this, affiliations;
  }
}

let personajes = [];
let elemento = document.getElementById("personajes-wrapper");

async function getPersonajes() {
  let url = "https://akabab.github.io/starwars-api/api/all.json";

  const response = await fetch(url);
  const data = await response.json();

  data.forEach(datum => {
    let nuevoPersonaje = new Personaje(datum.name, datum.image, datum.homeworld, datum.gender, datum.affiliations)
    personajes.push(nuevoPersonaje);
  });

  personajes.forEach((personaje) => {

    elemento.innerHTML += `
            <div class="card " style="width: 18rem;">
                <img src="${personaje.obtenerFoto()}" class="card-img-top h-50" alt="...">
                <div class="card-body">
                    <h5 class="card-title" class="tpersonaje">${personaje.obtenerNombre()}</h5>
                    <p class="card-text">Origen ${personaje.obtenerOrigen()} Genero ${personaje.obtenerGenero()}
                    </p>
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
  <div class="card-body h-50" >
    <h5 class="card-title" class="tpersonaje">${personajeFiltrado.obtenerNombre()}</h5>
    <p class="card-text">Origen ${personajeFiltrado.obtenerOrigen()} Genero: ${personajeFiltrado.obtenerGenero()} Cuenta con ${personajeFiltrado.obtenerCiber()} ${personajeFiltrado.obtenerAlianzas()} </p>
    <a href="#" class="btn btn-primary">Regresar</a>
  </div>
</div>
        `
    })

  }

  // console.log(consulta);

}

getPersonajes();


/*

class Personaje {
    constructor(name, image) {
      this.name = name;
      this.image = image;
    }
  
    obtenerNombre() {
      return this.name;
    }
  
    obtenerFoto() {
      return this.image;
    }
  }
  
  let personajes = [];
  let elemento = document.getElementById("personajes-wrapper");
  
  async function getPersonajes () {
    let url = "https://akabab.github.io/starwars-api/api/all.json";
    
    const response = await fetch(url);
    const data = await response.json();
  
    data.forEach(datum => {
      let nuevoPersonaje = new Personaje(datum.name, datum.image)
      personajes.push(nuevoPersonaje);
    });
  
    personajes.forEach((personaje) => {
  
      elemento.innerHTML += `
        <div class="column">
          <div class="card">
            <h3 class="tpersonaje">${personaje.obtenerNombre()}</h3>
            <p>
              <img src="${personaje.obtenerFoto()}" height="300" width="250" />
            </p>
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
          <div class="column">
            <div class="card">
              <h3 class="tpersonaje">${personajeFiltrado.obtenerNombre()}</h3>
              <p>
                <img src="${personajeFiltrado.obtenerFoto()}" height="300" width="250" />
              </p>
            </div>
          </div>
        `
      })
      
    }
  
    // console.log(consulta);
  
  }
  
  getPersonajes();

*/


