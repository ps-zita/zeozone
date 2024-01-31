let isDragging = false,
    initialX,
    initialY,
    offsetX,
    offsetY,
    openWindows = [];

function openWindow(e, icon) {
    let windowToOpen = document.getElementById(e);
    windowToOpen.style.display = "block";
    centerWindow(windowToOpen);

    openWindows.push(windowToOpen);

    isDragging = false;

    icon.classList.add("clicked");

    setTimeout(() => {
        icon.classList.remove("clicked");
    }, 500);
}

function closeWindow(e) {
    let windowToClose = document.getElementById(e);
    resetWindowContent(windowToClose);
    windowToClose.style.display = "none";
    openWindows = openWindows.filter(window => window !== windowToClose);

    if (openWindows.length > 0) {
        let lastWindow = openWindows[openWindows.length - 1];
        lastWindow.style.zIndex = 2;
    }

    let icon = document.querySelector(".icon-button");
    icon.style.zIndex = 2;
}

function resetWindowContent(windowElement) {
    // Add logic to reset content to original HTML
    let iframe = windowElement.querySelector("iframe");
    iframe.src = iframe.src; // Reset iframe source to original HTML
}

function startDragging(e, t) {
    if (e.target.classList.contains("title-bar") || "img" === e.target.tagName.toLowerCase()) {
        isDragging = true;
        let win = document.getElementById(t);
        initialX = e.clientX;
        initialY = e.clientY;
        offsetX = initialX - win.getBoundingClientRect().left;
        offsetY = initialY - win.getBoundingClientRect().top;
        let iframe = win.querySelector("iframe");
        iframe.style.pointerEvents = "none";
        let icon = document.querySelector(".icon-button");
        icon.style.zIndex = 1;
        openWindows = openWindows.filter(window => window !== win);
        openWindows.push(win);
        win.style.zIndex = openWindows.length + 1;
    }
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
}

function onMouseMove(e) {
    if (isDragging) {
        let win = openWindows[openWindows.length - 1];
        if (win) {
            let x = e.clientX - offsetX;
            let y = e.clientY - offsetY;
            win.style.left = x + "px";
            win.style.top = y + "px";
        }
    }
}

function onMouseUp() {
    isDragging = false;
    let iframe = openWindows[openWindows.length - 1].querySelector("iframe");
    iframe.style.pointerEvents = "auto";
    let icon = document.querySelector(".icon-button");
    icon.style.zIndex = 2;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
}

function minimizeWindow(e) {
    document.getElementById(e).style.display = "none";
}

function maximizeWindow(e) {
    let win = document.getElementById(e);
    document.fullscreenElement ? win.exitFullscreen() : (
        win.requestFullscreen().catch(e => console.error(`Error attempting to enable full-screen mode: ${e.message}`)),
        win.style.width = "100%",
        win.style.height = "100%",
        centerWindow(win)
    );
}

function centerWindow(win) {
    let left = (window.innerWidth - win.offsetWidth) / 2;
    let top = (window.innerHeight - win.offsetHeight) / 2;
    win.style.left = left + "px";
    win.style.top = top + "px";
}

function hideAllWindows() {
    const windows = document.querySelectorAll('.draggable-window');
    windows.forEach(window => {
        window.style.display = "none";
    });
    openWindows = [];
}
