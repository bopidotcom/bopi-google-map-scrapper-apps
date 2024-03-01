const { contextBridge, ipcRenderer } = require('electron');
import OpenDefaultBrowserArgs from "./interfaces/types/OpenDefaultBrowserArgs";

contextBridge.exposeInMainWorld("api", {
    openDefaultBrowser: function (args: OpenDefaultBrowserArgs) {
      ipcRenderer.send("openDefaultBrowser", args);
    }
});