import * as readline from 'node:readline';
import { get_items_without_categories } from './order_item.js';
import { Pricer } from './pricer.js';
import * as order_item from './order_item.js';

const pricer = new Pricer();
const GST = 0.1;

export function show_options() {
	console.log(`These are the options:`)
	let rs = get_items_without_categories();
	rs.forEach(function(value) {
		console.log('- ' + value.name + ' ($' + value.price + ')')
	});
	
	const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '> '});
	rl.prompt();
	rl.on("line", (line) => {
		const input = line.trim();
	
		if (input.toLowerCase() === "done") {

		}

		if (input.toLowerCase() === "done") {
			rl.close();
			print_receipt();
			return;
		}
	
		console.log("Here is your selection: ", input);
		let item = order_item.get_item_by_name(input);
		if(typeof item == 'undefined') {
			console.log("Unknown menu item");	
		} else {
			pricer.add_item(item);
		}
		rl.prompt();
	});
}

export function print_receipt() {
	console.log("Final receipt");
	console.log("=================================");
	let items = pricer.get_items();
	let total = 0;
	items.keys().forEach((item) => {
		let item_name = order_item.get_item_by_id(item).name;
		let item_count = pricer.get_count(item);
		let item_price = pricer.price_item(item);
		total += item_price;
		console.log(`${item_name} x ${item_count} $${item_price}`)
	});
	let total_gst = total * GST;

	console.log("");
	console.log(`Total $${total}`);
	console.log(`Including GST ($${total_gst})`);
	console.log("=================================");
}
