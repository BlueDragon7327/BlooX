(() => {
  const blooxMenu = document.createElement('div');
  blooxMenu.id = 'bloox-menu';
  blooxMenu.innerHTML = `
    <div id="bloox-header">BlooX Cheats</div>
    <div id="bloox-tabs">
      <button data-tab="global">Global</button>
      <button data-tab="gold">Gold Quest</button>
      <button data-tab="cafe">Cafe</button>
      <button data-tab="crypto">Crypto Hack</button>
    </div>
    <div id="bloox-content">
      <div class="tab-content" id="global">
        <button id="add-tokens">Add Max Rewards</button>
      </div>
      <div class="tab-content" id="gold">
        <button id="gold-cheat">Gold Hack</button>
      </div>
      <div class="tab-content" id="cafe">
        <button id="cafe-hack">Infinite Food</button>
      </div>
      <div class="tab-content" id="crypto">
        <button id="crypto-hack">Auto Farm</button>
      </div>
    </div>
  `;
  document.body.appendChild(blooxMenu);

  const style = document.createElement('style');
  style.textContent = `
    #bloox-menu {
      position: fixed;
      top: 100px;
      left: 100px;
      width: 300px;
      background: #1e1e2f;
      color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 10px #000;
      font-family: sans-serif;
      z-index: 9999;
      transition: transform 0.3s ease;
    }
    #bloox-header {
      background: #0bc2cf;
      padding: 10px;
      cursor: move;
      font-weight: bold;
      text-align: center;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    #bloox-tabs {
      display: flex;
      justify-content: space-around;
      background: #2e2e3f;
    }
    #bloox-tabs button {
      flex: 1;
      padding: 10px;
      background: none;
      border: none;
      color: #fff;
      cursor: pointer;
    }
    #bloox-tabs button:hover {
      background: #3e3e5f;
    }
    #bloox-content {
      padding: 10px;
    }
    .tab-content {
      display: none;
    }
    .tab-content.active {
      display: block;
    }
    #bloox-content button {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      background: #0bc2cf;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    #bloox-content button:hover {
      background: #09a2af;
    }
    .bloox-notification {
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: #0bc2cf;
      color: white;
      padding: 15px 20px;
      border-radius: 12px;
      font-size: 16px;
      font-family: Arial,sans-serif;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
  `;
  document.head.appendChild(style);

  // draggable menu
  let isDragging = false;
  let offsetX, offsetY;
  const header = document.getElementById('bloox-header');
  header.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - blooxMenu.offsetLeft;
    offsetY = e.clientY - blooxMenu.offsetTop;
  });
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      blooxMenu.style.left = `${e.clientX - offsetX}px`;
      blooxMenu.style.top = `${e.clientY - offsetY}px`;
    }
  });
  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // tab switcher
  const tabs = document.querySelectorAll('#bloox-tabs button');
  const contents = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      contents.forEach(c => c.classList.remove('active'));
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });
  tabs[0].click(); // default tab

  // notification system
  function showNotification(msg) {
    const notif = document.createElement('div');
    notif.className = 'bloox-notification';
    notif.innerText = msg;
    document.body.appendChild(notif);
    setTimeout(() => notif.style.opacity = '1', 100);
    setTimeout(() => {
      notif.style.opacity = '0';
      setTimeout(() => notif.remove(), 500);
    }, 3000);
  }

  // run hosted script
  function runRemoteScript(url, onSuccess) {
    fetch(url)
      .then(res => res.text())
      .then(code => {
        eval(code);
        onSuccess && onSuccess();
      })
      .catch(err => {
        console.error('Failed to load remote script:', err);
        showNotification('❌ Failed to load script');
      });
  }

  // cheats
  document.getElementById('add-tokens').addEventListener('click', () => {
    showNotification('⏳ Loading Add Rewards...');
    runRemoteScript('https://raw.githubusercontent.com/BlueDragon7327/BlooX/refs/heads/main/Global/addrewards.js', () => {
      showNotification('✅ Add Rewards executed!');
    });
  });

  document.getElementById('gold-cheat').addEventListener('click', () => {
    showNotification('💰 Gold cheat activated!');
  });

  document.getElementById('cafe-hack').addEventListener('click', () => {
    showNotification('☕ Infinite food toggled!');
  });

  document.getElementById('crypto-hack').addEventListener('click', () => {
    showNotification('📈 Crypto auto farm on!');
  });
})();
