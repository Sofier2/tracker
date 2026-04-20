// ======================
// STATE (тільки для UI)
// ======================
let needs = [];

// ======================
// UI LOGIC
// ======================
function renderCounter() {
    const el = document.getElementById("count");
    if (el) el.textContent = needs.length;
}

function addNeedUI() {
    const input = document.getElementById("needInput");
    const value = input?.value;

    if (!value || value.trim() === "") return;

    needs.push(value);

    const list = document.getElementById("needList");

    if (list) {
        const li = document.createElement("li");
        li.textContent = value;
        list.appendChild(li);
    }

    if (input) input.value = "";

    renderCounter();
}

// ======================
// EVENTS
// ======================
if (typeof document !== "undefined") {
    const btn = document.getElementById("addBtn");

    if (btn) {
        btn.addEventListener("click", addNeedUI);
    }
}

// ======================
// ENV (Vercel / Vite)
// ======================
const status =
    import.meta.env?.VERCEL_ENV ||
    import.meta.env?.VITE_APP_ENV ||
    "dev";

console.log("STATUS:", status);

// ======================
// FOOTER
// ======================
if (typeof document !== "undefined") {
    const footer = document.createElement("footer");

    footer.textContent = `Status: ${status}`;

    footer.style.position = "fixed";
    footer.style.bottom = "0";
    footer.style.width = "100%";
    footer.style.background = "#eee";
    footer.style.textAlign = "center";
    footer.style.padding = "5px";
    footer.style.fontWeight = "bold";

    document.body.appendChild(footer);
}