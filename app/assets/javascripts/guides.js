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
}

function Guide(guide) {
  this.id = guide.id
  this.title = guide.title
  this.summary = guide.summary
  this.destination_id = guide.destination_id
}

Guide.prototype.formatIndex = function() {
  console.log(this)
  let guideHtml = `
//     <a href="/guides/${this.id}"<h1>${this.title}</h1></a>
  `
  return guideHtml
}
