// $(".thumb").click(function(e) {
//   var imgUrl = $(this).attr("src");
//   $("#img").css({ backgroundImage: "url(" + imgUrl + ")" });

//   // return false;
// });
window.onload = function() {
  renderShows();
    renderAbout();
  renderSlider();
};
var presenters = (array)=>{
  this.array = array;
  var x = array.map(array => array.post_title);
  if(x.length == 1){
    x.splice(1, 0, 'presents');
  }
  else{
  x.splice(3, 0, 'present');
  }
  return x;
};
function renderAbout(){
    let Site = JSON.parse(localStorage.getItem("site_model"));
    
            var about = Site[0];
            console.log(about);
            var gallery = "";
            var about_sect = "";
            gallery = `  <div class="gallery">
            <div class="thumbnails">
              <div class="row">
                <img src="${about.acf.gallery[0].sizes.medium}" class="thumb" width="80" height="80">
                <img src="${about.acf.gallery[1].sizes.medium}" class="thumb" width="80" height="80">
                <img src="${about.acf.gallery[2].sizes.medium}" class="thumb" width="80" height="80">
                <img src="${about.acf.gallery[3].sizes.medium}" class="thumb" width="80" height="80">
              </div>
              <div class="row">
                <img src="${about.acf.gallery[4].sizes.medium}" class="thumb" width="80" height="80">
                <img src="${about.acf.gallery[5].sizes.medium}" class="thumb" width="80" height="80">
                <img src="${about.acf.gallery[6].sizes.medium}" class="thumb" width="80" height="80">
                <img src="${about.acf.gallery[7].sizes.medium}" class="thumb" width="80" height="80">
              </div>
              <div class="row">
                <img src="${about.acf.gallery[8].sizes.medium}" class="thumb" width="80" height="80">
                <img src="${about.acf.gallery[9].sizes.medium}" class="thumb" width="80" height="80">
                <img src="${about.acf.gallery[10].sizes.medium}" class="thumb" width="80" height="80">
                <img src="${about.acf.gallery[11].sizes.medium}" class="thumb" width="80" height="80">
              </div>
            </div>
            <div id="img" style="background-image:url('https://gapdb.specialops.io/wp-content/uploads/31682560_778353362372339_7159926026549693721_n.jpg');"></div>
          </div>`;
            about_sect += `  <h1 class="aboutTitle">${about.acf.heading}</h1>
            <div class="aboutTxt">
              <div class="aboutPara">
                <p>${about.acf.about}</p>
              </div>
            </div>
          </div>`;
            document.getElementsByClassName("content")[0].innerHTML += gallery;
            document.getElementsByClassName("content")[0].innerHTML += about_sect;
            $(".thumb").click(function(e) {
              var imgUrl = $(this).attr("src");
              $("#img").css({ backgroundImage: "url(" + imgUrl + ")" });
            
              // return false;
            })
        }
function renderWidgets() {
          var widgets = localStorage.getItem("site_model");
          widgets = JSON.parse(widgets);
          var mailingWidget = "";
          mailingWidget += `  <div class="widget">
          <h2 class="notification title grey">Mailing List</h2>
          <div class="emailCont">
            <h6 class="emailTitle">${widgets[0].acf.mailing_list_blurb}</h6>
            <input class="email" type="text" placeholder="Email Address">
            <button class="emailBtn">
              <h6>SUBMIT</h6>
            </button>
          </div>`;
          document.getElementsByClassName("widgets")[0].insertAdjacentHTML('beforeend',mailingWidget);
      }
function intiateSlick(){
  let head = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.css"/>`;
  $(document.head).append(head);
  $('.slick').slick({
    autoplay: true,
    prevArrow: null,
    nextArrow: null,
    //adaptiveHeight: true,
    // dotsClass: 'slick-dots',
  });
  renderWidgets();
}
function renderSlider(){
  let sliderData = localStorage.getItem("shows");
  sliderData = JSON.parse(sliderData);
  console.log(sliderData);
  let slick = document.createElement('div');
  $(slick).addClass('slick');
  let title = `<h2 class="title">Just Announced</h2>`
  for(var i in sliderData){
  let output ='';
  output = `<img src="${sliderData[i].acf.img_hero}">`;
  console.log(slick)
  $(slick).append(output)
  $('.widgets').append(slick);
  }
  //$('.byline').append(title);
  document.getElementsByClassName('slick')[0].insertAdjacentHTML('beforebegin',title);
  intiateSlick();
  renderFooter();
}
function renderFooter(){
  let footerContent = localStorage.getItem("site_model");
  footerContent = JSON.parse(footerContent);
  let footer = footerContent[0].acf.footer_content;
  $(".footer").append("<p>"+footer+"</p>");
}
var renderShows = (array)=>{
  var data = localStorage.getItem("shows");
  data = JSON.parse(data);
  // console.log(data);
  var output = '';
  for( var i in data){
      let Show = data[i].acf;
      let id = data[i].id;
      let orig = '';
      let date = Show.date;
      let dateNum = '';
      var venues = localStorage.getItem("venues");
      dateNum = date.match(/[0-9]+/g);
      date = date.substring(0,3);
      let container = document.createElement('div');
      container.setAttribute('class','showCard');
      $(container).addClass("height");
;      container.setAttribute('data-id', id);
      var venues = localStorage.getItem("venues");
      venues = JSON.parse(venues);
      var color = '';
        for(var i in venues){
          let venName = venues[i].acf.venue_name;
          let showVenName = Show.venue.post_title;
          if(venName == showVenName){
            color = venues[i].acf.color;
          }
        }
      output = `<div class="showCardTop height">
      <div class="showText">
        <p class="showTopline">
        ${Show.pres ? presenters(Show.pres): Show.top_line_override}
        </p>
        <div class="showTit">
          <h3 class="showTitle">${Show.show_name}</h3>
        </div>
        <p class="support">${Show.support}</p>
      </div>
    </div>
    <div class="showCardBottom">
      <div class="showDetails">
        <p class="date">${date + ' ' + dateNum[0]}</p>
        <p class="time">${Show.shwt}</p>
      </div>
      <div class="venueDetails" style="background-color:${color}">
        <p class="showVenue">${Show.venue.post_title}</p>
        <p class="showAge">
          <strong>
            <span class="age">${Show.ages}</span>
            <span class="seating">SEATED</span>
          </strong>
        </p>
      </div>
    </div>`;
      container.insertAdjacentHTML('beforeend',output);
      console.log(output);
      $('.widgets').append(container);
  }
}
