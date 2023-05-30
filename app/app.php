<?php 

if($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["currency"]) && isset($_GET["product"]))
{
    $currency = $_GET["currency"];
    $product  = $_GET["product"];

    $file = file_get_contents("./json/product.json");
    $products = json_decode($file, true)[$product];

    $currencyFile = file_get_contents("./json/currency.json");
    $currencyUnit = json_decode($currencyFile, true)["currency"];

    for($i = 0; $i < count($products); $i++)
    {
        $products[$i]["currency"] = $currencyUnit[$currency];
        $products[$i]["currencyUnit"] = $currency;
    }

   echo json_encode($products);
    
}

?>