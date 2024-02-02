import { Component } from '@angular/core';
import { PlantationService } from '../plantation.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  reports: Report[] = [];
  newReport: Report = { plantationName: '', harvestedKg: 0, createdBy: '' };

  constructor(private plantationService: PlantationService) {
    this.reports = this.plantationService.reports;
  }

  addReport() {
    this.newReport.createdBy = 'Employee';
    this.plantationService.addReport({ ...this.newReport });
    this.newReport = { plantationName: '', harvestedKg: 0, createdBy: '' };
  }

  editReport(index: number) {
  }
}

interface Report {
  plantationName: string;
  harvestedKg: number;
  createdBy: string;
}
