const queryStringUrlId = window.location.search

// ID EXTRACTION

const urlSearchParams = new URLSearchParams(queryStringUrlId)

const id = urlSearchParams.get('id')

const dataJson = '../data/photographers.json'
const mainSection = document.querySelector('.photograph-main')
// get all pgotographers
async function getPhotographer() {
  const response = await fetch(dataJson)
  const data = await response.json()

  const photographer = data.photographers

  const photographerById = photographer.find((e) => e.id === Number(id))

  return {
    photographerById,
  }
}

// Display Info
async function displayData(photographerById) {
  const headerSection = document.querySelector('.photograph-header')

  const headerModel = profilFactory(photographerById)
  const userHeaderDOM = headerModel.getUserHeaderDOM()
  headerSection.appendChild(userHeaderDOM)
}
// Get Media from id

async function getMedia() {
  const response = await fetch(dataJson)
  const data = await response.json()

  const mediaList = data.media
  const medias = mediaList.filter(
    (element) => element.photographerId === Number(id)
  )

  return {
    medias,
  }
}

// Sort Media

function sortMedia(medias, sortBy) {
  mainSection.innerHTML = ''
  // sort by const 'sortBy'
  if (sortBy === '1') {
    medias.sort((a, b) => (a.likes < b.likes ? 1 : -1))
    medias.forEach((media) => {
      const mainModel = mediaFactory(media)
      const userMediaDOM = mainModel.getUserMediaDOM()
      mainSection.appendChild(userMediaDOM)
    })
  }
  if (sortBy === '2') {
    medias.sort((x, y) => {
      const firstDate = new Date(x.date)
      const SecondDate = new Date(y.date)

      if (firstDate < SecondDate) return -1
      if (firstDate > SecondDate) return 1
      return 0
    })
    medias.forEach((media) => {
      const mainModel = mediaFactory(media)
      const userMediaDOM = mainModel.getUserMediaDOM()
      mainSection.appendChild(userMediaDOM)
    })
  }
  if (sortBy === '3') {
    medias.sort((a, b) => a.title.localeCompare(b.title))
    medias.forEach((media) => {
      const mainModel = mediaFactory(media)
      const userMediaDOM = mainModel.getUserMediaDOM()
      mainSection.appendChild(userMediaDOM)
    })
  }
  // LightBox
  const mediaCard = document.querySelectorAll('.card')
  const insider = document.getElementById('inside')
  const previewBox = document.getElementById('lightbox')
  const closePreview = document.querySelector('.close')

  const prevBtn = document.querySelector('.prev')
  const nextBtn = document.querySelector('.next')

  // lightbox launcher
  function preview(e) {
    insider.innerHTML = mediaCard[e].innerHTML
  }
  for (let i = 0; i < mediaCard.length; i += 1) {
    let newIndex = i
    insider.innerHTML = ''

    //  lightbox trigger
    // simulate click on keypress
    mediaCard[newIndex].firstChild.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        mediaCard[newIndex].firstChild.click()
      }
    })
    // on click trigger
    mediaCard[newIndex].firstChild.onclick = () => {
      if (newIndex <= 0) {
        prevBtn.style.display = 'none'
      } else {
        prevBtn.style.display = 'block'
      }
      if (newIndex === mediaCard.length - 1) {
        nextBtn.style.display = 'none'
      }

      //  lightbox controls
      function lightboxControl() {
        // keyboard controls handler
        window.addEventListener('keydown', (e) => {
          switch (e.key) {
            case 'ArrowLeft':
              if (newIndex === 0) {
                prevBtn.style.display = 'none'
              } else {
                prevBtn.style.display = 'block'
                newIndex -= 1 // decrement newIndexvalue
                insider.innerHTML = mediaCard[newIndex].innerHTML
              }
              break
            case 'ArrowRight':
              if (newIndex === mediaCard.length - 1) {
                nextBtn.style.display = 'none'
              } else {
                prevBtn.style.display = 'block'
                newIndex += 1 // increment newIndexvalue
                insider.innerHTML = mediaCard[newIndex].innerHTML
              }
              break
            case 'Escape':
              previewBox.classList.remove('show')
              insider.innerHTML = ''
              newIndex = i
              break
            default:
          }

          // Annuler l'action par défaut pour éviter qu'elle ne soit traitée deux fois.
        })
      }
      // close lightbox
      closePreview.onclick = () => {
        previewBox.classList.remove('show')
        insider.innerHTML = ''
        newIndex = i
      }
      // prev media
      prevBtn.onclick = () => {
        if (newIndex === 0) {
          prevBtn.style.display = 'none'
        } else {
          nextBtn.style.display = 'block'
          newIndex -= 1 // decrement newIndexvalue
          preview(newIndex)
        }
      }
      // next media
      nextBtn.onclick = () => {
        if (newIndex === mediaCard.length - 1) {
          nextBtn.style.display = 'none'
        } else {
          prevBtn.style.display = 'block'
          newIndex += 1 // increment newIndexvalue
          preview(newIndex)
        }
      }
      lightboxControl()
      preview(newIndex)
      previewBox.classList.add('show')
    }
  }
}
// Display Sorted Media

async function displayMedia(medias) {
  const sortBy = document.querySelector('select')

  sortMedia(medias, sortBy.value)
  // Sort Medias

  sortBy.addEventListener('change', () => {
    sortMedia(medias, sortBy.value)
  })
}
// Get total Likes
async function getLikes(medias) {
  const likesCount = medias
    .map((item) => item.likes)
    .reduce((prev, curr) => prev + curr, 0)
  const price = medias.map((item) => item.price)
  return {
    likesCount,
    price,
  }
}

// Display Like counter

async function displayLikeCounter(medias) {
  const infoSection = document.querySelector('.photograph-info')

  const infoModel = infoFactory(medias)
  const userInfoDOM = infoModel.getUserInfoDOM()
  infoSection.appendChild(userInfoDOM)
}
// Display Modal
async function displayUserModal(photographerById) {
  const modalSection = document.querySelector('#contact_modal')

  const modalModel = modalFactory(photographerById)
  const userModalDOM = modalModel.getUserModalDOM()
  modalSection.appendChild(userModalDOM)
}
// Initialisation
async function init() {
  const { photographerById } = await getPhotographer()
  const { medias } = await getMedia()
  const { likesCount } = await getLikes(medias)

  // live display
  displayData(photographerById)
  displayMedia(medias)
  displayLikeCounter(likesCount)
  displayUserModal(photographerById)
}

init()
