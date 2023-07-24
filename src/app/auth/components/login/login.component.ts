import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalizationService } from 'app/shared/localization/localization.service';
import { LoginStatus } from 'app/shared/model/enums';
import { AppAuthService } from 'app/shared/services/app-auth.service';
import { AdvMessageService } from 'app/shared/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AppAuthService,
    private localizationService: LocalizationService,  private messageService: AdvMessageService) { }

  loginForm: FormGroup;

  submitted = false;


  
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'userName': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.submitted = true;
    this.authService.login(this.loginForm.value).subscribe(res => {
      if(res.status === LoginStatus.Succeeded ) {
        this.router.navigate([this.authService.returnUrl]);
      } else {
        this.localizationService.TranslateEnum(res.status, LoginStatus, 'LoginStatus').subscribe(msg => {
          this.messageService.errorMessage(msg);
        });
        this.submitted = false;
      }
    });
  }

}
