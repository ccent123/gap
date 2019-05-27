window.onload = function() {
    intiateSlick();
    renderVenues();
    renderSlider();
    renderFooter();
};
 
    function renderSideBar(){
      let Site = JSON.parse(localStorage.getItem("site_model"));
      let siteAccess = Site;
      console.log(siteAccess[0].acf);
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
      widget.insertAdjacentHTML('beforeend',output);
      $('.widgets').append(widget);
  }
  
function renderVenues() {
      let venues = localStorage.getItem('venues');
      venues = JSON.parse(venues)
      //console.log(venues);
      let list = "";
      for (let i in venues) {
        console.log(venues[i]);
        list += ` <div class="venue">
      <div class="venImg">
        <img src="https://picsum.photos/300/" alt>
      </div>
      <div class="venTxt">
        <h5 class="title" style="background-color: ${venues[i].acf.color}">${
          venues[i].acf.venue_name
        }</h5>
        <a href="#">
        <p>${venues[i].acf.address}</p>
        <p>${venues[i].acf.city + "," + venues[i].acf.zip}</p>
        </a>
        <a href="#">
        <p>${venues[i].acf.phone}</p>
        </a>
        <div class="soc_icons_ven">
          <span>
            <i class="fas fa-globe-americas fa-sm fb"></i>
          </span>
          <span>
            <i class="fab fa-facebook-square fa-sm fb"></i>
          </span>
          <span>
            <i class="fab fa-instagram fa-sm insta"></i>
          </span>
          <span>
            <i class="fab fa-twitter-square fa-sm twitter"></i>
          </span>
        </div>
      </div>
    </div>`;
      }
      document.getElementsByClassName("venue_list")[0].innerHTML += list;
    }
    function intiateSlick(){
      let head = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.css"/>`;
      $(document.head).append(head);
      $('.slick').slick({
        autoplay: true,
        prevArrow: null,
        nextArrow: null,
        adaptiveHeight: false,
      });
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
      document.getElementsByClassName('slick')[0].insertAdjacentHTML("beforebegin", title);
      intiateSlick();
      renderSideBar();
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
  // renderSlider();
  // renderSideBar();
  }
  function renderFooter(){
    let footerContent = localStorage.getItem("site_model");
    footerContent = JSON.parse(footerContent);
    let footer = footerContent[0].acf.footer_content;
    $(".footer").append("<p>"+footer+"</p>");
  }