import { Component } from "@angular/core";
import { FeedStoriesService } from "../service/feed-stories-service";
import { Page } from "../model/page";
import { ColumnMode } from '@swimlane/ngx-datatable';
import { concatMap, switchMap, toArray } from "rxjs/operators";
import { firstValueFrom, from, lastValueFrom } from "rxjs";
import { StoryDetails, Story } from "../model/story";
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
  storyIds: Story;
  ColumnMode = ColumnMode;
  isStoriesLoading: boolean;
  searchStoryQuery: string = "";

  constructor(private feedStoriesService: FeedStoriesService) { }

  ngOnInit() {
    this.loadStories({ offset: this.pageNumber });
  }

  async loadStories(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.isStoriesLoading = true;

    this.feedStoriesService.getStoryIds(this.page.size, this.page.pageNumber)
      .then(
        async (storyIdData: Story) => {
          this.storyIds = storyIdData;

          const $storyDetailsObservables = from(this.storyIds.storyIds)
            .pipe(
              concatMap((storyId) => this.feedStoriesService.getStoryDetails(storyId)),
              toArray()
            );

          const storiesData = await firstValueFrom($storyDetailsObservables);

          this.isStoriesLoading = false;

          this.page = new Page(
            this.page.size,
            this.storyIds.totalElements,
            this.storyIds.totalElements / this.page.size,
            pageInfo.offset
          );

          this.stories = storiesData;
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
