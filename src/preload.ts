const { contextBridge, ipcRenderer } = require('electron');
import OpenDefaultBrowserArgs from "./interfaces/types/OpenDefaultBrowserArgs";
import ErrorAlertArgs from "./interfaces/types/ErrorAlertArgs";
import ConfirmDialogArgs from "./interfaces/types/ConfirmDialogArgs";

contextBridge.exposeInMainWorld("api", {
  openDefaultBrowser: function (args: OpenDefaultBrowserArgs): void {
    ipcRenderer.send("openDefaultBrowser", args);
  },
  showErrorAlert: function (args: ErrorAlertArgs): void {
    ipcRenderer.send("showErrorAlert", args);
  },
  openConfirmDialog: function (args: ConfirmDialogArgs) {
    return ipcRenderer.invoke("openConfirmDialog", args);
  }
});