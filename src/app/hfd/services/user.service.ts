import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lookup } from 'app/core/model/lookup.model';
import { map, Observable } from 'rxjs';
import { Departments, UserValidationError } from '../model/enums';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getAllUsers() {
    return this.httpClient
      .get<{
        succeeded: boolean;
        entities: any[];
      }>('/user')
      .pipe(map((res) => res.entities));
  }

  getUserDetails(id: number) {
    return this.httpClient
      .get<{
        succeeded: boolean;
        entity: any[];
      }>(`/user/userDetailsById/${id}`)
      .pipe(map((res) => res.entity));
  }
  getUsersByDepartment(department:Departments): Observable<Lookup[]> {
    return this.httpClient
      .get<{
        succeeded: boolean;
        entities: Lookup[];
      }>(`/user/usersByDepartment/${department.toString()}`)
      .pipe(map((res) => res.entities));
  }
  updateUserDetails(
    user
  ): Observable<{ validationError: UserValidationError; userId: number }> {
    return this.httpClient.put<{
      validationError: UserValidationError;
      userId: number;
    }>('/user', user);
  }
  createUser(
    user
  ): Observable<{ validationError: UserValidationError; userId: number }> {
    return this.httpClient.post<{
      validationError: UserValidationError;
      userId: number;
    }>('/user', user);
  }
}
