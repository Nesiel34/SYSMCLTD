import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAddress } from '../interfaces/Address.interface';
import { IContact } from '../interfaces/Contacts.interface';
import { ICustomer } from '../interfaces/Cutomer.interface';
import { CustomerService } from '../service/customer-service.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  constructor(private customerService:CustomerService) {}

  @Output() closeAddUser = new EventEmitter<boolean>();
  fgUser!: FormGroup;
  address!:IAddress[];
  contact!:IContact[];
 _valueForm: any;
  @Input() set valueForm(value: any) {
    this._valueForm = value;
    this.buildForm();
    if(value){
      this.fgUser.controls["name"].setValue(value.name);
      this.fgUser.controls["customerNumber"].setValue(value.customerNumber);
      this.fgUser.controls["isDeleted"].setValue(value.isDeleted);
      this.fgUser.controls["created"].setValue(value.created);
      this.fgUser.controls["created"].disable();
    }

  }

  ngOnInit(): void {
    // this.buildForm();
    if(this._valueForm){
      this.customerService.getAllContact(this._valueForm.id).subscribe(s=>{
        this.contact = [...s];
      });
      this.customerService.getAllAddress(this._valueForm.id).subscribe(s=>{
        this.address = [...s];
      });
    }

  }
  buildForm() {
    if(!this.fgUser){
      this.fgUser = new FormGroup({
        name: new FormControl('', [Validators.required]),
        customerNumber: new FormControl('', [
          Validators.required,
          Validators.minLength(9),
        ]),
        isDeleted: new FormControl(''),
        created: new FormControl(''),
      });
    }

  }
  getFormControlError(control:string){
    return this.fgUser.controls[control]
  }
  addContact(){
    this.contact.unshift({
      created:new Date(),
      customerId:this._valueForm.id,
      fullName:"",
      id:0,
      isDeleted:false,

    });
  }

  saveCustomer(){
      this.fgUser.markAllAsTouched();
      if(this.fgUser.valid){
        let customer:ICustomer =  {
          name:this.fgUser.controls["name"].value,
          customerNumber:this.fgUser.controls["customerNumber"].value,
          created:this.fgUser.controls["created"].value,
          id:this._valueForm?.id,
          isDeleted:this.fgUser.controls["isDeleted"].value
        }
          if(!this._valueForm || this.fgUser.controls["name"].value!=this._valueForm.name){
            this.customerService.checkDuplicateCustomer(this.fgUser.controls["name"].value).subscribe(s=>{
              if(s){

                if(this._valueForm){
                  this.customerService.updateCustomer(customer).subscribe(s=>{
                    console.log(s);
                    this.closeAddUser.emit(true);
                  })
                }
                else {
                  this.customerService.insertCustomer(customer).subscribe(s=>{
                    console.log(s);
                    this.closeAddUser.emit(true);
                  })
                }
              }
              else {
                this.fgUser.controls["name"].setErrors({duplicate:true});
              }

            });
          }
          else {
            if(this._valueForm){
              this.customerService.updateCustomer(customer).subscribe(s=>{
                console.log(s);
                this.closeAddUser.emit(true);
              })
            }
            else {
              this.customerService.insertCustomer(customer).subscribe(s=>{
                console.log(s);
                this.closeAddUser.emit(true);
              })
            }
          }

        }
  }

  closeWindow(){
    this.closeAddUser.emit(false);
  }
}

