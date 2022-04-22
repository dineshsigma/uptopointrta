let express =require('express');
let bodyParser=require('body-parser');
let mysql=require('mysql');
let cors=require('cors');
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

const crypto = require('crypto');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'dinesh',
    password : 'dineshg',
    database : 'uptopointrta'
  });
  connection.connect(function(err){
    if(!err) {
        console.log("Database is connected");
    } else {
        console.log("Error while connecting with database");
    }
  });



/*
//1.Register Table create(user details)
 var sql="create table Register(id int not null auto_increment,\
          firstname varchar(30),lastname varchar(30),email varchar(30),\
          password varchar(100),telephone varchar(20), primary key(id) )";

 //2.Categories table craete
 var sql="create table Categories(id int not null auto_increment,\
          category varchar(20),items varchar(20),quantity int,price int,primary key(id))" ;

 //3.location table
 var sql="create table Location(id int not null auto_increment,email varchar(256),\
          city varchar(20),area varchar(20),pincode varchar(20),phonenumber varchar(20),primary key(id))";

 //4.Marketing_coupons
 var sql="create table Marketing_coupons(id int not null auto_increment ,name varchar(20),code int ,discount int ,\
         varchar(20),minimumTotal int,primary key(id))";

//5.checkout table
 var sql="create table checkout(checkid int not null auto_increment,id int not null,listofitems  varchar(256),\
          primary key(checkid),foreign key(id) references Register(id))";

 //6.order details table
var sql="create table orderdetails(bookingid int not null auto_increment,id int not null,bookingDate date,\
        delivaryDate date,paymentReceived boolean,paymentMethod varchar(20),address varchar(50),items varchar(20),\
        delivered boolean,primary key(bookingid),foreign key(id) references Register(id) )";

//7.sal order table creation
var sql="create table salorders(id int not null auto_increment ,category varchar(20),\
        Location varchar(20),customerName varchar(20),Type varchar(10),\
        OrderType varchar(10), OrderDate date,status varchar(10),\
        payment int,total double,primary key(id)  ,Foreign key(category) references Menu_items(category) on update cascade )";


 //8.Menu_items table
 var sql="create table Menu_items(int not null auto_increment,image longblob,name varchar(20),\
          category varchar(20),price int,stockquantity int ,quantity int,primary key(id))";

//
//9.login
var sql="create table Login (id int not null auto_increment ,email varchar(100),password varchar(100),primary key(id))";

//10.cancel table by cancel payment
var sql="create table cancel(cancelid int not null auto_increment,paymentReferneceid int,\
         id int,refundStatus boolean,refundReferenceid int,refundAmount int,listofitems varchar(20),\
         reason varchar(20),bookingdate date,bookingid int,cancelReqdate date,cancelCharges int,\
        primary key(cancelid),foreign key(bookingid) references orderdetails(bookingid),foreign key(id) references Register(id))";

 //11.vegetrain table

 var sql="create table vegetrain(vegid int not null,vegfood varchar(20),primary key(vegid))";

 //12.nonvegetrain
 var sql="create table nonvegetrain(nonvegid int not null auto_increment,nonvegfood varchar(20),primary key(nonvegid))";
*/
//var sql="alter table Register add column accessLevel int";

//var sql="create table items (bookingid int not null auto_increment ,id int ,quantity int ,primary key(id),foreign key(bookingid) references orderdetails(bookingid),foreign key(id) references Menu_items(id) )"
//var sql="create table items (bookingid int not null auto_increment ,id int ,quantity int ,primary key(bookingid),foreign key(bookingid) references orderdetails(bookingid),foreign key(id) references Menu_items(id) )"

//var sql="create table items(bookingid int ,id int,quantity int,bookingtime int not null ,primary key(bookingtime),foreign key(id) references Menu_items(id),foreign key(bookingid) references orderdetails(bookingid) )"

//var sql="alter table Menu_items  add location varchar(20) after name";

//var sql="alter table Categories add area varchar(20) after category"

