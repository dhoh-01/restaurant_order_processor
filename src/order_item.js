export function get_items(database) {
	return database.prepare(`SELECT * from item`).all();
}

export function get_categories(database) {
	return database.prepare(`SELECT * from category`).all();
}

export function get_items_without_categories(database) {
	return database.prepare(`SELECT * from item where category_id is null`).all();
}

export function get_items_for_categories(database, category) {
	return database.prepare(`SELECT i.* from item i join category c on i.category_id = c.id where c.name = '${category}';`).all();
}

export function get_item_by_name(database, name) {
	return database.prepare(`SELECT * from item where name = '${name}'`).get();
}

export function get_item_by_id(database, id) {
	return database.prepare(`SELECT * from item where id = '${id}'`).get();
}

export function get_category_by_name(database, name) {
	return database.prepare(`SELECT * from category where name = '${name}'`).get();
}
