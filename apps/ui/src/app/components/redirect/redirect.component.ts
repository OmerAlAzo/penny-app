import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UserSlectore from "../../story/selectors/user.selectors"

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css'],
  standalone: false,
})
export class RedirectComponent implements OnInit {

  role: string | null = '';
  token: string | null = '';

  checkauth$: Observable<any>;

  constructor(private store: Store  , private router: Router) {
    this.checkauth$ = this.store.select(UserSlectore.selectAuthCheck);
  }

  ngOnInit(): void {
    this.role = localStorage.getItem('BestRole');
    this.token = localStorage.getItem('BestToken');

    if (!this.token) {
      this.router.navigate(['/login']);
      console.log( "token" , this.token)
    }

    else if (this.role === "admin") {
      this.router.navigate(['/admin']);
      console.log( "role" , this.role)

    }

    else if (this.role === "customer") {
      this.router.navigate(['/user']);
      console.log( "role" , this.role)

    };


    this.checkauth$.subscribe(check =>{
        console.log("chek" , check)
    });

  }


}



///
