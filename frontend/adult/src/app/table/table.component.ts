/*
author- Chintan Soni
Date- 26/5/18
email- chintansoni1@yahoo.in
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortable, MatTableDataSource, MatPaginator } from '@angular/material';
import { AdultService } from '../adult.service';
import { Adult } from '../adult';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  adult_details: Adult[];
  column = new Array();
  races = new Array();
  dataSource;
  relationships = this.adultService.relationships;
  constructor(private adultService: AdultService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    if (this.adultService.details === undefined) {
        this.adultService.getDetails().subscribe();
    }
    this.getAdults();
    this.getRace();
	/*this.dataSource.filterPredicate =
      (data: UserData, filters: string) => {
        const matchFilter = [];
        const filterArray = filters.split(',');
        const columns = [data.sex, data.relationship, data.race];
        // Or if you don't want to specify specifics columns =>
        // const columns = (<any>Object).values(data);
        
        //Main loop
        filterArray.forEach(filter => {
          const customFilter = [];
          columns.forEach(column => customFilter.push(column.toLowerCase().includes(filter)));
          matchFilter.push(customFilter.some(Boolean)); // OR
        });
        return matchFilter.every(Boolean); // AND
    }*/
	this.dataSource.filterPredicate = (data: any, filters: string) => {
      const matchFilter = [];
      const filters_arr = filters.split(",");
	  matchFilter.push(data['sex'].trim().toLowerCase() === filters_arr[0].toLowerCase());
	  matchFilter.push(data['relationship'].trim().toLowerCase() === filters_arr[1].toLowerCase());
	  matchFilter.push(data['race'].toLowerCase().trim() === filters_arr[2].toLowerCase());
      //filters.forEach(filter, index => {
        // check for null values!
        //const val = data[filter.id] === null ? '' : data[filter.id];
        //matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
      //});

       // Choose one
	   const numOfEmptyString = filters_arr.filter(function(x){ return x === ""; }).length;
	   const numOfTrue = matchFilter.filter(function(x){ return x === true; }).length;
	   if(numOfEmptyString > 1){
		   if(numOfEmptyString === 3){
			   return true;
		   }
		   return matchFilter.some(Boolean);
	   }
	   else if(numOfEmptyString === 1){
		   if(numOfTrue === 2){
			   return true;
		   }
		   else{
			   return false;
		   }
	   }
	   else{
		   if(numOfTrue <= 2){
			   return false;
		   }
		   else{
			   return true;
		   }
	   }
         // AND condition
        // return matchFilter.some(Boolean); // OR condition
    }
	
  }

  getAdults(): void {
    this.adult_details = this.adultService.getDetailsObject();
    for (const col in this.adult_details[0]) {
      if (this.adult_details[0].hasOwnProperty(col)) {
        this.column.push(col);
      }
    }
    this.dataSource = new MatTableDataSource(this.adult_details);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: any) {
	var radio_type = filterValue.source._elementRef.nativeElement.parentElement.parentElement.firstChild.innerHTML;
	let selected_radio: any[];
	if(this.dataSource.filter === ""){
		selected_radio = ['','',''];
	}
	else{
		selected_radio = this.dataSource.filter.split(",");
	}
	//const tableFilters = [];
	if(radio_type.indexOf('Sex')>=0){
		if(selected_radio[0] != filterValue.value.trim().toLowerCase() || selected_radio[0] === ""  ){
			selected_radio[0] = filterValue.value.trim().toLowerCase() ;
				/*tableFilters.push({
					id: 'sex',
					value: filterValue.value
				  });*/
		}
	}
	else if(radio_type.indexOf('Relationship')>=0){
		if(selected_radio[1] != filterValue.value.trim().toLowerCase() || selected_radio[1] === ""  ){
			selected_radio[1] = filterValue.value.trim().toLowerCase() ;
			/*tableFilters.push({
				id: 'relationship',
				value: filterValue.value
			  });*/

		}
	}
	else if(radio_type.indexOf('Race')>=0){
		if(selected_radio[2] != filterValue.value.trim().toLowerCase() || selected_radio[2] === ""  ){
			selected_radio[2] = filterValue.value.trim().toLowerCase() ;
			/*tableFilters.push({
				id: 'race',
				value: filterValue.value
			  });*/

		}
	}
    //filterValue = filterValue.value.trim(); // Remove whitespace
    //filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
	
     this.dataSource.filter = selected_radio.join(",");
	//this.dataSource.filter = JSON.stringify(tableFilters);;
  }

  getRace() {
    const race_obj: any = {};
    this.adultService.getRaceDetails()
        .subscribe(race => {
        race.forEach(element => {
            if (!race_obj.hasOwnProperty(element['race'])) {
                race_obj[element['race']] = 1;
            }
            else{
                race_obj[element['race']] = race_obj[element['race']] + 1;
            }
        });
        for (const race in race_obj) {
            if (race_obj.hasOwnProperty(race)) {
                this.races.push({'type': race.trim(), 'value': race_obj[race]});
            }
        }
      });
  }
}
