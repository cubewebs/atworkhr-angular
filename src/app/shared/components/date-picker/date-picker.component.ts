import { DatePipe, NgFor, NgIf } from '@angular/common';
import {Component, forwardRef, inject, Input, OnInit} from '@angular/core';
import { ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup } from '@angular/forms';
import {CommunicationService} from "../../../core/services/communication.service";

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, DatePipe],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements ControlValueAccessor, OnInit {

  @Input() label: string = 'Fecha';
  @Input() placeholder: string = 'Selecciona una fecha';

  private comunicationService = inject(CommunicationService);

  dateForm!: FormGroup;
  showCalendar: boolean = false;
  currentDate: Date = new Date();
  selectedDate: Date | null = null;
  weekdays: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  calendarDays: (number | null)[][] = [];

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit() {
    this.generateCalendar();
    console.log('date', this.comunicationService.getDate())
  }

  sendDate(date: Date): void {
    this.selectedDate = date;
    this.comunicationService.sendDate(date)
  }

  initForm() {
    this.dateForm = this.fb.group({
      date: ['']
    });
  }

  getCurrentMonth(): number {
  return new Date().getMonth();
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    this.calendarDays = [];
    let week: (number | null)[] = Array(7).fill(null);

    for (let i = 0; i < firstDay; i++) {
      week[i] = null;
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const weekDay = (firstDay + day - 1) % 7;
      week[weekDay] = day;

      if (weekDay === 6 || day === daysInMonth) {
        this.calendarDays.push(week);
        week = Array(7).fill(null);
      }
    }
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  prevMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }

  selectDate(day: number | null) {
    if (day !== null) {
      this.selectedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
      this.dateForm.setValue({ date: this.formatDate(this.selectedDate) });
      this.showCalendar = false;
      this.onChange(this.selectedDate);
      this.sendDate(this.selectedDate);
      this.onTouched();
    }
  }

  formatDate(date: Date): string {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  }

  writeValue(value: any): void {
    if (value) {
      this.selectedDate = new Date(value);
      this.dateForm.setValue({ date: this.formatDate(this.selectedDate) });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.dateForm.disable() : this.dateForm.enable();
  }

  private onChange: any = () => {};
  private onTouched: any = () => {};

}
