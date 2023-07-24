import { Component, Input, Inject } from "@angular/core";

@Component({
  selector: "error-message",
  template: `
    <div class="errorMessage" *ngFor="let message of messages()">{{message}}</div>
  `,
  styles: [
    `
      .errorMessage{
        color: red;
        font-size: 13px;
      }
      .invalid-feedback,
      .valid-feedback {
        display: block;
      }
    `
  ]
})
export class MessagesComponent {
  @Input()
  public messages = () => [];
}
