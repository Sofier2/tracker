const { addNeed, updateCounter, getNeeds, setNeeds } = require('../../app');

beforeEach(() => {
    // створюємо фейковий DOM
    document.body.innerHTML = `
        <input id="needInput" />
        <ul id="needList"></ul>
        <span id="count"></span>
    `;
    setNeeds([]);
});

test('додає нову потребу', () => {
    document.getElementById("needInput").value = "Test";

    addNeed();

    expect(getNeeds().length).toBe(1);
});

test('не додає пусту потребу', () => {
    document.getElementById("needInput").value = "";

    addNeed();

    expect(getNeeds().length).toBe(0);
});

test('оновлює лічильник', () => {
    setNeeds(["A", "B"]);

    updateCounter();

    expect(document.getElementById("count").textContent).toBe("2");
});

test('очищає input після додавання', () => {
    document.getElementById("needInput").value = "Test";

    addNeed();

    expect(document.getElementById("needInput").value).toBe("");
});

test('додає елемент в DOM', () => {
    document.getElementById("needInput").value = "Test";

    addNeed();

    const list = document.getElementById("needList");
    expect(list.children.length).toBe(1);
});

