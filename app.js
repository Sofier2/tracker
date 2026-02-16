let needs = [];

function updateCounter() {
    document.getElementById("count").textContent = needs.length;
}

function addNeed() {
    const input = document.getElementById("needInput");
    const list = document.getElementById("needList");

    if (input.value.trim() === "") return;

    const needText = input.value;
    needs.push(needText);

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = needText;

    const actions = document.createElement("div");
    actions.className = "action-buttons";

    // 🔴 Пріоритет
    const priorityBtn = document.createElement("button");
    priorityBtn.textContent = "Пріоритет";
    priorityBtn.onclick = function () {
        span.classList.toggle("priority");
    };

    // ✏️ Редагувати
    const editBtn = document.createElement("button");
    editBtn.textContent = "Редагувати";
    editBtn.onclick = function () {
        const newValue = prompt("Редагувати потребу:", span.textContent);
        if (newValue !== null && newValue.trim() !== "") {
            span.textContent = newValue;
        }
    };

    // ➖ Видалити
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Видалити";
    deleteBtn.onclick = function () {
        list.removeChild(li);
        needs = needs.filter(n => n !== needText);
        updateCounter();
    };

    actions.appendChild(priorityBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);
    list.appendChild(li);

    input.value = "";
    updateCounter();
}
