<?php
$newdata	   = [];
$sendnew	   = [];
$data		   = $_POST['data_add'];
$desc		   = $_POST['desc_add'];
if(isset($_FILES["img_add"]["type"])){
	$extensions = array("gif", "jpg", "png");
	$temporary 	= explode(".", $_FILES["img_add"]["name"]);
	$extension 	= end($temporary);
	if((($_FILES["img_add"]["type"] == "image/png") || ($_FILES["img_add"]["type"] == "image/jpg") || ($_FILES["img_add"]["type"] == "image/jpeg") || ($_FILES["img_add"]["type"] == "image/gif")) && in_array($extension, $extensions)) {
			$source = $_FILES["img_add"]["tmp_name"];
			$target = "imgs/".$_FILES["img_add"]["name"];
			move_uploaded_file($source,$target);
	}
}
$data		   = json_decode($data);
$object 	   = new stdClass();
$object->desc  = $desc;
$object->img   = $target;
array_push($data,$object);
$newdata['send'] = $data;
$newdata = json_encode($newdata);
file_put_contents('items.txt', print_r($newdata, true));
$sendnew = [$desc, $target];
print_r(json_encode($sendnew));
?>