//var sql="create table customers(customerid int not null auto_increment,fullname varchar(30),email varchar(30),telephone varchar(20),dateRegistered date,primary key(customerid))";

//var sql="create table contact_info(con_id int not null auto_increment ,address varchar(50),pincode int ,email varchar(30),phonenumber varchar(20),primary key(con_id))";

//var sql="create  table logotable(id int not null auto_increment ,logoimages varchar(100),primary key(id)) "
//var sql="alter table Location add column category blob";
//var sql="alter table Categories  drop column quantity";
//var sql="alter table Categories add column price int"
//var sql="create table category(id int not null auto_increment,area varchar(20),category varchar(20),primary key(id),foreign key(id) references Location(id) on delete cascade on update cascade)";
//var sql="drop table Menu;"
//var sql="alter table Categories add foreign key(id) references Location(id) on delete cascade on update cascade "
//var sql="create table cat(id int not null,area varchar(20),categories varchar(20), constraint Location_id_fk fo
//reign key(area) references Location(id) on delete cascade on update cascade) ";

//var sql="create table location(id int not null auto_increment,email varchar(20),city varchar(20),area varchar(20),pincode int,phonenumber varchar(20),primary key(id))";
//var sql="create table categories(id int not null auto_increment,area int, category varchar(20),items int,quantity int,price int,primary key(id),foreign key(area) references location(id)  on delete cascade)";

//var sql="alter table categories add   foreign key(area) references location(id)  on delete cascade"

//var sql="alter table Categories  add column cat_seq int(3)";
//var sql="alter table Menu_items  add  custom boolean";
//var sql="alter table  Categories add Foreign key(loc_id) references Location(loc_id) on delete cascade";
//var sql="alter table  Orders add  column  total int ";

//var sql="create table Orders(ord_id  int  not null auto_increment, user_id varchar(250) ,  bookingDate date,delivaryDate date,paymentMethod varchar(20),paymentReferenceId int, paymentReceived boolean,address varchar(50),items varchar(1000) ,delivered boolean , primary key(ord_id))";

   //var sql="alter table orderdetails modify column bookingid  int to ord_id int"
//var sql="alter table Orders drop column token"
  // var sql="alter table Orders modify column user_id varchar(250)";
  //var sql="alter table support modify column sup_id varchar(250)";
  //var sql="alter table  Location add  status   boolean after  city";
 //var sql="alter table Register change column lastname name varchar(20)"
//var sql="alter table  notification modify  user_id  varchar(20)"
var sql="alter table coupons add column validFrom  varchar(150) after codecondition;"
//var sql="create table notification (user_id int ";
//var sql="create table notification (user_id  int not null auto_increment,notification_id  varchar(256),primary key(user_id))";
//var sql="alter table suppportcontact rename to supportcontact"
//var sql="create table support (sup_id  int not null auto_increment,email varchar(20),mobNumber  varchar(20), reservationNum varchar(20),start_At time ,end_At time,supportNum varchar(20), address varchar(20)  ,primary key(sup_id))"

//var sql="create table suppportcontact(supcon_id int not null auto_increment,name varchar(20),email varchar(20),telephone varchar(20),category varchar(20),ord_id varchar(20),text varchar(100),timeslot time,primary key(supcon_id))"
//var sql="create table  Staff(staff_id int not  null auto_increment,name varchar(20),dateofbirth date,staffRole varchar(20),joiningDAte date,lastlogin date,accessLevel boolean,primary key(staff_id))"
//var sql="create table status(  sta_id int not null auto_increment,status boolean,primary key(sta_id)) ";
//var sql="create table coupons(code int not null auto_increment,coupimg varchar(100),items varchar(1000),discount int ,codecondition varchar(100),validupto date,discription varchar(200),minimumTotal int,primary key(code) )";
connection.query(sql,(error,results,fields)=>{
if(error){

  console.log(error)

}
else{

  console.log("table is created ");
}
})

app.listen(1475);
console.log("server is running at port no:");
