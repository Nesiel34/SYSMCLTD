import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @Input() customerID!:number;
  fgAddress!:FormGroup;
  _address: any;

  @Input() set address(value: any) {
    this._address = value;
    this.buildForm();
    if(value){
      this.fgAddress.controls["City"].setValue(value.city);
      this.fgAddress.controls["Street"].setValue(value.street);
      this.fgAddress.controls["isDeleted"].setValue(value.isDeleted);
      this.fgAddress.controls["created"].setValue(value.created);
      this.fgAddress.disable();
    }
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    if(!this.fgAddress){
      this.fgAddress = new FormGroup({
        City: new FormControl('', [Validators.required]),
        Street: new FormControl(''),
        isDeleted: new FormControl(''),
        created: new FormControl(''),
      });
    }
  }

  getFormControlError(control:string){
    return this.fgAddress.controls[control]
  }

}
