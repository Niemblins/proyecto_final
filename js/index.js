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
    return this.affiliations;
  }
}

let personajes = [];
let elemento = document.getElementById("personajes-wrapper");

function buildCharacterCard(nombre, foto, origen, genero) {
  return `
  <div class="card " style="width: 18rem;">
      <img src="${foto}" class="card-img-top h-50" alt="...">
      <div class="card-body">
          <h5 class="card-title" class="tpersonaje">${nombre}</h5>
          <p class="card-text">Origen: ${origen} <br> Genero: ${genero}
          </p>
          <button id="btn-info" class="btn btn-primary">Más información</button>
          
      </div>
  </div>
`
}

function buildCharacterCard2(nombre, foto, origen, genero, ciber, alianzas) {
  return `
  <div class="card " style="width: 18rem;">
      <img src="${foto}" class="card-img-top h-50" alt="...">
      <div class="card-body">
          <h5 class="card-title" class="tpersonaje">${nombre}</h5>
          <p class="card-text">Origen: ${origen} <br> Genero: ${genero} <br> Cuenta con: <br> ${ciber} <br> ${alianzas}
          </p>
          <button id="btn-atras" class="btn btn-primary">Regresar</button>
          
      </div>
  </div>
`

}



async function getPersonajes() {
  let url = "https://akabab.github.io/starwars-api/api/all.json";

  const response = await fetch(url);
  const data = await response.json();

  data.forEach(datum => {
    let nuevoPersonaje = new Personaje(datum.name, datum.image, datum.homeworld, datum.gender,datum.cybernetics, datum.affiliations)
    personajes.push(nuevoPersonaje);
  });

  personajes.forEach((personaje) => {

    elemento.innerHTML +=  buildCharacterCard(
      personaje.obtenerNombre(),
      personaje.obtenerFoto(),
      personaje.obtenerOrigen(),
      personaje.obtenerGenero()
    )
  })
}

function reiniciarData() {
  personajes.length = 0;
  elemento.innerHTML = null;
  getPersonajes();
}

function llamarBusqueda() {
  //console.log('llamarBusqueda')
  setTimeout(()=>{
  const consulta = document.getElementById("buscador").value;
  const personajesFiltrados = personajes.filter(personaje => personaje.name.toLowerCase().includes(consulta.toLowerCase()))

  if (personajesFiltrados.length > 0) {
    elemento.innerHTML = null
    personajesFiltrados.forEach((personajeFiltrado) => {
      elemento.innerHTML += buildCharacterCard2(
        personajeFiltrado.obtenerNombre(),
        personajeFiltrado.obtenerFoto(),
        personajeFiltrado.obtenerOrigen(),
        personajeFiltrado.obtenerGenero(),
        personajeFiltrado.obtenerCiber(),
        personajeFiltrado.obtenerAlianzas()
      )
    })

  }
  const atras = document.getElementById('btn-atras')
  atras.addEventListener('click', () => {
    location.reload();
  })
},500);
  

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

function buildCharacterCard(nombre, foto) {
  return `
    <div class="column">
      <div class="card">
        <h3 class="tpersonaje">${nombre}</h3>
        <p>
          <img src="${foto}" height="300" width="250" />
        </p>
      </div>
    </div>
  `
}

async function getPersonajes () {
  let url = "https://akabab.github.io/starwars-api/api/all.json";
  
  const response = await fetch(url);
  const data = await response.json();

  data.forEach(datum => {
    let nuevoPersonaje = new Personaje(datum.name, datum.image)
    personajes.push(nuevoPersonaje);
  });

  personajes.forEach((personaje) => {

    elemento.innerHTML += buildCharacterCard(
      personaje.obtenerNombre(),
      personaje.obtenerFoto()
    )
  })
}

function reiniciarData() {
  personajes.length = 0;
  elemento.innerHTML = null;
  getPersonajes();
}

function llamarBusqueda() {
  setTimeout(() => {
    const consulta = document.getElementById("buscador").value;
    const personajesFiltrados = personajes.filter(personaje => personaje.name.toLowerCase().includes(consulta.toLowerCase()))
  
    if (personajesFiltrados.length > 0) {
      elemento.innerHTML = null
      personajesFiltrados.forEach((personajeFiltrado) => {
        elemento.innerHTML += buildCharacterCard(
          personajeFiltrado.obtenerNombre(),
          personajeFiltrado.obtenerFoto()
        )
      })
    }
  }, 500);
}

getPersonajes();*/