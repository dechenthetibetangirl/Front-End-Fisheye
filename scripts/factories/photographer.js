// All factories

//  photographer factory
function photographerFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data
  
    const picture = `assets/photographers/${portrait}`
    // creation of elements
    function getUserCardDOM() {
      const a = document.createElement('a')
      a.setAttribute('href', `photographer.html?id=${id}`)
      const article = document.createElement('article')
      const img = document.createElement('img')
      img.setAttribute('src', picture)
      img.setAttribute('alt', name)
      const h2 = document.createElement('h2')
      h2.textContent = name
      const h3 = document.createElement('h3')
      h3.textContent = `${city}, ${country}`
      const p = document.createElement('p')
      p.textContent = tagline
      const small = document.createElement('small')
      small.textContent = `${price}€/jours`
  
      a.appendChild(article)
      article.appendChild(img)
      article.appendChild(h2)
      article.appendChild(h3)
      article.appendChild(p)
      article.appendChild(small)
  
      return a
    }
    return { name, picture, getUserCardDOM }
  }
  //  profil factory
  function profilFactory(data) {
    const { name, portrait, city, country, tagline, price } = data
  
    const picture = `assets/photographers/${portrait}`
    const infoBox = document.querySelector('.photograph-info')
    // creation of elements
    function getUserHeaderDOM() {
      const section = document.createElement('section')
      const info = document.createElement('div')
      info.setAttribute('class', 'info')
      const h1 = document.createElement('h1')
      h1.textContent = name
      const h2 = document.createElement('h2')
      h2.textContent = `${city}, ${country}`
      const p = document.createElement('p')
      p.textContent = tagline
      const priceInfo = document.createElement('p')
      priceInfo.textContent = `${price}/jours`
      const btn = document.createElement('button')
      btn.setAttribute('onclick', 'displayModal()')
      btn.setAttribute('class', 'contact_button')
      btn.textContent = 'Contactez moi'
  
      const img = document.createElement('img')
      img.setAttribute('src', picture)
      img.setAttribute('alt', name)
  
      section.appendChild(info)
      info.appendChild(h1)
      info.appendChild(h2)
      info.appendChild(p)
      section.appendChild(btn)
      section.appendChild(img)
      infoBox.appendChild(priceInfo)
  
      return section
    }
    return { name, picture, getUserHeaderDOM }
  }
  //  media on profil factory
  function mediaFactory(data) {
    const { id, photographerId, title, image, video, date, price } = data
    const { likes } = data
    const imgSrc = `assets/photos/${photographerId}/${image}`
    const vdoSrc = `assets/photos/${photographerId}/${video}`
  
    const svgNs = 'http://www.w3.org/2000/svg'
    // creation of elements
    function getUserMediaDOM() {
      const card = document.createElement('a')
      card.setAttribute('class', 'card')
      card.setAttribute('data-id', id)
      if (image) {
        const img = document.createElement('img')
        img.setAttribute('src', imgSrc)
        img.setAttribute('class', 'image')
        img.setAttribute('alt', title)
        img.classList.add('media')
        img.setAttribute('tabindex', 0)
  
        card.appendChild(img)
      }
      if (video) {
        const vdo = document.createElement('video')
        vdo.setAttribute('src', vdoSrc)
        vdo.setAttribute('type', 'video/mp4')
        vdo.setAttribute('alt', title)
        vdo.autoplay = false
        vdo.controls = true
        vdo.muted = false
        vdo.classList.add('media')
        vdo.setAttribute('tabindex', 0)
        card.appendChild(vdo)
      }
      const cardFooter = document.createElement('div')
      cardFooter.setAttribute('class', 'card_footer')
      const h3 = document.createElement('h3')
      h3.setAttribute('class', 'title')
      h3.textContent = title
      const likeCounter = document.createElement('div')
      likeCounter.setAttribute('class', 'likeCount')
      const p = document.createElement('p')
      p.setAttribute('id', 'likes')
      p.innerHTML = likes
      const heart = document.createElement('i')
      heart.setAttribute('class', 'far fa-heart')
      heart.setAttribute('tabIndex', '0')
      // like handler
      heart.addEventListener('click', (e) => {
        if (p.classList.contains('liked')) {
          p.classList.remove('liked')
          heart.classList.remove('liked')
  
          p.innerHTML = likes
        } else {
          p.classList.add('liked')
          heart.classList.add('liked')
          p.innerHTML = likes + 1
        }
      })
      // like handler keyboard controle
      heart.addEventListener('keypress', (e) => {
        switch (e.key) {
          case 'Enter':
            if (p.classList.contains('liked')) {
              p.classList.remove('liked')
              heart.classList.remove('liked')
              p.innerHTML = likes - 1
            } else {
              p.classList.add('liked')
              heart.classList.add('liked')
              p.innerHTML = likes + 1
            }
            break
  
          default:
            e.preventDefault()
        }
      })
  
      card.appendChild(cardFooter)
      cardFooter.appendChild(h3)
      cardFooter.appendChild(likeCounter)
      likeCounter.appendChild(p)
      likeCounter.appendChild(heart)
  
      return card
    }
  
    return { title, likes, getUserMediaDOM }
  }
  // info fixed bot on profil factory
  function infoFactory(data) {
    const likesCount = data
    // creation of elements
    function getUserInfoDOM() {
      const info = document.createElement('div')
      const likes = document.createElement('p')
      const p = document.createElement('p')
      const content = document.querySelectorAll('.fa-heart')
      // live incrementation
      content.forEach((e) => {
        e.addEventListener('click', () => {
          const likedContent = document.querySelectorAll('.fa-heart.liked')
          likes.innerHTML = `${
            likesCount + likedContent.length
          }    <i class="fa-solid fa-heart"></i>`
        })
      })
  
      likes.innerHTML = `${likesCount}    <i class="fa-solid fa-heart"></i>`
  
      info.appendChild(likes)
      info.appendChild(p)
      return info
    }
  
    return { likesCount, getUserInfoDOM }
  }
  // Lightobx factory
  function modalFactory(data) {
    const { name } = data
    // creation of elements
    function getUserModalDOM() {
      const modal = document.createElement('div')
      modal.setAttribute('class', 'modal')
      modal.setAttribute('id', 'modal')
      modal.setAttribute('tabIndex', '12')
      // Header
      const header = document.createElement('header')
      const h2 = document.createElement('h2')
      h2.setAttribute('style', 'text-align: left')
      h2.textContent = `Contactez-moi ${name}`
      const img = document.createElement('img')
      img.setAttribute('src', 'assets/icons/close.svg')
      img.setAttribute('onclick', 'closeModal()')
      img.setAttribute('alt', 'close')
  
      // form
      const form = document.createElement('form')
      const fieldset = document.createElement('fieldset')
      const legend = document.createElement('legend')
      legend.textContent = `Contactez-moi ${name}`
      legend.setAttribute('style', 'display:none')
      // name
      const firstnameLabel = document.createElement('label')
      firstnameLabel.textContent = 'Prénom'
      const firstnameInput = document.createElement('input')
      firstnameInput.setAttribute('type', 'text')
      firstnameInput.setAttribute('autocomplete', 'firstname')
      firstnameInput.setAttribute('aria-required', 'true')
      firstnameInput.setAttribute('id', 'firstname')
      // lastname
      const lastnameLabel = document.createElement('label')
      lastnameLabel.textContent = 'Nom'
      const lastnameInput = document.createElement('input')
      lastnameInput.setAttribute('type', 'text')
      lastnameInput.setAttribute('autocomplete', 'lastname')
      lastnameInput.setAttribute('aria-required', 'true')
      lastnameInput.setAttribute('id', 'lastname')
      // mail
      const mailLabel = document.createElement('label')
      mailLabel.textContent = 'Email'
      const mailInput = document.createElement('input')
      mailInput.setAttribute('type', 'mail')
      mailInput.setAttribute('autocomplete', 'mail')
      mailInput.setAttribute('aria-required', 'true')
      mailInput.setAttribute('id', 'mail')
      // message
      const messageLabel = document.createElement('label')
      messageLabel.textContent = 'Votre Message'
      const messageInput = document.createElement('textarea')
      messageInput.setAttribute('autocomplete', 'message')
      messageInput.setAttribute('aria-required', 'true')
      messageInput.setAttribute('id', 'message')
      // btn
      const btn = document.createElement('input')
      btn.setAttribute('class', 'contact_button')
      btn.setAttribute('value', 'Envoyer')
      btn.setAttribute('type', 'submit')
  
      modal.appendChild(header)
      modal.appendChild(form)
  
      header.appendChild(h2)
  
      header.appendChild(img)
  
      form.appendChild(fieldset)
  
      fieldset.appendChild(firstnameLabel)
      fieldset.appendChild(lastnameLabel)
      fieldset.appendChild(mailLabel)
      fieldset.appendChild(messageLabel)
      fieldset.appendChild(legend)
  
      firstnameLabel.appendChild(firstnameInput)
      lastnameLabel.appendChild(lastnameInput)
      mailLabel.appendChild(mailInput)
      messageLabel.appendChild(messageInput)
      fieldset.appendChild(btn)
  
      return modal
    }
  
    return { name, getUserModalDOM }
  }
  