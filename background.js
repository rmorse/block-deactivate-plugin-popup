// Add context menu items.
chrome.runtime.onInstalled.addListener(() => {
	// Set default state
	updateExtensionState(false);
});

// Track if the extension is enabled (on plugins.php page)
let isExtensionEnabled = false;

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	// Only check completed page loads with URLs
	if (changeInfo.status === 'complete' && tab.url) {
		updateExtensionState(isPluginsPage(tab.url));
	}
});
async function getActiveTab() {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if ( tabs.length === 0 ) {
        return null;
    }
    const tab = tabs[0];
    return tab;
}
// Listen for tab activation changes
chrome.tabs.onActivated.addListener(async (activeInfo) => {
	const tab = await getActiveTab();
	if (tab.url) {
		updateExtensionState(isPluginsPage(tab.url));
	}
});

// Check if the URL ends with plugins.php
function isPluginsPage(url) {
	return url.includes('plugins.php');
}

// Update extension state based on URL check
function updateExtensionState(enabled) {
	updateExtensionAppearance(enabled);
}

// Update the extension's visual appearance based on its state
function updateExtensionAppearance(enabled) {
	if (enabled) {
		enableInteractions();
	} else {
		disableInteractions();
	}
}

function disableInteractions() {

	// Set icon to grayscale with reduced opacity
	chrome.action.setTitle({ title: "Block Deactivate Plugin Modal (Disabled)" });
	// Set icon to normal disabled state
	try {
		chrome.action.setIcon({
			path: {
				"16": "./assets/icons/grey/16.png",
				"32": "./assets/icons/grey/32.png",
				"128": "./assets/icons/grey/128.png"
			}
		});
	} catch (error) {
		console.error("Error setting disabled icon:", error);
	}
}

function enableInteractions() {
	// Set tooltip for enabled state
	chrome.action.setTitle({ title: "Block Deactivate Plugin Modal (Enabled)" });
	// Set icon to normal state
	try {
		chrome.action.setIcon({
			path: {
				"16": "./assets/icons/16.png",
				"32": "./assets/icons/32.png",
				"128": "./assets/icons/128.png"
			}
		});
	} catch (error) {
		console.error("Error setting enabled icon:", error);
	}
}
