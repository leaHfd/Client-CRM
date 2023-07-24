import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-desktop',
  templateUrl: './main-desktop.component.html',
  styleUrls: ['./main-desktop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainDesktopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
