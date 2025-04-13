
const templates = {
    ADT: "MSH|^~\\&|App|Facility|EHR|Lab|202504121305||ADT^A01|123|P|2.3\nPID|||123456^^^MR||DOE^JOHN||19800101|M\nPV1||I|W^101^1^A",
    ORM: "MSH|^~\\&|App|Facility|EHR|Lab|202504121305||ORM^O01|456|P|2.3\nPID|||789012^^^MR||SMITH^JANE||19901212|F\nORC|NW|5555^OrderPlacer\nOBR|1|5555^OrderPlacer||GLU^Glucose"
};

function loadTemplate() {
    const type = document.getElementById("templateSelect").value;
    document.getElementById("hl7Input").value = templates[type] || "";
}

function visualize() {
    const raw = document.getElementById("hl7Input").value;
    const lines = raw.split(/\r?\n/);
    let output = "";

    for (const line of lines) {
        if (!line.trim()) continue;
        const parts = line.split('|');
        output += `${parts[0]}\n`;
        for (let i = 1; i < parts.length; i++) {
            output += `  [${i}] ${parts[i]}\n`;
        }
        output += "\n";
    }
    document.getElementById("parsedOutput").textContent = output;
}

function simulateSend() {
    const ack = "MSH|^~\&|RECEIVER|SERVER|SENDER|CLIENT|202504121230||ACK^A01|9999|P|2.3\nMSA|AA|123";
    document.getElementById("ackOutput").textContent = ack;
}

function saveToLocal() {
    const msg = document.getElementById("hl7Input").value;
    localStorage.setItem("savedHL7", msg);
    alert("Message saved locally.");
}

function loadFromLocal() {
    const msg = localStorage.getItem("savedHL7");
    if (msg) {
        document.getElementById("hl7Input").value = msg;
        alert("Message loaded.");
    } else {
        alert("No saved message found.");
    }
}
