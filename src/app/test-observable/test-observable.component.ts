import { Component } from '@angular/core';
import { Observable, interval, map, take } from 'rxjs';
import { ApiConnectService } from '../api-connect.service';

@Component({
  selector: 'app-test-observable',
  templateUrl: './test-observable.component.html',
  styleUrls: ['./test-observable.component.scss'],
})
export class TestObservableComponent {
  constructor(private apiConnectService: ApiConnectService) {}
  func() {
    this.apiConnectService.getMeanOfWord('quick').then((res) => {
      console.log(res);
    });
  }
}
