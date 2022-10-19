import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {TUI_DATE_FORMAT, TUI_DATE_SEPARATOR, TuiDay, TuiTime} from "@taiga-ui/cdk";
import {tuiCreateTimePeriods} from "@taiga-ui/kit";
import {ApiService} from "../../services/api.service";
import {TuiAlertService, TuiNotification} from "@taiga-ui/core";

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
export class DatePickerComponent {
  date = new TuiDay(2022, 9, 19);
  time = new TuiTime(12, 0);

  readonly timeSlots = tuiCreateTimePeriods(10, 20, [0, 30]);

  constructor(
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService,
    private apiService: ApiService,
  ) {}

  async checkIfAvailable() {
    const formatedDate = this.date.getFormattedDay('YMD', '-')
    const data = await this.apiService.checkDateTime(`${formatedDate}T${this.time}:00Z`);
    const { available } = data;

    if (available) {
      this.displayNotification(
        `This slot is available !`,
        `The ressource is available on ${formatedDate} at ${this.time}. You can start the reservation process`,
        TuiNotification.Success
      );
    } else {
      this.displayNotification(
        `This slot is not available !`,
        `The ressource is not available on ${formatedDate} at ${this.time}`,
        TuiNotification.Error
      )
    }
  }

  displayNotification(title: string, body: string, type: TuiNotification) {
    this.alertService.open(body, {
      label: title,
      status: type
    }).subscribe();
  }
}
