"use strict";

const REQUIRED_PERMISSIONS = {origins: ["*://*.forum-dessine.fr/*"]};

function hasPermissions(browser) {
	return new Promise((success) => {
		browser.permissions.contains(REQUIRED_PERMISSIONS, success);
	});
}

function askPermissions(browser) {
	return browser.permissions.request(REQUIRED_PERMISSIONS);
}
