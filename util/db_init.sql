create table category ( id int primary key, name varchar(128));
create table item (id int primary key, category_id int, name varchar(128), price decimal(10,2));
insert into item values (1,null,'Cheeseburger',15);
insert into item values (2,null,'Chicken burger',20);
insert into item values (3,1,'Soft Drink (small)',4);
insert into item values (4,1,'Soft Drink (large)',5);
