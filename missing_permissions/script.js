{
	function hideBouton() {
		document.getElementById('boutonbox').style.display = "none";
	}

	function showBouton() {
		document.getElementById('boutonbox').style.display = "block";
	}

	document.getElementById('bouton').addEventListener("click", () => {
		askPermissions(browser).then((hello) => {
			updateMsg();
		});
	});

	function updateMsg() {
		hasPermissions(browser).then((hasPerm) => {
			let txt;
			if (hasPerm) {
				hideBouton();
				txt = "permission accordée ! <img src='zy_lezgo.png' />";
			}
			else {
				showBouton();
				txt = "<img src='zy_awaiting.png' /> pour que FD Transparent puisse fonctionner, il faut que vous permettiez à l'extension l'accès aux pages du Forum Dessiné en appuyant sur le bouton moche";
			}
			document.getElementById("msg").innerHTML = txt;
		});
	}
	updateMsg();
}
