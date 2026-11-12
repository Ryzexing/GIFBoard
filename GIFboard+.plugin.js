/**
 * @name GIFboard+
 * @author Razik
 * @version 1.8.0
 * @description Organize, search, and send GIFs from your personal library.
 */

const PLUGIN_NAME = "GIFboard+";
const LEGACY_PLUGIN_NAME = "NotAnotherAnimeGIF";
const DEFAULT_SIZE = {width: 480, height: 560, sidebarWidth: 155, opacity: 0.94, hideOnRightClick: true, autoFavorite: false, keepWithinScreen: true, left: null, top: null};
const SIZE_LIMITS = {minWidth: 320, maxWidth: 4096, minHeight: 240, maxHeight: 2160, minSidebarWidth: 100, maxSidebarWidth: 360};
const DATA_VERSION = 1;

const STYLE = `
.naat-gif-tools{font:14px/1.4 var(--font-primary, sans-serif);color:var(--text-normal,#dbdee1)}
.naat-gif-tools button,.naat-gif-tools input{font:inherit}
.naat-gif-tools button{color:inherit;cursor:pointer}
.naat-gif-toolbar{position:relative;z-index:2;display:flex;justify-content:flex-end;box-sizing:border-box;width:100%;padding:4px 8px;background:var(--background-primary,#2b2d31)}
.naat-gif-toggle{flex:0 0 auto;margin:0 4px;padding:8px 12px;border:0;border-radius:4px;background:transparent;color:var(--interactive-normal,#b5bac1)}
.naat-gif-toggle:hover{background:var(--background-modifier-hover,rgba(255,255,255,.08));color:var(--interactive-hover,#dbdee1)}
.naat-gif-toggle[aria-selected=true]{background:var(--background-modifier-selected,rgba(255,255,255,.12));color:var(--header-primary,#f2f3f5)}
.naat-gif-toggle:hover,.naat-gif-tools button:hover{background:var(--background-modifier-hover,rgba(255,255,255,.1))}
.naat-gif-backdrop{position:fixed;display:block;inset:0;z-index:2147483647;pointer-events:none;background:transparent}
.naat-gif-native-hidden{visibility:hidden!important;pointer-events:none!important}
.naat-gif-backdrop[hidden]{display:none}
.naat-gif-overlay{position:fixed;display:flex;flex-direction:column;box-sizing:border-box;min-width:0;min-height:0;width:var(--gifboard-library-width,480px);height:var(--gifboard-library-height,560px);max-width:none;max-height:none;pointer-events:auto;background:rgba(12,13,16,var(--gifboard-opacity,.94));backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.08);border-radius:8px;overflow:visible;box-shadow:0 8px 26px rgba(0,0,0,.3)}
.naat-gif-resize-handle{position:absolute;z-index:2;display:block;margin:0;padding:0;border:0;background:transparent;touch-action:none}
.naat-gif-resize-handle[data-resize=n]{top:-4px;right:10px;left:10px;height:8px;cursor:ns-resize}
.naat-gif-resize-handle[data-resize=s]{right:10px;bottom:-4px;left:10px;height:8px;cursor:ns-resize}
.naat-gif-resize-handle[data-resize=e]{top:10px;right:-4px;bottom:10px;width:8px;cursor:ew-resize}
.naat-gif-resize-handle[data-resize=w]{top:10px;bottom:10px;left:-4px;width:8px;cursor:ew-resize}
.naat-gif-resize-handle[data-resize=ne],.naat-gif-resize-handle[data-resize=nw],.naat-gif-resize-handle[data-resize=se],.naat-gif-resize-handle[data-resize=sw]{width:14px;height:14px}
.naat-gif-resize-handle[data-resize=ne]{top:-5px;right:-5px;cursor:nesw-resize}
.naat-gif-resize-handle[data-resize=nw]{top:-5px;left:-5px;cursor:nwse-resize}
.naat-gif-resize-handle[data-resize=se]{right:-5px;bottom:-5px;cursor:nwse-resize}
.naat-gif-resize-handle[data-resize=sw]{bottom:-5px;left:-5px;cursor:nesw-resize}
.naat-gif-header{display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid var(--background-modifier-accent,rgba(255,255,255,.08))}
.naat-gif-header strong{flex:1 1 120px;min-width:0;cursor:move;user-select:none}
.naat-gif-header strong:active{cursor:grabbing}
.naat-gif-settings{position:absolute;top:48px;right:8px;z-index:5;box-sizing:border-box;width:min(320px,calc(100% - 16px));padding:12px;border:1px solid var(--background-modifier-accent,rgba(255,255,255,.12));border-radius:6px;background:var(--background-floating,#18191c);box-shadow:0 8px 24px rgba(0,0,0,.35)}
.naat-gif-settings[hidden]{display:none}
.naat-gif-setting-row{display:flex;align-items:center;gap:7px;margin:6px 0;font-size:12px}
.naat-gif-setting-row input[type=range]{flex:1;min-width:60px}
.naat-gif-setting-row input[type=checkbox]{width:18px;height:18px}
.naat-gif-header button,.naat-gif-folder-actions button,.naat-gif-card button,.naat-gif-context button{border:0;border-radius:4px;padding:6px 9px;background:var(--background-secondary,#232428)}
.naat-gif-search{min-width:100px;flex:1 1 160px;padding:7px 9px;border:0;border-radius:4px;background:var(--input-background,#1e1f22);color:inherit}
.naat-gif-workspace{display:flex;flex:1;min-height:0}
.naat-gif-folders{box-sizing:border-box;width:var(--gifboard-sidebar-width,155px);flex:0 0 var(--gifboard-sidebar-width,155px);overflow:auto;padding:8px;border-right:1px solid var(--background-modifier-accent,rgba(255,255,255,.08))}
.naat-gif-sidebar-resizer{position:relative;z-index:1;box-sizing:border-box;flex:0 0 7px;width:7px;margin-left:-1px;cursor:col-resize;touch-action:none}
.naat-gif-sidebar-resizer::after{position:absolute;top:0;bottom:0;left:2px;width:2px;background:var(--background-modifier-accent,rgba(255,255,255,.1));content:""}
.naat-gif-sidebar-resizer:hover::after,.naat-gif-sidebar-resizer:focus-visible::after{background:var(--brand-500,#5865f2)}
.naat-gif-folder{display:flex;width:100%;gap:6px;align-items:center;justify-content:space-between;margin:2px 0;padding:7px;border:0;border-radius:4px;background:transparent;text-align:left}
.naat-gif-folder[aria-pressed=true]{background:var(--background-modifier-selected,rgba(255,255,255,.12))}
.naat-gif-count{opacity:.65;font-size:12px}
.naat-gif-main{display:flex;flex:1;min-width:0;min-height:0;flex-direction:column}
.naat-gif-folder-actions{display:flex;flex-wrap:wrap;gap:6px;padding:8px 10px}
.naat-gif-folder-actions button{flex:1 1 72px}
.naat-gif-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));align-content:start;gap:8px;flex:1;min-width:0;min-height:0;overflow:auto;padding:10px}
.naat-gif-card{min-width:0;overflow:hidden;border-radius:6px;background:var(--background-secondary,#232428)}
.naat-gif-preview{display:block;width:100%;padding:0;border:0;border-radius:6px 6px 0 0;background:transparent;text-align:left}
.naat-gif-preview:hover{filter:brightness(1.08)}
.naat-gif-preview:disabled{cursor:wait;opacity:.65}
.naat-gif-card img,.naat-gif-card video{display:block;width:100%;height:auto;aspect-ratio:4/3;object-fit:cover;background:var(--background-tertiary,#1e1f22)}
.naat-gif-card-label{overflow:hidden;padding:5px 7px;text-overflow:ellipsis;white-space:nowrap;font-size:12px}
.naat-gif-card-actions{display:flex;gap:4px;padding:0 6px 6px}
.naat-gif-card-actions button{flex:1;padding:5px 2px;font-size:12px}
.naat-gif-empty{padding:18px;color:var(--text-muted,#949ba4)}
.naat-gif-context{position:fixed;z-index:2147483647;display:grid;gap:4px;min-width:190px;padding:8px;border:1px solid var(--background-modifier-accent,rgba(255,255,255,.12));border-radius:6px;background:var(--background-floating,#18191c);box-shadow:0 8px 24px rgba(0,0,0,.35)}
.naat-gif-context button{text-align:left}
.naat-gif-dialog-backdrop{position:fixed;inset:0;z-index:2147483648;display:grid;place-items:center;padding:16px;background:rgba(0,0,0,.55)}
.naat-gif-dialog{box-sizing:border-box;width:min(360px,100%);max-height:calc(100vh - 32px);overflow:auto;padding:16px;border:1px solid var(--background-modifier-accent,rgba(255,255,255,.12));border-radius:8px;background:var(--background-floating,#18191c);box-shadow:0 12px 32px rgba(0,0,0,.4)}
.naat-gif-dialog h3{margin:0 0 8px}
.naat-gif-dialog p{color:var(--text-muted,#949ba4)}
.naat-gif-dialog input{box-sizing:border-box;width:100%;margin:8px 0;padding:9px;border:0;border-radius:4px;background:var(--input-background,#1e1f22);color:inherit}
.naat-gif-dialog-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:12px}
.naat-gif-dialog-actions button{border:0;border-radius:4px;padding:8px 12px;background:var(--background-secondary,#232428)}
.naat-gif-dialog-actions button[data-primary=true]{background:var(--brand-500,#5865f2)}
.naat-gif-tools button:focus-visible,.naat-gif-tools input:focus-visible{outline:2px solid var(--brand-500,#5865f2);outline-offset:2px}
@media(max-width:520px){.naat-gif-header{gap:5px;padding:7px}.naat-gif-header button{padding:5px 7px}.naat-gif-folders{padding:5px}.naat-gif-grid{grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:5px;padding:6px}}
`;

