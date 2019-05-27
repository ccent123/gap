window.onload = function(){
    footer();
}

function footer(){
    var xhr = XMLHttpRequest();
    xhr.open("GET", "https://gapdb.specialops.io/wp-json/acf/v3/websites", true);
    xhr.onload = function(){
        var footer = JSON.parse(this.responseText);
        var output ='';
        output+=`
        
        `
    }
}