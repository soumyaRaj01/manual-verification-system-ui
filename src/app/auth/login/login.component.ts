import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataStorageService } from '../../core/services/data-storage.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router,

    private dataService: DataStorageService
  ) { }

  onSubmit() {
    console.log("login submitted for user:", this.username);

    // login api
    // on successful login fetch application list for the user
    // const role = 'MVS_OFFICER';
    // const role = 'MVS_SUPERVISOR';
    const role = 'MVS_DISTRICT_OFFICER';
    // const role = 'MVS_LEGAL_OFFICER';
    //role also should come from api

    this.dataService
      .userLogin(
        this.username,
        this.password
      )
      .subscribe(
        (response: any) => {
          console.log("Login Response:", response);

          // Check if login was successful
          if (response && response.response && response.response.status === "success") {
            localStorage.setItem("authToken", response.response.token);
            localStorage.setItem("refreshToken", response.response.refreshToken);
            localStorage.setItem("userId", response.response.userId || "");
            const userId = response.response.userId;
            this.router.navigate(['/application-list'], { state: { role } }
            );
          }

        },
        (error) => {
          console.error("Login error:", error);
        }
      );

  }
}
