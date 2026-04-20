// ======================
// STATE
// ======================
let needs = [];


// ======================
// LOGIC
// ======================
function updateCounter() {
    const el = document.getElementById("count");
    if (el) el.textContent = needs.length;
}

function addNeed(inputValue) {
    const value = inputValue ?? document.getElementById("needInput")?.value;

    if (!value || value.trim() === "") return;

    needs.push(value);

    const list = document.getElementById("needList");

    if (list) {
        const li = document.createElement("li");
        li.textContent = value;
        list.appendChild(li);
    }

    const input = document.getElementById("needInput");
    if (input) input.value = "";

    updateCounter();
}


// ======================
// BROWSER EVENTS
// ======================
if (typeof document !== "undefined") {
    const btn = document.getElementById("addBtn");
    if (btn) {
        btn.addEventListener("click", () => addNeed());
    }
}


// ======================
// ENV (SAFE FOR JEST)
// ======================
// ======================
// ENV (SAFE)
// ======================
const status = import.meta.env.VITE_APP_ENV;
  
//process.env.NODE_ENV
console.log("STATUS:", status);
// ======================
// FOOTER (ONLY IN BROWSER)
// ======================
if (typeof document !== "undefined") {
   const footer = document.createElement("footer");

footer.textContent = `Status: ${status}`;
document.body.appendChild(footer);
    footer.style.position = "fixed";
    footer.style.bottom = "0";
    footer.style.width = "100%";
    footer.style.background = "#eee";
    footer.style.textAlign = "center";
    footer.style.padding = "5px";
    footer.style.fontWeight = "bold";

  
    console.log("App status:", status);
}


// ======================
// EXPORTS FOR UNIT TESTS
// ======================
if (typeof module !== "undefined") {
    module.exports = {
        addNeed,
        updateCounter,
        getNeeds: () => needs,
        setNeeds: (arr) => needs = arr
    };
}