import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { mimeType } from './mime-type.validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  imagePreview: any;
  responseData: any;
  genders = ['male', 'female'];
  libRegisterForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobileNumber: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    image: ['', { asyncValidators: [mimeType] }],
    gender: ['', Validators.required]
  });
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.libRegisterForm.patchValue({ image: file });
    // console.log(this.libRegisterForm.get('image'));
    // console.log(this.libRegisterForm.value.image);
    this.libRegisterForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      console.log('test');
      this.imagePreview = reader.result as string;
      // console.log(this.imagePreview);
      // console.log(this.libRegisterForm.get('image'));
      // console.log('formGroup', this.libRegisterForm);
    };
    reader.readAsDataURL(file);
  }
  onRegister() {
    console.log('imageValue', this.libRegisterForm.value.image);

    // console.log('userId', localStorage.getItem('userId'));
    console.log('formData', this.libRegisterForm.value);
    this.registerService
      .onRegisterUser(this.libRegisterForm.value)
      .subscribe(response => {
        console.log(response);
        this.responseData = response;
        if (this.responseData.msg === 'emailIdexists') {
          alert('emailId already exists');
        } else if (this.responseData.msg === 'success') {
          alert('Database updated successfully');
        }
      });
  }
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService
  ) {}

  ngOnInit() {}
}
export const value = true;
