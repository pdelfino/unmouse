# Unmouse

![The Lacemaker](https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Johannes_Vermeer_-_The_lacemaker_%28c.1669-1671%29.jpg/600px-Johannes_Vermeer_-_The_lacemaker_%28c.1669-1671%29.jpg)

*"The Lacemaker" (c. 1669–1670) by Johannes Vermeer — [Wikipedia](https://en.wikipedia.org/wiki/The_Lacemaker_(Vermeer))*

**Free yourself from the mouse. Select and copy text using only your keyboard.**

---

## About

A Chrome/Brave extension for people who think reaching for the mouse to select text is a crime against productivity. Life is too short to move your hand 30 centimeters to the right every time you want to copy a paragraph.

Unmouse is forked from [Vimium](https://github.com/philc/vimium)'s excellent visual mode. Everything that was not about text selection has been stripped out -- no link hints, no vomnibar, no tab switching. Just one thing, done well: **select text and copy it, without touching the mouse**.

## Tech Stack

- JavaScript (Manifest V3 Chrome Extension)
- No build step, no dependencies, no framework

## Installation

1. Clone this repo or download the ZIP
2. Open `brave://extensions` or `chrome://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the project folder
5. Navigate to any page and press `Cmd+Shift+U` (Mac) or `Ctrl+Shift+U` (Windows/Linux)

## How It Works

Press `Cmd+Shift+U` on any page. A search bar appears at the bottom. Type to find text -- matches are highlighted live with a count ("3 of 12"). Use `Ctrl+N` / `Ctrl+P` (or arrow keys) to cycle through matches. Press `Enter` to land on the match and enter **Caret mode**. From there, move the cursor, press `v` to select, and `y` or `Enter` to copy.

The cursor stays centered on screen as you move, inspired by Emacs's `centered-cursor-mode`.

### Modes

| Mode | Purpose |
|------|---------|
| **Search** | Incremental search to jump to text. Like `C-s` in Emacs, but in the browser. |
| **Caret** | A movable cursor on the page. The "I'm looking for something" mode. |
| **Visual** | Character-by-character text selection. The "I found it" mode. |
| **Visual Line** | Selects whole lines at a time. |

### Search Keys

| Key | Action |
|-----|--------|
| Type text | Incremental search with live match count |
| `Ctrl+N` or `Down` | Next match |
| `Ctrl+P` or `Up` | Previous match |
| `Enter` | Confirm match, enter Caret mode |
| `Escape` | Cancel search |

### Movement Keys

Three layers of keybindings coexist -- use whichever feels like home:

| Vim | Arrow | Emacs | Action |
|-----|-------|-------|--------|
| `h` | `Left` | `C-b` | Backward by character |
| `l` | `Right` | `C-f` | Forward by character |
| `j` | `Down` | `C-n` | Down by line |
| `k` | `Up` | `C-p` | Up by line |
| `w` | | `M-f` | Forward by word |
| `b` | | `M-b` | Backward by word |
| `0` | `Home` | `C-a` | Beginning of line |
| `$` | `End` | `C-e` | End of line |
| `(` / `)` | | | Backward/forward by sentence |
| `{` / `}` | | | Backward/forward by paragraph |
| `gg` | | | Top of document |
| `G` | | | Bottom of document |

### Actions

| Key | Action |
|-----|--------|
| `y` or `Enter` | Copy selection to clipboard |
| `v` | Enter Visual mode (character selection) |
| `V` | Enter Visual Line mode |
| `c` | Enter Caret mode |
| `o` | Reverse selection direction |
| `Escape` | Exit back to normal browsing |

## Acknowledgments

Built on the shoulders of [Vimium](https://github.com/philc/vimium), one of the greatest browser extensions ever made. Massive respect to the Vimium team. If you want the full vim-in-the-browser experience, go use Vimium. If you just want to copy text without touching a rodent, you are in the right place.

## License

MIT -- same as Vimium.
