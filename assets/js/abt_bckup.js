$(".thumb").click(function(e) {
    var imgUrl = $(this).attr("src");
    $("#img").css({ backgroundImage: "url(" + imgUrl + ")" });
  
    // return false;
  });
  window.onload = function() {
      renderAbout();
    renderWidgets();
  };
  function renderAbout(){
      let Site = JSON.parse(localStorage.getItem("site_model"));
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "https://gapdb.specialops.io/wp-json/acf/v3/websites",true);
      xhr.onload = function(){
          if(this.status == 200){
              var about = JSON.parse(this.responseText);
              var gallery = "";
              var about_sect = "";
              gallery = `  <div class="gallery">
              <div class="thumbnails">
                <div class="row">
                  <img src="${about[0].acf.gallery[0].sizes.thumbnail}" class="thumb">
                  <img src="${about[0].acf.gallery[1].sizes.thumbnail}" class="thumb">
                  <img src="${about[0].acf.gallery[2].sizes.thumbnail}" class="thumb">
                  <img src="${about[0].acf.gallery[3].sizes.thumbnail}" class="thumb">
                </div>
                <div class="row">
                  <img src="${about[0].acf.gallery[4].sizes.thumbnail}" class="thumb">
                  <img src="${about[0].acf.gallery[5].sizes.thumbnail}" class="thumb">
                  <img src="${about[0].acf.gallery[6].sizes.thumbnail}" class="thumb">
                  <img src="${about[0].acf.gallery[7].sizes.thumbnail}" class="thumb">
                </div>
                <div class="row">
                  <img src="${about[0].acf.gallery[8].sizes.thumbnail}" class="thumb">
                  <img src="${about[0].acf.gallery[9].sizes.thumbnail}" class="thumb">
                  <img src="${about[0].acf.gallery[10].sizes.thumbnail}" class="thumb">
                  <img src="${about[0].acf.gallery[11].sizes.thumbnail}" class="thumb">
                </div>
              </div>
              <div id="img"></div>
            </div>`;
              about_sect += `  <h1 class="aboutTitle">${about[0].acf.heading}</h1>
              <div class="aboutTxt">
                <div class="aboutPara">
                  <p>${about[0].acf.about}</p>
                </div>
              </div>
            </div>`;
              document.getElementsByClassName("content")[0].innerHTML += gallery;
              document.getElementsByClassName("content")[0].innerHTML += about_sect;
          }
      }
      xhr.send();
  }
  function renderWidgets() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./assets/json/website.json",true);
    xhr.onload = function(){
        if(this.status == 200){
            var widgets = JSON.parse(this.responseText);
            var mailingWidget = "";
            mailingWidget += `  <div class="widget">
            <h2 class="notification title grey">Mailing List</h2>
            <div class="emailCont">
              <h6 class="emailTitle">${widgets[1].acf.mailing_list_blurb}</h6>
              <input class="email" type="text" placeholder="Email Address">
              <button class="emailBtn">
                <h6>SUBMIT</h6>
              </button>
            </div>`;
            document.getElementsByClassName("widgets")[0].innerHTML = mailingWidget;
        }
    }
    xhr.send();
  }
  