var renderSideBar = (data)=>{
    let Site = data[0].acf;
    let widget = document.createElement('div');
    widget.setAttribute('class','mailing_list');
    output = `<h2 class="notification title grey">Mailing List</h2>
    <div class="widget">
    <div class="emailCont">
      <h6 class="emailTitle">${Site.mailing_list_blurb}</h6>
      <input class="email" type="text" placeholder="Email Address">
      <button class="emailBtn">
        <h6>SUBMIT</h6>
      </button>
    </div>
    `;
    
    widget.insertAdjacentHTML('beforeend',output);
    $('.widgets').append(widget);
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
const getShow = (data)=>{
    var query = window.location.search;
    var newQuery =decodeURI(query);
    newQuery = newQuery.replace('+', ' ');
    newQuery = newQuery.replace('?',"")
    console.log(newQuery);
    var id = query.replace('?',"");
    var newId = id.replace('+',' ');
    console.log(newId);
    for(var i in data){
        //  console.log(data[i].acf.show_name);
        var Show = data[i].acf;
        var showName = data[i].acf.show_name;
        showName = showName.replace(/\s+$/, '');
        console.log(showName.length);
        console.log(newQuery.length);
        if( showName === newQuery){
            var sep_temp = `<div class="cont">
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
                        break;
        }
        else{
            $('.content').html('<p>No Event found...</p>');
        }
    }
}

function search(idKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].id === idKey) {
            console.log(myArray[i].acf);
            return myArray[i];
        }
    }
  }







  (()=>{
    $.get('https://gapdb.specialops.io/wp-json/acf/v3/show', getShow);
    $.get('https://gapdb.specialops.io/wp-json/acf/v3/websites',renderSideBar);
})(jQuery)