import { Component } from '@angular/core';
import { NotificationsWidget } from './components/notificationswidget';
import { StatsWidget } from './components/statswidget';
import { BestSellingWidget } from './components/bestsellingwidget';
import { RevenueStreamWidget } from './components/revenuestreamwidget';

@Component({
    selector: 'app-dashboard',
    imports: [],
    template: `
        <div class="grid grid-cols-12 gap-8">
  <div class="col-span-12 xl:col-span-6">
    <img src="assets/images/line3.png" alt="MiniRuta" class="w-full h-100 object-cover rounded-xl" />
  </div>
  <div class="col-span-12 xl:col-span-6">
    <img src="assets/images/line1.png" alt="MiniRuta" class="w-full h-100 object-cover rounded-xl" />
  </div>
    <div class="col-span-12 xl:col-span-6">
    <img src="assets/images/line2.png" alt="MiniRuta" class="w-full h-100 object-cover rounded-xl" />
  </div>
  <div class="col-span-12 xl:col-span-6">
    <img src="assets/images/line0.png" alt="MiniRuta" class="w-full h-100 object-cover rounded-xl" />
  </div>
</div>

    `
})
export class Dashboard {}
