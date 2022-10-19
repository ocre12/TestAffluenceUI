import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TUI_DATE_FORMAT, TUI_DATE_SEPARATOR} from "@taiga-ui/cdk";
import {tuiCreateTimePeriods} from "@taiga-ui/kit";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: TUI_DATE_FORMAT, useValue: `YMD`},
    {provide: TUI_DATE_SEPARATOR, useValue: `-`},
  ]
})
export class DatePickerComponent implements OnInit {
  date: any;
  time: any;

  availableTimes = tuiCreateTimePeriods(10, 20, [0, 30]);

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  async checkIfAvailable() {
    const formatedDate = (`${this.date}`).split('.').join('-');
    // alert(formatedDate)
    const data = await this.apiService.checkDateTime(`${formatedDate}T${this.time}:00Z`);
    const { available } = data;

    alert(available);
  }
}
