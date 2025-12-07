# Design
The initial design of the basic order processor flow looks like this

```
START
  v
Choose an item <- - - - - - - -
  v                           |
Display the item chosen       |
  v                           |
Done selected? N> - - - - - - -
  Yv
print receipt
```

## db table
Based on this we can see the need for 2 DB tables, category and item. 
```
------------------------------------------------------
Category           |
------------------------------------------------------
id int PK          |
name varchar(128)  |
------------------------------------------------------

and 

------------------------------------------------------
Item               |
------------------------------------------------------
id int PK          |
category_id int    | this may be null
name varchar(128)  |
price decimal(10,2)|
------------------------------------------------------
```
Note about the category_id in the item, this represents both the category that the item is in, and also implies the level of the item. This is a field that may have a null value, or a value that corresponds to the id on the category table. A null value implies that the item is in its own level, such as being a cheese burger, and not in a sub level, such as being a large/small drink

