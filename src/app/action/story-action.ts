import { StoryDetails } from '../feed-stories/model/story';
import { STORY_LIST_REQUEST, STORY_LIST_SUCCESS, STORY_LIST_FAILED } from '../shared/constants/feed-stories-constants'

export class StoryListRequestAction {
  readonly type = STORY_LIST_REQUEST;
  constructor(public payload: { storyId: number }) { }
}

export class StoryListSuccessAction {
  readonly type = STORY_LIST_SUCCESS;
  constructor(public payload?: { storyId: number; data: StoryDetails }) { }
}

export class StoryListFailedAction {
  readonly type = STORY_LIST_FAILED;
  constructor(public payload: { storyId: number; error: any }) { }
}
