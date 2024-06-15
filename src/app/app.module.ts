import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";

import { AppComponent } from "./app.component";
import { CommonModule } from "@angular/common";

// Feed Stories
import { FeedStoriesComponent } from "./feed-stories/component/feed-stories.component";
import { AppRoutingModule } from "./app-routing.module";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FeedStoriesWebApi } from "./shared/services/feed-stories-web-api";

//Error Handler
import { GlobalErrorHandler } from "./core/error-handling/service/global-error-handler-service";
import { HttpErrorInterceptor } from "./core/error-handling/service/http-error-interceptor";
import { ErrorPageComponent } from "./core/error-handling/error-page-component";

//NGRX
import { StoreModule } from "@ngrx/store";
import { rootReducer } from "./reducer";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, FeedStoriesComponent, ErrorPageComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(rootReducer),
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: "No data to display", // Message to show when array is presented, but contains no values
        totalMessage: "total", // Footer total message
        selectedMessage: "selected", // Footer selected message
      },
    }),
  ],
  providers: [
    FeedStoriesWebApi,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
