import { ModuleWithProviders, NgModule } from '@angular/core';
import { BroadcastService } from './broadcast.service';

@NgModule()
export class BroadcastModule {
    public static forRoot(): ModuleWithProviders<BroadcastModule> {
        return {
            ngModule: BroadcastModule,
            providers: [BroadcastService]
        }
    }
}