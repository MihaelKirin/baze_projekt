const { app, BrowserWindow, ipcMain, Menu } = require("electron")
const path = require('path');
const url = require('url');

let knex = require("knex")({
	client: "sqlite3",
	connection: {
		filename: path.join(__dirname, 'app.db')
	}
});

app.on("ready", () => {
	let mainWindow = new BrowserWindow({ height: 1000, width: 900, show: false, webPreferences: {nodeIntegration: true} })
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'main.html'),
		protocol: 'file',
		slashes: true
	}));
	// Quit app when closed
	mainWindow.on('closed', () => {app.quit()})
	mainWindow.once("ready-to-show", () => { mainWindow.show() })
	// mainWindow.webContents.openDevTools({ mode: "detach" });

	const mainMenu = Menu.buildFromTemplate(menuTemplate);

	Menu.setApplicationMenu(mainMenu);

	ipcMain.on("mainWindowLoaded", function () {
		let result = knex.select("*").from("activities")
		//console.log(result)
		result.then(function(rows){
			mainWindow.webContents.send("resultSent", rows);
		})	
	});

	
});

function createAddWindow(){
	let unosKorisnika = new BrowserWindow({height: 400, width: 250, webPreferences: {nodeIntegration: true}})
	unosKorisnika.loadURL(url.format({
		pathname: path.join(__dirname, 'korisnik.html'),
		protocol: 'file',
		slashes: true
	}));
	//Garbage collection
	unosKorisnika.on('close', () => {unosKorisnika = null;})
}

function dodavanjeAktivnosti(){
	const electron = require('electron');
	const BrowserWindow = electron.remote.BrowserWindow;
	let dodAktivnosti = new BrowserWindow({height: 900, width: 700, webPreferences: {nodeIntegration: true}})
	dodAktivnosti.loadURL(url.format({
		pathname: path.join(__dirname, 'dodAktivnosti.html'),
		protocol: 'file',
		slashes: true
	}));
	//Garbage collection
	dodAktivnosti.on('close', () => {dodAktivnosti = null;})

}

function dodavanjeTim(){
	const electron = require('electron');
	const BrowserWindow = electron.remote.BrowserWindow;
	let dodTim = new BrowserWindow({height: 900, width: 700, webPreferences: {nodeIntegration: true}})
	dodTim.loadURL(url.format({
		pathname: path.join(__dirname, 'dodTim.html'),
		protocol: 'file',
		slashes: true
	}));
	//Garbage collection
	dodTim.on('close', () => {dodTim = null;})

}

function brisanjeTim(){
	const electron = require('electron');
	const BrowserWindow = electron.remote.BrowserWindow;
	let briTim = new BrowserWindow({height: 900, width: 700, webPreferences: {nodeIntegration: true}})
	briTim.loadURL(url.format({
		pathname: path.join(__dirname, 'briTim.html'),
		protocol: 'file',
		slashes: true
	}));
	//Garbage collection
	briTim.on('close', () => {briTim = null;})

}

function brisanjeAktivnosti(){
	const electron = require('electron');
	const BrowserWindow = electron.remote.BrowserWindow;
	let brisanjeAkt = new BrowserWindow({height: 900, width: 700, webPreferences: {nodeIntegration: true}})
	brisanjeAkt.loadURL(url.format({
		pathname: path.join(__dirname, 'brisanjeAkt.html'),
		protocol: 'file',
		slashes: true
	}));
	//Garbage collection
	dodAktivnosti.on('close', () => {brisanjeAkt = null;})

}
function brisanjeKorisnika(){
	const electron = require('electron');
	const BrowserWindow = electron.remote.BrowserWindow;
	let brisanjeKor = new BrowserWindow({height: 900, width: 700, webPreferences: {nodeIntegration: true}})
	brisanjeKor.loadURL(url.format({
		pathname: path.join(__dirname, 'brisanjeKor.html'),
		protocol: 'file',
		slashes: true
	}));
	//Garbage collection
	dodAktivnosti.on('close', () => {brisanjeKor = null;})}

const menuTemplate = [
	{
		label: 'File',
		submenu:[
			{
				label: 'Dodajte novog korisnika',
				click(){
					createAddWindow();
				}
			},
			{
				label: 'Quit',
				accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
				click(){
					app.quit();
				}
			}
		]
	}
];

if (process.platform == 'darwin'){
	menuTemplate.unshift({});
}

// Dev tools not in production
if(process.env.NODE_ENV !== 'production'){
	menuTemplate.push({
		label: 'Developer Tools',
		submenu: [
			{
				label: 'Toggle DevTools',
				click(item, focusedWindow){
					focusedWindow.toggleDevTools();
				}
			},
			{
				role: 'reload'
			}
		]
	})
}




app.on("window-all-closed", () => { app.quit() })
