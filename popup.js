// Popup script for Gen Z Autocorrect

const toggleSwitch = document.getElementById('toggleSwitch');
const statusText = document.getElementById('statusText');

// Load the current state
chrome.storage.sync.get(['enabled'], (result) => {
  const isEnabled = result.enabled !== false; // Default to true
  toggleSwitch.checked = isEnabled;
  updateStatus(isEnabled);
});

// Handle toggle changes
toggleSwitch.addEventListener('change', () => {
  const isEnabled = toggleSwitch.checked;
  
  // Save state to storage
  chrome.storage.sync.set({ enabled: isEnabled }, () => {
    updateStatus(isEnabled);
  });
});

// Update status text
function updateStatus(isEnabled) {
  if (isEnabled) {
    statusText.textContent = 'ON';
    statusText.className = 'status-on';
  } else {
    statusText.textContent = 'OFF';
    statusText.className = 'status-off';
  }
}
