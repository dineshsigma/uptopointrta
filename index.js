
/*
<!--!DOCTYPE html>
<html lang="en">
<head>
    <title>Upload Images to Server</title>
    <meta charset="utf-8">

</head>
<body>

<h1>Upload Image</h1>
<form action="http://localhost:3000/api/app/menuitems/insert" method="POST" enctype="multipart/form-data"  >



        <input type="file" accept="image/*" name="image" >
        <input type="submit" value="upload">
</form>


</body>
</html-->

*/

const uppercaseWords = str => str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase());
console.log(uppercaseWords('hello-world'))

// Example
uppercaseWords('hello world'); 
