import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ICustomer } from '../interfaces/Cutomer.interface';
import { CustomerService } from '../service/customer-service.service';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.scss']
})
export class CustomersTableComponent implements OnInit {


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  customer!: ICustomer[];
  displayedColumns!: string[];
  dataSource = new MatTableDataSource<ICustomer>(this.customer);
  columns!:{key:string;heading:string;checkbox?:boolean}[];
  is_table_being_updated:boolean = false;
  row:any;

  constructor(private custoemrService:CustomerService,public matPaginatorIntl:MatPaginatorIntl) { }

  ngOnInit(): void {
    this.custoemrService.getAllCustomers().subscribe(s=>{
      console.log(s);
      this.customer = s;
      this.dataSource.data = s;
    });
    this.columns = [
      {
        key:"id",
        heading:"Id"
      },
      {
        key:"name",
        heading:"Name"
      },
      {
        key:"customerNumber",
        heading:"CustomerNumber"
      },
      {
        key:"isDeleted",
        heading:"IsDeleted",
        checkbox:true
      },
      {
        key:"created",
        heading:"Created"
      },
    ];
    this.displayedColumns = this.columns.map(s=>s.key);
    this.displayedColumns.push("edit");

  }

  editRow(row:any){
    this.row = row;
    this.is_table_being_updated = true;
  }

  addRow(){
    this.row = null;
    this.is_table_being_updated = true;
  }

  closeUserDeatils(isSave:boolean){
    if(isSave){
      this.custoemrService.getAllCustomers().subscribe(s=>{
        console.log(s);
        this.customer = s;
        this.dataSource.data = s;
      });
    }
    this.is_table_being_updated = false;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
