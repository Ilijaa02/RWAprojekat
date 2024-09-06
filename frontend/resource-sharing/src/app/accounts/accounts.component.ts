import { Component, OnInit } from '@angular/core';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  users: any[] = [];

  constructor(private accountsService: AccountsService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.accountsService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  deleteUser(username: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.accountsService.deleteUser(username).subscribe(() => {
        this.loadUsers();
      });
    }
  }
}
