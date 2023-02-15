import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpService: HttpService
  ) { }

  get(query: string){
    return this.httpService.get(environment.url+'/'+query);
  }
}
