import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  //#region private members
  private currentPosition: { x: number, y: number }
  //#endregion

  constructor(private httpClient: HttpClient) {
    navigator.geolocation.watchPosition((res: any) => {
      this.currentPosition = { x: res.coords.latitude, y: res.coords.longitude };
    })
  }

  getIsraelCities() {
    return this.httpClient.get('https://raw.githubusercontent.com/royts/israel-cities/master/israel-cities.json', { headers: { 'Do-Not-Add-Headers': 'true', } });
  }

  getCountriesList() {
    return this.httpClient.get('https://data.gov.il/api/3/action/datastore_search?resource_id=c84082e9-7d45-4853-9a95-e7eaad7f66d5&limit=254', { headers: { 'Do-Not-Add-Headers': 'true', } });
  }

}
