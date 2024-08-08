import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    // styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    registerData = { email: '', username: '', password: '' };

    constructor(private authService: AuthService, private router: Router) { }

    register() {
        this.authService.register(this.registerData).subscribe(
            (response) => {
                console.log('User registered', response);
                this.router.navigate(['/login']); // Preusmeravanje na stranicu za logovanje
            },
            (error) => {
                console.error('Registration failed', error);
            }
        );
    }
}