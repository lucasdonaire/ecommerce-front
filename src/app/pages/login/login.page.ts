import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username:string;
  password:string;

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit() {
  }

  login(){
    // this.apiService.get('user')
  }

}
