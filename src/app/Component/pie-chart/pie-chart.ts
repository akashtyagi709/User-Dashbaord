import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { UserData } from '../../Service/user-data';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './pie-chart.html',
  styleUrl: './pie-chart.css',
})

export class PieChart implements OnInit {

  pieChartType: 'pie' = 'pie';

  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Admin', 'Editor', 'Viewer'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
  };

  constructor(private userData: UserData) {}

ngOnInit(): void {
  this.userData.users$.subscribe(users => {
    if (!Array.isArray(users)) return;
    this.updateChart(users);
  });
}
  private updateChart(users: any[]) {
    const roleCount :any = {
      Admin: 0,
      Editor: 0,
      Viewer: 0,
    };

    users.forEach(user => {
      if (roleCount[user.role] !== undefined) {
        roleCount[user.role]++;
      }
    });

    this.pieChartData.datasets[0].data = [
      roleCount.Admin,
      roleCount.Editor,
      roleCount.Viewer
    ];

  }
}
