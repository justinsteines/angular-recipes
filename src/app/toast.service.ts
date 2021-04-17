import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: any[] = [];

  constructor() {}

  show(textOrTpl: string | TemplateRef<any>, options: any = {}): void {
    this.toasts.push({ textOrTpl, ...options });
  }

  showSuccess(textOrTpl: string | TemplateRef<any>, options: any = {}): void {
    this.toasts.push({
      textOrTpl,
      classname: 'bg-success text-light',
      ...options,
    });
  }

  showError(textOrTpl: string | TemplateRef<any>, options: any = {}): void {
    this.toasts.push({
      textOrTpl,
      classname: 'bg-danger text-light',
      ...options,
    });
  }

  remove(toast: any): void {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
