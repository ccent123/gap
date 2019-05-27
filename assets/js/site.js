
var val = 2;
let
App = {
    init: ()=>{
        //if local storage isn't populated get db
        if(localStorage.getItem("shows")==null){
          $.get("https://gapdb.specialops.io/wp-json/acf/v3/show",storeShows);
          $.get("https://gapdb.specialops.io/wp-json/acf/v3/venue",storeVenues);
          $.get("https://gapdb.specialops.io/wp-json/acf/v3/websites",storeSiteModel);  
        }
        else{
            console.log("Application started...");
            // renderShowsTemplate(val);
        }
    },

}
var seats = (data)=>{
  if(data){
    let seated = "SEATED";
    return seated;
  }
  else{
    let standing = "STANDING";
    return standing;
  }
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
//takes template and inserts to body
    function renderView(template){
        document.body.insertAdjacentHTML('afterbegin',template);
}
//renders # of shows input
//${date + ' ' + dateNum[0]}
function renderShowsTemplate(val){
    this.val = val;
    var shows = JSON.parse(localStorage.getItem("shows"));
    var venues = localStorage.getItem("venues");

    var template ='';
    var list = shows.splice(0,val);
    for(var i in list){
        let Show = list[i].acf;
        let date = Show.date;
        let dateNum = '';
        dateNum = date.match(/[0-9]+/g);
        date = date.substring(0,3);
        let showCard = document.createElement("div");
        showCard.setAttribute('class',"showCard");
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
        template =  `<div class="showCardTop">
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
        <div class="venueDetails"  style="background-color:${color}">
          <p class="showVenue">${Show.venue.post_title}</p>
          <p class="showAge">
            <strong>
              <span class="age">${Show.ages}</span>
              <span class="seating">${seats(Show.seats)}</span>
            </strong>
          </p>
        </div>
      </div>`;
      showCard.insertAdjacentHTML("beforeend",template);
      history.pushState(null, null, '/');
      //single page event
      showCard.addEventListener('click', function(){ 
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
            renderShowsTemplate(val);
          } 
      })
    $('#skeleton').remove();
    $('.content').append(showCard);
    }
    loadMore();
}
function renderFooter(){
    let footerContent = JSON.parse(localStorage.getItem("site_model"));
    let footer = footerContent[0].acf.footer_content;
    $(".footer").append("<p>"+footer+"</p>");
  }
function renderSideBar() {
    var sideBarOrder = JSON.parse(localStorage.getItem("site_model"));
    var order = sideBarOrder[0].acf.home_widgets.widgets;   
    for(var i in order){
        console.log(order[i]);
        switch(order[i]){

            case'home_ad':
                renderAbout();
                break;
            case'just_announced_slider':
                JustAnouncedSlider();
                console.log("triggered");
                break;
            case'twitter':
              twitter();
              break;
        }
    }
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
    }
var JustAnouncedSlider = ()=>{
  let head = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.css"/>`;
  $(document.head).append(head);
  let sliderData = localStorage.getItem("shows");
  sliderData = JSON.parse(sliderData);
  sliderData = sliderData.splice(0,5);
  // console.log(sliderData);
  let slick = document.createElement('div');
  $(slick).addClass('slick');
  for(var i in sliderData){
  let output ='';
  output = `<img src="${sliderData[i].acf.img_hero}">`;
    // console.log(slick)
  $(slick).append(output)
  $('.widgets').append(slick);
  }
  $(".widgets").append(slick);
  $('.slick').slick({
    dots: true,
    autoplay: true,
    prevArrow: null,
    nextArrow: null,
  });
}
function twitter(){
  let twitter= "";
  twitter+=`<a class="twitter-timeline" data-theme="dark" href="https://twitter.com/GreyAreaPGH?ref_src=twsrc%5Etfw" data-tweet-limit="5">Tweets by GreyAreaPGH</a> <script src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`;
  $('.widgets').append(twitter);
}     
function loadCSS(){
  let twitterCss = `<link rel="stylesheet" href="twitter.css">`;
  document.head.insertAdjacentHTML('beforeend', twitterCss);
}
//load more function for showslist
var loadMore = ()=>{
  var loadMore = document.createElement("button");
  $(loadMore).attr('id','load-more');
  $(loadMore).append('<h5>More Shows</h5>');
  $('.content').append(loadMore);
  $("#load-more").click(()=>{
    $(".content").html("")
    renderShowsTemplate(val+2);
})}
//Storage Functions
function storeShows(data){
    let shows = localStorage.setItem("shows", JSON.stringify(data));
    renderShowsTemplate(val);
}
function storeVenues(data){
    let venues = JSON.stringify(data)
    localStorage.setItem("venues", venues);
}
function storeSiteModel(data){
    let siteModel = JSON.stringify(data);
    localStorage.setItem("site_model", siteModel);
    renderSideBar();
    
}

//on document load do these things 
$(window).ready(()=>{
App.init();
renderShowsTemplate(val);
renderFooter();
renderSideBar();
// loadMore();
});
