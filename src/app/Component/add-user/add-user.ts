import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserData } from '../../Service/user-data';

@Component({
  selector: 'app-add-user',
  standalone: true,
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
  imports:[ReactiveFormsModule]
})
export class AddUser {
  @Output() submitted = new EventEmitter<void>();

  myForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required]),
  });

  constructor(private userData: UserData) {}

  submitData() {
    this.myForm.markAllAsTouched();

    if (this.myForm.invalid) return;
    const newUser = {
      name: this.myForm.value.name!,
      email: this.myForm.value.email!,
      role: this.myForm.value.role!,
    };

    this.userData.addUser(newUser);
    this.myForm.reset();
    this.submitted.emit();
  }
}
