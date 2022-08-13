import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, [Validators.required, Validators.email])
  senha = new FormControl(null, [Validators.required, Validators.minLength(3)])

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }


  validaCampos(): boolean {
    return this.email.valid && this.senha.valid
  }


  logar() {

    this.service.authenticate(this.creds).subscribe(resposta => {

      this.service.successFullLogin(resposta.headers.get('Authorization').substring(7))
      this.router.navigate([''])

    }, () => {

      this.toast.error('Usuário e/ou senha inválidos!')

    })

  }

}
