require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.41.0/min/vs' }});

let score = parseInt(localStorage.getItem("score")) || 0;
const consoleDiv = document.getElementById("console");

require(['vs/editor/editor.main'], function () {
    window.editor = monaco.editor.create(document.getElementById('editorContainer'), {
        value: `console.log("Hello World !");`,
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: false }
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runCode);
});

function runCode() {
    score += 10;
    localStorage.setItem("score", score);

    if (consoleDiv.innerHTML.trim() !== "" && !consoleDiv.querySelector(".empty")) {
        const sep = document.createElement("div");
        sep.className = "separator";
        consoleDiv.appendChild(sep);
    } else {
        consoleDiv.innerHTML = "";
    }

    const originalConsoleLog = console.log;

    console.log = function(...args) {
        const line = args.map(arg => 
            typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(" ");

        const div = document.createElement("div");
        div.textContent = line;
        consoleDiv.appendChild(div);
        consoleDiv.scrollTop = consoleDiv.scrollHeight;
    };

    try {
        eval(editor.getValue());
    } catch (err) {
        const errorDiv = document.createElement("div");
        errorDiv.textContent = "Erreur : " + err.message;
        errorDiv.style.color = "#f87171";
        consoleDiv.appendChild(errorDiv);
    } finally {
        console.log = originalConsoleLog;
    }
}

function resetConsole() {
    consoleDiv.innerHTML = '<div class="empty">Console vide...</div>';
}

function saveCode() {
    const code = editor.getValue();
    const blob = new Blob([code], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "script.js";
    a.click();

    URL.revokeObjectURL(url);
}
