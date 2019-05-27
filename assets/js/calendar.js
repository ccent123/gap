$(document).ready(()=>{
    renderSlider();
    renderWidgets();
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
})(jQuery)