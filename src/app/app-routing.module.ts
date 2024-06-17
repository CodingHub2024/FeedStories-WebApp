import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ErrorPageComponent } from "./core/error-handling/error-page-component";
import { FeedStoriesComponent } from "./feed-stories/component/feed-stories.component";

const routes: Routes = [
  { path: "feedStories", component: FeedStoriesComponent },
  { path: "error", component: ErrorPageComponent },
  { path: "**", redirectTo: "/", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