function clamp(value, min, max) {
    const number = Number(value);
    return Number.isFinite(number) ? Math.min(max, Math.max(min, Math.round(number))) : min;
}

function normalizeEncodedUrl(value) {
    if (typeof value !== "string" || value.length > 4096) return null;
    try {
        let candidate = value.trim();
        for (let attempt = 0; attempt < 2; attempt++) {
            const decoded = candidate.replace(/%25([0-9a-f]{2})/gi, "%$1");
            if (decoded === candidate) break;
            candidate = decoded;
        }
        return new URL(candidate);
    }
    catch {
        return null;
    }
}

function safePreviewUrl(value) {
    const url = normalizeEncodedUrl(value);
    if (!url || (url.protocol !== "https:" && url.protocol !== "http:")) return null;
    return url.href;
}

function safeUrl(value) {
    try {
        let url = normalizeEncodedUrl(value);
        if (!url) return null;
        if (/^images-ext-\d+\.discordapp\.net$/i.test(url.hostname)) {
            const match = url.pathname.match(/^\/external\/[^/]+\/(https?)\/([^/]+)(\/.*)?$/i);
            if (match) url = new URL(`${match[1]}://${match[2]}${match[3] || "/"}`);
        }
        return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
    }
    catch {
        return null;
    }
}

function cleanGifTitle(value) {
    if (typeof value !== "string") return "";
    const title = value.trim().slice(0, 256);
    if (!title || /^(?:https?:|www\.|%25?[0-9a-f]{2})/i.test(title) ||
        /^(?:сообщения\s+(?:на|в)|messages\s+(?:in|on))\b/i.test(title) ||
        /^(?:gif|image|video|animated image)$/i.test(title)) return "";
    try {
        new URL(title);
        return "";
    }
    catch {
        return title;
    }
}

function gifKey(gif) {
    return gif.url.trim().toLowerCase();
}

function normalizeState(value) {
    if (!value || typeof value !== "object" || value.version !== DATA_VERSION || !Array.isArray(value.folders)) {
        throw new Error("Library data has an unsupported or damaged format.");
    }

    const folders = value.folders.map(folder => {
        if (!folder || typeof folder.id !== "string" || typeof folder.name !== "string" || !Array.isArray(folder.gifs)) {
            throw new Error("A folder in the library data is damaged.");
        }
        const gifs = [];
        const seen = new Set();
        for (const item of folder.gifs) {
            const url = safeUrl(item?.url);
            if (!url) throw new Error(`Folder "${folder.name}" contains an invalid GIF URL.`);
            const key = url.toLowerCase();
            if (seen.has(key)) continue;
            seen.add(key);
            gifs.push({
                url,
                previewUrl: safePreviewUrl(item.previewUrl) || url,
                title: cleanGifTitle(item.title),
                addedAt: Number.isFinite(item.addedAt) ? item.addedAt : Date.now()
            });
        }
        return {id: folder.id, name: folder.name.trim().slice(0, 80) || "Untitled", gifs};
    });

    const ids = new Set();
    for (const folder of folders) {
        if (ids.has(folder.id)) throw new Error("The library contains duplicate folder identifiers.");
        ids.add(folder.id);
    }
    return {version: DATA_VERSION, folders};
}

