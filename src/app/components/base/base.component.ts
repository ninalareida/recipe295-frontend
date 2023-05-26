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
    this.messageSaved = "Erfolgreich gespeichert";
    /*this.messageClose = text['messages.close'];
    this.messageError = text['messages.save_error'];
    this.messageNewSaved = text['messages.save_new_ok'];
    this.messageNewError = text['messages.save_new_error'];
    this.deletedMessage = text['messages.deleted_ok'];
    this.deleteErrorMessage = text['messages.delete_error'];
    this.closeMessage = text['messages.close'];*/
  }
}
