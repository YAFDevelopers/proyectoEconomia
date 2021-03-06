import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
      .then((res) => {
        console.log('resUser', res.user.uid);
        this.authService.isFirstTime(res.user.uid).subscribe(res => {
          console.log(res);
          if (res == undefined) {
            this.router.navigate(['form-details']);
          }
          else {
            this.router.navigate(['home']);
          }
        });
      }).catch(err => console.log('err', err))
  }

  onLoginFacebook(): void {
    this.authService.loginFacebookUser()
      .then((res) => {
        console.log('resUser', res.user.uid);
        this.authService.isFirstTime(res.user.uid).subscribe(res => {
          console.log(res);
          if (res == undefined) {
            this.router.navigate(['form-details']);
          }
          else {
            this.router.navigate(['home']);
          }
        });
      }).catch(err => console.log('err', err))
  }
}
