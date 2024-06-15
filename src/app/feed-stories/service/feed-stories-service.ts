import { Injectable } from "@angular/core";
import { Observable, combineLatest, of, from } from "rxjs";
import { map, take, switchMap } from "rxjs/operators";
import { StoryDetails, Story } from "../model/story";
import { FeedStoriesWebApi } from "../../shared/services/feed-stories-web-api";
import { GET_STORY_IDS, GET_STORY_DETAILS } from "../../shared/constants/feed-stories-constants";
import { Store } from "@ngrx/store";
import { RootReducerState,getStoryLoaded,getStoryLoading,getStoryDetails} from "../../reducer";
import {StoryListRequestAction,StoryListSuccessAction,} from "../../action/story-action";

@Injectable()
export class FeedStoriesService {
  StoryIds: Story;
  StoryDetails: StoryDetails;

  constructor(private apiService: FeedStoriesWebApi,private store: Store<RootReducerState>) {}

  getStoryDetails(storyId: number): Observable<StoryDetails> {

    const loading$ = this.store.select(getStoryLoading(storyId));
    const loaded$ = this.store.select(getStoryLoaded(storyId));
    const stories$ = this.store.select(getStoryDetails(storyId));

    return combineLatest([loading$, loaded$]).pipe(
      take(1),
      switchMap(([loading, loaded]) => {
        if (!loading && !loaded) {
          // reducers state is not set yet for perticular storyId
          this.store.dispatch(new StoryListRequestAction({ storyId }));

          const request = { storyId: storyId };

          return from(this.apiService.post(GET_STORY_DETAILS, request)).pipe(
            map((storyDetailsData: any) => {

              if (storyDetailsData != null) {
                this.StoryDetails = {
                  storyId: storyDetailsData.storyId,
                  title: storyDetailsData.title,
                  url: storyDetailsData.url,
                };
              }

              this.store.dispatch(
                new StoryListSuccessAction({ storyId, data: this.StoryDetails })
              );

              return this.StoryDetails;
            }) //end of map
          ); //end of pipe
        } // end of if
        else {
          return stories$.pipe(take(1));
        }
      })
    ); //end of outer pipe
  } // end of GetStoryDetails

  async getStoryIds(pageSize: number, pageNumber: number): Promise<Story> {
    const request = {
      pageSize: pageSize,
      pageNumber: pageNumber,
    };

    return this.apiService.post(GET_STORY_IDS, request);
  }
}
