import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { SigninDto } from 'src/app/dto/signin.dto';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  email: string;
  password: string;

  public form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required])], password: [null, Validators.compose([Validators.required])]
    });

    /* if (localStorage.getItem('token') == null) {
      this.router.navigate(['']);

    } else {
      this.router.navigate(['inicio'])
    } */

    if (localStorage.getItem("token") == null) {
      this.router.navigate(["session/signin"]);
    } else {
      this.router.navigate(["inicio"]);
    }
  }

  doSignin() {
    const signinDto = new SigninDto(this.form.get('email').value, this.form.get('password').value);
    this.authService.dologin(signinDto).subscribe(signinResp => {
      console.log(signinResp);
      this.authService.setSigninData(signinResp);
      window.location.replace('inicio');
    }, error => {
      console.log('Error en petición de login');
    });
  }

}
