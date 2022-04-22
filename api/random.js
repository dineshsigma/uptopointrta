let randomnumbers=(length)=>{
    let characters='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let smallchar=characters.toLowerCase();
    let numbers='0123456789';
     let string=characters+smallchar+numbers;
     let id='';
     for(i=0;i<length;i++){
         id+=string.charAt(Math.floor(Math.random()*string.length));
     }
     return id;

}
module.exports={randomnumbers};