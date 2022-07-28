class Personaje {
  constructor(datos) {
    const { name, image, homeworld, gender, cybernetics, affiliations } = datos

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
  obtenerInfo() {
    return `
    <ul>
      <li> Origen: ${this.homeworld} 
      <li> Genero: ${this.gender} 
    </ul> 
  `
  }
}

let personajes = [];
let elemento = document.getElementById("personajes-wrapper");

const inputBuscador = document.getElementById("buscador")
//inputBuscador.addEventListener('keyup', llamarBusqueda)

function obtenerMasInfo(nombre) {
  const labelNombre = `mas-info-${nombre.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()}`
  const masInfo = document.getElementById(labelNombre)

  selectedPersonaje = personajes.filter(personaje => personaje.name === nombre).pop()

  masInfo.innerHTML = selectedPersonaje.obtenerInfo()
}

function buildCharacterCard(nombre, foto) {
  return `
  <div class="card " style="width: 18rem;">
      <img src="${foto}" class="card-img-top h-50" alt="...">
      <div class="card-body">
          <h5 class="card-title" class="tpersonaje">${nombre}</h5>

          <p>
          <button type="button"  class="btn btn-primary" onclick="obtenerMasInfo('${nombre}')" >Más información</button>
          </p>
          <p id="mas-info-${nombre.replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, '-')
      .toLowerCase()}"></p>
      </div>
  </div>
`
}

async function getPersonajes() {
  let url = "https://akabab.github.io/starwars-api/api/all.json";

  const response = await fetch(url);
  const data = await response.json();

  data.forEach(datum => {
    let nuevoPersonaje = new Personaje(datum)
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
function buildCharacterCard2(nombre, foto, origen, genero, ciber, alianzas) {
  return `
  <div class="m-4 d-flex justify-content-center">
  <div class="card " style="width: 50rem; ">
      <img src="${foto}" class="card-img-top h-auto" alt="...">
      <div class="card-body">
          <h5 class="card-title" class="tpersonaje">${nombre}</h5>
          <p class="card-text">Origen: ${origen} <br> Genero: ${genero} <br> Cuenta con: <br> ${ciber} <br> ${alianzas}
          </p>
          <button id="btn-atras" class="btn btn-primary">Regresar</button>
          
      </div>
  </div>
  </div>
`

}

function llamarBusqueda() {
  setTimeout(() => {
    const consulta = inputBuscador.value;
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
      reiniciarData();
    })
  }, 500);
}


function ordenarPersonajes() {
  const selector = document.getElementById("sort").value

  if (selector === 'none') {
    reiniciarData();
    return null
  }

  const personajesOrdenados = personajes.sort((a, b) => {
    let personajeA = a.name.toLowerCase()
    let personajeB = b.name.toLowerCase()

    if (selector === 'mayor') {
      if (personajeA < personajeB) {
        return -1
      }
    } else if (selector === 'menor') {
      if (personajeA > personajeB) {
        return -1
      }
    } else {
      return 0;
    }
  })

  if (personajesOrdenados.length > 0) {
    elemento.innerHTML = null
    personajesOrdenados.forEach((personajeOrdenado) => {
      elemento.innerHTML += buildCharacterCard(
        personajeOrdenado.obtenerNombre(),
        personajeOrdenado.obtenerFoto()
      )
    })
  }
}
getPersonajes();