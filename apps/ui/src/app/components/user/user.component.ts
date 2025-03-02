import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: false,
})
export class UserComponent implements OnInit {
  Math = Math;
  users: any[] = [];
  loading = false;
  error: string | null = null;
  currentPage = 0;
  pageSize = 10;
  totalUsers = 0;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.error = null;

    this.userService.getAllUser(this.pageSize, this.currentPage * this.pageSize)
      .subscribe({
        next: (response) => {
          this.users = response.users;
          this.totalUsers = response.count;
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message || 'Failed to load users';
          this.loading = false;
        }
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadUsers();
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getRoleClass(role: string): string {
    return role === 'admin' ?
      'bg-purple-100 text-purple-800' :
      'bg-blue-100 text-blue-800';
  }
}
