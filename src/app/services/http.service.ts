// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class HttpService {
//   // http: Array<Number>;
//   constructor(
//     private http: HttpClient,
//   ) { 
//     // this.http = [];
//   }

//   async get(url: string, options = {}) {
//     // const ret = await this.http.push(1);
//     const ret = await this.http.get(url, options).toPromise()
//     .then(r => this.handleResponse(r))
//     .catch(r => this.handleError(r));
//     return ret
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  key: string;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { 
    this.key = ''
  }

  setKey(k:string) {
    this.key = k;
  }

  get(url:string, options = {}) {
    options = this.setOptions(options);
    return this.http.get(url, options)
      .toPromise()
      .then(r => this.handleResponse(r))
      .catch(r => this.handleError(r));
  }

  rawGet(url:any, options: any = {}) {
    options = this.setOptions(options);
    options.responseType = 'blob'
    return this.http.get(url, options)
      .toPromise()
      .then(r => this.handleResponse(r))
      .catch(r => this.handleError(r));
  }

  post(url:any, body:any, options = {}) {
    options = this.setOptions(options);
    return this.http.post(url, body, options)
      .toPromise()
      .then(r => this.handleResponse(r))
      .catch(r => this.handleError(r));
  }

  uploadFiles(url:any, fileName:any, files:any, data=null, options = {}){
    options = this.setOptions(options,false);
    let formData = new FormData();
    files.forEach((file:any,i:any) => {
      formData.append(fileName[i], file, file.name);
    });
    if(data){
      formData.append('data', JSON.stringify(data));
    }
    return this.http.post(url, formData, options)
      .toPromise()
      .then(r => this.handleResponse(r))
      .catch(r => this.handleError(r));
  }

  delete(url:any, options = {}) {
    options = this.setOptions(options);
    return this.http.delete(url, options)
      .toPromise()
      .then(r => this.handleResponse(r))
      .catch(r => this.handleError(r));
  }

  put(url:any, body:any, options = {}) {
    options = this.setOptions(options);
    return this.http.put(url, body, options)
      .toPromise()
      .then(r => this.handleResponse(r))
      .catch(r => this.handleError(r));
  }

  patch(url:any, body:any, options = {}) {
    options = this.setOptions(options);
    return this.http.patch(url, body, options)
      .toPromise()
      .then(r => this.handleResponse(r))
      .catch(r => this.handleError(r));
  }

  private handleError(res:any) {
    if (res.status === 401) {
      this.router.navigate(['/login']);
      throw 401;
    } else if (res.status >= 300)
      throw res.status;
    throw res;
  }
  private handleResponse(res:any) {
    if (res.status === 401) {
      this.router.navigate(['/login']);
      throw 401;
    }
    if (res.status >= 300)
      throw res.status;
    return res.body;
  }

  private setOptions(options:any,contentType:any='application/json') {
    let header: HttpHeaders = new HttpHeaders();
    if(contentType)
      header = header.append('Content-Type', contentType);
    if (this.key)
      header = header.append("Authorization", "Bearer " + this.key);
    options = Object.assign({ headers: header }, options, { observe: 'response' });
    return options;
  }
}

