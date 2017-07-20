$("#edititem").on('submit',(function(e) {
	$.ajax({
		url: 'edit.php',
		type: 'POST',
		data: new FormData(this),
		contentType: false,      
		cache: false,            
		processData:false,       
		success: function(data){
			$('#items ul').html('');
			getList();
			$('#form').hide();
		}
	});
	e.preventDefault();
}));
$("#additem").on('submit',(function(e) {
	$.ajax({
		url: 'add.php',
		type: 'POST',
		data: new FormData(this),
		contentType: false,      
		cache: false,            
		processData:false,       
		success: function(data){
			var count = $('#count').html();
			count = parseInt(count);
			$('#count').html(count + 1);
			data = JSON.parse(data);
			$('#items ul').append('<li id="'+count+'" class="column" draggable="true"><div class="delete">Delete</div><div class="edit">Edit</div><p>'+data[0]+'</p><img src="'+data[1]+'"></li>').draggable;
			$('#form').hide();
		}
	});
	e.preventDefault();
}));
function getList(){
	// Start counter
	var count = 0;
	// Get item lists, add them and count them
	$.ajax({ 
		type: 'GET', 
		url: 'items.txt', 
		dataType: 'json',
		success: function (data) {
			data = data['send'];
			$('#data_add').val(JSON.stringify(data));
			$('#data_edit').val(JSON.stringify(data));
			// Append items and update counter
			$.each(data, function(index, element) {
				++count;
				$('#items ul').append('<li id="'+count+'" class="column" draggable="true"><div class="delete">Delete</div><div class="edit">Edit</div><p>'+element.desc+'</p><img class="list_img" src="'+element.img+'"></li>').draggable;
				$('#count').html(count);
			});
		},
		error: function() {
			console.log('error');
		}
	});
}
function deleteItem(item){
	// Get real index of item
	item = parseInt(item) - 1;
	// Get stored array from file
	$.ajax({ 
		type: 'GET', 
		url: 'items.txt', 
		dataType: 'json',
		success: function (data) {
			// Access stored array, delete item 
			data = data['send'];
			var items = data;
			items.splice(item, 1);
			$.ajax({ 
				type: 'POST', 
				url: 'write.php', 
				data: {send: items},
				success: function (data) {
					// Update counter
					var count = $('#count').html();
					$('#count').html(parseInt(count) - 1);
				},
				error: function() {
					console.log('Error!');
				}
			});
		},
		error: function() {
			console.log('Error!');
		}
	});
}
$(document).ready(function() {
	getList();
});
// On click function to delete
$(document).on('click', '.delete', function(){ 
	var item = $(this).parent().attr('id');
	$(this).parent().remove();
	deleteItem(item);
}); 
// Show form for edit
$(document).on('click', '.edit', function(){ 
	var item = $(this).parent().attr('id');
	var desc = $(this).next('p').html();
	var img  = $(this).parent().find('img.list_img').attr('src');
	$('#id_edit').val(item);
	$('#src_edit').val(img);
	$('#img_sample').attr('src', img);
	$('#desc_edit').html(desc);
	$('#edititem').show();
	$('#additem').hide();
	$('#form').show();
});
// Show form for add
$(document).on('click', '#add', function(){ 
	$('#additem').show();
	$('#edititem').hide();
	$('#form').show();
});