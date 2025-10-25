const data = {
    step_1: document.getElementById("step-1"),
    step_2: document.getElementById("step-2"),
    step_3: document.getElementById("step-3"),
}
let step = 1;
let CODES = [];

function updateSteps() {
    Object.keys(data).forEach((key, index) => {
        if (index + 1 === step) {
            data[key].classList.remove("hidden");
        } else {
            data[key].classList.add("hidden");
        }
    })
}


// Load CSV khi trang mở
fetch('./public/codes.csv')
    .then(res => res.text())
    .then(text => {
        CODES = text.split(/\r?\n/).filter(x => x.trim() !== '');
        console.log("Loaded codes:", CODES);
    })
    .catch(err => console.error("Load CSV failed:", err));

function pickCode() {
    return CODES[Math.floor(Math.random() * CODES.length)];
}

function spin() {
    if (!CODES.length) return alert("Chưa load xong CSV!");

    const final = pickCode(); // ví dụ "908"

    let t1 = setInterval(() => d1.textContent = Math.floor(Math.random() * 10), 40);
    let t2 = setInterval(() => d2.textContent = Math.floor(Math.random() * 10), 40);
    let t3 = setInterval(() => d3.textContent = Math.floor(Math.random() * 10), 40);

    setTimeout(() => { clearInterval(t1); d1.textContent = final[0]; }, 3000);
    setTimeout(() => { clearInterval(t2); d2.textContent = final[1]; }, 6000);
    setTimeout(() => { clearInterval(t3); d3.textContent = final[2]; }, 9000);
}
updateSteps(1);

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            // Left pressed
            step -= 1;
            if (step < 1) {
                step = 1;
                return;
            }
            updateSteps();
            document.getElementById("result").classList.add("hidden");
            break;
        case "ArrowRight":
            // Right pressed
            step += 1;
            if (step >= 3) {
                step = 3;
                document.getElementById("result").classList.remove("hidden");
                updateSteps();
                return;
            }
            updateSteps();

            break;
        case "Enter":
            // Enter pressed
            if (step === 3) {
                spin();
            }
            break;
    }
});