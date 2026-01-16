import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../../Service/user-data';
import { PieChart } from '../pie-chart/pie-chart';
import { AddUser } from '../add-user/add-user';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, PieChart, AddUser],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  Data: Array<any> = [];
  showAddUserModal = false;

  constructor(private user: UserData, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.user.users$.subscribe((users) => {
      this.Data = users;
    });
  }

  addUser() {
    this.showAddUserModal = true;
  }

  closeModal() {
    this.cdr.markForCheck();
    this.showAddUserModal = false;
    this.getData();
  }
  
}
