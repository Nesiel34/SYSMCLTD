import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IContact } from '../interfaces/Contacts.interface';
import { CustomerService } from '../service/customer-service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(private customerService:CustomerService) {}
  fgContact!: FormGroup;
  _contact: any;
  @Input() set contact(value: any) {
    this._contact = value;
    this.buildForm();
    if(value&&value.id){
      this.fgContact.controls['FullName'].setValue(value.fullName);
      this.fgContact.controls['OfficeNumber'].setValue(value.officeNumber);
      this.fgContact.controls['Email'].setValue(value.email);
      this.fgContact.controls['isDeleted'].setValue(value.isDeleted);
      this.fgContact.controls['created'].setValue(value.created);
      this.fgContact.disable();
    }

  }

  ngOnInit(): void {
  }

  buildForm() {
    if(!this.fgContact){
      this.fgContact = new FormGroup({
        FullName: new FormControl('', [Validators.required]),
        OfficeNumber: new FormControl(''),
        Email: new FormControl(''),
        isDeleted: new FormControl(''),
        created: new FormControl(''),
      });
    }

  }

  getFormControlError(control: string) {
    return this.fgContact.controls[control];
  }

  saveContact(){
    this.fgContact.markAllAsTouched();
    if(this.fgContact.valid){
      let contact:IContact =  {
        fullName:this.fgContact.controls["FullName"].value,
        officeNumber:this.fgContact.controls["OfficeNumber"].value,
        email:this.fgContact.controls["Email"].value,
        created:this.fgContact.controls["created"].value,
        customerId:this._contact.customerId,
        id:this._contact?.id,
        isDeleted:this.fgContact.controls["isDeleted"].value
      }
      this.customerService.insertContact(contact).subscribe(s=>{
        alert("Contact successfully saved");
        this.fgContact.disable();
        this._contact.id =s.id;
        this._contact.created = s.created;
      });


      }
  }
}
