import { NgModule } from '@angular/core';
import { MatInputModule, 
    MatFormFieldModule,
    MatCardModule, 
    MatExpansionModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatProgressSpinnerModule,
    MatPaginatorModule, 
    MatDialogModule} from '@angular/material';

@NgModule({
    exports : [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        MatToolbarModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatDialogModule
    ]
})

export class AngularMaterialModule {}