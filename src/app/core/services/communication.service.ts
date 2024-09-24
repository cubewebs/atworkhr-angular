import {Injectable, OnInit, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService implements OnInit{
  date = signal<Date | null>(null)

  constructor() { }

  ngOnInit() {
    this.getDate();
  }

  public sendDate(date: Date): void {
    this.date.set(date);
    console.log('sendDate', this.date())
  }

  getDate() {
    return this.date();
  }

  gridActions(action: string, element: any) {
    console.log(action, element);
  }
}
