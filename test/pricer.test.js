import test from 'node:test';
import assert from 'node:assert';
import { Pricer } from '../src/pricer.js';

test('add_item adds new items correctly', () => {
    const pricer = new Pricer();
    const item = { id: 'apple', price: 10 };

    pricer.add_item(item);

    assert.strictEqual(pricer.get_count(item.id), 1);
    assert.strictEqual(pricer.price_item(item.id), 10);
});

test('add_item increments count if item already exists', () => {
    const pricer = new Pricer();
    const item = { id: 'apple', price: 10 };

    pricer.add_item(item);
    pricer.add_item(item);

    assert.strictEqual(pricer.get_count(item.id), 2);
    assert.strictEqual(pricer.price_item(item.id), 20);
});

test('get_count returns undefined for non-existent item', () => {
    const pricer = new Pricer();
    assert.strictEqual(pricer.get_count('banana'), undefined);
});

test('price_item calculates total price correctly', () => {
    const pricer = new Pricer();
    const apple = { id: 'apple', price: 10 };
    const banana = { id: 'banana', price: 5 };

    pricer.add_item(apple);
    pricer.add_item(apple);
    pricer.add_item(banana);

    assert.strictEqual(pricer.price_item(apple.id), 20);
    assert.strictEqual(pricer.price_item(banana.id), 5);
});

test('get_items returns the internal Map with all items', () => {
    const pricer = new Pricer();
    const apple = { id: 'apple', price: 10 };
    const banana = { id: 'banana', price: 5 };

    pricer.add_item(apple);
    pricer.add_item(banana);
    pricer.add_item(apple);

    const items = pricer.get_items();

    assert.strictEqual(items.get('apple'), 2);
    assert.strictEqual(items.get('banana'), 1);
    assert.strictEqual(items.size, 2);
});

