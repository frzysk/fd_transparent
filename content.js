"use strict";

if (chrome)
	window.browser = chrome;
if (!browser)
	throw Error("wtf");

// REMOVE THE BUTTON IF IT ALREADY EXISTS
{
	let buttonEl = document.getElementById("fdtransparentbutton");
	if(buttonEl)
		buttonEl.parentNode.removeChild(buttonEl);
}

if([...document.getElementsByClassName("principal")].length > 0) {
	class FDTransparent {
		static createButton() {
			// STYLESHEET
			var styleText = `
				img#fdtransparentbutton {
					position: fixed;
					bottom: 20px;
					left: 20px;
					z-index: 9;
					width: 48px;
					height: 48px;
					
					border-radius: 50%;
					filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.22));

					background: #fff;

					transition: background 0.5s;
				}

				img#fdtransparentbutton.on {
					background: none;
				}

				@media screen and (min-width: 1201px) {
					img#fdtransparentbutton {
						left: 325px;
					}
				}

				.principal.post
				{
					box-shadow: none !important;
				}

				.principal {
					transition: background-color 0.5s, box-shadow 0.5s;
					box-shadow: none !important;
					filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.22));
				}

				.principal.transparent {
					background-color: #0000;
				}
			`;
			var styleEl = document.createElement("style");
			if (styleEl.styleSheet) {
				styleEl.styleSheet.cssText = styleText;
			} else {
				styleEl.appendChild(document.createTextNode(styleText));
			}
			document.head.appendChild(styleEl);
			// CREATE BUTTON
			FDTransparent.button = document.createElement('img');
			FDTransparent.button.id = "fdtransparentbutton";
			FDTransparent.button.src = browser.runtime.getURL('icon96.png');
			// button click
			FDTransparent.button.addEventListener("click", () => {
				FDTransparent.isOn = !FDTransparent.isOn;
				FDTransparent.setTransparent(FDTransparent.isOn);
			});
			// append button
			document.body.appendChild(FDTransparent.button);
			// SYNC TRANSPARENCY FROM STORAGE
			FDTransparent.isTransparent()
				.then((v) => 
				{
					FDTransparent.isOn = v;
					FDTransparent.setTransparent(FDTransparent.isOn);
				}
			);
		}

		static changeButtonDisplay(value) {
			if(value)
				FDTransparent.button.className = "on";
			else
				FDTransparent.button.className = "";
		}

		static isOn = false;

		static isTransparent() {
			return new Promise((resolve, reject) => {
				browser.storage.local.get("transparent")
					.then((v) => {
						resolve(Boolean(v.transparent));
					});
			});
		}

		static setTransparent(value) {
			// CHANGE SAVED VALUE
			browser.storage.local.set({"transparent": value });

			// CHANGE TRANSPARENCY
			[...document.getElementsByClassName("principal")].forEach((el) => {
				if (value)
					el.classList.add("transparent");
				else
					el.classList.remove("transparent");
			});
			
			// CHANGE BUTTON
			FDTransparent.changeButtonDisplay(value);
		}
	}

	FDTransparent.createButton();

	console.info('Extension FDTransparent chargée !');
}
else {
	console.info('L\'extension FDTransparent est inutile sur cette page.');
}
