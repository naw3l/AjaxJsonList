<?php
// Get data
$newdata	   = [];
$sendnew	   = [];
$data		   = $_POST['data_edit'];
$desc		   = $_POST['desc_edit'];
$id			   = $_POST['id_edit'];
// Fix index
$id			   = $id - 1;
$src		   = $_POST['src_edit'];
// Post image
if(isset($_FILES["img_edit"]["type"])){
	$extensions = array("gif", "jpg", "png");
	$temporary 	= explode(".", $_FILES["img_edit"]["name"]);
	$extension 	= end($temporary);
	if((($_FILES["img_edit"]["type"] == "image/png") || ($_FILES["img_edit"]["type"] == "image/jpg") || ($_FILES["img_edit"]["type"] == "image/jpeg") || ($_FILES["img_edit"]["type"] == "image/gif")) && in_array($extension, $extensions)) {
			$source = $_FILES["img_edit"]["tmp_name"];
			$target = "imgs/".$_FILES["img_edit"]["name"];
			move_uploaded_file($source,$target);
	}
}
// Replace data and send it
$data		   	 = json_decode($data);
$object 	   	 = new stdClass();
$object->desc  	 = $desc;
if($target){
	$object->img   	 = $target;
}else{
	$object->img   	 = $src;
}
$data[$id] 	= $object;
$newdata['send'] 	= $data;
$newdata = json_encode($newdata);
file_put_contents('items.txt', print_r($newdata, true));
$sendnew = [$desc, $target];
?>