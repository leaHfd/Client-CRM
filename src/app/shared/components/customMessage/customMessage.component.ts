import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LocalizationService } from 'app/shared/localization/localization.service';

@Component({
  selector: 'custom-message',
  templateUrl: './customMessage.component.html',
  styleUrls: ['./customMessage.component.scss']
})
export class CustomMessageComponent implements OnInit {

  constructor(private localizationService:LocalizationService) { }

  ngOnInit(): void {
    
  }
}
