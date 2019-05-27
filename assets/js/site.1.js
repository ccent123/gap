window.onload = function() {
  one();
  two();
};
function renderSep(){
  
}
function one() {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", "https://gapdb.specialops.io/wp-json/acf/v3/show", true);
  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      var list = JSON.parse(this.responseText);
      var output = "";
      for (var i in list) {
        var pres = list[i].acf.pres;
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


        console.log(list[i].acf);

        output += ` <div class="showCard" data-id="${[i]}">
        <div class="showCardTop">
          <div class="showImg">
            <img src="${list[i].acf.img_thumb}" />
          </div>
          <div class="showText">
            <p class="showTopline">
            ${list[i].acf.pres ? presenters(pres) : list[i].acf.top_line_override}
            </p>
            <div class="showTit">
              <h3 class="showTitle">${list[i].acf.show_name}</h3>
            </div>
            <p class="support">${list[i].acf.support}</p>
          </div>
        </div>
        <div class="showCardBottom">
          <div class="showDetails">
            <p class="date">Jan 9</p>
            <p class="time">${list[i].acf.shwt}</p>
          </div>
          <div class="venueDetails">
            <p class="showVenue">${list[i].acf.venue.post_title}</p>
            <p class="showAge">
              <strong>
                <span class="age">${list[i].acf.shwt}</span>
                <span class="seating">SEATED</span>
              </strong>
            </p>
          </div>
        </div>
      </div>`;
      document.getElementsByClassName("content")[0].innerHTML = output;
      }
    }
  };
  xhr.send();
}
function two() {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", "https://gapdb.specialops.io/wp-json/acf/v3/websites", true);
  xhr.onload = function() {
    if (this.status == 200) {
      var site = JSON.parse(this.responseText);
      var byline = "";
      var blurb = "";
      let customCss = "";
      customCss += `<style>${site[1].acf.custom_css.custom_css}</style>`;
      byline += `<div class="byline">
      <h1>${site[1].acf.seo_byline}</h1>
      <p>${site[1].acf.about_gap}</p>
      <a href="./about.php" class="more-btn"><h5>More Info</h5></a>
      </div>`;
      blurb += `
      <h2 class="notification title grey">Mailing List</h2>
    <div class="widget">
    <div class="emailCont">
      <h6 class="emailTitle">${site[1].acf.mailing_list_blurb}</h6>
      <input class="email" type="text" placeholder="Email Address">
      <button class="emailBtn">
        <h6>SUBMIT</h6>
      </button>
    </div>`;
      document.getElementsByClassName("widgets")[0].innerHTML = byline + blurb;
      document.getElementsByTagName("head")[0].innerHTML += customCss;
    }
  };
  xhr.send();
}
