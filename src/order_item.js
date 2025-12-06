import { DatabaseSync } from 'node:sqlite';
const db_file = 'rop.db';
let database= new DatabaseSync(db_file);

let sql= database.createTagStore();


let items = new Map();
let categories = new Map();

export function init() {
	database = new DatabaseSync(db_file);
	sql = db.createTagStore();
	
	populate_items();
	populate_categories();
}

function populate_items() {
	let rs = sql.all(`
		SELECT * from item;
	`);
	rs.forEach(function(value) {
		console.log(value)
		items.set(value.id, value);
	});
}

function populate_categories() {
	let rs = sql.all(`
		SELECT * from category;
	`);
	rs.forEach(function(value) {
		console.log(value)
		categories.set(value.id, value);
	});
}

export function get_items() {
	return Array.from(items.values());
}

export function get_categories() {
	return Array.from(categories.values());
}

export function get_items_without_categories() {
	return database.prepare(`SELECT * from item`).all();
}

export function get_items_for_categories(category) {
	let rs = sql.all(`
		SELECT * from item where category = ${category};
	`);
	rs.forEach(function(value) {
		console.log('test ' + value)
		categories.set(value.id, value);
	});
}

export function get_item_by_name(name) {
	return database.prepare(`SELECT * from item where name = '${name}'`).get();
}

export function get_item_by_id(id) {
	return database.prepare(`SELECT * from item where id = '${id}'`).get();
}
