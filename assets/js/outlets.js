window.onload = function(){
    renderOutlets();
}

function renderOutlets(){
            var outletData = localStorage.getItem("site_model");
            outletData = JSON.parse(outletData);
            var outletList = outletData[0].acf.outlets.flat();
            console.log(outletList);
            var outlets ="";
            for(var i in outletList){
                outlets += `
                <div class="outlet">
                <h3>${outletList[i].name}</h3>
                <div class="infoWrap">
                  <div class="outletInfo">
                    <a href>
                      <p>${outletList[i].address}</p>
                      <p>${outletList[i].address_2}</p>
                      <p>${outletList[i].city + ',' + outletList[i].state + ',' + outletList[i].zip}</p>
                    </a>
                    <br>
                    <a>${outletList[i].phone_number}</a>
                    <a>${outletList[i].website}</a>
                  </div>
                  <div class="hours">
                    <h6>Hours</h6>
                    <p>Mon-Fri: 8am-9pm</p>
                    <p>Sat: 12PM-5PM</p>
                    <p>SUN: CLOSED</p>
                  </div>
                </div>
              </div>`;
            }
            document.getElementsByClassName('outlet_list')[0].innerHTML = outlets;
            renderSlider();
          }
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
          function intiateSlick(){
            let head = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.css"/>`;
            $(document.head).append(head);
            $('.slick').slick({
              autoplay: true,
              adaptiveHeight: false,
              prevArrow: null,
              nextArrow: null,
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
            renderFooter();
          }
          function renderFooter(){
            let footerContent = localStorage.getItem("site_model");
            footerContent = JSON.parse(footerContent);
            let footer = footerContent[0].acf.footer_content;
            $(".footer").append("<p>"+footer+"</p>");
          }