import { test, describe, it } from "node:test";
import assert from "node:assert";
import { print_receipt } from '../src/display_formatter.js';

test("display_formatter.js/print_receipt() prints the correct formated output", async () => {
	const printed = [];
	const originalLog = console.log;
	console.log = (line) => printed.push(line);

	const pricer = {
		get_items: () => new Map([['item1', 1], ['item2', 2]]),
		get_count: () => 1,
		price_item: (id) => id === 'item1' ? 10 : 20
	};

	const order_item = {
		get_item_by_id: (db, id) => ({ name: id === 'item1' ? 'Apples' : 'Bananas' })
	};

	const GST = 0.1;

	print_receipt({ pricer, order_item, GST });

	assert.deepStrictEqual(printed, [
		"Final receipt",
		"=================================",
		"Apples x 1 $10",
		"Bananas x 1 $20",
		"",
		"Total $30",
		"Including GST ($3.00)",
		"================================="
	]);
	console.log = originalLog ;
})
