# 🔄 Gen Z Autocorrect

A fun Chrome extension that automatically translates Gen Z slang into plain English on webpages like Twitter/X, Reddit, and WhatsApp Web.

## Features

✨ **Automatic Translation** - Converts Gen Z slang to plain English in real-time  
🔄 **Works on Dynamic Content** - Handles infinite scroll and live updates  
🎛️ **Easy Toggle** - Turn the extension on/off with a simple switch  
🌐 **Wide Compatibility** - Works on Twitter/X, Reddit, WhatsApp Web, and more  

## Slang Dictionary

The extension currently translates these terms:

- **"no cap"** → "I'm not lying"
- **"fr"** → "I'm serious"
- **"lowkey"** → "kind of"
- **"highkey"** → "very"
- **"mid"** → "average"
- **"sus"** → "suspicious"
- **"rizz"** → "charisma"
- **"bet"** → "okay"
- **"it's giving"** → "this feels like"
- **"slay"** → "well done"
- **"touch grass"** → "go outside"

## Installation

### Step 1: Add Icons
Before installing, you need to add icon files to the `icons` folder:
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

**Quick Tip:** You can use any PNG images temporarily for testing. Create simple colored squares or use emoji screenshots.

### Step 2: Load the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top-right corner)
3. Click **"Load unpacked"**
4. Select the `genz` folder (the one containing `manifest.json`)
5. The extension will appear in your toolbar!

### Step 3: Use It

1. Click the extension icon in your Chrome toolbar
2. Make sure the toggle is **ON** (green)
3. Visit Twitter/X, Reddit, or any webpage
4. Watch Gen Z slang get translated automatically!
5. Toggle **OFF** to disable, then refresh the page to restore original text

## How It Works

- **Content Script** (`content.js`) runs on all webpages
- Scans text nodes for Gen Z slang terms
- Replaces them in-place without changing layout or links
- Uses MutationObserver to handle dynamically loaded content
- State is saved using Chrome's storage API

## Files Structure

```
genz/
├── manifest.json       # Extension configuration
├── content.js          # Main text replacement logic
├── popup.html          # Extension popup UI
├── popup.js            # Popup toggle functionality
├── popup.css           # Popup styling
├── icons/              # Extension icons (add your own)
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md           # This file
```

## Customization

### Add More Slang Terms

Edit the `slangDictionary` object in [content.js](content.js):

```javascript
const slangDictionary = {
  'no cap': "I'm not lying",
  'your new slang': 'translation here',
  // Add more terms...
};
```

### Change Target Websites

Edit the `matches` array in [manifest.json](manifest.json):

```json
"matches": [
  "https://twitter.com/*",
  "https://example.com/*",
  // Add more URLs...
]
```

## Notes

- After toggling OFF, refresh the page to restore original text
- The extension works best on English-language content
- Case-insensitive matching (matches "No Cap", "NO CAP", etc.)
- Only replaces whole words (won't match partial words)

## Troubleshooting

**Extension doesn't appear:**
- Make sure you added icon files to the `icons` folder
- Check that Developer mode is enabled in `chrome://extensions/`

**Text not being replaced:**
- Click the extension icon and verify it's toggled ON
- Refresh the webpage after enabling
- Check browser console for any errors (F12)

**Need to restore original text:**
- Toggle the extension OFF and refresh the page

## Future Enhancements

Ideas for expanding this extension:
- Add user-customizable dictionary
- Reverse mode (English → Gen Z slang)
- Highlight translated text
- Statistics on how many terms were translated
- More comprehensive slang dictionary
- Settings page for advanced options

---

## Credits

**Created by:** [ankit](https://github.com/ankitydvv)  
**GitHub:** https://github.com/ankitydvv/genz

---

**Have fun translating! No cap, this extension is lowkey fire! 🔥**  
*(Translation: I'm not lying, this extension is kind of great!)*
