import {Component} from '@angular/core';

@Component({
  selector: 'app-base',
  template: ''
})
export class BaseComponent {

  protected messageSaved = '';
  protected messageError = '';
  protected messageNewSaved = '';
  protected messageNewError = '';
  protected messageClose = '';
  protected deletedMessage = '';
  protected deleteErrorMessage = '';
  protected closeMessage = '';

  constructor() {
    this.messageSaved = "Saved successfully";
    this.messageClose = "Close";
    this.messageError = "Saved failed";
    this.messageNewSaved = "New save successful";
    this.messageNewError = "New save failed";
    this.deletedMessage = "Deleted successfully";
    this.deleteErrorMessage = "Deleted failed";
    this.closeMessage = "Close";
  }
}
