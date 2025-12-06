export class Pricer {
	constructor() {
		this.totals = 0;
		this.items = new Map();
		this.item_price = new Map()
	}

	add_item(item) {
		if(this.items.has(item.id)) {
			let count = this.items.get(item.id);
			count++;
			this.items.set(item.id, count);
		} else {
			this.items.set(item.id, 1);
			this.item_price.set(item.id, item.price)
		}
	}

	get_count(item) {
		return this.items.get(item);
	}

	price_item(item) {
		return this.items.get(item) * this.item_price.get(item);
	}

	calculate_gst() {
	
	}

	get_items() {
		return this.items;
	}

	get_total() {

	}
}
