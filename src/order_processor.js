import * as readline from 'node:readline';
import { Pricer } from './pricer.js';
import * as order_item from './order_item.js';

const pricer = new Pricer();
const GST = 0.1;

function output_line(line) {
	console.log(line);
}

/*
 * This is the main loop for the order processor
 */
export function order_processor(db) {
	output_line("Welcome to the Restaurant Order Processor");
	output_line(`These are the options (enter the word done when complete):`)
	let rs = order_item.get_items_without_categories(db);
	rs.forEach(function(value) {
		output_line('- ' + value.name + ' ($' + value.price + ')')
	});
	let rs1 = order_item.get_categories(db);
	rs1.forEach(function(value) {
		output_line('- ' + value.name)
	});
	
	const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '> '});
	rl.prompt();
	rl.on("line", (line) => {
		const input = line.trim();
	
		if (input.toLowerCase() === "done") {
			rl.close();
			print_receipt({ db, pricer, order_item, GST });
			return;
		}
	
		output_line("Here is your selection: " + input);
		let category  = order_item.get_category_by_name(db, input);
		if (typeof category == 'undefined') {
			// in this case, no category is found, so it its an item
			let item = order_item.get_item_by_name(db, input);
			if(typeof item == 'undefined') {
				output_line("Unknown menu item");	
			} else {
				pricer.add_item(item);
			}
		} else {
			// in this case, this is a category
			let rs_cat = order_item.get_items_for_categories(db, input);
			rs_cat.forEach(function(value) {
				output_line('- ' + value.name + ' ($' + value.price + ')')
			});
		}
		rl.prompt();
	});
}

export function print_receipt({ db, pricer, order_item, GST }) {
	output_line("Final receipt");
	output_line("=================================");
	let items = pricer.get_items();
	let total = 0;
	items.keys().forEach((item) => {
		let item_name = order_item.get_item_by_id(db, item).name;
		let item_count = pricer.get_count(item);
		let item_price = pricer.price_item(item);
		total += item_price;
		output_line(`${item_name} x ${item_count} $${item_price}`)
	});
	let total_gst = (Math.round(total * GST * 100) / 100).toFixed(2);


	output_line("");
	output_line(`Total $${total}`);
	output_line(`Including GST ($${total_gst})`);
	output_line("=================================");
}
