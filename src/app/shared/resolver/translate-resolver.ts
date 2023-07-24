import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { LocalizationService } from "app/shared/localization/localization.service";
import { empty, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TranslateResolve implements Resolve<string[]> {
  constructor(private localizationService: LocalizationService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|any{
  let translateKey = route.data['translateKey'];
  if(!translateKey){
     console.error(`TranslateResolve failed because 'translateKey' not found in route data. please add as so: 
     resolve: { translations: TranslateResolve},data: { translateKey: 'TRANSLATE_KEY' }`) ;
  }
    return translateKey?this.localizationService.TranslateAsync(translateKey):null;
  }
}