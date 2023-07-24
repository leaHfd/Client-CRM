import { ElementRef, Type } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DecodingTokenModel } from '../model/decoding-token.model';
import { CommonStateRaiseEvents } from '../state/shared-common.state/shared-common.actions';

@Injectable()
export class CommonService {

  constructor(private httpClient: HttpClient, private commonStateRaiseEvents: CommonStateRaiseEvents, /*public dialogService: DialogService*/) {
  }

  public blockScreen(divElement?: any) {
    this.setIsLoading(true, divElement);
  }

  public unblockScreen() {
    this.setIsLoading(false);
  }

  private setIsLoading(isLoading: boolean, divElement?: ElementRef) {
    this.commonStateRaiseEvents.setIsLoading(isLoading);
  }


  decodingToken(request: DecodingTokenModel) {
    return this.httpClient.post('/Clearing/DecodingToken', request);
  }
}
