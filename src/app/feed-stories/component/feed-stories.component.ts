import { Component } from "@angular/core";
import { FeedStoriesService } from "../service/feed-stories-service";
import { Page } from "../model/page";
import { ColumnMode } from '@swimlane/ngx-datatable';
import { concatMap, switchMap, toArray } from "rxjs/operators";
import { firstValueFrom, from, lastValueFrom } from "rxjs";
import { StoryDetails, Stories } from "../model/story";
import { environment } from "../../../environments/environment";

@Component({
  selector: "feed-stories",
  providers: [FeedStoriesService],
  templateUrl: "feed-stories.component.html",
})
export class FeedStoriesComponent {
  pageNumber: number = 0;
  page = new Page(environment.feedStories.pageSize);
  stories = new Array<StoryDetails>();
  filteredStories = new Array<StoryDetails>();
  storiesData: Stories;
  ColumnMode = ColumnMode;
  isStoriesLoading: boolean;
  searchStoryQuery: string = "";

  constructor(private feedStoriesService: FeedStoriesService) { }

  ngOnInit() {
    this.loadStories({ offset: this.pageNumber });
  }

  async loadStories(pageInfo) {
    debugger;
    this.page.pageNumber = pageInfo.offset;
    this.isStoriesLoading = true;

    this.feedStoriesService.getStories(this.page.size, this.page.pageNumber)
      .then(
        (storiesData: Stories) => {

          this.storiesData = storiesData;

          if (storiesData != null) {
            this.stories = storiesData.stories;
          }

          this.isStoriesLoading = false;

          this.page = new Page(
            this.page.size,
            this.storiesData.totalElements,
            this.storiesData.totalElements / this.page.size,
            pageInfo.offset
          );

          this.filterStories();
        },
        (error) => {
          this.isStoriesLoading = false;
        }
      );
  }

  private filterStories() {
    if (this.searchStoryQuery) {
      this.filteredStories = this.stories.filter((row) =>
        row.title.toLowerCase().includes(this.searchStoryQuery.toLowerCase())
      );
    } else {
      this.filteredStories = this.stories;
    }
  }

  onStorySearch() {
    this.filterStories();
  }
}
