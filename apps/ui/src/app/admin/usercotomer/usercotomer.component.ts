import { Component, OnInit } from '@angular/core';
import { ServicesProductService } from '../../services/product.service';


@Component({
  selector: 'app-usercotomer',
  templateUrl: './usercotomer.component.html',
  styleUrls: ['./usercotomer.component.css']
})
export class UsercotomerComponent implements OnInit {

  users: any[] = []; // ✅ تعريف users كمصفوفة لتخزين البيانات

  constructor(private servicesProductService: ServicesProductService) {}

  ngOnInit() {
    this.getCustomers(); // ✅ استدعاء الدالة عند تحميل الصفحة
  }

  getCustomers() {
    this.servicesProductService.getAllUser().subscribe(
      (userData: any[]) => {
        // ✅ تصفية المستخدمين بحيث يتم جلب فقط الذين `role: 'customer'`
        this.users = userData.filter(user => user.role === 'customer');
      },
      (error) => {
        console.error('خطأ في جلب المستخدمين:', error);
      }
    );
  }
}