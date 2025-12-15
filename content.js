// Gen Z Autocorrect - Content Script

// Slang dictionary with regex patterns for case-insensitive matching
// Only includes terms that won't conflict with common English words
const slangDictionary = {
  'ate and left no crumbs': 'did something perfectly',
  'based': 'confident and authentic',
  'beat your face': 'apply makeup',
  'bestie': 'best friend',
  'bop': 'a really good song',
  'boujee': 'fancy',
  'bruh': 'expression of disbelief',
  "bussin'": 'really good (especially food)',
  'bussin': 'really good',
  'cancelled': 'boycotted online',
  'caught in 4k': 'caught with evidence',
  'cheugy': 'outdated or trying too hard',
  'clapback': 'sharp comeback',
  'cringe': 'embarrassing',
  'dank': 'high quality',
  'ded': 'extremely funny',
  'delulu': 'unrealistic beliefs',
  'dog water': 'extremely bad',
  'drip': 'stylish appearance',
  'duff up': 'beat someone badly',
  'fam': 'close friends',
  'famu tax': 'stealing food from friends',
  'fit check': 'showing an outfit',
  'fr': "I'm serious",
  'ghosted': 'being ignored',
  'ghosting': 'suddenly stopping communication',
  'glow-up': 'major positive transformation',
  'glow up': 'major positive transformation',
  'goat': 'greatest of all time',
  'goofy ahh': 'silly or foolish',
  'gyat': 'reaction to a curvy figure',
  'highkey': 'very',
  'hits different': 'feels more impactful',
  'hj': 'half joking',
  'ick': 'sudden dislike',
  "it's giving": 'gives off a certain vibe',
  'jk': 'just kidding',
  'kewl': 'cool',
  'let them cook': 'let them do their thing',
  'lowkey': 'kind of',
  'main character energy': 'acting like the center of attention',
  'main character': 'acting like the center of attention',
  'menty b': 'mental breakdown',
  'mewing': 'jawline exercise technique',
  'no cap': "I'm not lying",
  'periodt': 'end of discussion',
  'pushing p': 'being loyal',
  'ratio': 'reply has more likes than original',
  'rizz': 'charisma',
  'salty': 'annoyed',
  'sheesh': 'wow',
  'sigma': 'independent male',
  'simp': 'doing too much for a crush',
  'situationship': 'undefined romantic relationship',
  'slaps': 'amazing',
  'slay': 'did something amazingly well',
  'snack': 'attractive person',
  'spill the tea': 'share gossip',
  'stan': 'super fan',
  'sus': 'suspicious',
  'touch grass': 'go outside',
  'vibing': 'having a good feeling',
  'vibe check': 'checking the mood',
  'yeet': 'throw with force'
};

// Track if extension is enabled
let isEnabled = false; // Default to false until we check storage
let isInitialized = false;

// Check initial state from storage
chrome.storage.sync.get(['enabled'], (result) => {
  isEnabled = result.enabled !== false; // Default to true
  isInitialized = true;
  
  if (isEnabled) {
    replaceTextInPage();
    observeDOMChanges();
  }
});

// Listen for state changes
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.enabled) {
    const newValue = changes.enabled.newValue;
    
    if (newValue === false && isEnabled === true) {
      // Extension was turned OFF - reload page to restore original text
      location.reload();
    } else if (newValue === true && isEnabled === false) {
      // Extension was turned ON - reload page to apply translations
      location.reload();
    }
    
    isEnabled = newValue;
  }
});

// Create regex patterns for each slang term
const slangPatterns = Object.keys(slangDictionary).map(slang => ({
  pattern: new RegExp(`\\b${slang}\\b`, 'gi'),
  replacement: slangDictionary[slang]
}));

/**
 * Replace slang in a text string
 */
function replaceSlang(text) {
  let result = text;
  slangPatterns.forEach(({ pattern, replacement }) => {
    result = result.replace(pattern, replacement);
  });
  return result;
}

/**
 * Process a single text node
 */
function processTextNode(node) {
  if (!isEnabled) return;
  
  const originalText = node.nodeValue;
  const newText = replaceSlang(originalText);
  
  if (originalText !== newText) {
    node.nodeValue = newText;
  }
}

/**
 * Recursively walk through DOM and replace text in text nodes
 */
function walkAndReplace(node) {
  if (!isEnabled) return;
  
  // Skip script and style elements
  if (node.nodeType === Node.ELEMENT_NODE) {
    const tagName = node.tagName.toLowerCase();
    if (tagName === 'script' || tagName === 'style' || tagName === 'noscript') {
      return;
    }
  }
  
  // Process text nodes
  if (node.nodeType === Node.TEXT_NODE) {
    processTextNode(node);
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    // Recursively process child nodes
    for (let i = 0; i < node.childNodes.length; i++) {
      walkAndReplace(node.childNodes[i]);
    }
  }
}

/**
 * Replace all text in the page
 */
function replaceTextInPage() {
  if (!isEnabled) return;
  walkAndReplace(document.body);
}

/**
 * Set up MutationObserver to handle dynamic content
 */
function observeDOMChanges() {
  if (!isEnabled) return;
  
  const observer = new MutationObserver((mutations) => {
    if (!isEnabled) return;
    
    mutations.forEach((mutation) => {
      // Process added nodes
      mutation.addedNodes.forEach((node) => {
        walkAndReplace(node);
      });
      
      // Process character data changes
      if (mutation.type === 'characterData') {
        processTextNode(mutation.target);
      }
    });
  });
  
  // Start observing the entire document
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
}

// Initialize when page loads - but wait for storage check
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Don't do anything here - storage check will trigger initialization
  });
}
// If DOM already loaded, storage check will handle initialization
