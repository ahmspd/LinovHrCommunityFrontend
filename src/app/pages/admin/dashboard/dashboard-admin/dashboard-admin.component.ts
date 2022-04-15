import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { firstValueFrom, Subscription } from 'rxjs';
import { AppConfig } from 'src/app/api/appconfig';
import { GetDashboardDataDtoRes } from 'src/app/dto/dashboard/get-dashboard-data-dto-res';
import { GetDashboardDtoRes } from 'src/app/dto/dashboard/get-dashboard-dto-res';
import { ConfigService } from 'src/app/service/app.config.service';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {

  dataDashboard : GetDashboardDtoRes
  dashboard : GetDashboardDataDtoRes

  constructor(public configService: ConfigService, private dashboardService : DashboardService) { }

  ngOnInit() {
    this.getData()
  }

  async getData() : Promise<void>{
    this.dataDashboard = await firstValueFrom(this.dashboardService.getDataDashboard())
    this.dashboard = this.dataDashboard.data
  }
}
