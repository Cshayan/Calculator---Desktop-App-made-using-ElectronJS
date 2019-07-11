const {
    app,
    BrowserWindow,
    Menu
} = require("electron");
const path = require("path");
const url = require("url");

// Set Environment
process.eventNames.NODE_ENV = 'production';

// Init window
let win;
let aboutWin;

function createWindow() {
    // Create Browser window and turn the nodeIntegration ON
    win = new BrowserWindow({
        width: 500,
        height: 638,
        minWidth: 500,
        maxWidth: 500,
        minHeight: 638,
        maxHeight: 638,
        webPreferences: {
            nodeIntegration: true
        },
        icon: __dirname + "./img/calculator.png"
    });

    // Load index.html file
    win.loadURL(
        url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true
        })
    );

    // Open devtools
    // win.webContents.openDevTools();

    // Close when higher application close button is clicked
    win.on("closed", () => {
        win = null;
        app.quit();
    });

    // Build Menu from Template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert Menu
    Menu.setApplicationMenu(mainMenu);
}

// Show the About Page
function showAboutPage() {
    aboutWin = new BrowserWindow({
        width: 400,
        height: 538,
        minWidth: 400,
        maxWidth: 400,
        minHeight: 538,
        maxHeight: 538,
        webPreferences: {
            nodeIntegration: true
        },
        icon: __dirname + "./img/calculator.png"
    });

    // Load about.html file
    aboutWin.loadURL(
        url.format({
            pathname: path.join(__dirname, "about.html"),
            protocol: "file:",
            slashes: true
        })
    );

    // Close
    aboutWin.on("closed", () => {
        aboutWin = null;
    });

    // Remove menu from about page
    aboutWin.removeMenu();
}

// Run the createWindow function
app.on("ready", createWindow);

// Quit when all windows are closed
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// Create menu template
const mainMenuTemplate = [{
        label: "Menu",
        submenu: [{
            label: 'Quit',
            accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
            click() {
                app.quit();
            }
        }],
    },
    {
        label: "About",
        click() {
            showAboutPage();
        }
    }
];

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";