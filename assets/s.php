<?require "vendor/leafo/scssphp/scss.inc.php";
$scss = new scssc();

$scssIn = file_get_contents(__DIR__ . '/css/scss/mycss.scss');
$cssOut = $scss->compile($scssIn);
file_put_contents(__DIR__ . '/css/mycss.css', $cssOut);
?>
