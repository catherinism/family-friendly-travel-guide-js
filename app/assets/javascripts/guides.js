$(document).ready(function() {
  console.log('hello')
  guidesIndexClick()
  showGuide()
  newForm()
  guidesSortedClick()
})

function guidesIndexClick() {
  $('.all-guides').on('click', (e) => {
    e.preventDefault()
    // console.log('hello again')
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

function guidesSortedClick() {
  $('.sorted-guides').on('click', (e) => {
    e.preventDefault()
    history.pushState(null, null, 'guides')
    fetch('/guides.json')
      .then(response => response.json())
      .then(guides => {
        $('.container').html('')
        console.log("hello there")
        guides.sort(function(a, b) {
          var nameA = a.title.toUpperCase();
          var nameB = b.title.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        });

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

function showGuide() {
  $(document).on('click', '.show_guide', function(e) {
    e.preventDefault()
    $('.container').html('')
    let id = $(this).attr('data-id')
    fetch(`/guides/${id}.json`)
    .then(response => response.json())
    .then(guide => {

      let newGuide = new Guide(guide)
      let guideHtml = newGuide.formatShow()
      $('.container').append(guideHtml)
      })
  })
}

 function newForm() {
  $(document).on('submit', '#new_guide', function(e) {
    e.preventDefault()
    console.log('event prevented')

    const values = $(this).serialize()

    $.post('/guides', values).done(function(data) {
      $('.container').html('')
      const newGuide = new Guide(data)
      const guideHtmlToAdd = newGuide.formatShow()
      $('.container').html(guideHtmlToAdd)
    })
  })
}

function Guide(guide) {
  this.id = guide.id
  this.title = guide.title
  this.destination_location = guide.destination_location
  this.summary = guide.summary
  this.airport = guide.airport
  this.lodging = guide.lodging
  this.restaurant = guide.restaurant
  this.park = guide.park
  this.zoo = guide.zoo
  this.baby_gear_rental = guide.baby_gear_rental
  this.luggage_storage = guide.luggage_storage
  this.itinerary = guide.itinerary
  this.ratings = guide.ratings
}

Guide.prototype.formatIndex = function() {
  console.log(this)
  let guideHtml = `
  <div class="col-md-4">
  <a href="/guides/${this.id}" data-id="${this.id}" class="show_guide"><h2 class="guide-title">${this.title}</h2></a>
  <p class="guide-destination">${this.destination_location}</p>
  </div>
  `
  return guideHtml
}

Guide.prototype.formatShow = function() {
  // console.log(this)

  let ratingsHtml = ``
    this.ratings.forEach((rating) => {
      ratingsHtml += `<li>${rating.value} - ${rating.comment}</li>`
    })


  let guideHtml = `

  <div class="col-md-12">
    <h3>${this.title}</h3>
    <p class="guide-destination"> <i class="fas fa-globe-americas"></i> ${this.destination_location}</p>
  </div>

  <div class="col-md-6">
    <p class="guide-summary"> ${this.summary}</p>

    <hr class="my-4">
    <h2 class="guide-destination"><i class="fas fa-map-signs"></i> Itinerary</h2>
    <p> ${this.itinerary}</p>

    <hr class="my-4">
    <h2 class="guide-destination"><i class="fas fa-star"></i> Ratings</h2>
    <p class="guide-destination"> ${ratingsHtml}</p>
  </div>

  <div class="col-md-6">
    <h2 class="guide-destination">Details</h2>
    <p><i class="fas fa-plane-departure"></i> ${this.airport}</p>
    <p><i class="fas fa-bed"></i> ${this.lodging}</p>
    <p><i class="fas fa-utensils"></i> ${this.restaurant}</p>
    <p><i class="fas fa-tree"></i> ${this.park}</p>
    <p><i class="fas fa-hippo"></i> ${this.zoo}</p><br>
    <h2 class="guide-destination">Nearby</h2>
  </div>

  <div class="col-md-3">
    <h2 class="guide-destination"><i class="fas fa-baby-carriage"></i> Baby Gear Rental: ${this.baby_gear_rental}</h2>
  </div>

  <div class="col-md-3">
    <h2 class="guide-destination"><i class="fas fa-suitcase-rolling"></i> Luggage Storage: ${this.luggage_storage}</h2>
  </div>
  `
  return guideHtml
}
