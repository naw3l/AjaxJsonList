<?php
// Get post from ajax, encode to json and store in txt file
$items = $_POST;
$items = json_encode($items);
file_put_contents('items.txt', print_r($items, true));
?>