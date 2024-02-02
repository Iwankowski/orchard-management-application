import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantationService {
  private plantationsSubject = new BehaviorSubject<Plantation[]>([]);
  private reportsSubject = new BehaviorSubject<Report[]>([]);
  selectedReportIndex: number = -1;  // Nowa zmienna przechowująca indeks edytowanego raportu

  plantations$ = this.plantationsSubject.asObservable();
  reports$ = this.reportsSubject.asObservable();

  constructor() {
    const storedPlantations = localStorage.getItem('plantations');
    const storedReports = localStorage.getItem('reports');

    if (storedPlantations) {
      this.plantationsSubject.next(JSON.parse(storedPlantations));
    }

    if (storedReports) {
      this.reportsSubject.next(JSON.parse(storedReports));
    }
  }

  get plantations(): Plantation[] {
    return this.plantationsSubject.value;
  }

  set plantations(value: Plantation[]) {
    this.plantationsSubject.next(value);
    localStorage.setItem('plantations', JSON.stringify(value));
  }

  get reports(): Report[] {
    return this.reportsSubject.value;
  }

  set reports(value: Report[]) {
    this.reportsSubject.next(value);
    localStorage.setItem('reports', JSON.stringify(value));
  }

  addReport(report: Report) {
    if (this.selectedReportIndex !== -1) {
      // Jeżeli edytujemy raport, to zaktualizuj go
      this.reports[this.selectedReportIndex] = report;
      this.selectedReportIndex = -1;
    } else {
      // Jeżeli dodajemy nowy raport, to dodaj go
      this.reports = [...this.reports, report];
    }
  }

  deleteReport(index: number) {
    this.reports.splice(index, 1);
    this.reportsSubject.next([...this.reports]);
    localStorage.setItem('reports', JSON.stringify(this.reports));
  }

  deleteAllReports() {
    this.reports = [];
    this.reportsSubject.next([]);
    localStorage.removeItem('reports');
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
