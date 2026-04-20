const {
    addNeed,
    getNeeds,
    setNeeds,
    clearNeeds
} = require('../../logic');

beforeEach(() => {
    clearNeeds();
});

test('додає нову потребу', () => {
    addNeed("Test");

    expect(getNeeds().length).toBe(1);
});

test('не додає пусту потребу', () => {
    addNeed("");

    expect(getNeeds().length).toBe(0);
});

test('очищає масив', () => {
    addNeed("A");
    setNeeds([]);

    expect(getNeeds().length).toBe(0);
});