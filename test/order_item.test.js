import test from 'node:test';
import assert from 'node:assert';
import * as dbModule from '../src/order_item.js';

function createMockDatabase(prepMap = {}) {
    return {
        prepare: (sql) => {
            if (prepMap[sql]) {
                return prepMap[sql];
            }
            return {
                all: () => [],
                get: () => null
            };
        }
    };
}

test('get_items returns all items', () => {
    const rows = [{ id: 1, name: 'Apple' }, { id: 2, name: 'Banana' }];
    const mockDb = createMockDatabase({
        "SELECT * from item": { all: () => rows }
    });

    const result = dbModule.get_items(mockDb);
    assert.deepStrictEqual(result, rows);
});

test('get_categories returns all categories', () => {
    const rows = [{ id: 1, name: 'Fruit' }];
    const mockDb = createMockDatabase({
        "SELECT * from category": { all: () => rows }
    });

    const result = dbModule.get_categories(mockDb);
    assert.deepStrictEqual(result, rows);
});

test('get_items_without_categories returns correct items', () => {
    const rows = [{ id: 3, name: 'Unknown Item' }];
    const mockDb = createMockDatabase({
        "SELECT * from item where category_id is null": { all: () => rows }
    });

    const result = dbModule.get_items_without_categories(mockDb);
    assert.deepStrictEqual(result, rows);
});

test('get_items_for_categories returns items for category', () => {
    const category = 'Fruit';
    const sql = `SELECT i.* from item i join category c on i.category_id = c.id where c.name = '${category}';`;
    const rows = [{ id: 1, name: 'Apple' }];
    const mockDb = createMockDatabase({
        [sql]: { all: () => rows }
    });

    const result = dbModule.get_items_for_categories(mockDb, category);
    assert.deepStrictEqual(result, rows);
});

test('get_item_by_name returns correct item', () => {
    const name = 'Apple';
    const sql = `SELECT * from item where name = '${name}'`;
    const row = { id: 1, name: 'Apple' };
    const mockDb = createMockDatabase({
        [sql]: { get: () => row }
    });

    const result = dbModule.get_item_by_name(mockDb, name);
    assert.deepStrictEqual(result, row);
});

test('get_item_by_id returns correct item', () => {
    const id = 1;
    const sql = `SELECT * from item where id = '${id}'`;
    const row = { id: 1, name: 'Apple' };
    const mockDb = createMockDatabase({
        [sql]: { get: () => row }
    });

    const result = dbModule.get_item_by_id(mockDb, id);
    assert.deepStrictEqual(result, row);
});

test('get_category_by_name returns correct category', () => {
    const name = 'Fruit';
    const sql = `SELECT * from category where name = '${name}'`;
    const row = { id: 1, name: 'Fruit' };
    const mockDb = createMockDatabase({
        [sql]: { get: () => row }
    });

    const result = dbModule.get_category_by_name(mockDb, name);
    assert.deepStrictEqual(result, row);
});

