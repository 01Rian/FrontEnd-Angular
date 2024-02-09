import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

const APIUrlRole = "http://localhost:8080/api/role";

@Injectable({
  providedIn: 'root'
})
export class RoleService extends DataService {
  constructor(http: HttpClient) {
    super(APIUrlRole, http);
   }
}
