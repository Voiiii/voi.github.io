const shortcuts = Array.from(document.querySelectorAll("[data-open]"));
const panels = Array.from(document.querySelectorAll("[data-panel]"));
const emptyDesktop = document.querySelector(".empty-desktop");

function openPanel(name, shortcut) {
    const nextPanel = panels.find((panel) => panel.dataset.panel === name);
    if (!nextPanel) return;

    panels.forEach((panel) => {
        panel.hidden = panel !== nextPanel;
    });
    shortcuts.forEach((item) => {
        item.setAttribute("aria-pressed", String(item === shortcut));
    });
    emptyDesktop.hidden = true;
}

function closePanel(panel) {
    panel.hidden = true;
    const shortcut = shortcuts.find((item) => item.dataset.open === panel.dataset.panel);
    shortcut?.setAttribute("aria-pressed", "false");
    emptyDesktop.hidden = false;
    shortcut?.focus();
}

shortcuts.forEach((shortcut) => {
    shortcut.addEventListener("click", () => openPanel(shortcut.dataset.open, shortcut));
});

document.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", () => closePanel(button.closest("[data-panel]")));
});

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const openPanel = panels.find((panel) => !panel.hidden);
    if (openPanel) closePanel(openPanel);
});

document.querySelector(".site-name").addEventListener("click", (event) => {
    event.preventDefault();
    openPanel("welcome", shortcuts.find((shortcut) => shortcut.dataset.open === "welcome"));
});