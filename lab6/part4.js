(function () {
	var resources = "http://students.engr.scu.edu/~adiaztostado/resources/";

	// Load sample1.php
	$("#sample1").load(resources + "sample1.php");

	// Load sample2.php
	$("#sample2").load(resources + "sample2.php");

	// Get sample3.php
	$.get(resources + "sample3.php", function(data){
		const response = JSON.parse(data);
		const ul = $("<ul></ul>");
		$("#sample3").append(ul);

		for(let i = 0; i < response.friends.length; i++){
			ul.append("<li>" + response.friends[i].name + "</li>");
		}
	});

})();