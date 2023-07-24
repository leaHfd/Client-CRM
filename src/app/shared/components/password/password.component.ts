import { Component, Input, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]]
    },
  ]
})
export class PasswordComponent implements OnInit {

  @Input() controlName: string;
  @Input() action: CallableFunction;
  @Input() class: any;
  @Input() placeholder: string;

  showPass: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  runAction(event: any) {
    if(this.action) this.action(event);
  }

}
