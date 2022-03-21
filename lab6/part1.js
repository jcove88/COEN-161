(function () {
	const resources = " http://students.engr.scu.edu/~adiaztostado/resources/";
	
	// Create an XMLHttpRequest object
	const xhttp1 = new XMLHttpRequest();
	// Handle succesful responses
	xhttp1.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			document.getElementById("sample1").innerHTML = this.responseText;
		}
	}
	// Open connection and get sample1.php 
	xhttp1.open("GET", resources + "sample1.php", true);
	xhttp1.send();

	// Create an XMLHttpRequest object
	const xhttp2 = new XMLHttpRequest();

	// Handle succesful responses
	xhttp2.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			document.getElementById("sample2").innerHTML = this.responseText;
		}
	}
	// Get sample2.php
	xhttp2.open("GET", resources + "sample2.php", true);
	xhttp2.send();
	// Create an XMLHttpRequest object
	const xhttp3 = new XMLHttpRequest();

	// Handle succesful responses
	xhttp3.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            const response = JSON.parse(this.responseText);
            const unorderedList = document.createElement("ul");
            for(let i = 0; i < response.friends.length; i++){
                const item = document.createElement("li");
                unorderedList.appendChild(item);
                item.appendChild(document.createTextNode(response.friends[i].name));            
            }
            document.getElementById("sample3").appendChild(unorderedList);
        }
    }

	// Get sample3.php
    xhttp3.open("GET", resources + "sample3.php", true);
    xhttp3.send();

})();