import { Component, HostBinding, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
})
export class ToastsComponent implements OnInit {
  @HostBinding('class.ngb-toasts') ngbToasts = true;

  constructor(public toastService: ToastService) {}

  ngOnInit(): void {}

  isTemplate(toast: any): boolean {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
