import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { LocalizationService } from "app/shared/localization/localization.service";
import { AppAuthService } from "app/shared/services/app-auth.service";
import { EMPTY } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserResolve implements Resolve<string[]> {
    constructor(private router: Router, private authService: AppAuthService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): any {
        if (this.authService.isLoggedOn) {
            return this.authService.getOrLoadUserInfo();
        } else {
            return EMPTY;
        }
    }
}