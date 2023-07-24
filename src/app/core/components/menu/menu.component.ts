import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LocalizationService } from 'app/shared/localization/localization.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {

  items;
  constructor(private localizationService: LocalizationService) { }

  ngOnInit(): void {

    this.items = [
      {
        label: this.localizationService.Translate('TOP_MENU.BUSINESS.BUSINESS'),
        items: [
          {
            label: this.localizationService.Translate('TOP_MENU.BUSINESS.CREATE_BUSINESS'),
            routerLink: ['']
          },
          {
            label: this.localizationService.Translate('TOP_MENU.BUSINESS.EXISTING_BUSINESS'),
            routerLink: ['']
          }
        ]
      },

      {
        label: this.localizationService.Translate('TOP_MENU.USERS.USERS'),
        items: [
          {
            label: this.localizationService.Translate('TOP_MENU.USERS.PERMISSIONS_MANAGEMENT'),
          },
          {
            label: this.localizationService.Translate('TOP_MENU.USERS.USERS_MANAGMENT'),
            routerLink: ['/hfd/users']
          }
        ]
      },

    ];
  }

}
