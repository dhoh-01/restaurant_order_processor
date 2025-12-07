import { DatabaseSync } from 'node:sqlite';
const db_file = 'rop.db';
let database= new DatabaseSync(db_file);

let sql= database.createTagStore();

export function get_items() {
	return database.prepare(`SELECT * from item`).all();
}

export function get_categories() {
	return database.prepare(`SELECT * from category`).all();
}

export function get_items_without_categories() {
	return database.prepare(`SELECT * from item where category_id is null`).all();
}

export function get_items_for_categories(category) {
	return database.prepare(`SELECT i.* from item i join category c on i.category_id = c.id where c.name = '${category}';`).all();
}

export function get_item_by_name(name) {
	return database.prepare(`SELECT * from item where name = '${name}'`).get();
}

export function get_item_by_id(id) {
	return database.prepare(`SELECT * from item where id = '${id}'`).get();
}

export function get_category_by_name(name) {
	return database.prepare(`SELECT * from category where name = '${name}'`).get();
}
