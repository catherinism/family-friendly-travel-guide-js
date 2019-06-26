$(document).ready(function() {
  // console.log('hellow')
  guidesIndexClick()
})

const guidesIndexClick = () => {
  $('.all-guides').on('click', (e) => {
    e.preventDefault()
    // console.log('hello')
    fetch('/guides.json')
      .then(response => response.json())
      .then(guides => {
        $('#container').html('')
        guides.forEach(guide => {
          let newGuide = new Guide(guide)
          console.log(newGuide)
        })
      })
  })
}

function Guide(id, title, destination_id) {
  this.id = id
  this.title = title
  this.summary = summary
  this.destination_id = destination_id
}
