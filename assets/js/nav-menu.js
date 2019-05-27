jQuery(document).ready(()=>{
    $('#toggle').on('click',()=>{
      $('.mobile-nav').addClass('showNav')})
    $('#close').on('click',()=>{
         $('.mobile-nav').removeClass('showNav')})
  })(jQuery)
  
  