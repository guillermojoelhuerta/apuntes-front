import { ConfirmDialogComponent } from './confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogService } from './confirm-dialog.service';

@NgModule({
    imports: [CommonModule],
    declarations: [ConfirmDialogComponent],
    exports: [ConfirmDialogComponent],
    providers: [ConfirmDialogService]
})
export class ConfirmDialogModule {
}
