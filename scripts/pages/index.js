const dataJson = '../data/photographers.json'
// get photographer from json
async function getPhotographers() {
  const response = await fetch(dataJson)
  const data = await response.json()

  const { photographers } = data
  // et bien retourner le tableau photographers seulement une fois
  return {
    photographers,
  }
}

// display photogrraphers
async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section')
  // a card for each phtotographer in array
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

// Initialisation
async function init() {
  const { photographers } = await getPhotographers()
  displayData(photographers)
}

init()
