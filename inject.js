(function() {
    if (document.getElementById("bloopanel")) return;

    const style = document.createElement("style");
    style.innerHTML = `
    #bloopanel {
        position: fixed;
        top: 100px;
        left: 100px;
        width: 350px;
        background: rgba(30, 30, 40, 0.9);
        backdrop-filter: blur(8px);
        border: 1px solid #555;
        border-radius: 12px;
        color: white;
        font-family: 'Segoe UI', sans-serif;
        z-index: 9999;
        box-shadow: 0 0 15px rgba(0,0,0,0.4);
        overflow: hidden;
        user-select: none;
    }
    #bloopanel-header {
        background: linear-gradient(135deg, #00c6ff, #0072ff);
        padding: 12px;
        cursor: move;
        font-weight: bold;
        font-size: 18px;
        border-bottom: 1px solid #444;
    }
    .bloo-tabs {
        display: flex;
        background: #222;
        border-bottom: 1px solid #444;
    }
    .bloo-tab {
        flex: 1;
        padding: 10px;
        text-align: center;
        cursor: pointer;
        transition: background 0.3s;
    }
    .bloo-tab:hover {
        background: #333;
    }
    .bloo-tab.active {
        background: #0072ff;
    }
    .bloo-content {
        padding: 15px;
        display: none;
        animation: fadeIn 0.3s ease;
    }
    .bloo-content.active {
        display: block;
    }
    .bloo-toggle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 0;
    }
    .bloo-toggle input {
        accent-color: #00ffcc;
        transform: scale(1.2);
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    `;
    document.head.appendChild(style);

    const panel = document.createElement("div");
    panel.id = "bloopanel";
    panel.innerHTML = `
        <div id="bloopanel-header">🧠 BlooX Cheat Panel</div>
        <div class="bloo-tabs">
            <div class="bloo-tab active" data-tab="main">Main</div>
            <div class="bloo-tab" data-tab="game">Game</div>
            <div class="bloo-tab" data-tab="visuals">Visuals</div>
        </div>
        <div class="bloo-content active" id="tab-main">
            <div class="bloo-toggle"><span>Auto Answer</span><input type="checkbox" id="autoAnswer"></div>
            <div class="bloo-toggle"><span>Instant Win</span><input type="checkbox" id="instaWin"></div>
        </div>
        <div class="bloo-content" id="tab-game">
            <div class="bloo-toggle"><span>Infinite Tokens</span><input type="checkbox" id="infiniteTokens"></div>
            <div class="bloo-toggle"><span>Remove Timer</span><input type="checkbox" id="removeTimer"></div>
        </div>
        <div class="bloo-content" id="tab-visuals">
            <div class="bloo-toggle"><span>ESP</span><input type="checkbox" id="esp"></div>
            <div class="bloo-toggle"><span>Glow Blooks</span><input type="checkbox" id="glowBlooks"></div>
        </div>
    `;
    document.body.appendChild(panel);

    // tab logic
    document.querySelectorAll(".bloo-tab").forEach(tab => {
        tab.onclick = () => {
            document.querySelectorAll(".bloo-tab").forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".bloo-content").forEach(c => c.classList.remove("active"));
            tab.classList.add("active");
            document.getElementById("tab-" + tab.dataset.tab).classList.add("active");
        };
    });

    // draggable
    const header = document.getElementById("bloopanel-header");
    let isDown = false, offsetX = 0, offsetY = 0;

    header.addEventListener("mousedown", (e) => {
        isDown = true;
        offsetX = e.clientX - panel.offsetLeft;
        offsetY = e.clientY - panel.offsetTop;
    });
    document.addEventListener("mouseup", () => isDown = false);
    document.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        panel.style.left = `${e.clientX - offsetX}px`;
        panel.style.top = `${e.clientY - offsetY}px`;
    });
})();
