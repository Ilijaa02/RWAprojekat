import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    // styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginData = { username: '', password: '' };

    constructor(private authService: AuthService, private router: Router) { }

    login() {
        this.authService.login(this.loginData).subscribe(
            (response) => {
                const token = response.access_token;
                localStorage.setItem('token', token);
                console.log("Successfully logged in, your token is: " + token);
                this.router.navigate(['/']);
            },
            (error) => {
                console.error('Login failed', error);
            }
        );
    }
}