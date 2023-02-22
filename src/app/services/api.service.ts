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

  post(query: string, body: object){
    return this.httpService.post(environment.url+'/'+query, body);
  }

  put(query: string, body: object){
    return this.httpService.put(environment.url+'/'+query, body);
  }

  delete(query: string, body: object){
    return this.httpService.delete(environment.url+'/'+query);
  }

}
