let
App = {
    getData : (url,callback) =>{
    $.get(url,callback)
    },
  } 
function filterIt(arr, searchKey) {
  return arr.filter(obj => Object.keys(obj).some(key => obj[key].includes(searchKey)));
}
function venueColor(data){
      var shows = localStorage.getItem("shows");
      shows = JSON.parse(shows);
      var venName = data;
    console.log(filterIt(venues,venName));
}
  var renderAbout = (data)=>{
    let Site = JSON.parse(localStorage.getItem("site_model"));
    let widget = document.createElement('div');
    widget.setAttribute('class','byline');
    output = `
    <div id="root">
    <h2>${Site[0].acf.seo_byline}</h2>
    <p>${Site[0].acf.about_gap}</p>
    <a href="./about.php" class="more-info"><h5>More Info</h5></a>
    </div>`;
    
    widget.insertAdjacentHTML('beforeend',output);
    $('.widgets').append(widget);
    renderSlider();
    }
var renderSideBar = (data)=>{
  localStorage.setItem("site_model", JSON.stringify(data));
let Site = JSON.parse(localStorage.getItem("site_model"));
let siteAccess = Site;
let widget = document.createElement('div');
widget.setAttribute('class','mailing_list');
output = `<h2 class="notification title grey">Mailing List</h2>
<div class="widget">
<div class="emailCont">
  <h6 class="emailTitle">${siteAccess[0].acf.mailing_list_blurb}</h6>
  <input class="email" type="text" placeholder="Email Address">
  <button class="emailBtn">
    <h6>SUBMIT</h6>
  </button>
</div>
`;
setTimeout(widget.insertAdjacentHTML('beforeend',output),1000);
$('.widgets').append(widget);
}
var renderShows = (array)=>{
    let data = JSON.parse(array);
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
        container.setAttribute('data-id', id);
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
        output = `<div class="showCardTop">
        <div class="showImg">
          <img src="${Show.img_thumb}" />
        </div>
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
        history.pushState(null, null, '/');
        //where sep is introduced
        container.addEventListener('click', function(){ 
          $('.byline').remove();   
            var sep_temp = `<div class="cont">
<div class="caption">
    <div class="imgwrap">
    <!--<div class="showCardBottom">
    <div class="showDetails">
        <p class="date">Jan 9</p>
        <p class="time">9:00 PM</p>
    </div>
        <div class="venueDetails">
                <p class="showVenue">Carnegie Library Music Hall</p>
                <p class="showAge"><strong><span class="age">21+</span> <span class="seating">SEATED</span></strong></p>
            </div>
        </div>-->
        <img src="${Show.img_hero}">  
        </div>
</div>
<div class="sepTxt">
    <h6> ${Show.pres ? presenters(Show.pres) : Show.top_line_override}</h6>
    <h3>${Show.show_name}</h3>
    <strong>${Show.support}</strong>
    <br>
    <p class="sepText">${Show.blurb}</p>
    <button class="button is-success btn"><h6>TICKETS</h6></button>
    <h6>FOLLOW headliner ON:</h6>
    <div class="soc_icons_sep">
        <span><i class="fa fa-globe fa-lg fb"></i></span>
        <span><i class="fab fa-facebook-square fa-lg fb"></i></span>
        <span><i class="fab fa-instagram fa-lg insta"></i></span>
        <span><i class="fab fa-twitter-square fa-lg twitter"></i></span>
        </div>
    </div>
</div>
</div>`;    
            $('.content').html(sep_temp);
            var url = '?'+ Show.show_name.toString();
            var niceUrl = url.replace(" ","+");
            history.pushState(null, null, '/show' + niceUrl);
            window.onpopstate = ()=>{
              $('.cont').remove();
              $('.slick').remove();
              $('.mailing_list').remove();
              App.getData('https://gapdb.specialops.io/wp-json/acf/v3/show' , getShows);
              App.getData(siteData, renderAbout);
              App.getData(siteData, renderSideBar);
            } 
        })
        $('.content').append(container);
    } 
    
}
// const renderSideBar = (res)=>{
//     let data = res;

// } one sec
const getShows = (data)=>{
    shows = data.flat();
    localStorage.setItem("shows", JSON.stringify(shows));
    shows= localStorage.getItem("shows")
    renderShows(shows);

}
let showData = 'https://gapdb.specialops.io/wp-json/acf/v3/show';
let siteData = 'https://gapdb.specialops.io/wp-json/acf/v3/websites'
App.getData(showData , getShows);
App.getData(siteData, renderAbout);
App.getData(siteData, renderSideBar);
$.get("https://gapdb.specialops.io/wp-json/acf/v3/venue",storeVenues);
function storeVenues(data) { 
  let predata = JSON.stringify(data);
  localStorage.setItem("venues", predata);
  renderFooter();
}
function renderFooter(){
  let footerContent = localStorage.getItem("site_model");
  footerContent = JSON.parse(footerContent);
  let footer = footerContent[0].acf.footer_content;
  $(".footer").append("<p>"+footer+"</p>");
}
function intiateSlick(){
  let head = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.css"/>`;
  $(document.head).append(head);
  $('.slick').slick({
    autoplay: true,
    prevArrow: null,
    nextArrow: null,
  });
}
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
function renderSlider(){
  let sliderData = localStorage.getItem("shows");
  sliderData = JSON.parse(sliderData);
  // console.log(sliderData);
  let slick = document.createElement('div');
  $(slick).addClass('slick');
  let title = `<h2 class="title">Just Announced</h2>`
  for(var i in sliderData){
  let output ='';
  output = `<img src="${sliderData[i].acf.img_hero}">`;
    // console.log(slick)
  $(slick).append(output)
  $('.widgets').append(slick);
  }
  $('.byline').append(title);
  intiateSlick();
}