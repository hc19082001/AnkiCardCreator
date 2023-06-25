import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiConnectService } from '../api-connect.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-modal-choose-image',
  templateUrl: './modal-choose-image.component.html',
  styleUrls: ['./modal-choose-image.component.scss'],
})
export class ModalChooseImageComponent {
  @Output() close = new EventEmitter<void>();
  @Output() choose = new EventEmitter<string>();

  @Input() wordNeedToLookUp = '';
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    from(this.api.getImage(this.wordNeedToLookUp, this.type)).subscribe(
      (data) => {
        this.data = data;
      }
    );
  }
  type: number = 1;
  data: string[] = [];
  constructor(private api: ApiConnectService) {
    from(this.api.getImage(this.wordNeedToLookUp, this.type)).subscribe(
      (data) => {
        this.data = data;
      }
    );
  }
  onChangeType(type: number) {
    this.type = type;
    this.data = [];
    from(this.api.getImage(this.wordNeedToLookUp, this.type)).subscribe(
      (data) => {
        this.data = data;
      }
    );
  }
  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
  }

  handleErrorImage(event: any) {
    event.target.remove();
  }

  handleDoubleClick(link: string) {
    this.choose.emit(link);
    this.close.emit();
  }
}
