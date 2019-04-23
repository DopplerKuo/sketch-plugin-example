import sketch from 'sketch';
import BrowserWindow from 'sketch-module-web-view';

export default context => {
  // Show UI
  const options = {
    width: 300,
    height: 300,
    titleBarStyle: 'hidden',
  }
  const win = new BrowserWindow(options);
  win.loadURL(require('./ui/index.html'));

  // Change count text on UI by selection
  const doc = sketch.getSelectedDocument();
  const selectedLayers = doc.selectedLayers;
  const selectedCount = selectedLayers.length;
  win.webContents.executeJavaScript(`writeSelectionCount(${selectedCount})`);

  win.webContents.on('exportLayers', () => {
    const layerArray = selectedLayers.layers;
    sketch.export(layerArray, {
      output: '~/Documents/Sketch Exports',
      formats: 'png'
    });
    sketch.UI.message('Done!');
  })
}
