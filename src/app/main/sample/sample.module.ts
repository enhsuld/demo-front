import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { SampleComponent } from './sample.component';
import { AuthguardService } from '../authentication/authguard.service';
import { MaterialModule } from '../material/material.module';

const routes = [
    {
        path     : 'sample',
        component: SampleComponent,
        canActivate: [AuthguardService]
    }
];

@NgModule({
    declarations: [
        SampleComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,
        MaterialModule,
        FuseSharedModule
    ],
    exports     : [
        SampleComponent
    ]
})

export class SampleModule
{
}

