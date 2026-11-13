/**
 * @name GIFboard+
 * @author Razik
 * @version 2.2.25
 * @description Organize, search, and send GIFs from your personal library.
 */

const PLUGIN_NAME = "GIFboard+";
const DEFAULT_SIZE = {width: 480, height: 560, sidebarWidth: 155, opacity: 0.94, hideOnRightClick: true, autoFavorite: false, keepWithinScreen: true, left: null, top: null};
const SIZE_LIMITS = {minWidth: 320, maxWidth: 4096, minHeight: 240, maxHeight: 2160, minSidebarWidth: 100, maxSidebarWidth: 360};
const DATA_VERSION = 1;
const RU_TRANSLATIONS = {
    "GIF library window layout": "Размеры и оформление окна GIF-библиотеки",
    "Width": "Ширина",
    "Height": "Высота",
    "Reset to default": "Сбросить настройки",
    "Window size, sidebar width, background opacity, and right-click behavior are saved automatically.": "Размеры окна и панели, прозрачность и поведение правой кнопки сохраняются автоматически.",
    "Window background opacity": "Прозрачность фона окна",
    "Add to Favorites when saving to a folder": "В избранное при добавлении в папку",
    "Hide on right-click in empty space": "Скрывать правым щелчком по пустой области",
    "Keep within screen bounds": "Придерживаться границ экрана",
    "Personal GIF library": "Личная библиотека GIF",
    "My GIFs": "Мои GIF",
    "Search saved GIFs": "Поиск по сохранённым GIF",
    "Settings": "Настройки",
    "My GIF library": "Моя библиотека GIF",
    "Export": "Экспорт",
    "Import": "Импорт",
    "Close": "Закрыть",
    "GIF folders": "Папки с GIF",
    "Resize folder panel": "Изменить ширину панели папок",
    "Resize GIF library from {direction}": "Изменить размер окна GIF с {direction}",
    "top edge": "верхнего края",
    "bottom edge": "нижнего края",
    "left edge": "левого края",
    "right edge": "правого края",
    "top-right corner": "верхнего правого угла",
    "top-left corner": "верхнего левого угла",
    "bottom-right corner": "нижнего правого угла",
    "bottom-left corner": "нижнего левого угла",
    "New folder": "Новая папка",
    "Rename": "Переименовать",
    "Delete folder": "Удалить папку",
    "Library data could not be read. Existing data was preserved; import a valid JSON backup to recover.": "Не удалось прочитать библиотеку. Данные сохранены; для восстановления импортируйте корректную резервную копию JSON.",
    "Create a folder, then use the GIF context menu to save GIFs here.": "Создайте папку, затем сохраните сюда GIF через контекстное меню.",
    "No saved GIFs match this search.": "По этому запросу GIF не найдены.",
    "This folder is empty. Right-click a GIF in Discord's picker to add it.": "Папка пуста. Щёлкните правой кнопкой по GIF в пикере Discord, чтобы добавить его.",
    "Send {title}": "Отправить: {title}",
    "Send GIF": "Отправить GIF",
    "Saved GIF": "Сохранённый GIF",
    "Preview unavailable": "Предпросмотр недоступен",
    "GIF": "GIF",
    "Untitled": "Без названия",
    "unknown error": "неизвестная ошибка",
    "Remove": "Убрать",
    "Remove this GIF from the selected folder?": "Убрать этот GIF из выбранной папки?",
    "Create or select a folder first.": "Сначала создайте или выберите папку.",
    "Select a folder first.": "Сначала выберите папку.",
    "Create": "Создать",
    "Rename folder": "Переименовать папку",
    "Save": "Сохранить",
    "Delete \"{name}\" and its {count} GIF(s)?": "Удалить папку «{name}» и её GIF ({count})?",
    "Folder name": "Название папки",
    "Cancel": "Отмена",
    "Delete": "Удалить",
    "Continue": "Продолжить",
    "Save GIF to folder": "Сохранить GIF в папку",
    "GIF actions": "Действия с GIF",
    "Copy link": "Копировать ссылку",
    "GIF link copied.": "Ссылка на GIF скопирована.",
    "Could not copy GIF link: {error}": "Не удалось скопировать ссылку на GIF: {error}",
    "Clipboard API is unavailable.": "Буфер обмена недоступен.",
    "Save image to folder": "Сохранить изображение в папку",
    "Create first folder": "Создать первую папку",
    "\"{name}\" already contains this GIF.": "В папке «{name}» этот GIF уже есть.",
    "Library writes are disabled to protect unreadable data. Import a valid backup first.": "Запись в библиотеку отключена, чтобы защитить повреждённые данные. Сначала импортируйте корректную резервную копию.",
    "Library was not changed: {error}": "Библиотека не изменена: {error}",
    "This GIF has no valid HTTP(S) URL.": "У GIF нет корректной HTTP(S)-ссылки.",
    "The selected folder no longer exists.": "Выбранная папка больше не существует.",
    "This GIF is already in that folder.": "Этот GIF уже есть в папке.",
    "GIF added to folder.": "GIF добавлен в папку.",
    "GIF was saved to your folder, but Discord's Favorites button or its state could not be identified.": "GIF сохранён в папку, но не удалось определить кнопку избранного Discord или её состояние.",
    "GIF was saved, but Discord did not confirm the Favorites change.": "GIF сохранён, но Discord не подтвердил добавление в избранное.",
    "GIF added to Discord Favorites.": "GIF добавлен в избранное Discord.",
    "GIF was saved, but could not be added to Discord Favorites.": "GIF сохранён, но не удалось добавить его в избранное Discord.",
    "This GIF has an invalid URL.": "У GIF некорректная ссылка.",
    "No text channel is selected. Open a chat and try again.": "Текстовый канал не выбран. Откройте чат и попробуйте снова.",
    "Discord's message sender is unavailable. No message was sent.": "Отправка сообщений Discord недоступна. Сообщение не отправлено.",
    "Discord's reply handler is unavailable. GIF was not sent.": "Обработчик ответа Discord недоступен. GIF не отправлен.",
    "GIF was sent as a reply, but Discord could not clear the reply state.": "GIF отправлен ответом, но Discord не удалось сбросить режим ответа.",
    "Discord could not send the GIF: {error}": "Discord не смог отправить GIF: {error}",
    "Cannot export unreadable library data. Import a valid backup to recover it first.": "Нельзя экспортировать нечитаемую библиотеку. Сначала импортируйте корректную резервную копию.",
    "Could not export GIF library: {error}": "Не удалось экспортировать библиотеку GIF: {error}",
    "This file is not a supported GIFboard backup.": "Файл не является резервной копией GIFboard поддерживаемого формата.",
    "GIF library imported and merged.": "Библиотека GIF импортирована и объединена.",
    "The current library data cannot be read. Replace it with this backup?": "Не удалось прочитать текущую библиотеку. Заменить её этой резервной копией?",
    "Import failed; existing library was left unchanged: {error}": "Не удалось импортировать данные; текущая библиотека не изменена: {error}",
    "Could not save GIF library: {error}": "Не удалось сохранить библиотеку GIF: {error}",
    "Could not save picker size.": "Не удалось сохранить размер пикера GIF.",
    "Could not save picker size": "Не удалось сохранить размер пикера GIF",
    "Failed to start: {error}": "Не удалось запустить плагин: {error}",
    "Plugin could not start: {error}": "Не удалось запустить плагин: {error}",
    "Library data was not loaded or overwritten: {error}": "Данные библиотеки не загружены и не перезаписаны: {error}",
    "Library data has an unsupported or damaged format.": "Формат данных библиотеки не поддерживается или повреждён.",
    "A folder in the library data is damaged.": "Данные одной из папок повреждены.",
    "Folder \"{name}\" contains an invalid GIF URL.": "Папка «{name}» содержит некорректную ссылку на GIF.",
    "The library contains duplicate folder identifiers.": "В библиотеке обнаружены повторяющиеся идентификаторы папок.",
    "Could not read GIF library": "Не удалось прочитать библиотеку GIF",
    "Import failed": "Не удалось импортировать данные",
    "Could not send GIF to Discord": "Не удалось отправить GIF в Discord",
    "Could not add GIF to Discord Favorites": "Не удалось добавить GIF в избранное Discord",
    "Create new folder": "Создать новую папку",
    "Download folder": "Скачать папку",
    "Only one GIFboard JSON backup can be imported at a time.": "Перетаскивайте только одну JSON-копию GIFboard за раз.",
    "Drop GIF files onto a folder, or drop a GIFboard JSON backup anywhere in the library.": "GIF-файлы перетаскивайте на папку, а JSON-копию GIFboard — в любое место библиотеки.",
    "Import a GIFboard backup": "Импортировать резервную копию GIFboard",
    "Export a GIFboard backup": "Экспортировать резервную копию GIFboard",
    "Add to folder": "Добавить в папку"
};