module.exports = class NotAnotherAnimeGIF {
    constructor(meta) {
        this.meta = meta;
        this.api = new BdApi(meta.name || PLUGIN_NAME);
        this.legacyApi = new BdApi(LEGACY_PLUGIN_NAME);
        this.settings = {...DEFAULT_SIZE};
        this.state = {version: DATA_VERSION, folders: []};
        this.storageBlocked = false;
        this.picker = null;
        this.hiddenPickers = new Set();
        this.originalPickerVisibility = null;
        this.geometry = null;
        this.overlay = null;
        this.libraryBackdrop = null;
        this.toggle = null;
        this.toolbar = null;
        this.contextMenu = null;
        this.dialog = null;
        this.observer = null;
        this.scanFrame = null;
        this.settingsTimer = null;
        this.selectedFolder = null;
        this.searchTerm = "";
        this.sendingGifs = new Set();
        this.resizeStart = null;
        this.sidebarResizeStart = null;
        this.moveStart = null;
    }

    start() {
        try {
            this.loadData();
            this.addStyles();
            this.observer = new MutationObserver(() => {
                if (this.libraryBackdrop && !this.libraryBackdrop.hidden) {
                    const picker = this.findPicker();
                    if (picker) {
                        this.picker = picker;
                        this.hideNativePicker();
                    }
                }
                this.scheduleScan();
            });
            this.observer.observe(document.body, {childList: true, subtree: true});
            document.addEventListener("contextmenu", this.onPickerContextMenu, true);
            window.addEventListener("resize", this.onWindowResize);
            this.scheduleScan();
        }
        catch (error) {
            console.error(`[${PLUGIN_NAME}] Failed to start:`, error);
            this.notify(`Plugin could not start: ${error.message}`, "error");
            this.stop();
        }
    }

    stop() {
        if (this.observer) this.observer.disconnect();
        this.observer = null;
        if (this.scanFrame !== null) cancelAnimationFrame(this.scanFrame);
        this.scanFrame = null;
        if (this.settingsTimer !== null) {
            clearTimeout(this.settingsTimer);
            this.settingsTimer = null;
            this.saveSettings();
        }
        window.removeEventListener("resize", this.onWindowResize);
        document.removeEventListener("contextmenu", this.onPickerContextMenu, true);
        this.onResizeEnd();
        this.onSidebarResizeEnd();
        this.onMoveEnd();
        this.resizeStart = null;
        this.closeContextMenu();
        this.closeDialog();
        this.restorePickerVisibility();
        this.overlay?.removeEventListener("contextmenu", this.onLibraryContextMenu);
        this.toggle?.remove();
        this.toolbar?.remove();
        this.overlay?.remove();
        this.libraryBackdrop?.remove();
        this.toggle = null;
        this.toolbar = null;
        this.overlay = null;
        this.libraryBackdrop = null;
        this.picker = null;
        document.getElementById(`${PLUGIN_NAME}-style`)?.remove();
    }

    loadData() {
        const storedSettings = this.loadOrMigrate("settings");
        if (storedSettings && typeof storedSettings === "object") {
            this.settings.width = clamp(storedSettings.width, SIZE_LIMITS.minWidth, SIZE_LIMITS.maxWidth);
            this.settings.height = clamp(storedSettings.height, SIZE_LIMITS.minHeight, SIZE_LIMITS.maxHeight);
            this.settings.sidebarWidth = clamp(storedSettings.sidebarWidth ?? DEFAULT_SIZE.sidebarWidth, SIZE_LIMITS.minSidebarWidth, SIZE_LIMITS.maxSidebarWidth);
            const opacity = Number(storedSettings.opacity);
            this.settings.opacity = Number.isFinite(opacity) ? Math.min(1, Math.max(0.25, opacity)) : DEFAULT_SIZE.opacity;
            this.settings.hideOnRightClick = typeof storedSettings.hideOnRightClick === "boolean"
                ? storedSettings.hideOnRightClick
                : DEFAULT_SIZE.hideOnRightClick;
            this.settings.autoFavorite = typeof storedSettings.autoFavorite === "boolean"
                ? storedSettings.autoFavorite
                : DEFAULT_SIZE.autoFavorite;
            this.settings.keepWithinScreen = typeof storedSettings.keepWithinScreen === "boolean"
                ? storedSettings.keepWithinScreen
                : DEFAULT_SIZE.keepWithinScreen;
            this.settings.left = Number.isFinite(storedSettings.left) ? storedSettings.left : null;
            this.settings.top = Number.isFinite(storedSettings.top) ? storedSettings.top : null;
        }
        const storedLibrary = this.loadOrMigrate("library");
        if (storedLibrary == null) return;
        try {
            this.state = normalizeState(storedLibrary);
        }
        catch (error) {
            this.storageBlocked = true;
            console.error(`[${PLUGIN_NAME}] Library data was not modified:`, error);
            this.notify(`Library data was not loaded or overwritten: ${error.message}`, "error");
        }
    }

    loadOrMigrate(key) {
        const current = this.api.Data.load(key);
        if (current != null) return current;
        const legacy = this.legacyApi.Data.load(key);
        if (legacy == null) return null;
        try {
            this.api.Data.save(key, legacy);
            return legacy;
        }
        catch (error) {
            console.error(`[${PLUGIN_NAME}] Could not migrate ${key} from ${LEGACY_PLUGIN_NAME}:`, error);
            this.notify(`Could not migrate old ${key}; original data remains intact.`, "error");
            return legacy;
        }
    }

    addStyles() {
        const style = document.createElement("style");
        style.id = `${PLUGIN_NAME}-style`;
        style.textContent = STYLE;
        document.head.append(style);
    }

    notify(message, type = "info") {
        try {
            this.api.UI.showToast(message, {type});
        }
        catch (error) {
            console.error(`[${PLUGIN_NAME}] ${message}`, error);
        }
    }

    makeButton(label, onClick, className = "") {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = label;
        button.className = className;
        button.addEventListener("click", onClick);
        return button;
    }

    getSettingsPanel() {
        const panel = document.createElement("div");
        panel.className = "naat-gif-tools";
        panel.style.cssText = "padding:16px;max-width:680px";
        const title = document.createElement("h3");
        title.textContent = "GIF library window layout";
        panel.append(title);
        panel.append(this.createSizeControl("Width", "width", SIZE_LIMITS.minWidth, SIZE_LIMITS.maxWidth));
        panel.append(this.createSizeControl("Height", "height", SIZE_LIMITS.minHeight, SIZE_LIMITS.maxHeight));
        panel.append(this.createOpacityControl());
        panel.append(this.createHideOnRightClickControl());
        panel.append(this.createAutoFavoriteControl());
        panel.append(this.createKeepWithinScreenControl());
        panel.append(this.makeButton("Reset to default", () => {
            this.settings = {...DEFAULT_SIZE};
            panel.querySelectorAll("[data-size]").forEach(input => {
                input.value = String(this.settings[input.dataset.size]);
            });
            const opacity = panel.querySelector("[data-setting='opacity']");
            if (opacity) {
                opacity.value = String(Math.round(this.settings.opacity * 100));
                opacity.nextElementSibling.textContent = `${opacity.value}%`;
            }
            const hideOnRightClick = panel.querySelector("[data-setting='hideOnRightClick']");
            if (hideOnRightClick) hideOnRightClick.checked = this.settings.hideOnRightClick;
            const autoFavorite = panel.querySelector("[data-setting='autoFavorite']");
            if (autoFavorite) autoFavorite.checked = this.settings.autoFavorite;
            const keepWithinScreen = panel.querySelector("[data-setting='keepWithinScreen']");
            if (keepWithinScreen) keepWithinScreen.checked = this.settings.keepWithinScreen;
            this.geometry = null;
            if (this.libraryBackdrop && !this.libraryBackdrop.hidden) this.initializeLibraryGeometry();
            this.applyLibrarySize();
            this.applyLibraryOpacity();
            this.applySidebarWidth();
            this.saveSettings();
        }));
        const note = document.createElement("p");
        note.textContent = "Window size, sidebar width, background opacity, and right-click behavior are saved automatically.";
        note.style.color = "var(--text-muted,#949ba4)";
        panel.append(note);
        return panel;
    }

    createOpacityControl() {
        const row = document.createElement("label");
        row.className = "naat-gif-setting-row";
        const caption = document.createElement("span");
        caption.textContent = "Window background opacity";
        const slider = document.createElement("input");
        slider.type = "range";
        slider.min = "25";
        slider.max = "100";
        slider.step = "1";
        slider.value = String(Math.round(this.settings.opacity * 100));
        slider.dataset.setting = "opacity";
        const value = document.createElement("output");
        value.dataset.opacityValue = "true";
        value.textContent = `${slider.value}%`;
        slider.addEventListener("input", () => {
            this.settings.opacity = Number(slider.value) / 100;
            value.textContent = `${slider.value}%`;
            this.applyLibraryOpacity();
            this.scheduleSaveSettings();
        });
        row.append(caption, slider, value);
        return row;
    }

    createAutoFavoriteControl() {
        const row = document.createElement("label");
        row.className = "naat-gif-setting-row";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = this.settings.autoFavorite;
        checkbox.dataset.setting = "autoFavorite";
        checkbox.addEventListener("change", () => {
            this.settings.autoFavorite = checkbox.checked;
            this.scheduleSaveSettings();
        });
        const caption = document.createElement("span");
        caption.textContent = "В избранное при добавлении в папку";
        row.append(checkbox, caption);
        return row;
    }

    createHideOnRightClickControl() {
        const row = document.createElement("label");
        row.className = "naat-gif-setting-row";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = this.settings.hideOnRightClick;
        checkbox.dataset.setting = "hideOnRightClick";
        checkbox.addEventListener("change", () => {
            this.settings.hideOnRightClick = checkbox.checked;
            this.scheduleSaveSettings();
        });
        const caption = document.createElement("span");
        caption.textContent = "Hide on right-click in empty space";
        row.append(checkbox, caption);
        return row;
    }

    createKeepWithinScreenControl() {
        const row = document.createElement("label");
        row.className = "naat-gif-setting-row";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = this.settings.keepWithinScreen;
        checkbox.dataset.setting = "keepWithinScreen";
        checkbox.addEventListener("change", () => {
            this.settings.keepWithinScreen = checkbox.checked;
            this.applyLibrarySize();
            this.scheduleSaveSettings();
        });
        const caption = document.createElement("span");
        caption.textContent = "Придерживаться границ экрана";
        row.append(checkbox, caption);
        return row;
    }

    createSizeControl(label, key, min, max) {
        const row = document.createElement("label");
        row.style.cssText = "display:grid;grid-template-columns:80px 1fr 76px;align-items:center;gap:10px;margin:12px 0";
        const caption = document.createElement("span");
        caption.textContent = label;
        const slider = document.createElement("input");
        slider.type = "range";
        slider.min = String(min);
        slider.max = String(max);
        slider.step = "10";
        slider.dataset.size = key;
        slider.value = String(this.settings[key]);
        const number = document.createElement("input");
        number.type = "number";
        number.min = String(min);
        number.max = String(max);
        number.step = "10";
        number.dataset.size = key;
        number.value = String(this.settings[key]);
        number.style.cssText = "width:76px;padding:5px";
        const update = event => {
            const value = clamp(event.currentTarget.value, min, max);
            this.settings[key] = value;
            slider.value = number.value = String(value);
            if (key === "sidebarWidth") this.applySidebarWidth();
            else this.applyLibrarySize();
            this.scheduleSaveSettings();
        };
        slider.addEventListener("input", update);
        number.addEventListener("change", update);
        row.append(caption, slider, number);
        return row;
    }

    scheduleSaveSettings() {
        clearTimeout(this.settingsTimer);
        this.settingsTimer = setTimeout(() => {
            this.settingsTimer = null;
            this.saveSettings();
        }, 250);
    }

    saveSettings() {
        try {
            this.api.Data.save("settings", this.settings);
        }
        catch (error) {
            console.error(`[${PLUGIN_NAME}] Could not save picker size:`, error);
            this.notify("Could not save GIF picker size.", "error");
        }
    }

    scheduleScan() {
        if (this.scanFrame !== null) return;
        this.scanFrame = requestAnimationFrame(() => {
            this.scanFrame = null;
            this.scanPicker();
        });
    }

    findPicker() {
        const inputs = [...document.querySelectorAll('input[placeholder],input[aria-label],[role="combobox"]')]
            .filter(element => !element.closest(".naat-gif-backdrop"));
        const query = inputs.find(element => /gif|tenor|giphy/i.test(
            `${element.getAttribute("placeholder") || ""} ${element.getAttribute("aria-label") || ""}`
        )) || inputs.find(element => /klipy|гиф/i.test(
            `${element.getAttribute("placeholder") || ""} ${element.getAttribute("aria-label") || ""}`
        ));
        if (!query) return null;

        let best = null;
        let bestArea = 0;
        let current = query;
        for (let depth = 0; current && depth < 16; depth++, current = current.parentElement) {
            const label = current.getAttribute("aria-label") || "";
            const role = current.getAttribute("role") || "";
            const className = typeof current.className === "string" ? current.className : "";
            const text = `${label} ${current.innerText || ""}`;
            if (query === current || !/gif|гиф|klipy/i.test(text)) continue;
            const rect = current.getBoundingClientRect();
            if (!rect.width || !rect.height || rect.width > window.innerWidth * 0.99 ||
                rect.height > window.innerHeight * 0.99) continue;
            const area = rect.width * rect.height;
            if (role === "dialog" || /contentWrapper|gifPicker/i.test(className)) return current;
            if (area > bestArea) {
                best = current;
                bestArea = area;
            }
        }
        return best || query.parentElement?.parentElement?.parentElement || null;
    }

    scanPicker() {
        const picker = this.findPicker();
        if (!picker) {
            if (this.picker && !this.picker.isConnected) this.detachPicker();
            return;
        }
        if (picker === this.picker) return;
        this.detachPicker();
        this.picker = picker;
        if (this.libraryBackdrop && !this.libraryBackdrop.hidden) this.hideNativePicker();

        this.toggle = this.makeButton("My GIFs", () => this.toggleLibrary(), "naat-gif-toggle");
        this.toggle.setAttribute("role", "tab");
        const libraryOpen = Boolean(this.libraryBackdrop && !this.libraryBackdrop.hidden);
        this.toggle.setAttribute("aria-selected", String(libraryOpen));
        this.toggle.setAttribute("aria-pressed", String(libraryOpen));
        const search = [...picker.querySelectorAll('input[placeholder],input[aria-label],[role="combobox"]')]
            .find(element => /gif|tenor|giphy|klipy|гиф/i.test(
                `${element.getAttribute("placeholder") || ""} ${element.getAttribute("aria-label") || ""}`
            ));
        const tabs = picker.querySelector('[role="tablist"]');
        const tabHost = tabs || this.findVisibleTabHost(picker);
        if (tabHost) {
            tabHost.append(this.toggle);
        }
        else {
            this.toolbar = document.createElement("div");
            this.toolbar.className = "naat-gif-toolbar";
            this.toolbar.append(this.toggle);
            const anchor = search?.parentElement;
            if (anchor?.parentElement && picker.contains(anchor)) anchor.insertAdjacentElement("afterend", this.toolbar);
            else picker.prepend(this.toolbar);
        }

        if (!this.libraryBackdrop) {
            this.libraryBackdrop = document.createElement("div");
            this.libraryBackdrop.className = "naat-gif-backdrop";
            this.libraryBackdrop.hidden = true;
            this.overlay = document.createElement("section");
            this.overlay.className = "naat-gif-tools naat-gif-overlay";
            this.overlay.setAttribute("aria-label", "Personal GIF library");
            this.overlay.addEventListener("contextmenu", this.onLibraryContextMenu);
            this.libraryBackdrop.append(this.overlay);
            document.documentElement.append(this.libraryBackdrop);
            this.renderLibrary();
        }
        else if (!this.libraryBackdrop.hidden) {
            this.hideNativePicker();
        }
        this.applyLibrarySize();
    }

    findVisibleTabHost(picker) {
        const tabLabel = /^(?:gifs?|гифки|stickers?|стикеры|emojis?|эмодзи)$/i;
        const candidates = [...picker.querySelectorAll("button,[role='tab']")]
            .filter(element => tabLabel.test((element.textContent || "").trim()));
        for (const candidate of candidates) {
            let ancestor = candidate.parentElement;
            for (let depth = 0; ancestor && ancestor !== picker && depth < 4; depth++, ancestor = ancestor.parentElement) {
                const matchingChildren = [...ancestor.children].filter(child =>
                    child.matches("button,[role='tab']") && tabLabel.test((child.textContent || "").trim())
                );
                if (matchingChildren.length >= 2) return ancestor;
            }
        }
        return null;
    }

    detachPicker() {
        if (!this.picker) return;
        this.onResizeEnd();
        if (!this.libraryBackdrop || this.libraryBackdrop.hidden) this.restorePickerVisibility();
        this.toggle?.remove();
        this.toolbar?.remove();
        this.picker = null;
        this.toggle = null;
        this.toolbar = null;
        this.closeContextMenu();
    }

    applyLibrarySize() {
        if (!this.overlay) return;
        const width = this.settings.keepWithinScreen
            ? Math.min(this.settings.width, Math.max(1, window.innerWidth - 32))
            : this.settings.width;
        const height = this.settings.keepWithinScreen
            ? Math.min(this.settings.height, Math.max(1, window.innerHeight - 32))
            : this.settings.height;
        this.overlay.style.setProperty("--gifboard-library-width", `${width}px`);
        this.overlay.style.setProperty("--gifboard-library-height", `${height}px`);
        if (this.geometry) {
            this.geometry.width = width;
            this.geometry.height = height;
            if (this.settings.keepWithinScreen) {
                this.geometry.left = clamp(this.geometry.left, 16, Math.max(16, window.innerWidth - this.geometry.width - 16));
                this.geometry.top = clamp(this.geometry.top, 16, Math.max(16, window.innerHeight - this.geometry.height - 16));
                this.settings.left = this.geometry.left;
                this.settings.top = this.geometry.top;
            }
            this.applyLibraryGeometry();
        }
        this.applySidebarWidth();
    }

    initializeLibraryGeometry() {
        const rect = this.picker?.getBoundingClientRect();
        const width = this.settings.keepWithinScreen
            ? Math.min(this.settings.width, Math.max(1, window.innerWidth - 32))
            : this.settings.width;
        const height = this.settings.keepWithinScreen
            ? Math.min(this.settings.height, Math.max(1, window.innerHeight - 32))
            : this.settings.height;
        const centerX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
        const centerY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
        this.geometry = {
            left: this.settings.keepWithinScreen
                ? clamp(this.settings.left ?? centerX - width / 2, 16, Math.max(16, window.innerWidth - width - 16))
                : (this.settings.left ?? centerX - width / 2),
            top: this.settings.keepWithinScreen
                ? clamp(this.settings.top ?? centerY - height / 2, 16, Math.max(16, window.innerHeight - height - 16))
                : (this.settings.top ?? centerY - height / 2),
            width,
            height
        };
        this.settings.left = this.geometry.left;
        this.settings.top = this.geometry.top;
        this.applyLibraryGeometry();
    }

    applyLibraryGeometry() {
        if (!this.overlay || !this.geometry) return;
        this.overlay.style.left = `${this.geometry.left}px`;
        this.overlay.style.top = `${this.geometry.top}px`;
        this.overlay.style.setProperty("--gifboard-library-width", `${this.geometry.width}px`);
        this.overlay.style.setProperty("--gifboard-library-height", `${this.geometry.height}px`);
    }

    applyLibraryOpacity() {
        this.overlay?.style.setProperty("--gifboard-opacity", String(this.settings.opacity));
    }

    onLibraryContextMenu = event => {
        const target = event.target instanceof Element ? event.target : null;
        const card = target?.closest(".naat-gif-card");
        if (card && this.overlay?.contains(card)) {
            const folder = this.state.folders.find(item => item.id === card.dataset.folderId);
            const gif = folder?.gifs.find(item => gifKey(item) === card.dataset.gifKey);
            if (!gif) return;
            event.preventDefault();
            event.stopPropagation();
            this.showContextMenu(event.clientX, event.clientY, gif);
            return;
        }
        if (target?.closest("button,input,textarea,select,a,[role='button'],.naat-gif-folder-actions,.naat-gif-settings")) return;
        event.preventDefault();
        if (!this.settings.hideOnRightClick) return;
        event.stopPropagation();
        this.toggleLibrary(false);
    };

    hideNativePicker() {
        if (!this.picker) return;
        this.picker.classList.add("naat-gif-native-hidden");
        this.hiddenPickers.add(this.picker);
    }

    restorePickerVisibility() {
        for (const picker of this.hiddenPickers) picker.classList.remove("naat-gif-native-hidden");
        this.hiddenPickers.clear();
        this.originalPickerVisibility = null;
    }

    beginResize = event => {
        event.preventDefault();
        event.stopPropagation();
        const direction = event.currentTarget.dataset.resize;
        this.resizeStart = {
            x: event.clientX,
            y: event.clientY,
            left: this.geometry.left,
            top: this.geometry.top,
            width: this.geometry.width,
            height: this.geometry.height,
            direction
        };
        window.addEventListener("pointermove", this.onResizeMove);
        window.addEventListener("pointerup", this.onResizeEnd, {once: true});
        window.addEventListener("pointercancel", this.onResizeEnd, {once: true});
    };

    beginMove = event => {
        if (event.button !== 0 || (event.target instanceof Element &&
            event.target.closest("button,input,textarea,select,a,[role='button']"))) return;
        event.preventDefault();
        event.stopPropagation();
        this.moveStart = {
            x: event.clientX,
            y: event.clientY,
            left: this.geometry.left,
            top: this.geometry.top
        };
        window.addEventListener("pointermove", this.onMoveWindow);
        window.addEventListener("pointerup", this.onMoveEnd, {once: true});
        window.addEventListener("pointercancel", this.onMoveEnd, {once: true});
    };

    onMoveWindow = event => {
        if (!this.moveStart) return;
        const left = this.moveStart.left + event.clientX - this.moveStart.x;
        const top = this.moveStart.top + event.clientY - this.moveStart.y;
        this.geometry.left = this.settings.keepWithinScreen
            ? clamp(left, 16, Math.max(16, window.innerWidth - this.geometry.width - 16))
            : left;
        this.geometry.top = this.settings.keepWithinScreen
            ? clamp(top, 16, Math.max(16, window.innerHeight - this.geometry.height - 16))
            : top;
        this.settings.left = this.geometry.left;
        this.settings.top = this.geometry.top;
        this.applyLibraryGeometry();
    };

    onMoveEnd = () => {
        if (!this.moveStart) return;
        this.moveStart = null;
        window.removeEventListener("pointermove", this.onMoveWindow);
        window.removeEventListener("pointerup", this.onMoveEnd);
        window.removeEventListener("pointercancel", this.onMoveEnd);
        this.scheduleSaveSettings();
    };

    onResizeMove = event => {
        if (!this.resizeStart) return;
        const start = this.resizeStart;
        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        const right = start.left + start.width;
        const bottom = start.top + start.height;
        let left = start.left;
        let top = start.top;
        let width = start.width;
        let height = start.height;
        if (start.direction.includes("e")) {
            const maxWidth = this.settings.keepWithinScreen
                ? Math.min(SIZE_LIMITS.maxWidth, Math.max(SIZE_LIMITS.minWidth, window.innerWidth - start.left - 16))
                : SIZE_LIMITS.maxWidth;
            width = clamp(start.width + dx, SIZE_LIMITS.minWidth, maxWidth);
        }
        if (start.direction.includes("w")) {
            const maxWidth = this.settings.keepWithinScreen
                ? Math.min(SIZE_LIMITS.maxWidth, Math.max(SIZE_LIMITS.minWidth, right - 16))
                : SIZE_LIMITS.maxWidth;
            width = clamp(start.width - dx, SIZE_LIMITS.minWidth, maxWidth);
            left = right - width;
        }
        if (start.direction.includes("s")) {
            const maxHeight = this.settings.keepWithinScreen
                ? Math.min(SIZE_LIMITS.maxHeight, Math.max(SIZE_LIMITS.minHeight, window.innerHeight - start.top - 16))
                : SIZE_LIMITS.maxHeight;
            height = clamp(start.height + dy, SIZE_LIMITS.minHeight, maxHeight);
        }
        if (start.direction.includes("n")) {
            const maxHeight = this.settings.keepWithinScreen
                ? Math.min(SIZE_LIMITS.maxHeight, Math.max(SIZE_LIMITS.minHeight, bottom - 16))
                : SIZE_LIMITS.maxHeight;
            height = clamp(start.height - dy, SIZE_LIMITS.minHeight, maxHeight);
            top = bottom - height;
        }
        this.geometry = {left, top, width, height};
        this.settings.width = width;
        this.settings.height = height;
        this.settings.left = left;
        this.settings.top = top;
        this.applyLibrarySize();
        this.scheduleSaveSettings();
    };

    onResizeEnd = () => {
        this.resizeStart = null;
        window.removeEventListener("pointermove", this.onResizeMove);
        window.removeEventListener("pointerup", this.onResizeEnd);
        window.removeEventListener("pointercancel", this.onResizeEnd);
    };

    onWindowResize = () => {
        this.applyLibrarySize();
        if (this.geometry) {
            this.settings.left = this.geometry.left;
            this.settings.top = this.geometry.top;
        }
    };

    applySidebarWidth() {
        if (!this.overlay) return;
        const availableWidth = this.overlay.clientWidth || this.settings.width;
        const maxWidth = Math.max(1, Math.floor(availableWidth * 0.45));
        const width = Math.min(this.settings.sidebarWidth, maxWidth);
        this.overlay.style.setProperty("--gifboard-sidebar-width", `${width}px`);
        const resizer = this.overlay.querySelector(".naat-gif-sidebar-resizer");
        if (resizer) {
            resizer.setAttribute("aria-valuemin", String(SIZE_LIMITS.minSidebarWidth));
            resizer.setAttribute("aria-valuemax", String(Math.max(SIZE_LIMITS.minSidebarWidth, maxWidth)));
            resizer.setAttribute("aria-valuenow", String(width));
        }
    }

    beginSidebarResize = event => {
        if (event.button !== 0) return;
        event.preventDefault();
        event.stopPropagation();
        this.sidebarResizeStart = {
            x: event.clientX,
            width: this.overlay?.querySelector(".naat-gif-folders")?.getBoundingClientRect().width || this.settings.sidebarWidth
        };
        window.addEventListener("pointermove", this.onSidebarResizeMove);
        window.addEventListener("pointerup", this.onSidebarResizeEnd);
        window.addEventListener("pointercancel", this.onSidebarResizeEnd);
    };

    onSidebarResizeMove = event => {
        if (!this.sidebarResizeStart) return;
        const availableWidth = this.overlay?.clientWidth || this.settings.width;
        const maxWidth = Math.min(SIZE_LIMITS.maxSidebarWidth, Math.floor(availableWidth * 0.45));
        this.settings.sidebarWidth = clamp(
            this.sidebarResizeStart.width + event.clientX - this.sidebarResizeStart.x,
            Math.min(SIZE_LIMITS.minSidebarWidth, maxWidth),
            maxWidth
        );
        this.applySidebarWidth();
    };

    onSidebarResizeEnd = () => {
        if (!this.sidebarResizeStart) return;
        this.sidebarResizeStart = null;
        window.removeEventListener("pointermove", this.onSidebarResizeMove);
        window.removeEventListener("pointerup", this.onSidebarResizeEnd);
        window.removeEventListener("pointercancel", this.onSidebarResizeEnd);
        this.scheduleSaveSettings();
    };

    onSidebarResizeKeydown = event => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        const availableWidth = this.overlay?.clientWidth || this.settings.width;
        const maxWidth = Math.min(SIZE_LIMITS.maxSidebarWidth, Math.floor(availableWidth * 0.45));
        const delta = event.key === "ArrowRight" ? 10 : -10;
        this.settings.sidebarWidth = clamp(
            this.settings.sidebarWidth + delta,
            Math.min(SIZE_LIMITS.minSidebarWidth, maxWidth),
            maxWidth
        );
        this.applySidebarWidth();
        this.scheduleSaveSettings();
    };

    toggleLibrary(forceOpen) {
        if (!this.overlay) return;
        const isOpen = forceOpen ?? this.libraryBackdrop.hidden;
        this.libraryBackdrop.hidden = !isOpen;
        this.toggle?.setAttribute("aria-pressed", String(isOpen));
        this.toggle?.setAttribute("aria-selected", String(isOpen));
        if (isOpen) {
            this.initializeLibraryGeometry();
            this.hideNativePicker();
            this.applyLibrarySize();
            this.renderLibrary();
        }
        else {
            this.restorePickerVisibility();
        }
    }

    renderLibrary() {
        if (!this.overlay) return;
        this.applySidebarWidth();
        this.applyLibraryOpacity();
        this.overlay.replaceChildren();

        const header = document.createElement("div");
        header.className = "naat-gif-header";
        header.addEventListener("pointerdown", this.beginMove);
        const title = document.createElement("strong");
        title.textContent = "My GIF library";
        const search = document.createElement("input");
        search.className = "naat-gif-search";
        search.type = "search";
        search.placeholder = "Search saved GIFs";
        search.setAttribute("aria-label", "Search saved GIFs");
        search.value = this.searchTerm;
        search.addEventListener("input", () => {
            this.searchTerm = search.value;
            this.renderGrid();
        });
        const settingsButton = this.makeButton("Settings", () => {
            const settings = this.overlay.querySelector("[data-library-settings]");
            settings.hidden = !settings.hidden;
            settingsButton.setAttribute("aria-expanded", String(!settings.hidden));
        });
        settingsButton.setAttribute("aria-expanded", "false");
        const settingsPanel = document.createElement("div");
        settingsPanel.className = "naat-gif-tools naat-gif-settings";
        settingsPanel.dataset.librarySettings = "true";
        settingsPanel.hidden = true;
        settingsPanel.append(
            this.createOpacityControl(),
            this.createHideOnRightClickControl(),
            this.createAutoFavoriteControl(),
            this.createKeepWithinScreenControl()
        );
        header.append(title, search,
            this.makeButton("Export", () => this.exportLibrary()),
            this.makeButton("Import", () => this.importLibrary()),
            settingsButton,
            this.makeButton("Close", () => this.toggleLibrary()));

        const workspace = document.createElement("div");
        workspace.className = "naat-gif-workspace";
        const sidebar = document.createElement("nav");
        sidebar.className = "naat-gif-folders";
        sidebar.setAttribute("aria-label", "GIF folders");
        this.state.folders.forEach(folder => {
            const button = this.makeButton("", () => {
                this.selectedFolder = folder.id;
                this.renderLibrary();
            }, "naat-gif-folder");
            button.setAttribute("aria-pressed", String(folder.id === this.selectedFolder));
            const name = document.createElement("span");
            name.textContent = folder.name;
            const count = document.createElement("span");
            count.className = "naat-gif-count";
            count.textContent = String(folder.gifs.length);
            button.append(name, count);
            sidebar.append(button);
        });
        const sidebarResizer = document.createElement("div");
        sidebarResizer.className = "naat-gif-sidebar-resizer";
        sidebarResizer.setAttribute("role", "separator");
        sidebarResizer.setAttribute("aria-orientation", "vertical");
        sidebarResizer.setAttribute("aria-label", "Resize folder panel");
        sidebarResizer.tabIndex = 0;
        sidebarResizer.addEventListener("pointerdown", this.beginSidebarResize);
        sidebarResizer.addEventListener("keydown", this.onSidebarResizeKeydown);

        const main = document.createElement("div");
        main.className = "naat-gif-main";
        const actions = document.createElement("div");
        actions.className = "naat-gif-folder-actions";
        actions.append(
            this.makeButton("New folder", () => this.createFolder()),
            this.makeButton("Rename", () => this.renameFolder()),
            this.makeButton("Delete folder", () => this.deleteFolder())
        );
        main.append(actions);
        const grid = document.createElement("div");
        grid.className = "naat-gif-grid";
        grid.dataset.grid = "true";
        main.append(grid);
        workspace.append(sidebar, sidebarResizer, main);
        this.overlay.append(header, workspace, settingsPanel);
        for (const direction of ["n", "s", "e", "w", "ne", "nw", "se", "sw"]) {
            const resizeHandle = this.makeButton("", () => {}, "naat-gif-resize-handle");
            resizeHandle.dataset.resize = direction;
            resizeHandle.setAttribute("aria-label", `Resize GIF library from ${direction}`);
            resizeHandle.addEventListener("pointerdown", this.beginResize);
            this.overlay.append(resizeHandle);
        }

        if (this.storageBlocked) {
            const warning = document.createElement("p");
            warning.className = "naat-gif-empty";
            warning.textContent = "Library data could not be read. Existing data was preserved; import a valid JSON backup to recover.";
            main.prepend(warning);
        }
        this.renderGrid();
    }

    renderGrid() {
        const grid = this.overlay?.querySelector("[data-grid]");
        if (!grid) return;
        grid.replaceChildren();
        const folder = this.state.folders.find(item => item.id === this.selectedFolder) || this.state.folders[0];
        if (folder && folder.id !== this.selectedFolder) this.selectedFolder = folder.id;
        if (!folder) {
            const empty = document.createElement("div");
            empty.className = "naat-gif-empty";
            empty.textContent = "Create a folder, then use the GIF context menu to save GIFs here.";
            grid.append(empty);
            return;
        }

        const term = this.searchTerm.trim().toLowerCase();
        const gifs = folder.gifs.filter(gif => !term || `${gif.title} ${gif.url}`.toLowerCase().includes(term));
        if (!gifs.length) {
            const empty = document.createElement("div");
            empty.className = "naat-gif-empty";
            empty.textContent = term ? "No saved GIFs match this search." : "This folder is empty. Right-click a GIF in Discord's picker to add it.";
            grid.append(empty);
            return;
        }
        gifs.forEach(gif => grid.append(this.createGifCard(folder, gif)));
    }

    createGifCard(folder, gif) {
        const card = document.createElement("article");
        card.className = "naat-gif-card";
        card.dataset.folderId = folder.id;
        card.dataset.gifKey = gifKey(gif);
        const preview = document.createElement("button");
        preview.type = "button";
        preview.className = "naat-gif-preview";
        preview.setAttribute("aria-label", `Send ${gif.title || "GIF"}`);
        preview.title = "Send GIF";
        preview.addEventListener("click", () => this.sendGif(gif, preview));
        const previewUrl = gif.previewUrl || gif.url;
        const isVideo = /\.(?:mp4|webm|mov)(?:$|[?#])/i.test(previewUrl);
        const media = document.createElement(isVideo ? "video" : "img");
        media.src = previewUrl;
        if (isVideo) {
            media.muted = true;
            media.loop = true;
            media.autoplay = true;
            media.playsInline = true;
            media.preload = "metadata";
            media.setAttribute("aria-label", gif.title || "Saved GIF");
        }
        else {
            media.alt = gif.title || "Saved GIF";
            media.loading = "lazy";
        }
        let triedFallback = false;
        media.addEventListener("error", () => {
            const fallback = safeUrl(gif.url);
            if (!triedFallback && fallback && fallback !== media.src) {
                triedFallback = true;
                media.src = fallback;
                if (isVideo) media.load();
                return;
            }
            media.remove();
            const unavailable = document.createElement("div");
            unavailable.className = "naat-gif-empty";
            unavailable.textContent = "Preview unavailable";
            card.prepend(unavailable);
        }, {once: true});
        const caption = document.createElement("div");
        caption.className = "naat-gif-card-label";
        caption.textContent = gif.title || "GIF";
        const actions = document.createElement("div");
        actions.className = "naat-gif-card-actions";
        actions.append(this.makeButton("Remove", () => this.removeGif(folder.id, gif.url)));
        preview.append(media, caption);
        card.append(preview, actions);
        return card;
    }

    createFolder() {
        this.showTextDialog("New folder", "Create", "", name => {
            const folder = {id: this.makeId(), name: name.slice(0, 80), gifs: []};
            if (this.mutateLibrary(state => state.folders.push(folder))) {
                this.selectedFolder = folder.id;
                this.renderLibrary();
            }
        });
    }

    renameFolder() {
        const folder = this.getSelectedFolder();
        if (!folder) return this.notify("Create or select a folder first.", "error");
        this.showTextDialog("Rename folder", "Save", folder.name, name => {
            if (this.mutateLibrary(state => {
                const target = state.folders.find(item => item.id === folder.id);
                if (target) target.name = name.slice(0, 80);
            })) this.renderLibrary();
        });
    }

    deleteFolder() {
        const folder = this.getSelectedFolder();
        if (!folder) return this.notify("Select a folder first.", "error");
        this.showConfirmDialog(`Delete "${folder.name}" and its ${folder.gifs.length} GIF(s)?`, () => {
            if (!this.mutateLibrary(state => {
                state.folders = state.folders.filter(item => item.id !== folder.id);
            })) return;
            this.selectedFolder = this.state.folders[0]?.id || null;
            this.renderLibrary();
        });
    }

    showTextDialog(title, confirmLabel, initialValue, onSubmit) {
        this.closeDialog();
        const backdrop = document.createElement("div");
        backdrop.className = "naat-gif-tools naat-gif-dialog-backdrop";
        const form = document.createElement("form");
        form.className = "naat-gif-dialog";
        form.setAttribute("role", "dialog");
        form.setAttribute("aria-modal", "true");
        const heading = document.createElement("h3");
        heading.textContent = title;
        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = 80;
        input.required = true;
        input.value = initialValue;
        input.placeholder = "Folder name";
        input.setAttribute("aria-label", "Folder name");
        const actions = document.createElement("div");
        actions.className = "naat-gif-dialog-actions";
        const cancel = this.makeButton("Cancel", () => this.closeDialog());
        const submit = document.createElement("button");
        submit.type = "submit";
        submit.dataset.primary = "true";
        submit.textContent = confirmLabel;
        actions.append(cancel, submit);
        form.append(heading, input, actions);
        form.addEventListener("submit", event => {
            event.preventDefault();
            const name = input.value.trim();
            if (!name) {
                input.focus();
                return;
            }
            this.closeDialog();
            onSubmit(name);
        });
        backdrop.append(form);
        backdrop.addEventListener("pointerdown", event => {
            if (event.target === backdrop) this.closeDialog();
        });
        backdrop.addEventListener("keydown", this.onDialogKeydown);
        document.documentElement.append(backdrop);
        this.dialog = backdrop;
        input.focus();
        input.select();
    }

    showConfirmDialog(message, onConfirm, confirmLabel = "Delete") {
        this.closeDialog();
        const backdrop = document.createElement("div");
        backdrop.className = "naat-gif-tools naat-gif-dialog-backdrop";
        const dialog = document.createElement("div");
        dialog.className = "naat-gif-dialog";
        dialog.setAttribute("role", "dialog");
        dialog.setAttribute("aria-modal", "true");
        const text = document.createElement("p");
        text.textContent = message;
        const actions = document.createElement("div");
        actions.className = "naat-gif-dialog-actions";
        actions.append(
            this.makeButton("Cancel", () => this.closeDialog()),
            this.makeButton(confirmLabel, () => {
                this.closeDialog();
                onConfirm();
            })
        );
        actions.lastElementChild.dataset.primary = "true";
        dialog.append(text, actions);
        backdrop.append(dialog);
        backdrop.addEventListener("pointerdown", event => {
            if (event.target === backdrop) this.closeDialog();
        });
        backdrop.addEventListener("keydown", this.onDialogKeydown);
        document.documentElement.append(backdrop);
        this.dialog = backdrop;
        actions.lastElementChild.focus();
    }

    closeDialog() {
        this.dialog?.removeEventListener("keydown", this.onDialogKeydown);
        this.dialog?.remove();
        this.dialog = null;
    }

    onDialogKeydown = event => {
        if (event.key === "Escape") this.closeDialog();
    };

    getSelectedFolder() {
        return this.state.folders.find(folder => folder.id === this.selectedFolder) || this.state.folders[0] || null;
    }

    makeId() {
        return globalThis.crypto?.randomUUID?.() || `folder-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }

    mutateLibrary(change) {
        if (this.storageBlocked) {
            this.notify("Library writes are disabled to protect unreadable data. Import a valid backup first.", "error");
            return false;
        }
        const previous = this.state;
        const next = {
            version: DATA_VERSION,
            folders: previous.folders.map(folder => ({...folder, gifs: [...folder.gifs]}))
        };
        try {
            change(next);
            const normalized = normalizeState(next);
            this.api.Data.save("library", normalized);
            this.state = normalized;
            return true;
        }
        catch (error) {
            console.error(`[${PLUGIN_NAME}] Could not save GIF library:`, error);
            this.notify(`Library was not changed: ${error.message}`, "error");
            return false;
        }
    }

    addGifToFolder(folderId, rawGif) {
        const url = safeUrl(rawGif.url);
        if (!url) {
            this.notify("This GIF has no valid HTTP(S) URL.", "error");
            return false;
        }
        const gif = {
            url,
            previewUrl: safePreviewUrl(rawGif.previewUrl) || url,
            title: typeof rawGif.title === "string" ? rawGif.title.slice(0, 256) : "",
            addedAt: Date.now()
        };
        const success = this.mutateLibrary(state => {
            const folder = state.folders.find(item => item.id === folderId);
            if (!folder) throw new Error("The selected folder no longer exists.");
            if (folder.gifs.some(item => gifKey(item) === gifKey(gif))) {
                throw new Error("This GIF is already in that folder.");
            }
            folder.gifs.push(gif);
        });
        if (success) {
            if (this.settings.autoFavorite) this.addToDiscordFavorites(rawGif);
            this.selectedFolder = folderId;
            this.toggleLibrary(true);
            this.notify("GIF added to folder.");
            return true;
        }
        return false;
    }

    addToDiscordFavorites(gif) {
        if (gif.isFavorite === true) return;
        const control = gif.favoriteControl;
        if (!control?.isConnected || gif.isFavorite !== false) {
            this.notify("GIF was saved to your folder, but Discord's Favorites button or its state could not be identified.", "error");
            return;
        }
        try {
            control.click();
            window.setTimeout(() => {
                if (!control.isConnected) {
                    this.notify("GIF was saved, but Discord did not confirm the Favorites change.", "error");
                    return;
                }
                const label = [
                    control.getAttribute("aria-label"),
                    control.getAttribute("title"),
                    control.getAttribute("data-tooltip-content"),
                    control.innerText
                ].filter(Boolean).join(" ");
                if (/remove|удалить|убрать|избранное|unfavorite/i.test(label) || control.getAttribute("aria-pressed") === "true") {
                    this.notify("GIF added to Discord Favorites.");
                }
                else {
                    this.notify("GIF was saved, but Discord did not confirm the Favorites change.", "error");
                }
            }, 500);
        }
        catch (error) {
            console.error(`[${PLUGIN_NAME}] Could not add GIF to Discord Favorites:`, error);
            this.notify("GIF was saved, but could not be added to Discord Favorites.", "error");
        }
    }

    removeGif(folderId, url) {
        this.showConfirmDialog("Remove this GIF from the selected folder?", () => {
            this.mutateLibrary(state => {
                const folder = state.folders.find(item => item.id === folderId);
                if (folder) folder.gifs = folder.gifs.filter(gif => gifKey(gif) !== url.toLowerCase());
            });
            this.renderLibrary();
        });
    }

    onPickerContextMenu = event => {
        const target = event.target instanceof Element ? event.target : event.target?.parentElement;
        if (!target || this.overlay?.contains(target)) return;
        const path = typeof event.composedPath === "function" ? event.composedPath() : [];
        const gif = this.extractGifFromTarget(target, path);
        if (!gif) return;
        event.preventDefault();
        event.stopPropagation();
        this.showContextMenu(event.clientX, event.clientY, gif);
    };

    extractGifFromTarget(target, eventPath) {
        let boundary = this.picker?.contains(target) ? this.picker : this.findPicker();
        if (!boundary?.contains(target)) boundary = null;
        const elements = [];
        const addElement = element => {
            if (element instanceof Element && !elements.includes(element)) elements.push(element);
        };
        for (const element of eventPath.slice(0, 12)) {
            if (!(element instanceof Element)) continue;
            addElement(element);
            if (element === boundary) break;
        }
        if (!elements.length || !elements.includes(target)) addElement(target);

        let current = target;
        for (let depth = 0; current && depth < 12; depth++, current = current.parentElement) {
            addElement(current);
            if (current === boundary) break;
        }

        for (const element of elements) {
            const candidates = [];
            if (element.matches("img,video,source")) candidates.push(element);
            const nestedMedia = element.querySelectorAll("img,video,source");
            if (nestedMedia.length <= 4) candidates.push(...nestedMedia);
            const anchor = element.closest("a[href]");
            if (anchor) candidates.push(anchor);

            const rankedCandidates = candidates.map(candidate => {
                const media = candidate.matches("source") ? candidate.parentElement : candidate;
                const rect = media?.getBoundingClientRect();
                return {candidate, media, area: rect ? rect.width * rect.height : 0};
            }).filter(item => item.candidate === target || item.area >= 4096)
                .sort((left, right) => right.area - left.area);

            for (const {candidate, media} of rankedCandidates) {
                const poster = safePreviewUrl(media?.poster || "");
                const rawUrl = candidate.getAttribute("data-original-url") ||
                    candidate.getAttribute("data-full") ||
                    candidate.currentSrc ||
                    candidate.src ||
                    candidate.getAttribute("data-src") ||
                    candidate.getAttribute("srcset")?.split(/\s+/)[0] ||
                    candidate.getAttribute("href") ||
                    candidate.poster || "";
                const url = safeUrl(rawUrl);
                if (!url) continue;
                const previewUrl = poster || safePreviewUrl(rawUrl) ||
                    safePreviewUrl(media?.currentSrc || media?.src || media?.poster) || url;
                const title = this.getGifTitle(media);
                const favorite = this.findFavoriteControl(media, boundary);
                if (!boundary && !this.isKnownGifUrl(url)) continue;
                return {url, previewUrl, title, favoriteControl: favorite?.element || null, isFavorite: favorite?.isFavorite ?? null};
            }

            const background = getComputedStyle(element).backgroundImage;
            const urls = [...background.matchAll(/url\((?:"|')?(.*?)(?:"|')?\)/gi)];
            for (const match of urls) {
                const url = safeUrl(match[1]);
                if (!url) continue;
                if (!boundary && !this.isKnownGifUrl(url)) continue;
                const title = this.getGifTitle(element);
                const favorite = this.findFavoriteControl(element, boundary);
                return {url, previewUrl: url, title, favoriteControl: favorite?.element || null, isFavorite: favorite?.isFavorite ?? null};
            }
        }
        return null;
    }

    isKnownGifUrl(value) {
        try {
            const url = new URL(value);
            return /(^|\.)((media\.)?tenor\.com|(media\.)?giphy\.com|klipy\.com)$/i.test(url.hostname) ||
                /\.gifv?$/i.test(url.pathname);
        }
        catch {
            return false;
        }
    }

    getGifTitle(element) {
        return cleanGifTitle([
            element?.getAttribute("alt"),
            element?.getAttribute("title"),
            element?.getAttribute("data-title")
        ].find(value => typeof value === "string" && value.trim()));
    }

    findFavoriteControl(media, boundary) {
        const favoriteLabel = /favorite|favourite|избран|звезд|star/i;
        const removeLabel = /remove|удалить|убрать|unfavorite|remove from favorites|убрать из избранного/i;
        const addLabel = /add|добавить|в избранное|favorite|favourite/i;
        let current = media;
        for (let depth = 0; current && depth < 8; depth++, current = current.parentElement) {
            const controls = [];
            if (current.matches("button,[role='button']")) controls.push(current);
            controls.push(...current.querySelectorAll("button,[role='button']"));
            for (const control of controls) {
                const label = [
                    control.getAttribute("aria-label"),
                    control.getAttribute("title"),
                    control.getAttribute("data-tooltip-content"),
                    control.innerText
                ].filter(Boolean).join(" ").trim();
                if (!favoriteLabel.test(label)) continue;
                const pressed = control.getAttribute("aria-pressed");
                if (removeLabel.test(label)) return {element: control, isFavorite: true};
                if (addLabel.test(label) && !removeLabel.test(label)) {
                    if (/\badd\b|добавить|в избранное/i.test(label)) return {element: control, isFavorite: false};
                    if (pressed === "true") return {element: control, isFavorite: true};
                    if (pressed === "false") return {element: control, isFavorite: false};
                }
            }
            if (current === boundary) break;
        }
        return null;
    }

    showContextMenu(x, y, gif) {
        this.closeContextMenu();
        const menu = document.createElement("div");
        menu.className = "naat-gif-tools naat-gif-context";
        menu.setAttribute("role", "menu");
        const label = document.createElement("strong");
        label.textContent = "Save GIF to folder";
        menu.append(label);
        if (!this.state.folders.length) {
            menu.append(this.makeButton("Create first folder", () => {
                this.closeContextMenu();
                this.createFolder();
            }));
        }
        this.state.folders.forEach(folder => {
            const exists = folder.gifs.some(item => gifKey(item) === gifKey(gif));
            const button = this.makeButton(`${exists ? "✓ " : ""}${folder.name}`, () => {});
            button.dataset.folderId = folder.id;
            let pointerSelected = false;
            button.addEventListener("pointerdown", event => {
                event.preventDefault();
                event.stopPropagation();
                pointerSelected = true;
                this.selectContextFolder(folder, gif, exists);
            });
            button.addEventListener("click", event => {
                event.preventDefault();
                event.stopPropagation();
                if (pointerSelected) {
                    pointerSelected = false;
                    return;
                }
                this.selectContextFolder(folder, gif, exists);
            });
            menu.append(button);
        });
        menu.style.left = `${Math.max(8, Math.min(x, window.innerWidth - 210))}px`;
        menu.style.top = `${Math.max(8, Math.min(y, window.innerHeight - 260))}px`;
        document.documentElement.append(menu);
        this.contextMenu = menu;
        this.onContextOutside = event => {
            if (!menu.contains(event.target)) this.closeContextMenu();
        };
        this.onContextKey = event => {
            if (event.key === "Escape") this.closeContextMenu();
        };
        document.addEventListener("click", this.onContextOutside);
        document.addEventListener("keydown", this.onContextKey, true);
    }

    selectContextFolder(folder, gif, exists) {
        if (exists) {
            this.notify(`"${folder.name}" already contains this GIF.`, "info");
            this.closeContextMenu();
            return;
        }
        if (this.addGifToFolder(folder.id, gif)) this.closeContextMenu();
    }

    closeContextMenu() {
        this.contextMenu?.remove();
        this.contextMenu = null;
        if (this.onContextOutside) document.removeEventListener("click", this.onContextOutside);
        if (this.onContextKey) document.removeEventListener("keydown", this.onContextKey, true);
        this.onContextOutside = null;
        this.onContextKey = null;
    }

    async sendGif(gif, trigger) {
        const url = safeUrl(gif.url);
        if (!url) return this.notify("This GIF has an invalid URL.", "error");
        const key = url.toLowerCase();
        if (this.sendingGifs.has(key)) return;
        this.sendingGifs.add(key);
        if (trigger) trigger.disabled = true;
        try {
            const selectedChannelStore = this.api.Webpack.getStore("SelectedChannelStore");
            const channelId = selectedChannelStore?.getChannelId?.();
            if (!channelId) {
                return this.notify("No text channel is selected. Open a chat and try again.", "error");
            }

            const messageUtils = this.api.Webpack.getModule(
                this.api.Webpack.Filters.byKeys("sendMessage")
            );
            if (typeof messageUtils?.sendMessage !== "function") {
                return this.notify("Discord's message sender is unavailable. No message was sent.", "error");
            }

            await messageUtils.sendMessage(channelId, {content: url}, undefined, {});
        }
        catch (error) {
            console.error(`[${PLUGIN_NAME}] Could not send GIF to Discord:`, error);
            this.notify(`Discord could not send the GIF: ${error?.message || "unknown error"}`, "error");
        }
        finally {
            this.sendingGifs.delete(key);
            if (trigger?.isConnected) trigger.disabled = false;
        }
    }

    exportLibrary() {
        if (this.storageBlocked) {
            return this.notify("Cannot export unreadable library data. Import a valid backup to recover it first.", "error");
        }
        try {
            const backup = {
                format: "NotAnotherAnimeGIF-library",
                version: DATA_VERSION,
                exportedAt: new Date().toISOString(),
                folders: this.state.folders
            };
            const blob = new Blob([JSON.stringify(backup, null, 2)], {type: "application/json"});
            const href = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = href;
            link.download = "notanotheranime-gif-library.json";
            link.click();
            setTimeout(() => URL.revokeObjectURL(href), 1000);
        }
        catch (error) {
            console.error(`[${PLUGIN_NAME}] Export failed:`, error);
            this.notify(`Could not export GIF library: ${error.message}`, "error");
        }
    }

    importLibrary() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json,application/json";
        input.addEventListener("change", async () => {
            const file = input.files?.[0];
            if (!file) return;
            try {
                const parsed = JSON.parse(await file.text());
                if (parsed?.format !== "NotAnotherAnimeGIF-library" || parsed.version !== DATA_VERSION) {
                    throw new Error("This file is not a supported NotAnotherAnimeGIF backup.");
                }
                const incoming = normalizeState({version: parsed.version, folders: parsed.folders});
                const applyImport = () => {
                    if (!this.mergeImport(incoming)) return;
                    this.storageBlocked = false;
                    this.renderLibrary();
                    this.notify("GIF library imported and merged.");
                };
                if (this.storageBlocked) {
                    this.showConfirmDialog("The current library data cannot be read. Replace it with this backup?", applyImport, "Continue");
                }
                else applyImport();
            }
            catch (error) {
                console.error(`[${PLUGIN_NAME}] Import failed:`, error);
                this.notify(`Import failed; existing library was left unchanged: ${error.message}`, "error");
            }
        }, {once: true});
        input.click();
    }

    mergeImport(incoming) {
        const previousBlocked = this.storageBlocked;
        this.storageBlocked = false;
        const success = this.mutateLibrary(state => {
            for (const incomingFolder of incoming.folders) {
                let folder = state.folders.find(item => item.id === incomingFolder.id) ||
                    state.folders.find(item => item.name.toLowerCase() === incomingFolder.name.toLowerCase());
                if (!folder) {
                    const id = state.folders.some(item => item.id === incomingFolder.id) ? this.makeId() : incomingFolder.id;
                    folder = {id, name: incomingFolder.name, gifs: []};
                    state.folders.push(folder);
                }
                const keys = new Set(folder.gifs.map(gifKey));
                for (const gif of incomingFolder.gifs) {
                    if (!keys.has(gifKey(gif))) {
                        folder.gifs.push(gif);
                        keys.add(gifKey(gif));
                    }
                }
            }
        });
        if (!success) this.storageBlocked = previousBlocked;
        return success;
    }
};
