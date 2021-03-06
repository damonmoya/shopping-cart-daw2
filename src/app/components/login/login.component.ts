import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isNewUser = false;
  email = '';
  password = '';
  errorMessage = '';
  recoverEmail = '';
  error: { name: string, message: string } = { name: '', message: '' };

  resetPassword = false;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() { }

  checkUserInfo() {
    if (this.authService.isUserEmailLoggedIn) {
      this.router.navigate(['/user'])
    }
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }

  changeForm() {
    this.isNewUser = !this.isNewUser
    this.clearErrorMessage()
  }

  onSignUp(): void {
    this.clearErrorMessage()

    if (this.validateForm(this.email, this.password) && this.validatePasswordLength(this.password)) {
      this.authService.signUpWithEmail(this.email, this.password)
        .then(() => {
          this.router.navigate(['/'])
        }).catch(_error => {
          this.error = _error
          this.error.message = "El email ya está en uso"
        })
    }
  }

  onLoginEmail(): void {
    this.clearErrorMessage()

    if (this.validateForm(this.email, this.password)) {
      this.authService.loginWithEmail(this.email, this.password)
        .then(() => this.router.navigate(['/']))
        .catch(_error => {
          this.error = _error
          this.error.message = "Las credenciales introducidas no corresponden a ningún usuario"
          this.recoverEmail = this.email
        })
    }
  }

  validateForm(email: string, password: string): boolean {
    if (email.length === 0) {
      this.errorMessage = 'Introduce el correo'
      return false
    }

    if (password.length === 0) {
      this.errorMessage = 'Introduce la clave'
      return false
    }

    this.errorMessage = ''

    return true
  }

  validatePasswordLength(password: string): boolean {
      if (password.length < 6) {
      this.errorMessage = 'La clave debe tener al menos 6 caracteres'
      return false
    }

    this.errorMessage = ''

    return true
  }

  isValidMailFormat(email: string) {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if ((email.length === 0) && (!EMAIL_REGEXP.test(email))) {
      return false;
    }

    return true;
  }

  sendResetEmail() {
    this.clearErrorMessage()

    this.authService.resetPassword(this.recoverEmail)
      .then(() => this.resetPassword = true)
      .catch(_error => {
        this.error = _error
      })
  }

}
