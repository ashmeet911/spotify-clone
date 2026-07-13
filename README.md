# Spotify Clone

A Spotify-inspired music player built with HTML, CSS, and JavaScript. Includes a dynamic song list, play/pause controls, a seek bar, and next/previous track navigation.

## Features
- Dynamic song list rendered from a JS data array (covers, names, play buttons)
- Play/pause toggle with a synced progress bar
- Next / previous track navigation
- Visual "now playing" indicator (animated gif + song name)

## Setup
1. Clone this repo
2. Add your own mp3 files to a `songs/` folder in the project root, named `1.mp3` through `10.mp3` (audio files aren't included in this repo)
3. Open `index.html` with a local server (e.g. VS Code's Live Server extension) — opening it directly as a file may block audio loading in some browsers

## Debugging Journey
While building this, I ran into a tricky bug where clicking the play button did nothing, even though everything looked correct. It turned out Font Awesome's SVG kit script replaces the original `<i>` icon elements with `<svg>` elements after the page loads, which silently removes any event listeners already attached to them.

I fixed this by switching to **event delegation** — attaching click listeners to a stable parent element instead of the icons themselves, and checking which icon was actually clicked. This pattern is used throughout the app (main controls and song list buttons) and made the whole thing reliable regardless of how Font Awesome swaps the DOM.

You can see the full step-by-step debugging process in the commit history.
