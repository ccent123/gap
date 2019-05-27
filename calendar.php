<!DOCTYPE html>
<html>
<head>
  <?php require("./dom_modules/imports.php")?>
</head> 
<body >
	<div class="grid">  
    <div class="header">
        <?php
    require("dom_modules/header.php");  
    ?>
    </div>
    <div class="content">
      <div id="cal"></div>
    </div>
    <div class="widgets">
    </div>
    <footer class="footer"></footer>
    <link rel="stylesheet" href="./assets/js/fullCal/core/main.css" type="text/css">
    <link rel="stylesheet" href="./assets/js/fullCal/daygrid/main.css" type="text/css">
  <script src="./assets/js/fullCal/core/main.js"></script>
  <script src="./assets/js/fullCal/daygrid/main.js"></script>
  <script src="./assets/js/calendar.js"></script>
  <script>
document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('cal');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: [ 'dayGrid' ]
  });
  calendar.render();
});

</script>
<style>
  @media screen and (max-width:460px){
    div.fc-scroller.fc-day-grid-container{
      height: 322px!important;
      overflow:hidden!important;
    }
    .fc td, .fc th {
  border-style: none !important;
}
  }
</style>
</div>
</body>
</html>