const STYLE = `
.gifboard-tools{font:14px/1.4 var(--font-primary, sans-serif);color:var(--text-normal,#dbdee1)}
.gifboard-tools button,.gifboard-tools input{font:inherit}
.gifboard-tools button{color:inherit;cursor:pointer}
.gifboard-toolbar{position:relative;z-index:2;display:flex;justify-content:flex-end;box-sizing:border-box;width:100%;padding:4px 8px;background:var(--background-primary,#2b2d31)}
.gifboard-toggle{flex:0 0 auto;margin:0 4px;padding:8px 12px;border:0;border-radius:4px;background:transparent;color:var(--interactive-normal,#b5bac1)}
.gifboard-toggle:hover{background:var(--background-modifier-hover,rgba(255,255,255,.08));color:var(--interactive-hover,#dbdee1)}
.gifboard-toggle[aria-selected=true]{background:var(--background-modifier-selected,rgba(255,255,255,.12));color:var(--header-primary,#f2f3f5)}
.gifboard-toggle:hover,.gifboard-tools button:hover{background:var(--background-modifier-hover,rgba(255,255,255,.1))}
.gifboard-backdrop{position:fixed;display:block;inset:0;z-index:2147483647;pointer-events:none;background:transparent}
.gifboard-native-hidden{visibility:hidden!important;pointer-events:none!important}
.gifboard-backdrop[hidden]{display:none}
.gifboard-overlay{position:fixed;display:flex;flex-direction:column;box-sizing:border-box;min-width:0;min-height:0;width:var(--gifboard-library-width,480px);height:var(--gifboard-library-height,560px);max-width:none;max-height:none;pointer-events:auto;background:rgba(12,13,16,var(--gifboard-opacity,.94));backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.08);border-radius:8px;overflow:visible;box-shadow:0 8px 26px rgba(0,0,0,.3)}
.gifboard-overlay.gifboard-file-drop-active{outline:2px dashed var(--brand-500,#5865f2);outline-offset:-6px}
.gifboard-resize-handle{position:absolute;z-index:2;display:block;margin:0;padding:0;border:0;background:transparent;touch-action:none}
.gifboard-resize-handle[data-resize=n]{top:-4px;right:10px;left:10px;height:8px;cursor:ns-resize}
.gifboard-resize-handle[data-resize=s]{right:10px;bottom:-4px;left:10px;height:8px;cursor:ns-resize}
.gifboard-resize-handle[data-resize=e]{top:10px;right:-4px;bottom:10px;width:8px;cursor:ew-resize}
.gifboard-resize-handle[data-resize=w]{top:10px;bottom:10px;left:-4px;width:8px;cursor:ew-resize}
.gifboard-resize-handle[data-resize=ne],.gifboard-resize-handle[data-resize=nw],.gifboard-resize-handle[data-resize=se],.gifboard-resize-handle[data-resize=sw]{width:14px;height:14px}
.gifboard-resize-handle[data-resize=ne]{top:-5px;right:-5px;cursor:nesw-resize}
.gifboard-resize-handle[data-resize=nw]{top:-5px;left:-5px;cursor:nwse-resize}
.gifboard-resize-handle[data-resize=se]{right:-5px;bottom:-5px;cursor:nwse-resize}
.gifboard-resize-handle[data-resize=sw]{bottom:-5px;left:-5px;cursor:nesw-resize}
.gifboard-header{display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid var(--background-modifier-accent,rgba(255,255,255,.08))}
.gifboard-header strong{flex:1 1 120px;min-width:0;cursor:move;user-select:none}
.gifboard-header strong:active{cursor:grabbing}
.gifboard-settings{position:absolute;top:48px;right:8px;z-index:5;box-sizing:border-box;width:min(320px,calc(100% - 16px));padding:12px;border:1px solid var(--background-modifier-accent,rgba(255,255,255,.12));border-radius:6px;background:var(--background-floating,#18191c);box-shadow:0 8px 24px rgba(0,0,0,.35)}
.gifboard-settings[hidden]{display:none}
.gifboard-setting-row{display:flex;align-items:center;gap:7px;margin:6px 0;font-size:12px}
.gifboard-setting-row input[type=range]{flex:1;min-width:60px}
.gifboard-setting-row input[type=checkbox]{width:18px;height:18px}
.gifboard-header button,.gifboard-folder-actions button,.gifboard-card button,.gifboard-context button{border:0;border-radius:4px;padding:6px 9px;background:var(--background-secondary,#232428)}
.gifboard-search{min-width:100px;flex:1 1 160px;padding:7px 9px;border:0;border-radius:4px;background:var(--input-background,#1e1f22);color:inherit}
.gifboard-workspace{display:flex;flex:1;min-height:0}
.gifboard-folders{box-sizing:border-box;width:var(--gifboard-sidebar-width,155px);flex:0 0 var(--gifboard-sidebar-width,155px);overflow:auto;padding:8px;border-right:1px solid var(--background-modifier-accent,rgba(255,255,255,.08))}
.gifboard-create-folder{display:grid;place-items:center;width:34px;height:34px;margin:2px auto 8px;padding:0;border:0;border-radius:6px;background:var(--background-secondary,#232428);font-size:24px;line-height:1}
.gifboard-create-folder:hover{background:var(--background-modifier-hover,rgba(255,255,255,.12))}
.gifboard-folder-drop-target{outline:2px solid var(--brand-500,#5865f2);outline-offset:1px;background:var(--background-modifier-selected,rgba(255,255,255,.12))!important}
.gifboard-sidebar-resizer{position:relative;z-index:1;box-sizing:border-box;flex:0 0 7px;width:7px;margin-left:-1px;cursor:col-resize;touch-action:none}
.gifboard-sidebar-resizer::after{position:absolute;top:0;bottom:0;left:2px;width:2px;background:var(--background-modifier-accent,rgba(255,255,255,.1));content:""}
.gifboard-sidebar-resizer:hover::after,.gifboard-sidebar-resizer:focus-visible::after{background:var(--brand-500,#5865f2)}
.gifboard-folder{display:flex;width:100%;gap:6px;align-items:center;justify-content:space-between;margin:2px 0;padding:7px;border:0;border-radius:4px;background:transparent;text-align:left}
.gifboard-folder[aria-pressed=true]{background:var(--background-modifier-selected,rgba(255,255,255,.12))}
.gifboard-count{opacity:.65;font-size:12px}
.gifboard-main{display:flex;flex:1;min-width:0;min-height:0;flex-direction:column}
.gifboard-folder-actions{display:flex;flex-wrap:wrap;gap:6px;padding:8px 10px}
.gifboard-folder-actions button{flex:1 1 72px}
.gifboard-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));align-content:start;gap:8px;flex:1;min-width:0;min-height:0;overflow:auto;padding:10px}
.gifboard-card{position:relative;min-width:0;overflow:hidden;border-radius:6px;background:var(--background-secondary,#232428)}
.gifboard-file-size{position:absolute;top:6px;left:6px;z-index:1;max-width:calc(100% - 12px);overflow:hidden;padding:3px 6px;border-radius:4px;background:rgba(0,0,0,.72);color:#fff;font-size:11px;text-overflow:ellipsis;white-space:nowrap;pointer-events:none}
.gifboard-preview{display:block;width:100%;padding:0;border:0;border-radius:6px 6px 0 0;background:transparent;text-align:left}
.gifboard-preview:hover{filter:brightness(1.08)}
.gifboard-preview:disabled{cursor:wait;opacity:.65}
.gifboard-card img,.gifboard-card video{display:block;width:100%;height:auto;aspect-ratio:4/3;object-fit:cover;background:var(--background-tertiary,#1e1f22)}
.gifboard-card-label{overflow:hidden;padding:5px 7px;text-overflow:ellipsis;white-space:nowrap;font-size:12px}
.gifboard-card-actions{display:flex;gap:4px;padding:0 6px 6px}
.gifboard-card-actions button{flex:1;padding:5px 2px;font-size:12px}
.gifboard-empty{padding:18px;color:var(--text-muted,#949ba4)}
.gifboard-context{position:fixed;z-index:2147483647;display:grid;gap:4px;min-width:190px;padding:8px;border:1px solid var(--background-modifier-accent,rgba(255,255,255,.12));border-radius:6px;background:var(--background-floating,#18191c);box-shadow:0 8px 24px rgba(0,0,0,.35)}
.gifboard-context button{text-align:left}
.gifboard-context-submenu{position:relative}
.gifboard-context-submenu-trigger{display:flex;align-items:center;justify-content:space-between;gap:16px;width:100%}
.gifboard-context-submenu-trigger::after{content:"›";font-size:18px;line-height:1}
.gifboard-context-submenu-panel{position:absolute;top:0;left:calc(100% - 1px);z-index:1;display:none;box-sizing:border-box;width:220px;max-width:calc(100vw - 16px);max-height:calc(100vh - 16px);overflow-y:auto;gap:4px;padding:8px;border:1px solid var(--background-modifier-accent,rgba(255,255,255,.12));border-radius:6px;background:var(--background-floating,#18191c);box-shadow:0 8px 24px rgba(0,0,0,.35)}
.gifboard-context-submenu:hover>.gifboard-context-submenu-panel,.gifboard-context-submenu:focus-within>.gifboard-context-submenu-panel,.gifboard-context-submenu.is-open>.gifboard-context-submenu-panel{display:grid}
.gifboard-context-submenu--left>.gifboard-context-submenu-panel{right:calc(100% - 1px);left:auto}
.gifboard-dialog-backdrop{position:fixed;inset:0;z-index:2147483648;display:grid;place-items:center;padding:16px;background:rgba(0,0,0,.55)}
.gifboard-dialog{box-sizing:border-box;width:min(360px,100%);max-height:calc(100vh - 32px);overflow:auto;padding:16px;border:1px solid var(--background-modifier-accent,rgba(255,255,255,.12));border-radius:8px;background:var(--background-floating,#18191c);box-shadow:0 12px 32px rgba(0,0,0,.4)}
.gifboard-dialog h3{margin:0 0 8px}
.gifboard-dialog p{color:var(--text-muted,#949ba4)}
.gifboard-dialog input{box-sizing:border-box;width:100%;margin:8px 0;padding:9px;border:0;border-radius:4px;background:var(--input-background,#1e1f22);color:inherit}
.gifboard-dialog-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:12px}
.gifboard-dialog-actions button{border:0;border-radius:4px;padding:8px 12px;background:var(--background-secondary,#232428)}
.gifboard-dialog-actions button[data-primary=true]{background:var(--brand-500,#5865f2)}
.gifboard-tools button:focus-visible,.gifboard-tools input:focus-visible{outline:2px solid var(--brand-500,#5865f2);outline-offset:2px}
@media(max-width:520px){.gifboard-header{gap:5px;padding:7px}.gifboard-header button{padding:5px 7px}.gifboard-folders{padding:5px}.gifboard-grid{grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:5px;padding:6px}}
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

function preferredGifUrl(value) {
    const safe = safeUrl(value);
    if (!safe) return null;

    const url = new URL(safe);
    if (url.hostname.toLowerCase() !== "media.tenor.com") return safe;

    const segments = url.pathname.split("/");
    if (segments.length !== 3 || !/AAAPo$/i.test(segments[1]) || !/\.mp4$/i.test(segments[2])) {
        return safe;
    }

    segments[1] = `${segments[1].slice(0, -5)}AAAAC`;
    segments[2] = `${segments[2].slice(0, -4)}.gif`;
    url.pathname = segments.join("/");
    return url.href;
}

function safeLocalGifDataUrl(value) {
    if (typeof value !== "string" || !/^data:image\/gif;base64,/i.test(value)) return null;
    const payload = value.slice(value.indexOf(",") + 1);
    if (!payload || !/^[a-z0-9+/]*={0,2}$/i.test(payload) || payload.length % 4 !== 0) return null;
    return `data:image/gif;base64,${payload}`;
}

function createGifId() {
    return globalThis.crypto?.randomUUID?.() || `gif-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes < 0) return "";
    if (bytes < 1024) return `${bytes} B`;
    const units = ["KB", "MB", "GB", "TB"];
    let value = bytes / 1024;
    let unit = 0;
    while (value >= 1024 && unit < units.length - 1) {
        value /= 1024;
        unit++;
    }
    return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unit]}`;
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
    return gif.url ? gif.url.trim().toLowerCase() : `local:${gif.id}`;
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
            const url = preferredGifUrl(item?.url);
            const dataUrl = safeLocalGifDataUrl(item?.dataUrl);
            if (!url && !dataUrl) throw new Error(`Folder "${folder.name}" contains an invalid GIF URL.`);
            const key = url ? url.toLowerCase() : dataUrl;
            if (seen.has(key)) continue;
            seen.add(key);
            gifs.push({
                id: typeof item.id === "string" && item.id ? item.id : createGifId(),
                url: url || null,
                dataUrl,
                filename: dataUrl && typeof item.filename === "string" ? item.filename.slice(0, 255) : "",
                sizeBytes: dataUrl
                    ? (Number.isFinite(item.sizeBytes) && item.sizeBytes >= 0
                        ? item.sizeBytes
                        : Math.floor(dataUrl.slice(dataUrl.indexOf(",") + 1).length * 3 / 4))
                    : null,
                previewUrl: preferredGifUrl(item.previewUrl) || url || null,
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

module.exports = class GIFboardPlus {
    constructor(meta) {
        this.api = new BdApi(meta.name || PLUGIN_NAME);
        this.language = this.detectLanguage();
        this.settings = {...DEFAULT_SIZE};
        this.state = {version: DATA_VERSION, folders: []};
        this.storageBlocked = false;
        this.picker = null;
        this.hiddenPickers = new Set();
        this.geometry = null;
        this.overlay = null;
        this.libraryBackdrop = null;
        this.toggle = null;
        this.toolbar = null;
        this.contextMenu = null;
        this.contextMenuPatches = [];
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
            BdApi.ContextMenu.patch("*", this.patchMessageContextMenu);
            this.contextMenuPatches.push({navId: "*", callback: this.patchMessageContextMenu});
            this.observer = new MutationObserver(() => {
                this.scheduleScan();
            });
            this.observer.observe(document.body, {childList: true, subtree: true});
            document.addEventListener("click", this.onNativePickerTriggerClick, true);
            window.addEventListener("contextmenu", this.capturePickerContextMenu, true);
            window.addEventListener("resize", this.onWindowResize);
            this.scheduleScan();
        }
        catch (error) {
            console.error(`[${PLUGIN_NAME}] Failed to start:`, error);
            this.notify(this.t("Plugin could not start: {error}", {error: this.translateError(error.message)}), "error");
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
        document.removeEventListener("click", this.onNativePickerTriggerClick, true);
        window.removeEventListener("contextmenu", this.capturePickerContextMenu, true);
        for (const {navId, callback} of this.contextMenuPatches) {
            BdApi.ContextMenu.unpatch(navId, callback);
        }
        this.contextMenuPatches = [];
        this.onResizeEnd();
        this.onSidebarResizeEnd();
        this.onMoveEnd();
        this.resizeStart = null;
        this.closeContextMenu();
        this.closeDialog();
        this.restorePickerVisibility();
        this.overlay?.removeEventListener("pointerdown", this.stopNativePickerDismissal);
        this.overlay?.removeEventListener("mousedown", this.stopNativePickerDismissal);
        this.overlay?.removeEventListener("click", this.stopNativePickerDismissal);
        this.overlay?.removeEventListener("contextmenu", this.onLibraryContextMenu);
        this.overlay?.removeEventListener("dragover", this.onLibraryDragOver, true);
        this.overlay?.removeEventListener("dragleave", this.onLibraryDragLeave, true);
        this.overlay?.removeEventListener("drop", this.onLibraryDrop, true);
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
        const storedSettings = this.api.Data.load("settings");
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
        const storedLibrary = this.api.Data.load("library");
        if (storedLibrary == null) return;
        try {
            this.state = normalizeState(storedLibrary);
        }
        catch (error) {
            this.storageBlocked = true;
            console.error(`[${PLUGIN_NAME}] Library data was not modified:`, error);
            this.notify(this.t("Library data was not loaded or overwritten: {error}", {error: this.translateError(error.message)}), "error");
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
            this.api.UI.showToast(this.t(message), {type});
        }
        catch (error) {
            console.error(`[${PLUGIN_NAME}] ${message}`, error);
        }
    }

    makeButton(label, onClick, className = "", translate = true) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = translate ? this.t(label) : label;
        button.className = className;
        button.addEventListener("click", onClick);
        return button;
    }

    detectLanguage() {
        let discordLocale = "";
        try {
            const localeStore = this.api.Webpack.getStore("LocaleStore");
            const storeLocale = typeof localeStore?.getLocale === "function" ? localeStore.getLocale() : "";
            discordLocale = storeLocale || (typeof localeStore?.locale === "string" ? localeStore.locale : "");
        }
        catch (error) {
            console.warn(`[${PLUGIN_NAME}] Could not read Discord locale; using system language.`, error);
        }
        const locale = [
            discordLocale,
            document.documentElement.lang,
            navigator.language,
            Intl.DateTimeFormat().resolvedOptions().locale
        ].find(value => typeof value === "string" && value.trim());
        return /^ru(?:-|$)/i.test(locale || "") ? "ru" : "en";
    }

    t(message, values = {}) {
        const translated = this.language === "ru" ? (RU_TRANSLATIONS[message] || message) : message;
        return translated.replace(/\{(\w+)\}/g, (match, key) =>
            Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : match
        );
    }

    translateError(message) {
        const folderUrlError = message.match(/^Folder "(.+)" contains an invalid GIF URL\.$/);
        if (folderUrlError) return this.t('Folder "{name}" contains an invalid GIF URL.', {name: folderUrlError[1]});
        return this.t(message);
    }

    getSettingsPanel() {
        const panel = document.createElement("div");
        panel.className = "gifboard-tools";
        panel.style.cssText = "padding:16px;max-width:680px";
        const title = document.createElement("h3");
        title.textContent = this.t("GIF library window layout");
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
        note.textContent = this.t("Window size, sidebar width, background opacity, and right-click behavior are saved automatically.");
        note.style.color = "var(--text-muted,#949ba4)";
        panel.append(note);
        return panel;
    }

    createOpacityControl() {
        const row = document.createElement("label");
        row.className = "gifboard-setting-row";
        const caption = document.createElement("span");
        caption.textContent = this.t("Window background opacity");
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
        row.className = "gifboard-setting-row";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = this.settings.autoFavorite;
        checkbox.dataset.setting = "autoFavorite";
        checkbox.addEventListener("change", () => {
            this.settings.autoFavorite = checkbox.checked;
            this.scheduleSaveSettings();
        });
        const caption = document.createElement("span");
        caption.textContent = this.t("Add to Favorites when saving to a folder");
        row.append(checkbox, caption);
        return row;
    }

    createHideOnRightClickControl() {
        const row = document.createElement("label");
        row.className = "gifboard-setting-row";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = this.settings.hideOnRightClick;
        checkbox.dataset.setting = "hideOnRightClick";
        checkbox.addEventListener("change", () => {
            this.settings.hideOnRightClick = checkbox.checked;
            this.scheduleSaveSettings();
        });
        const caption = document.createElement("span");
        caption.textContent = this.t("Hide on right-click in empty space");
        row.append(checkbox, caption);
        return row;
    }

    createKeepWithinScreenControl() {
        const row = document.createElement("label");
        row.className = "gifboard-setting-row";
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
        caption.textContent = this.t("Keep within screen bounds");
        row.append(checkbox, caption);
        return row;
    }

    createSizeControl(label, key, min, max) {
        const row = document.createElement("label");
        row.style.cssText = "display:grid;grid-template-columns:80px 1fr 76px;align-items:center;gap:10px;margin:12px 0";
        const caption = document.createElement("span");
        caption.textContent = this.t(label);
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
            .filter(element => !element.closest(".gifboard-backdrop"));
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
        this.toggle = this.makeButton("My GIFs", () => this.toggleLibrary(), "gifboard-toggle");
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
            this.toolbar.className = "gifboard-toolbar";
            this.toolbar.append(this.toggle);
            const anchor = search?.parentElement;
            if (anchor?.parentElement && picker.contains(anchor)) anchor.insertAdjacentElement("afterend", this.toolbar);
            else picker.prepend(this.toolbar);
        }

        if (!this.libraryBackdrop) {
            this.libraryBackdrop = document.createElement("div");
            this.libraryBackdrop.className = "gifboard-backdrop";
            this.libraryBackdrop.hidden = true;
            this.overlay = document.createElement("section");
            this.overlay.className = "gifboard-tools gifboard-overlay";
            this.overlay.setAttribute("aria-label", this.t("Personal GIF library"));
            this.overlay.lang = this.language;
            this.overlay.addEventListener("pointerdown", this.stopNativePickerDismissal);
            this.overlay.addEventListener("mousedown", this.stopNativePickerDismissal);
            this.overlay.addEventListener("click", this.stopNativePickerDismissal);
            this.overlay.addEventListener("contextmenu", this.onLibraryContextMenu);
            this.overlay.addEventListener("dragover", this.onLibraryDragOver, true);
            this.overlay.addEventListener("dragleave", this.onLibraryDragLeave, true);
            this.overlay.addEventListener("drop", this.onLibraryDrop, true);
            this.libraryBackdrop.append(this.overlay);
            document.documentElement.append(this.libraryBackdrop);
            this.renderLibrary();
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
        this.picker.classList.remove("gifboard-native-hidden");
        this.hiddenPickers.delete(this.picker);
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
        const card = target?.closest(".gifboard-card");
        if (card && this.overlay?.contains(card)) {
            const folder = this.state.folders.find(item => item.id === card.dataset.folderId);
            const gif = folder?.gifs.find(item => gifKey(item) === card.dataset.gifKey);
            if (!gif) return;
            event.preventDefault();
            event.stopPropagation();
            this.showContextMenu(event.clientX, event.clientY, gif);
            return;
        }
        if (target?.closest("button,input,textarea,select,a,[role='button'],.gifboard-folder-actions,.gifboard-settings")) return;
        event.preventDefault();
        if (!this.settings.hideOnRightClick) return;
        event.stopPropagation();
        this.toggleLibrary(false);
    };

    onLibraryDragOver = event => {
        const transfer = event.dataTransfer;
        if (!transfer || !Array.from(transfer.types).includes("Files")) return;
        event.preventDefault();
        transfer.dropEffect = "copy";
        this.overlay?.classList.add("gifboard-file-drop-active");
    };

    onLibraryDragLeave = event => {
        const nextTarget = event.relatedTarget;
        if (nextTarget instanceof Node && this.overlay?.contains(nextTarget)) return;
        this.overlay?.classList.remove("gifboard-file-drop-active");
    };

    onLibraryDrop = event => {
        this.overlay?.classList.remove("gifboard-file-drop-active");
        const files = Array.from(event.dataTransfer?.files || []);
        const target = event.target instanceof Element ? event.target : null;
        const jsonFiles = files.filter(file => /\.json$/i.test(file.name) || file.type === "application/json");
        if (jsonFiles.length) {
            event.preventDefault();
            event.stopPropagation();
            if (files.length !== 1 || jsonFiles.length !== 1) {
                this.notify("Only one GIFboard JSON backup can be imported at a time.", "error");
                return;
            }
            this.importLibraryFile(jsonFiles[0]);
            return;
        }
        if (target?.closest(".gifboard-folder")) return;
        event.preventDefault();
        if (files.length) {
            this.notify("Drop GIF files onto a folder, or drop a GIFboard JSON backup anywhere in the library.", "info");
        }
    };

    stopNativePickerDismissal = event => {
        event.stopPropagation();
    };

    hideNativePicker() {
        if (!this.picker || this.libraryBackdrop?.hidden) return;
        this.picker.classList.add("gifboard-native-hidden");
        this.hiddenPickers.add(this.picker);
    }

    closeNativePicker() {
        if (!this.picker || !this.picker.isConnected || this.hiddenPickers.has(this.picker)) return;
        const toggle = [...document.querySelectorAll("button,[role='button']")]
            .filter(button => !this.picker.contains(button) && !this.overlay?.contains(button))
            .find(button => {
                const label = [
                    button.getAttribute("aria-label"),
                    button.getAttribute("title"),
                    button.getAttribute("data-tooltip-content"),
                    button.getAttribute("aria-description"),
                    button.innerText
                ].filter(Boolean).join(" ");
                const opensGifPicker = /gif|гиф|emoji|эмодзи/i.test(label);
                const isExpanded = button.getAttribute("aria-expanded") === "true" ||
                    button.getAttribute("aria-pressed") === "true" ||
                    button.getAttribute("data-state") === "open";
                return opensGifPicker && isExpanded;
            });
        toggle?.click();
    }

    restorePickerVisibility() {
        for (const picker of this.hiddenPickers) picker.classList.remove("gifboard-native-hidden");
        this.hiddenPickers.clear();
    }

    onNativePickerTriggerClick = event => {
        const target = event.target instanceof Element ? event.target : event.target?.parentElement;
        const button = target?.closest("button,[role='button']");
        if (!button || this.overlay?.contains(button) || this.picker?.contains(button)) return;
        const label = [
            button.getAttribute("aria-label"),
            button.getAttribute("title"),
            button.getAttribute("data-tooltip-content"),
            button.getAttribute("aria-description"),
            button.innerText
        ].filter(Boolean).join(" ");
        if (!/\bgifs?\b|гиф(?:ки)?/i.test(label)) return;

        const hiddenPickerIsOpen = [...this.hiddenPickers].some(picker =>
            picker.isConnected && picker.classList.contains("gifboard-native-hidden")
        );
        if (!hiddenPickerIsOpen) return;

        this.restorePickerVisibility();
        if (!this.libraryBackdrop || this.libraryBackdrop.hidden) return;
        requestAnimationFrame(() => {
            const picker = this.findPicker();
            if (!picker || picker.classList.contains("gifboard-native-hidden")) return;
            this.picker = picker;
        });
    };

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
        const resizer = this.overlay.querySelector(".gifboard-sidebar-resizer");
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
            width: this.overlay?.querySelector(".gifboard-folders")?.getBoundingClientRect().width || this.settings.sidebarWidth
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
        const wasOpen = !this.libraryBackdrop.hidden;
        const isOpen = forceOpen ?? this.libraryBackdrop.hidden;
        if (!isOpen) this.hideNativePicker();
        this.libraryBackdrop.hidden = !isOpen;
        this.toggle?.setAttribute("aria-pressed", String(isOpen));
        this.toggle?.setAttribute("aria-selected", String(isOpen));
        if (isOpen) {
            if (!wasOpen) {
                const hasSavedPosition = Number.isFinite(this.settings.left) &&
                    Number.isFinite(this.settings.top);
                this.initializeLibraryGeometry();
                if (!hasSavedPosition) this.positionLibraryAtPicker();
                this.closeNativePicker();
                this.hideNativePicker();
            }
            this.applyLibrarySize();
            this.renderLibrary();
        }
        else if (wasOpen) {
            if (this.settingsTimer !== null) {
                clearTimeout(this.settingsTimer);
                this.settingsTimer = null;
            }
            this.saveSettings();
        }
    }

    positionLibraryAtPicker() {
        const pickerRect = this.picker?.getBoundingClientRect();
        if (!pickerRect || !this.geometry) return;

        let left = pickerRect.left + (pickerRect.width - this.geometry.width) / 2;
        let top = pickerRect.top + (pickerRect.height - this.geometry.height) / 2;
        if (this.settings.keepWithinScreen) {
            left = clamp(left, 16, Math.max(16, window.innerWidth - this.geometry.width - 16));
            top = clamp(top, 16, Math.max(16, window.innerHeight - this.geometry.height - 16));
        }
        this.geometry.left = left;
        this.geometry.top = top;
        this.settings.left = left;
        this.settings.top = top;
        this.applyLibraryGeometry();
    }

    positionLibraryBesidePicker() {
        const pickerRect = this.picker?.getBoundingClientRect();
        if (!pickerRect || !this.geometry) return;

        const margin = this.settings.keepWithinScreen ? 16 : 0;
        const gap = 12;
        const right = this.geometry.left + this.geometry.width;
        const bottom = this.geometry.top + this.geometry.height;
        const overlaps = this.geometry.left < pickerRect.right && right > pickerRect.left &&
            this.geometry.top < pickerRect.bottom && bottom > pickerRect.top;
        if (!overlaps) return;

        const centeredTop = clamp(
            pickerRect.top + (pickerRect.height - this.geometry.height) / 2,
            margin,
            Math.max(margin, window.innerHeight - this.geometry.height - margin)
        );
        const centeredLeft = clamp(
            pickerRect.left + (pickerRect.width - this.geometry.width) / 2,
            margin,
            Math.max(margin, window.innerWidth - this.geometry.width - margin)
        );
        const candidates = [
            {left: pickerRect.right + gap, top: centeredTop},
            {left: pickerRect.left - gap - this.geometry.width, top: centeredTop},
            {left: centeredLeft, top: pickerRect.bottom + gap},
            {left: centeredLeft, top: pickerRect.top - gap - this.geometry.height}
        ];
        const candidate = candidates.find(position =>
            position.left >= margin &&
            position.top >= margin &&
            position.left + this.geometry.width <= window.innerWidth - margin &&
            position.top + this.geometry.height <= window.innerHeight - margin
        );
        if (!candidate) return;

        this.geometry.left = candidate.left;
        this.geometry.top = candidate.top;
        this.settings.left = candidate.left;
        this.settings.top = candidate.top;
        this.applyLibraryGeometry();
        this.scheduleSaveSettings();
    }

    renderLibrary() {
        if (!this.overlay) return;
        this.applySidebarWidth();
        this.applyLibraryOpacity();
        this.overlay.replaceChildren();

        const header = document.createElement("div");
        header.className = "gifboard-header";
        header.addEventListener("pointerdown", this.beginMove);
        const title = document.createElement("strong");
        title.textContent = this.t("My GIF library");
        const search = document.createElement("input");
        search.className = "gifboard-search";
        search.type = "search";
        search.placeholder = this.t("Search saved GIFs");
        search.setAttribute("aria-label", this.t("Search saved GIFs"));
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
        settingsPanel.className = "gifboard-tools gifboard-settings";
        settingsPanel.dataset.librarySettings = "true";
        settingsPanel.hidden = true;
        settingsPanel.append(
            this.createOpacityControl(),
            this.createHideOnRightClickControl(),
            this.createAutoFavoriteControl(),
            this.createKeepWithinScreenControl()
        );
        const exportButton = this.makeButton("Export", () => this.exportLibrary());
        exportButton.title = this.t("Download a JSON backup of your folders and saved GIFs.");
        const importButton = this.makeButton("Import", () => this.importLibrary());
        importButton.title = this.t("Merge a GIFboard JSON backup into this library; duplicates are skipped.");
        header.append(title, search,
            exportButton,
            importButton,
            settingsButton,
            this.makeButton("Close", () => this.toggleLibrary()));

        const workspace = document.createElement("div");
        workspace.className = "gifboard-workspace";
        const sidebar = document.createElement("nav");
        sidebar.className = "gifboard-folders";
        sidebar.setAttribute("aria-label", this.t("GIF folders"));
        const createFolderButton = this.makeButton("+", () => this.createFolder(), "gifboard-create-folder", false);
        createFolderButton.title = this.t("Create new folder");
        createFolderButton.setAttribute("aria-label", this.t("Create new folder"));
        sidebar.append(createFolderButton);
        this.state.folders.forEach(folder => {
            const button = this.makeButton("", () => {
                this.selectedFolder = folder.id;
                this.renderLibrary();
            }, "gifboard-folder");
            button.addEventListener("contextmenu", event => {
                event.preventDefault();
                event.stopPropagation();
                this.showFolderContextMenu(event.clientX, event.clientY, folder);
            });
            button.addEventListener("dragover", event => {
                if (!Array.from(event.dataTransfer?.types || []).includes("Files")) return;
                event.preventDefault();
                event.dataTransfer.dropEffect = "copy";
                button.classList.add("gifboard-folder-drop-target");
            });
            button.addEventListener("dragleave", event => {
                if (event.relatedTarget instanceof Node && button.contains(event.relatedTarget)) return;
                button.classList.remove("gifboard-folder-drop-target");
            });
            button.addEventListener("drop", event => {
                if (!event.dataTransfer?.files?.length) return;
                event.preventDefault();
                event.stopPropagation();
                button.classList.remove("gifboard-folder-drop-target");
                this.addLocalGifsToFolder(folder.id, event.dataTransfer.files);
            });
            button.setAttribute("aria-pressed", String(folder.id === this.selectedFolder));
            const name = document.createElement("span");
            name.textContent = folder.name;
            const count = document.createElement("span");
            count.className = "gifboard-count";
            count.textContent = String(folder.gifs.length);
            button.append(name, count);
            sidebar.append(button);
        });
        const sidebarResizer = document.createElement("div");
        sidebarResizer.className = "gifboard-sidebar-resizer";
        sidebarResizer.setAttribute("role", "separator");
        sidebarResizer.setAttribute("aria-orientation", "vertical");
        sidebarResizer.setAttribute("aria-label", this.t("Resize folder panel"));
        sidebarResizer.tabIndex = 0;
        sidebarResizer.addEventListener("pointerdown", this.beginSidebarResize);
        sidebarResizer.addEventListener("keydown", this.onSidebarResizeKeydown);

        const main = document.createElement("div");
        main.className = "gifboard-main";
        const grid = document.createElement("div");
        grid.className = "gifboard-grid";
        grid.dataset.grid = "true";
        main.append(grid);
        workspace.append(sidebar, sidebarResizer, main);
        this.overlay.append(header, workspace, settingsPanel);
        for (const direction of ["n", "s", "e", "w", "ne", "nw", "se", "sw"]) {
            const resizeHandle = this.makeButton("", () => {}, "gifboard-resize-handle");
            resizeHandle.dataset.resize = direction;
            const directionLabel = {
                n: "top edge",
                s: "bottom edge",
                e: "right edge",
                w: "left edge",
                ne: "top-right corner",
                nw: "top-left corner",
                se: "bottom-right corner",
                sw: "bottom-left corner"
            }[direction];
            resizeHandle.setAttribute("aria-label", this.t("Resize GIF library from {direction}", {
                direction: this.t(directionLabel)
            }));
            resizeHandle.addEventListener("pointerdown", this.beginResize);
            this.overlay.append(resizeHandle);
        }

        if (this.storageBlocked) {
            const warning = document.createElement("p");
            warning.className = "gifboard-empty";
            warning.textContent = this.t("Library data could not be read. Existing data was preserved; import a valid JSON backup to recover.");
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
            empty.className = "gifboard-empty";
            empty.textContent = this.t("Create a folder, then use the GIF context menu to save GIFs here.");
            grid.append(empty);
            return;
        }

        const term = this.searchTerm.trim().toLowerCase();
        const gifs = folder.gifs.filter(gif => !term || `${gif.title} ${gif.filename} ${gif.url || ""}`.toLowerCase().includes(term));
        if (!gifs.length) {
            const empty = document.createElement("div");
            empty.className = "gifboard-empty";
            empty.textContent = this.t(term
                ? "No saved GIFs match this search."
                : "This folder is empty. Right-click a GIF in Discord's picker to add it.");
            grid.append(empty);
            return;
        }
        gifs.forEach(gif => grid.append(this.createGifCard(folder, gif)));
    }

    createGifCard(folder, gif) {
        const card = document.createElement("article");
        card.className = "gifboard-card";
        card.dataset.folderId = folder.id;
        card.dataset.gifKey = gifKey(gif);
        const preview = document.createElement("button");
        preview.type = "button";
        preview.className = "gifboard-preview";
        preview.setAttribute("aria-label", this.t("Send {title}", {title: gif.title || gif.filename || this.t("GIF")}));
        preview.title = gif.dataUrl
            ? this.t("Local GIFs can be previewed, but sending them from the library is not available yet.")
            : this.t("Send GIF");
        preview.addEventListener("click", () => this.sendGif(gif, preview));
        const previewUrl = gif.previewUrl || gif.dataUrl || gif.url;
        const isVideo = /\.(?:mp4|webm|mov)(?:$|[?#])/i.test(previewUrl);
        const media = document.createElement(isVideo ? "video" : "img");
        media.src = previewUrl;
        if (isVideo) {
            media.muted = true;
            media.loop = true;
            media.autoplay = true;
            media.playsInline = true;
            media.preload = "metadata";
            media.setAttribute("aria-label", gif.title || this.t("Saved GIF"));
        }
        else {
            media.alt = gif.title || this.t("Saved GIF");
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
            unavailable.className = "gifboard-empty";
            unavailable.textContent = this.t("Preview unavailable");
            card.prepend(unavailable);
        }, {once: true});
        const caption = document.createElement("div");
        caption.className = "gifboard-card-label";
        caption.textContent = gif.title || gif.filename || this.t("GIF");
        if (gif.dataUrl) {
            const fileSize = document.createElement("span");
            fileSize.className = "gifboard-file-size";
            fileSize.textContent = formatBytes(gif.sizeBytes);
            fileSize.title = gif.filename || this.t("GIF");
            card.append(fileSize);
        }
        const actions = document.createElement("div");
        actions.className = "gifboard-card-actions";
        actions.append(this.makeButton("Remove", () => this.removeGif(folder.id, gifKey(gif))));
        preview.append(media, caption);
        card.append(preview, actions);
        return card;
    }

    async addLocalGifsToFolder(folderId, files) {
        const addedGifs = [];
        let invalid = 0;
        for (const file of Array.from(files)) {
            if (!/\.gif$/i.test(file.name)) {
                invalid++;
                continue;
            }
            try {
                const buffer = await file.arrayBuffer();
                const signature = new Uint8Array(buffer, 0, Math.min(6, buffer.byteLength));
                const header = String.fromCharCode(...signature);
                if (header !== "GIF87a" && header !== "GIF89a") {
                    invalid++;
                    continue;
                }
                const bytes = new Uint8Array(buffer);
                let binary = "";
                for (let offset = 0; offset < bytes.length; offset += 0x8000) {
                    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
                }
                const dataUrl = `data:image/gif;base64,${btoa(binary)}`;
                addedGifs.push({
                    id: createGifId(),
                    url: null,
                    dataUrl,
                    previewUrl: dataUrl,
                    filename: file.name.slice(0, 255),
                    sizeBytes: file.size,
                    title: cleanGifTitle(file.name.replace(/\.gif$/i, "")),
                    addedAt: Date.now()
                });
            }
            catch (error) {
                invalid++;
                console.error(`[${PLUGIN_NAME}] Could not read dropped GIF "${file.name}":`, error);
                this.notify(this.t('Could not read dropped GIF "{name}": {error}', {
                    name: file.name,
                    error: this.translateError(error?.message || "unknown error")
                }), "error");
            }
        }

        if (!addedGifs.length) {
            if (invalid) this.notify(this.t("Added: {added}; duplicates skipped: {duplicates}; invalid files: {invalid}.", {
                added: 0,
                duplicates: 0,
                invalid
            }), "error");
            return;
        }

        let duplicates = 0;
        const success = this.mutateLibrary(state => {
            const folder = state.folders.find(item => item.id === folderId);
            if (!folder) throw new Error("The selected folder no longer exists.");
            const knownFiles = new Set(folder.gifs.filter(gif => gif.dataUrl).map(gif => gif.dataUrl));
            for (const gif of addedGifs) {
                if (knownFiles.has(gif.dataUrl)) {
                    duplicates++;
                    continue;
                }
                knownFiles.add(gif.dataUrl);
                folder.gifs.push(gif);
            }
        });
        if (!success) return;
        this.selectedFolder = folderId;
        this.renderLibrary();
        const added = addedGifs.length - duplicates;
        this.notify(this.t("Added: {added}; duplicates skipped: {duplicates}; invalid files: {invalid}.", {
            added,
            duplicates,
            invalid
        }), invalid ? "error" : "success");
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

    renameFolder(folderId = this.selectedFolder) {
        const folder = this.state.folders.find(item => item.id === folderId) || this.getSelectedFolder();
        if (!folder) return this.notify("Create or select a folder first.", "error");
        this.showTextDialog("Rename folder", "Save", folder.name, name => {
            if (this.mutateLibrary(state => {
                const target = state.folders.find(item => item.id === folder.id);
                if (target) target.name = name.slice(0, 80);
            })) this.renderLibrary();
        });
    }

    deleteFolder(folderId = this.selectedFolder) {
        const folder = this.state.folders.find(item => item.id === folderId) || this.getSelectedFolder();
        if (!folder) return this.notify("Select a folder first.", "error");
        this.showConfirmDialog(this.t('Delete "{name}" and its {count} GIF(s)?', {
            name: folder.name,
            count: folder.gifs.length
        }), () => {
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
        backdrop.className = "gifboard-tools gifboard-dialog-backdrop";
        const form = document.createElement("form");
        form.className = "gifboard-dialog";
        form.setAttribute("role", "dialog");
        form.setAttribute("aria-modal", "true");
        const heading = document.createElement("h3");
        heading.textContent = this.t(title);
        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = 80;
        input.required = true;
        input.value = initialValue;
        input.placeholder = this.t("Folder name");
        input.setAttribute("aria-label", this.t("Folder name"));
        const actions = document.createElement("div");
        actions.className = "gifboard-dialog-actions";
        const cancel = this.makeButton("Cancel", () => this.closeDialog());
        const submit = document.createElement("button");
        submit.type = "submit";
        submit.dataset.primary = "true";
        submit.textContent = this.t(confirmLabel);
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
        backdrop.className = "gifboard-tools gifboard-dialog-backdrop";
        const dialog = document.createElement("div");
        dialog.className = "gifboard-dialog";
        dialog.setAttribute("role", "dialog");
        dialog.setAttribute("aria-modal", "true");
        const text = document.createElement("p");
        text.textContent = this.t(message);
        const actions = document.createElement("div");
        actions.className = "gifboard-dialog-actions";
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
            this.notify(this.t("Library was not changed: {error}", {error: this.translateError(error.message)}), "error");
            return false;
        }
    }

    addGifToFolder(folderId, rawGif) {
        const rawUrl = rawGif?.url || rawGif?.proxyUrl || rawGif?.proxyURL || rawGif?.src;
        const url = preferredGifUrl(rawUrl);
        if (!url) {
            this.notify("This GIF has no valid HTTP(S) URL.", "error");
            return false;
        }
        const gif = {
            id: createGifId(),
            url,
            dataUrl: null,
            filename: "",
            sizeBytes: null,
            previewUrl: preferredGifUrl(rawGif.previewUrl) || url,
            title: cleanGifTitle(rawGif.title || ""),
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
            if (this.settings.autoFavorite && rawGif.favoriteControl) this.addToDiscordFavorites(rawGif);
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

    removeGif(folderId, key) {
        this.showConfirmDialog("Remove this GIF from the selected folder?", () => {
            this.mutateLibrary(state => {
                const folder = state.folders.find(item => item.id === folderId);
                if (folder) folder.gifs = folder.gifs.filter(gif => gifKey(gif) !== key);
            });
            this.renderLibrary();
        });
    }

    patchMessageContextMenu = (returnValue, props) => {
        const mediaItem = props?.mediaItem;
        const target = props?.target;
        const targetMedia = target?.matches?.("img,video")
            ? target
            : target?.querySelector?.("img,video") || target?.closest?.("a")?.querySelector?.("img,video");
        const targetLink = target?.tagName === "A" ? target : target?.closest?.("a");
        const embeds = props?.message?.embeds;
        const singleEmbed = Array.isArray(embeds) && embeds.length === 1 ? embeds[0] : null;
        const embeddedMedia = singleEmbed?.image || singleEmbed?.thumbnail || singleEmbed?.video;
        const rawUrl = mediaItem?.url || mediaItem?.proxyUrl || mediaItem?.proxyURL || mediaItem?.src ||
            props?.src || targetMedia?.currentSrc || targetMedia?.src || targetMedia?.poster ||
            target?.currentSrc || target?.src || target?.poster || targetLink?.href || target?.href ||
            embeddedMedia?.url || embeddedMedia?.proxyUrl || embeddedMedia?.proxyURL;
        const previewRawUrl = mediaItem?.proxyUrl || mediaItem?.proxyURL ||
            targetMedia?.currentSrc || targetMedia?.src || targetMedia?.poster ||
            embeddedMedia?.proxyUrl || embeddedMedia?.proxyURL || embeddedMedia?.url || rawUrl;
        const url = preferredGifUrl(rawUrl);
        const contentType = mediaItem?.contentType || mediaItem?.content_type || "";
        const originalContentType = mediaItem?.originalContentType || mediaItem?.original_content_type || "";
        const isGifMedia = /^image\/gif$/i.test(contentType) ||
            /^image\/gif$/i.test(originalContentType) ||
            this.isKnownGifUrl(url) ||
            /\.gif(?:$|[?#])/i.test(url || "");
        const isImageMedia = /^image\//i.test(contentType) ||
            /^image\//i.test(originalContentType) ||
            /^video\//i.test(contentType) ||
            /^video\//i.test(originalContentType) ||
            /^(?:IMG|VIDEO)$/i.test(targetMedia?.tagName || target?.tagName || "") ||
            isGifMedia;
        if (!url || (!isGifMedia && !isImageMedia)) return returnValue;
        const menuLocation = this.findContextMenuItems(returnValue);
        if (!menuLocation || this.hasContextMenuItem(returnValue, "gifboard-add-to-folder")) return returnValue;

        const gif = {
            url,
            previewUrl: preferredGifUrl(previewRawUrl) || url,
            title: cleanGifTitle(mediaItem?.filename || mediaItem?.name || mediaItem?.alt ||
                targetMedia?.alt || target?.alt || ""),
            favoriteControl: null,
            isFavorite: null
        };
        const items = this.state.folders.length
            ? this.state.folders.map(folder => {
                const exists = folder.gifs.some(item => gifKey(item) === gifKey(gif));
                return {
                    id: `gifboard-folder-${folder.id}`,
                    label: `${exists ? "✓ " : ""}${folder.name}`,
                    disabled: exists,
                    action: () => {
                        if (!exists) this.addGifToFolder(folder.id, gif);
                    }
                };
            })
            : [{
                id: `gifboard-create-first-folder-${Date.now()}`,
                label: this.t("Create first folder"),
                action: () => this.createFolder()
            }];

        const menuItem = BdApi.ContextMenu.buildItem({
            type: "submenu",
            id: "gifboard-add-to-folder",
            label: this.t("Add to folder"),
            items
        });

        const separator = BdApi.ContextMenu.buildItem({type: "separator", id: "gifboard-folder-separator"});
        menuLocation.items.unshift(menuItem, separator);
        return returnValue;
    };

    capturePickerContextMenu = event => {
        const target = event.target instanceof Element ? event.target : event.target?.parentElement;
        const picker = this.picker?.contains(target) ? this.picker : this.findPicker();
        if (!target || !picker?.contains(target)) return;
        const eventPath = typeof event.composedPath === "function" ? event.composedPath() : [target];
        const gif = this.extractGifFromTarget(target, eventPath);
        if (!gif?.url) return;
        event.preventDefault();
        event.stopPropagation();
        this.showContextMenu(event.clientX, event.clientY, gif, true);
    };

    findContextMenuItems(root) {
        const visited = new Set();
        let fallback = null;
        const visit = (node, depth = 0) => {
            if (node == null || depth > 12) return null;
            if (Array.isArray(node)) {
                if (!fallback && node.some(item => item && typeof item === "object")) {
                    fallback = node;
                }
                const copyLinkIndex = node.findIndex(item => this.isCopyLinkContextMenuItem(item));
                if (copyLinkIndex >= 0) return {items: node, copyLinkIndex};
                for (const item of node) {
                    const found = visit(item, depth + 1);
                    if (found) return found;
                }
                return null;
            }
            if (typeof node !== "object" || visited.has(node)) return null;
            visited.add(node);
            return visit(node.props?.children, depth + 1);
        };
        return visit(root) || (fallback ? {items: fallback, copyLinkIndex: -1} : null);
    }

    isCopyLinkContextMenuItem(item) {
        const identifiers = [item?.key, item?.props?.id, item?.props?.["data-menu-item"]]
            .filter(value => typeof value === "string")
            .join(" ")
            .toLowerCase();
        return /(?:^|[-_:])copy[-_]?link(?:$|[-_:])/.test(identifiers);
    }

    hasContextMenuItem(root, id, depth = 0, visited = new Set()) {
        if (root == null || depth > 12) return false;
        if (Array.isArray(root)) return root.some(item => this.hasContextMenuItem(item, id, depth + 1, visited));
        if (typeof root !== "object" || visited.has(root)) return false;
        visited.add(root);
        if (root.key === id || root.props?.id === id) return true;
        return this.hasContextMenuItem(root.props?.children, id, depth + 1, visited);
    }

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
            }).filter(item => boundary || item.candidate === target || item.area >= 4096)
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
                const url = preferredGifUrl(rawUrl);
                if (!url) continue;
                const previewUrl = preferredGifUrl(poster) || preferredGifUrl(rawUrl) ||
                    preferredGifUrl(media?.currentSrc || media?.src || media?.poster) || url;
                const title = this.getGifTitle(media);
                const favorite = this.findFavoriteControl(media, boundary);
                if (!boundary && !this.isKnownGifUrl(url)) continue;
                return {url, previewUrl, title, favoriteControl: favorite?.element || null, isFavorite: favorite?.isFavorite ?? null};
            }

            const background = getComputedStyle(element).backgroundImage;
            const urls = [...background.matchAll(/url\((?:"|')?(.*?)(?:"|')?\)/gi)];
            for (const match of urls) {
                const url = preferredGifUrl(match[1]);
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

    showContextMenu(x, y, gif, includeCopyLink = false) {
        this.closeContextMenu();
        const menu = document.createElement("div");
        menu.className = "gifboard-tools gifboard-context";
        menu.setAttribute("role", "menu");
        let submenuEntry = null;
        let submenuPanel = null;
        if (includeCopyLink) {
            menu.setAttribute("aria-label", this.t("GIF actions"));
            menu.append(this.makeButton("Copy link", () => {
                this.closeContextMenu();
                this.copyGifLink(gif);
            }));
            submenuEntry = document.createElement("div");
            submenuEntry.className = "gifboard-context-submenu";
            const submenuId = `gifboard-folder-submenu-${Date.now()}`;
            const trigger = this.makeButton("Save GIF to folder", () => {}, "gifboard-context-submenu-trigger");
            trigger.setAttribute("aria-haspopup", "menu");
            trigger.setAttribute("aria-expanded", "false");
            trigger.setAttribute("aria-controls", submenuId);
            submenuPanel = document.createElement("div");
            submenuPanel.id = submenuId;
            submenuPanel.className = "gifboard-context-submenu-panel";
            submenuPanel.setAttribute("role", "menu");
            submenuPanel.setAttribute("aria-label", this.t("GIF folders"));
            submenuPanel.append(...this.createContextFolderButtons(gif));
            submenuEntry.append(trigger, submenuPanel);

            const openSubmenu = () => {
                submenuEntry.classList.add("is-open");
                trigger.setAttribute("aria-expanded", "true");
                const triggerBounds = trigger.getBoundingClientRect();
                const entryBounds = submenuEntry.getBoundingClientRect();
                const panelBounds = submenuPanel.getBoundingClientRect();
                if (menu.getBoundingClientRect().right + panelBounds.width > window.innerWidth - 8) {
                    submenuEntry.classList.add("gifboard-context-submenu--left");
                }
                else {
                    submenuEntry.classList.remove("gifboard-context-submenu--left");
                }
                const panelHeight = Math.min(submenuPanel.scrollHeight, window.innerHeight - 16);
                const panelTop = Math.max(8, Math.min(triggerBounds.top, window.innerHeight - panelHeight - 8));
                submenuPanel.style.top = `${panelTop - entryBounds.top}px`;
            };
            const closeSubmenu = () => {
                submenuEntry.classList.remove("is-open");
                trigger.setAttribute("aria-expanded", "false");
            };
            trigger.addEventListener("mouseenter", openSubmenu);
            trigger.addEventListener("focus", openSubmenu);
            trigger.addEventListener("click", event => {
                event.preventDefault();
                openSubmenu();
            });
            submenuEntry.addEventListener("mouseleave", event => {
                if (event.relatedTarget instanceof Node && submenuEntry.contains(event.relatedTarget)) return;
                if (!submenuEntry.contains(document.activeElement)) closeSubmenu();
            });
            submenuEntry.addEventListener("focusout", event => {
                if (event.relatedTarget instanceof Node && submenuEntry.contains(event.relatedTarget)) return;
                closeSubmenu();
            });
            menu.append(submenuEntry);
        }
        else {
            const label = document.createElement("strong");
            label.textContent = this.t("Save GIF to folder");
            menu.append(label, ...this.createContextFolderButtons(gif));
            menu.style.maxHeight = "calc(100vh - 16px)";
            menu.style.overflowY = "auto";
        }
        document.documentElement.append(menu);
        const bounds = menu.getBoundingClientRect();
        menu.style.left = `${Math.max(8, Math.min(x, window.innerWidth - bounds.width - 8))}px`;
        menu.style.top = `${Math.max(8, Math.min(y, window.innerHeight - bounds.height - 8))}px`;
        if (submenuEntry && submenuPanel) {
            const menuBounds = menu.getBoundingClientRect();
            if (menuBounds.right + 220 > window.innerWidth - 8) {
                submenuEntry.classList.add("gifboard-context-submenu--left");
            }
        }
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

    createContextFolderButtons(gif) {
        if (!this.state.folders.length) {
            return [this.makeButton("Create first folder", () => {
                this.closeContextMenu();
                this.createFolder();
            })];
        }
        return this.state.folders.map(folder => {
            const exists = folder.gifs.some(item => gifKey(item) === gifKey(gif));
            const button = this.makeButton(`${exists ? "✓ " : ""}${folder.name}`, () => {}, "", false);
            button.dataset.folderId = folder.id;
            button.setAttribute("role", "menuitem");
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
            return button;
        });
    }

    async copyGifLink(gif) {
        const url = preferredGifUrl(gif?.url);
        if (!url) return this.notify("This GIF has an invalid URL.", "error");
        try {
            if (typeof navigator.clipboard?.writeText !== "function") {
                throw new Error("Clipboard API is unavailable.");
            }
            await navigator.clipboard.writeText(url);
            this.notify("GIF link copied.");
        }
        catch (error) {
            console.error(`[${PLUGIN_NAME}] Could not copy GIF link:`, error);
            this.notify(this.t("Could not copy GIF link: {error}", {
                error: this.translateError(error.message)
            }), "error");
        }
    }

    showFolderContextMenu(x, y, folder) {
        this.closeContextMenu();
        const menu = document.createElement("div");
        menu.className = "gifboard-tools gifboard-context";
        menu.setAttribute("role", "menu");
        menu.setAttribute("aria-label", this.t("GIF folder actions"));
        menu.append(
            this.makeButton("Download folder", () => {
                this.closeContextMenu();
                this.exportFolder(folder.id);
            }),
            this.makeButton("Rename", () => {
                this.closeContextMenu();
                this.renameFolder(folder.id);
            }),
            this.makeButton("Delete folder", () => {
                this.closeContextMenu();
                this.deleteFolder(folder.id);
            })
        );
        menu.style.left = `${Math.max(8, Math.min(x, window.innerWidth - 210))}px`;
        menu.style.top = `${Math.max(8, Math.min(y, window.innerHeight - 160))}px`;
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
            this.notify(this.t('"{name}" already contains this GIF.', {name: folder.name}), "info");
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
        if (gif.dataUrl) {
            this.notify("Local GIFs can be previewed, but sending them from the library is not available yet.", "error");
            return;
        }
        const url = preferredGifUrl(gif.url);
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

            const pendingReplyStore = this.api.Webpack.getStore("PendingReplyStore");
            const pendingReply = pendingReplyStore?.getPendingReply?.(channelId);
            let sendOptions = {};
            if (pendingReply) {
                if (typeof messageUtils.getSendMessageOptionsForReply !== "function") {
                    return this.notify("Discord's reply handler is unavailable. GIF was not sent.", "error");
                }
                sendOptions = messageUtils.getSendMessageOptionsForReply(pendingReply);
                if (!sendOptions?.messageReference) {
                    return this.notify("Discord's reply handler is unavailable. GIF was not sent.", "error");
                }
            }

            await messageUtils.sendMessage(channelId, {content: url}, undefined, sendOptions);
            if (pendingReply) {
                try {
                    const dispatcher = this.api.Webpack.getModule(
                        this.api.Webpack.Filters.byKeys("dispatch", "subscribe"),
                        {searchExports: true}
                    );
                    if (typeof dispatcher?.dispatch !== "function") {
                        throw new Error("Discord's message dispatcher is unavailable.");
                    }
                    dispatcher.dispatch({type: "DELETE_PENDING_REPLY", channelId});
                }
                catch (error) {
                    console.error(`[${PLUGIN_NAME}] GIF was sent as a reply, but the reply state could not be cleared:`, error);
                    this.notify("GIF was sent as a reply, but Discord could not clear the reply state.", "error");
                }
            }
        }
        catch (error) {
            console.error(`[${PLUGIN_NAME}] Could not send GIF to Discord:`, error);
            this.notify(this.t("Discord could not send the GIF: {error}", {
                error: this.translateError(error?.message || "unknown error")
            }), "error");
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
                format: "GIFboard-library",
                version: DATA_VERSION,
                exportedAt: new Date().toISOString(),
                folders: this.state.folders
            };
            const blob = new Blob([JSON.stringify(backup, null, 2)], {type: "application/json"});
            const href = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = href;
            link.download = "gifboard-library.json";
            link.click();
            setTimeout(() => URL.revokeObjectURL(href), 1000);
        }
        catch (error) {
            console.error(`[${PLUGIN_NAME}] Export failed:`, error);
            this.notify(this.t("Could not export GIF library: {error}", {error: this.translateError(error.message)}), "error");
        }
    }

    exportFolder(folderId) {
        if (this.storageBlocked) {
            return this.notify("Cannot export unreadable library data. Import a valid backup to recover it first.", "error");
        }
        try {
            const folder = this.state.folders.find(item => item.id === folderId);
            if (!folder) throw new Error("The selected folder no longer exists.");
            const backup = {
                format: "GIFboard-library",
                version: DATA_VERSION,
                exportedAt: new Date().toISOString(),
                folders: [folder]
            };
            const safeName = folder.name
                .replace(/[<>:"\/\\|?*\u0000-\u001f]/g, "-")
                .replace(/[. ]+$/g, "")
                .slice(0, 100) || "folder";
            const blob = new Blob([JSON.stringify(backup, null, 2)], {type: "application/json"});
            const href = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = href;
            link.download = `gifboard-${safeName}.json`;
            link.click();
            setTimeout(() => URL.revokeObjectURL(href), 1000);
        }
        catch (error) {
            console.error(`[${PLUGIN_NAME}] Folder export failed:`, error);
            this.notify(this.t("Could not export GIF library: {error}", {error: this.translateError(error.message)}), "error");
        }
    }

    importLibrary() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json,application/json";
        input.addEventListener("change", () => {
            const file = input.files?.[0];
            if (!file) return;
            this.importLibraryFile(file);
        }, {once: true});
        input.click();
    }

    async importLibraryFile(file) {
        try {
            const parsed = JSON.parse(await file.text());
            if (parsed?.format !== "GIFboard-library" || parsed.version !== DATA_VERSION) {
                throw new Error("This file is not a supported GIFboard backup.");
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
            this.notify(this.t("Import failed; existing library was left unchanged: {error}", {
                error: this.translateError(error.message)
            }), "error");
        }
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
                const keys = new Set(folder.gifs.filter(gif => !gif.dataUrl).map(gifKey));
                const localData = new Set(folder.gifs.filter(gif => gif.dataUrl).map(gif => gif.dataUrl));
                for (const gif of incomingFolder.gifs) {
                    if (gif.dataUrl ? localData.has(gif.dataUrl) : keys.has(gifKey(gif))) continue;
                    folder.gifs.push(gif);
                    if (gif.dataUrl) localData.add(gif.dataUrl);
                    else keys.add(gifKey(gif));
                }
            }
        });
        if (!success) this.storageBlocked = previousBlocked;
        return success;
    }
};
