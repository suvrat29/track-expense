import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppHttpInterceptor } from "./auth-module/app.interceptor";
import { HotToastModule } from "@ngneat/hot-toast";
import { AppLayoutModule } from "./layout/app.layout.module";

const providers = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AppHttpInterceptor,
    multi: true
  }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HotToastModule.forRoot(),
    AppLayoutModule
  ],
  providers: [providers],
  bootstrap: [AppComponent]
})

export class AppModule { }

@NgModule({})
export class AppContentModule {
  static forRoot(): ModuleWithProviders<AppContentModule> {
    return {
      ngModule: AppModule,
      providers: [providers]
    }
  }
}
