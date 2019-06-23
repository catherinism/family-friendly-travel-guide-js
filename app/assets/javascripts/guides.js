$(document).ready(function() {
  // console.log('hellow')
  guidesIndexClick()
})

const guidesIndexClick = () => {
  $('.navbar-brand').on('click', (e) => {
    e.preventDefault()
    // console.log('hello')
    fetch('/guides.json')
      .then(response => response.json())
      .then(guides => console.log(guides))
  })
}
