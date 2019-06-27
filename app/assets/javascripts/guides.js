$(document).ready(function() {
  // console.log('hellow')
  guidesIndexClick()
})

const guidesIndexClick = () => {
  $('.all-guides').on('click', (e) => {
    e.preventDefault()
    // console.log('hello')
    history.pushState(null, null, 'guides')
    fetch('/guides.json')
      .then(response => response.json())
      .then(guides => {
        $('.container').html('')
        guides.forEach(guide => {
          // console.log(guide)
          let newGuide = new Guide(guide)
          let guideHtml = newGuide.formatIndex()
          // console.log(guideHtml)
          $('.container').append(guideHtml)
          // console.log(newGuide)
        })
      })
  })

  $(document).on('click', '.show_guide', function(e) {
    e.preventDefault()
    $('.container').html('')
    let id = ($(this).attr('data-id'))
    fetch(`/guides/${id}.json`)
    .then(response => response.json())
    .then(guide => {


      let newGuide = new Guide(guide)
      let guideHtml = newGuide.formatShow()
      $('.container').append(guideHtml)
      })
  })
}

function Guide(guide) {
  this.id = guide.id
  this.title = guide.title
  this.destination_location = guide.destination_location
  this.summary = guide.summary
}

Guide.prototype.formatIndex = function() {
  // console.log(this)
  let guideHtml = `
  <a href="/guides/${this.id}" data-id="${this.id}" class="show_guide"><h1>${this.title}</h1></a>
  `
  return guideHtml
}

Guide.prototype.formatShow = function() {
  console.log(this)
  let guideHtml = `
  <h3>${this.title}</h3>
  <h3>${this.destination_location}</h3>
  `
  return guideHtml
}
