# Unmouse

**Free yourself from the mouse. Select and copy text using only your keyboard.**

A browser extension for people who think reaching for the mouse to select text is a crime against productivity. Life is too short to move your hand 30 centimeters to the right every time you want to copy a paragraph.

## Why does this exist?

Because one day I was happily living inside Emacs, where the mouse is nothing but a decorative peripheral, and then I opened a browser. Suddenly I'm expected to *click and drag* like some kind of caveperson? In 2026?

Unmouse is forked from [Vimium](https://github.com/philc/vimium)'s excellent visual mode. Yes, an Emacs user shamelessly stole from Vim's ecosystem. The holy war has casualties on both sides, but good ideas deserve to cross borders. Consider this a diplomatic gesture. Or a heist. Depends on who you ask.

Everything that wasn't about text selection has been ripped out. No link hints, no vomnibar, no tab switching. Just one thing, done well: **select text and copy it, without touching the mouse**.

## Installation

1. Clone this repo (or download the ZIP)
2. Open `brave://extensions` (or `chrome://extensions`)
3. Enable "Developer mode"
4. Click "Load unpacked" and select the project folder
5. Navigate to any page and press `Cmd+Shift+U` (Mac) or `Ctrl+Shift+U` (Windows/Linux)
6. Welcome to the mouseless life

## How it works

Press `Cmd+Shift+U` on any page. A search bar appears at the bottom. Type to find text on the page -- matches are highlighted live with a count ("3 of 12"). Use `Ctrl+N`/`Ctrl+P` (or arrow keys) to cycle through matches. Press `Enter` to land on the current match and enter **Caret mode**. From there, move the cursor, press `v` to select, and `y` or `Enter` to copy. That's the whole extension.

The cursor stays centered on screen as you move, like Emacs's `centered-cursor-mode`.

### Modes

| Mode | What it does |
|------|-------------|
| **Search** | Incremental search to jump to text. Like `C-s` in Emacs or `Ctrl+F` in the browser, but better. |
| **Caret** | A cursor you move around the page. The "I'm looking for something" mode. |
| **Visual** | Text selection, character by character. The "I found it" mode. |
| **Visual Line** | Like Visual, but selects whole lines. For when you're feeling greedy. |

### Search keys

| Key | Action |
|-----|--------|
| Type text | Incremental search with live match count |
| `Ctrl+N` or `Down` | Next match |
| `Ctrl+P` or `Up` | Previous match |
| `Enter` | Confirm match, enter Caret mode |
| `Escape` | Cancel search |

### Movement keys

Three layers of keybindings coexist peacefully -- use whichever feels like home:

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

Built on the shoulders of [Vimium](https://github.com/philc/vimium), one of the greatest browser extensions ever made. Massive respect to the Vimium team. I took their visual mode, stripped everything else, and changed the drapes. If you want the full vim-in-the-browser experience, go use Vimium. If you just want to copy text without touching a rodent, you're in the right place.

## License

MIT -- same as Vimium, because stealing MIT-licensed code and keeping it MIT is the one thing both Emacs and Vim users can agree is ethical.
