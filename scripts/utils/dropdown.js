const dropdown = document.getElementById('myDropdown')
const btn = document.querySelector('.dropbtn')
const optionList = dropdown.querySelectorAll('a')
const select = document.querySelector('select')
const chevron = document.createElement('i')
chevron.setAttribute('class', 'fa-solid fa-chevron-down')

// get value from dropdown

function selectValue() {
  const e = new Event('change')

  if (select.value === '1') {
    btn.textContent = 'Popularité'
    const selected = document.getElementById('optionPop')
    selected.style.display = 'none'
    select.dispatchEvent(e)
  } else {
    const selected = document.getElementById('optionPop')
    selected.style.display = 'block'
  }
  if (select.value === '2') {
    btn.textContent = 'Date'
    const selected = document.getElementById('optionDat')
    selected.style.display = 'none'
    select.dispatchEvent(e)
  } else {
    const selected = document.getElementById('optionDat')
    selected.style.display = 'block'
  }
  if (select.value === '3') {
    btn.textContent = 'Titre'
    const selected = document.getElementById('optionTit')
    selected.style.display = 'none'
    select.dispatchEvent(e)
  } else {
    const selected = document.getElementById('optionTit')
    selected.style.display = 'block'
  }
  btn.appendChild(chevron)
}
selectValue()

// binding select value on dropdown value for sorting

function setValue(e) {
  select.value = e

  selectValue()
}

// display dropdown
function showDropdown() {
  dropdown.classList.toggle('show')
  chevron.classList.remove('fa-chevron-down')
  chevron.classList.add('fa-chevron-up')
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = (event) => {
  if (!event.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName('dropdown-content')
    let i
    for (i = 0; i < dropdowns.length; i += 1) {
      const openDropdown = dropdowns[i]
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show')
        chevron.setAttribute('class', 'fa-solid fa-chevron-down')
      }
    }
  }
}
