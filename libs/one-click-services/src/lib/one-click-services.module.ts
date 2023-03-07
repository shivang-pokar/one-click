import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../apps/one-click/src/app/share.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class OneClickServicesModule {
  public static forRoot(environment: any): ModuleWithProviders<any> {
    return {
      ngModule: OneClickServicesModule,
      providers: [
        {
          provide: 'env', // you can also use InjectionToken
          useValue: environment
        }
      ]
    };
  }
}
