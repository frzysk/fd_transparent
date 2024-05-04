"use strict";

if (typeof hasPermissions == 'undefined')
	self.importScripts("permissions.js");

if (chrome)
	var browser = chrome;
if (!browser)
	throw Error("wtf");

function checkPermissions() {
	hasPermissions(browser).then((hasPerm) => {
		if (!hasPerm)
			browser.tabs.create({url: "/missing_permissions/index.html", active: true});
	});
}

checkPermissions();
browser.permissions.onRemoved.addListener(checkPermissions);
