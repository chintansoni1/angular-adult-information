/*
author- Chintan Soni
Date- 26/5/18
email- chintansoni1@yahoo.in
*/

import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdultService } from '../adult.service';
import { Adult } from '../adult';

import { Observable, Subject } from 'rxjs';

import { jqxChartComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxchart';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  sexAdapter: any = {};
  relAdapter: any = {};
  legendLayout = { left: 625, top: 160, width: 300, height: 200, flow: 'vertical' };
  padding = { left: 5, top: 5, right: 5, bottom: 5 };
  titlePadding = { left: 0, top: 0, right: 0, bottom: 10 };
  seriesGroups =
    [
        {
            type: 'pie',
            showLabels: true,
            series:
            [
                {
                    dataField: 'value',
                    displayText: 'type',
                    labelRadius: 170,
                    initialAngle: 15,
                    radius: 145,
                    centerOffset: 0,
                    formatFunction: (value: any) => {
                        if (isNaN(value)) {
                             return value;
                            }
                        return parseFloat(value) ;
                    },
                }
            ]
        }
    ];


  constructor( private adultService: AdultService) { }

  ngOnInit(): void {
    this.getSexDetails();
    this.getRelDetails();
    if (this.adultService.details === undefined) {
        this.adultService.getDetails().subscribe();
    }
  }
  getSexDetails(): void {
    if (this.adultService.sex === undefined) {
        this.adultService.getSexDetails()
        .subscribe(sex_obj => {
            this.setAdapter('sex', sex_obj);
        });
    }
    else {
        this.setAdapter('sex', this.adultService.sex);
    }
}

   getRelDetails(): void {
    if (this.adultService.relationship === undefined) {
        this.adultService.getRelDetails()
        .subscribe(rel_obj => {
          this.setAdapter('rel', rel_obj);
       });
    }
    else {
        this.setAdapter('rel', this.adultService.relationship);
    }
}


  getSource(source): any {
    return {
        datatype: 'json',
        datafields: [
            { name: 'type' },
            { name: 'value' },
        ],
        localdata: source
    };

  }

  setAdapter(chart_type, chart_obj): any {
    if (chart_type === 'sex' ) {
        let sex = [{ 'type': 'male', 'value': chart_obj[0]['m_count']}, { 'type': 'female', 'value': chart_obj[1]['f_count']}];

        this.sexAdapter = new jqx.dataAdapter(this.getSource(sex),
            { async: false, autoBind: true,
            loadError: (xhr: any, status: any, error: any) => { alert('Error loading "' + sex + '" : ' + error); } });

    }
    else {
        const rel_obj: any = {};
        const relationship = new Array();
        chart_obj.forEach(element => {
            if (!rel_obj.hasOwnProperty(element['relationship'])) {
                rel_obj[element['relationship']] = 1;
            }
            else{
                rel_obj[element['relationship']] = rel_obj[element['relationship']] + 1;
            }
        });
        for (const rel in rel_obj) {
            if (rel_obj.hasOwnProperty(rel)) {
                relationship.push({'type': rel.trim(), 'value': rel_obj[rel]});
            }
        }
        if (this.adultService.relationships === undefined) {
            this.adultService.relationships = relationship;
        }
        this.relAdapter = new jqx.dataAdapter(this.getSource(relationship),
        { async: false, autoBind: true,
        loadError: (xhr: any, status: any, error: any) => { alert('Error loading "' + relationship + '" : ' + error); } });

    }
  }
}
