const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const fs = require("fs");

let mainWindow;

// TODO : test for a couple chromiæ browsers.
// What this does is piggy-backs on existing chrome installs to find the given
// extension ID.
// Alternatively, we may want to download a packaged crx, extract it in out
// nix derivations.
const get_extension_path = function(ext) {
	const p = `${process.env.HOME}/.config/google-chrome-beta/Default/Extensions/${ext}/`;

	return p + fs.readdirSync(p)[0];
};

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1920,
		height: 1080,
		//fullscreenable: true,
		//fullscreen: true,
		autoHideMenuBar: true,
		//backgroundColor: "#0f0",
		backgroundColor: "#666",
	});

	// and load the index.html of the app.
	mainWindow.loadURL("http://localhost:8080");

	// Open the DevTools.
	//mainWindow.webContents.openDevTools();

//	// Load devtools extensions as needed.
//	BrowserWindow.addDevToolsExtension(
//		get_extension_path("fmkadmapgofadopljbjfkapdkoienihi")
//	);

	// Emitted when the window is closed.
	mainWindow.on("closed", function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
	})
}

app.on("ready", createWindow);

// The following hooks are for better platform-specific integration.
// Namely, how macOS apps don't quit when all windows are closed.

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit()
    }
});

app.on("activate", function () {
    if (mainWindow === null) {
        createWindow()
    }
});
