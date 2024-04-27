import { contextBridge, ipcRenderer, IpcMainEvent } from 'electron';
import OpenDefaultBrowserArgs from "./interfaces/types/OpenDefaultBrowserArgs";
import ErrorAlertArgs from "./interfaces/types/ErrorAlertArgs";
import ConfirmDialogArgs from "./interfaces/types/ConfirmDialogArgs";
import OnSubmitReturnForm from "./interfaces/types/OnSubmitReturnForm";
import { submitState } from './enum';
import Place from './interfaces/types/Place';

contextBridge.exposeInMainWorld("api", {
  openDefaultBrowser: function (args: OpenDefaultBrowserArgs): void {
    ipcRenderer.send("openDefaultBrowser", args);
  },
  showErrorAlert: function (args: ErrorAlertArgs): void {
    ipcRenderer.send("showErrorAlert", args);
  },
  openConfirmDialog: function (args: ConfirmDialogArgs) {
    return ipcRenderer.invoke("openConfirmDialog", args);
  },
  showSaveXlsxDialog: function (places: Place[], queryText: string) {
    return ipcRenderer.invoke("showSaveXlsxDialog", {
      places,
      queryText
    });
  },
  startGoogleMapScrappingTask: function (args: OnSubmitReturnForm) {
    return ipcRenderer.send("startGoogleMapScrappingTask", args);
  },
  stopGoogleMapScrappingTask: function () {
    return ipcRenderer.send("stopGoogleMapScrappingTask");
  },
  receiveGoogleMapScrappingTaskState: function(func: () => void){
    ipcRenderer.on("receiveGoogleMapScrappingTaskState", (event: IpcMainEvent, ...args: any[]) => {
      func(args)
    }); 
  },
  removeGoogleMapScrappingTaskState: function () {
    ipcRenderer.removeAllListeners("receiveGoogleMapScrappingTaskState");
  },
  receiveGoogleMapScrappingResult: function(func: () => void){
    ipcRenderer.on("receiveGoogleMapScrappingResult", (event: IpcMainEvent, ...args: any[]) => {
      func(args)
    }); 
  },
  removeGoogleMapScrappingResultEvent: function () {
    ipcRenderer.removeAllListeners("receiveGoogleMapScrappingResult");
  },
  showNotification: function (title: string, body: string) {
    new window.Notification(title, {
      body
    })
  },
});