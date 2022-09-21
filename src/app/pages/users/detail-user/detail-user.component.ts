import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss'],
})
export class DetailUserComponent implements OnInit {
  private readonly unSubs = new Subject<any>();
  dataUser: any;
  idParams: any;
  isLoading: boolean = false;

  constructor(
    private activedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.activedRoute.params.subscribe((res: any) => {
      this.idParams = res?.id;
    });
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.apiService
      .getDataApi(`users/${this.idParams}`)
      .pipe(takeUntil(this.unSubs))
      .subscribe(
        (res: any) => {
          this.dataUser = res;
          this.isLoading = false;
        },
        (err) => {
          this.isLoading = false;
        }
      );
  }
}
