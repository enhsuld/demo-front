import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { ApiService } from './api.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { User } from './User';

@Component({
    selector   : 'sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class SampleComponent implements AfterViewInit 
{
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private apiService: ApiService
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
    }

    displayedColumns = ['position', 'firstName', 'lastName', 'email'];
    dataSource = new MatTableDataSource<User>();
  
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort; 
    /**
     * Set the paginator after the view init since this component will
     * be able to query its view for the initialized paginator.
     */
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
    rowClicked(row: any): void {
      console.log(row);
    }
  
    ngOnInit() {
      this.apiService.getUsers().subscribe(
        data => {
            console.log(data);
          this.dataSource.data = data;
          //this.length = data.result.length;
        }
      );
    }
}

export interface Element {
    position: number;
    firstName: string;
    lastName: string;
    email: string;
  }
  
  const ELEMENT_DATA: Element[] = [
    {position: 1, firstName: 'John', lastName: 'Doe', email: 'john@gmail.com'},
    {position: 1, firstName: 'Mike', lastName: 'Hussey', email: 'mike@gmail.com'},
    {position: 1, firstName: 'Ricky', lastName: 'Hans', email: 'ricky@gmail.com'},
    {position: 1, firstName: 'Martin', lastName: 'Kos', email: 'martin@gmail.com'},
    {position: 1, firstName: 'Tom', lastName: 'Paisa', email: 'tom@gmail.com'}
  ];