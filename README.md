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
5. Navigate to any page and press `Alt+Shift+V`
6. Welcome to the mouseless life

## How it works

Press `Alt+Shift+V` on any page. You enter **Caret mode** -- a cursor appears on the page. Move it around. Press `v` to start selecting text (**Visual mode**). Press `y` or `Enter` to copy. That's it. That's the whole extension.

### Modes

| Mode | What it does |
|------|-------------|
| **Caret** | A cursor you move around the page. The "I'm looking for something" mode. |
| **Visual** | Text selection, character by character. The "I found it" mode. |
| **Visual Line** | Like Visual, but selects whole lines. For when you're feeling greedy. |

### Movement keys

| Key | Action |
|-----|--------|
| `h` / `ArrowLeft` | Move backward by character |
| `l` / `ArrowRight` | Move forward by character |
| `j` / `ArrowDown` | Move down by line |
| `k` / `ArrowUp` | Move up by line |
| `w` | Forward by word |
| `b` | Backward by word |
| `0` | Beginning of line |
| `$` | End of line |
| `(` / `)` | Backward/forward by sentence |
| `{` / `}` | Backward/forward by paragraph |
| `gg` | Top of document |
| `G` | Bottom of document |

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
