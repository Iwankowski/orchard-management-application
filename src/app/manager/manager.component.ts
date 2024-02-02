// manager.component.ts

import { Component, OnInit } from '@angular/core';
import { PlantationService } from '../plantation.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  plantations: Plantation[] = [];
  newPlantation: Plantation = { location: '', harvest: '', name: '', creationDate: '' };
  selectedPlantationIndex: number = -1;
  reports: Report[] = [];

  constructor(private plantationService: PlantationService) {}

  ngOnInit(): void {
    this.plantationService.plantations$.subscribe(plantations => {
      this.plantations = plantations;
    });
    this.plantations = this.plantationService.plantations;
    this.reports = this.plantationService.reports;
  }

  addPlantation() {
    this.plantationService.plantations = [...this.plantations, { ...this.newPlantation }];
    this.newPlantation = { location: '', harvest: '', name: '', creationDate: '' };
  }

  editPlantation(index: number) {
    this.newPlantation = { ...this.plantations[index] };
    this.selectedPlantationIndex = index;
  }

  updatePlantation() {
    if (this.selectedPlantationIndex !== -1) {
      this.plantations[this.selectedPlantationIndex] = { ...this.newPlantation };
      this.newPlantation = { location: '', harvest: '', name: '', creationDate: '' };
      this.selectedPlantationIndex = -1;

      this.plantationService.plantations = [...this.plantations];
    }
  }

  deletePlantation(index: number) {
    this.plantations.splice(index, 1);
    this.plantationService.plantations = [...this.plantations];
  }

  deleteReport(index: number) {
    this.plantationService.deleteReport(index);
  }

  deleteAllReports() {
    this.plantationService.deleteAllReports();
  }
}

interface Plantation {
  location: string;
  harvest: string;
  name: string;
  creationDate: string;
}

interface Report {
  plantationName: string;
  harvestedKg: number;
  createdBy: string;
}
