const { app, BrowserWindow, Menu, shell } = require('electron');
const main = require('./main');

// template serves as the blueprint for the menu
const template = [
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CommandOrControl+Z',
        role: 'undo',
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CommandOrControl+Z',
        role: 'redo',
      },
      { type: 'separator' },
      {
        label: 'Cut',
        accelerator: 'CommandOrControl+X',
        role: 'cut',
      },
      {
        label: 'Copy',
        accelerator: 'CommandOrControl+C', // keyboard shortcut
        role: 'copy',
      },
      {
        label: 'Paste',
        accelerator: 'CommandOrControl+V',
        role: 'paste',
      },
      {
        label: 'Select All',
        accelerator: 'CommandOrControl+A',
        role: 'selectall',
      },
    ],
  },
  {
    label: 'Window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CommandOrControl+M',
        role: 'minimize',
      },
      {
        label: 'Close',
        accelerator: 'CommandOrControl+W',
        role: 'close',
      },
    ],
  },
];

// Gets the name of the application. This won’t show up in the menu now
// but is useful down the road. This targets the MacOS.
if ('darwin' === process.platform) {
  //template.unshift({ label: 'Fire Sale' });
  template.unshift({ label: app.getName() });
}

module.exports = Menu.buildFromTemplate(template);