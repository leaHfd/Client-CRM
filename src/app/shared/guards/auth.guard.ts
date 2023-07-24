import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppAuthService } from '../services/app-auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private router: Router, private authService: AppAuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkIsLogged(state.url);
    }

    canLoad(route: Route, segments: UrlSegment[]) {
        const navigation = this.router.getCurrentNavigation();
        let url = '/';

        if (navigation) {
            url = navigation.extractedUrl.toString();
        }
        return this.checkIsLogged(url);
    }

    checkIsLogged(url) {
        if (this.authService.isLoggedOn) {
            return true;
        }
        this.authService.returnUrl = url;
        // not logged in so redirect to login page with the return url
        this.router.navigate([this.authService.loginUrl]);
        return false;
    }

}
