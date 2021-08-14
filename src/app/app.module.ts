import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ModuleWithProviders, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppHttpInterceptor } from "./auth-module/app.interceptor";
import { HotToastModule } from "@ngneat/hot-toast";

const providers = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AppHttpInterceptor,
    multi: true
  }
]

@NgModule({
  declarations: [
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    HotToastModule.forRoot(),
  ],
  providers: [providers]
})

export class AppModule { }

@NgModule({})
export class AppContentModule {
  static forRoot(): ModuleWithProviders<AppModule> {
    return {
      ngModule: AppModule,
      providers: [providers]
    }
  }
}
