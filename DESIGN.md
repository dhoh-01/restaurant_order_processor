# Design
The basic order processor flow looks like this

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

Based on this flow, we will need the following modules:
- order_item
	this handles the details of the order item, including the name and the price
- pricer
	this handles the pricing of the items, the price totals, and the GST
- display_formatter
	this handles the display and formatting of the output

## order_item
This module handles the order items. It contains the following information
- name of item
- price of item
- item details
- item category

### db table
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

### functions needed
- basic getters and setters
- get_items
- get_categories
- get_items_for_categories

## pricer
This module handles the pricing of the items and tracks the items

### db table
none needed

### functions needed
- add_item
- price_items
- calculate_gst
- get_items
- get_total
- get_gst

## display_formatter
This module handles the formatting of the display

### db table
none needed

### functions needed
- show_options
- print_selected_item
- print_receipt
