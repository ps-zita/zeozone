// Add this code at the beginning of your script.js file
document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("startup-audio");

    // You can optionally pause the audio after a specific duration (e.g., 10 seconds)
    setTimeout(function () {
        audio.pause();
    }, 10000); // 10 seconds in milliseconds
});

let isDragging = false;
let initialX, initialY;
let activeWindow = null;

function openWindow(windowId) {
    let windowDiv = document.getElementById(windowId);
    windowDiv.style.display = "block";

    if (activeWindow) {
        activeWindow.style.zIndex = 1;
    }
    windowDiv.style.zIndex = 2;
    activeWindow = windowDiv;

    // Center the window on the page
    centerWindow(windowDiv);

    // Disable pointer events on the iframe during dragging
    let iframe = windowDiv.querySelector("iframe");
    iframe.style.pointerEvents = "none";

    isDragging = false;
}

function closeWindow(windowId) {
    let windowDiv = document.getElementById(windowId);
    windowDiv.style.display = "none";
}

function startDragging(event, windowId) {
    if (event.target.classList.contains("title-bar")) {
        isDragging = true;
        initialX = event.clientX - parseInt(window.getComputedStyle(document.getElementById(windowId)).left, 10);
        initialY = event.clientY - parseInt(window.getComputedStyle(document.getElementById(windowId)).top, 10);

        let windowDiv = document.getElementById(windowId);
        if (activeWindow) {
            activeWindow.style.zIndex = 1;
        }
        windowDiv.style.zIndex = 2;
        activeWindow = windowDiv;

        // Disable pointer events on the iframe during dragging
        let iframe = windowDiv.querySelector("iframe");
        iframe.style.pointerEvents = "none";
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
}

function onMouseMove(event) {
    if (isDragging) {
        let windowDiv = activeWindow;
        if (!windowDiv) return;
        windowDiv.style.left = event.clientX - initialX + "px";
        windowDiv.style.top = event.clientY - initialY + "px";
    }
}

function onMouseUp() {
    isDragging = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);

    // Re-enable pointer events on the iframe after dragging
    if (activeWindow) {
        let iframe = activeWindow.querySelector("iframe");
        iframe.style.pointerEvents = "auto";
    }
}

function minimizeWindow(windowId) {
    let windowDiv = document.getElementById(windowId);
    windowDiv.style.display = "none";
}

function maximizeWindow(windowId) {
    let windowDiv = document.getElementById(windowId);
    if (!document.fullscreenElement) {
        windowDiv.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

function centerWindow(windowDiv) {
    // Calculate the center position
    let centerX = (window.innerWidth - windowDiv.offsetWidth) / 2;
    let centerY = (window.innerHeight - windowDiv.offsetHeight) / 2;

    // Set the window's position to the center
    windowDiv.style.left = centerX + "px";
    windowDiv.style.top = centerY + "px";
}
