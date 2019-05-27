App = {
  init : function(perma){

      //if the sidebar should be disabled on the page. don't show it.
      //pageRouter.fetch(perma);
      //getting data running getShows
      $.get('https://gapdb.specialops.io/wp-json/acf/v3/show', getShows);
      $.get('https://gapdb.specialops.io/wp-json/acf/v3/websites', renderAbout);
      $.get('https://gapdb.specialops.io/wp-json/acf/v3/websites', getMailing);
  }
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
function renderAbout(about, req){
let
  blyine = about[1].acf;
  byline =document.createElement("div");
  byline.setAttribute('class', 'byline');
  $(byline).html(`
  <h1 class="text-uppercase">Seo Byline</h1>
  <p>Completely matrix transparent e-business before wireless sources. Seamlessly disintermediate top-line technologies for unique metrics. Uniquely simplify unique "outside the box" thinking after premier potentialities. Continually monetize focused materials rather than synergistic manufactured products. Progressively formulate integrated data after maintainable customer service.</p>
  <p>Synergistically revolutionize dynamic relationships whereas market positioning action items. Assertively e-enable pandemic partnerships via ubiquitous infrastructures. Distinctively predominate standards compliant meta-services through an expanded array of processes. Assertively harness progressive intellectual capital rather than B2C channels. Energistically recaptiualize cross-unit platforms before ethical platforms.</p>
  <a href="/about.php" class="more-btn"><h5>More Info</h5></a>`);
$('.widgets').append(byline);
}
function getMailing(siteData,req){
 let
    site = siteData[1].acf;
    console.log(site);
    mailingWidget = document.createElement("div");
    mailingWidget.setAttribute("class", 'widget');
    console.log(mailingWidget);
    $(mailingWidget).html(`<h2 class="notification title grey">Mailing List</h2>
    <div class="widget">
    <div class="emailCont">
      <h6 class="emailTitle">${site.mailing_list_blurb}</h6>
      <input class="email" type="text" placeholder="Email Address">
      <button class="emailBtn">
        <h6>SUBMIT</h6>
      </button>
    </div>
    `);
    $('.widgets').append(mailingWidget);
}
function getShows(Shows,req){

  for(var i in Shows){
      let 
          showId = Shows[i]["id"],
          Show = Shows[i].acf,
          showContainer = document.createElement("div");

      console.log(Show);

      showContainer.setAttribute("data-id",showId);
      showContainer.setAttribute("class","showCard");
      $(showContainer).html(`<div class="showCardTop">
      <div class="showImg">
        <img src="${Show.img_thumb}" />
      </div>
      <div class="showText">
        <p class="showTopline">
        ${Show.pres ? presenters(Show.pres) : Show.top_line_override}
        </p>
        <div class="showTit">
          <h3 class="showTitle">${Show.show_name}</h3>
        </div>
        <p class="support">${Show.support}</p>
      </div>
    </div>
    <div class="showCardBottom">
      <div class="showDetails">
        <p class="date">Jan 9</p>
        <p class="time">${Show.shwt}</p>
      </div>
      <div class="venueDetails">
        <p class="showVenue">${Show.venue.post_title}</p>
        <p class="showAge">
          <strong>
            <span class="age">${Show.shwt}</span>
            <span class="seating">SEATED</span>
          </strong>
        </p>
      </div>
    </div>`);

      $(".content").append(showContainer);
      console.log(showContainer);
      showContainer.addEventListener("dblclick", function(e){
          $(".content").html(`<div class="cont">
          <div class="caption">
              <div class="imgwrap">
              <div class="showCardBottom">
              <div class="showDetails">
                  <p class="date">Jan 9</p>
                  <p class="time">9:00 PM</p>
              </div>
                  <div class="venueDetails">
                          <p class="showVenue">Carnegie Library Music Hall</p>
                          <p class="showAge"><strong><span class="age">21+</span> <span class="seating">SEATED</span></strong></p>
                      </div>
                  </div>
                  <img src="${Show.img_poster}">  
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
          </div>
          <div>
    <h2 class="notification title grey">Just anounced</h2>
    <div class="jaImgs">
      <div class="row">
        <img src="https://imgplaceholder.com/260x260/ffffff/9e4242/ion-android-add-circle" alt>
        <img
          class="secImg"
          src="https://imgplaceholder.com/260x260/ffffff/9e4242/ion-android-add-circle"
          alt
        >
        <img
          class="mob"
          src="https://imgplaceholder.com/260x260/ffffff/9e4242/ion-android-add-circle"
          alt
        >
        <img
          class="mob"
          src="https://imgplaceholder.com/260x260/ffffff/9e4242/ion-android-add-circle"
          alt
        >
      </div>
      <div class="row">
        <img src="https://imgplaceholder.com/260x260/ffffff/9e4242/ion-android-add-circle" alt>
        <img
          class="secImg"
          src="https://imgplaceholder.com/260x260/ffffff/9e4242/ion-android-add-circle"
          alt
        >
        <img
          class="mob"
          src="https://imgplaceholder.com/260x260/ffffff/9e4242/ion-android-add-circle"
          alt
        >
        <img
          class="mob"
          src="https://imgplaceholder.com/260x260/ffffff/9e4242/ion-android-add-circle"
          alt
        >
      </div>
      <nuxt-link to class="more-info">
        <h5>VIEW MORE</h5>
      </nuxt-link>
    </div>
  </div>`);
      });

      //console.log(showContainer);

  }
}
$(document).ready(function(){

  App.init()

});