'use strict';

QUnit.module("Тестируем функцию mergeBy", function() {
    QUnit.test("Работает правильно с одинаковыми значениями по ключу", function(assert) {
        const array1 = [
            { id: 1, name: "Alice", tags: ["friend"] },
            { id: 2, name: "Bob", tags: ["colleague"] }
        ];
        const array2 = [
            { id: 1, age: 30, tags: ["travel"] },
            { id: 3, name: "Charlie" }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice", tags: ["friend", "travel"], age: 30 },
            { id: 2, name: "Bob", tags: ["colleague"] },
            { id: 3, name: "Charlie" }
        ]);
    });

    QUnit.test("Работает правильно с отсутствующими ключами", function(assert) {
        const array1 = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" }
        ];
        const array2 = [
            { age: 30 },
            { id: 2, age: 25 }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob", age: 25 }
        ]);
    });

    QUnit.test("Правильно работает с дубликатами", function(assert) {
        const array1 = [
            { id: 1, name: "Alice", tags: ["friend", "create", "delete"] },
            { id: 2, name: "Bob", tags: ["colleague", "friend", "family", "ready", "longlong"] }
        ];
        const array2 = [
            { id: 1, name: "Alice", age: 30, tags: ["travel", "well", "good", "bad", "create", "delete"] },
            { id: 2, name: "Bob", tags: ["colleague", "travel", "friend", "work", "family"] }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice", tags: ["friend", "create", "delete", "travel", "well", "good", "bad"], age: 30 },
            { id: 2, name: "Bob", tags: ["colleague", "friend", "family", "ready", "longlong", "travel", "work"] }
        ]);
    });

    QUnit.test("Работает правильно по другому ключу", function(assert) {
        const array1 = [
            { id: 1, name: "Alice", tags: ["friend"] },
            { id: 2, name: "Bob", tags: ["colleague"] },
            { id: 5, name: "Charlie" }
        ];
        const array2 = [
            { id: 67, name: "Alice", age: 30, tags: ["travel"] },
            { id: 3, name: "Charlie", tags: ["travel"] },
            { id: 4, name: "Diana", age: 25, tags: ["travel"] }
        ];
        const result = mergeBy(array1, array2, "name");

        assert.deepEqual(result, [
            { id: 1, name: "Alice", tags: ["friend", "travel"], age: 30 },
            { id: 2, name: "Bob", tags: ["colleague"] },
            { id: 5, name: "Charlie", tags: ["travel"] },
            { id: 4, name: "Diana", age: 25, tags: ["travel"] }
        ]);
    });

    QUnit.test("Работает правильно с пустыми массивами", function(assert) {
        const array1 = [];
        const array2 = [];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, []);
    });

    QUnit.test("Работает правильно с 1 пустым массивом", function(assert) {
        const array1 = [
            { id: 1, name: "Alice", tags: ["friend", "create", "delete"] },
            { id: 2, name: "Bob", tags: ["colleague", "friend", "family", "ready", "longlong"] }
        ];
        const array2 = [];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice", tags: ["friend", "create", "delete"] },
            { id: 2, name: "Bob", tags: ["colleague", "friend", "family", "ready", "longlong"] }
        ]);
    });
});
