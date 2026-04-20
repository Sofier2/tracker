let needs = [];

function addNeed(value) {
    if (!value || value.trim() === "") return needs;

    needs.push(value);
    return needs;
}

function getNeeds() {
    return needs;
}

function setNeeds(arr) {
    needs = arr;
}

function clearNeeds() {
    needs = [];
}

module.exports = {
    addNeed,
    getNeeds,
    setNeeds,
    clearNeeds
};