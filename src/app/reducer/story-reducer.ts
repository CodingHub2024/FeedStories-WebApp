import { StoryDetails } from '../feed-stories/model/story';
import { Action } from '../action/index';
import { STORY_LIST_REQUEST, STORY_LIST_SUCCESS, STORY_LIST_FAILED } from '../shared/constants/feed-stories-constants'

export interface StoryState {
  loading: { [storyId: number]: boolean };
  loaded: { [storyId: number]: boolean };
  stories: { [storyId: number]: StoryDetails };
  error: { [storyId: number]: any };
}

export const initialState: StoryState = {
  loading: {},
  loaded: {},
  stories: {},
  error: {}
};

export function storyReducer(state = initialState, action: Action): StoryState {
  switch (action.type) {
    case STORY_LIST_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, [action.payload.storyId]: true },
        error: { ...state.error, [action.payload.storyId]: null }
      };

    case STORY_LIST_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, [action.payload.storyId]: false },
        loaded: { ...state.loaded, [action.payload.storyId]: true },
        stories: { ...state.stories, [action.payload.storyId]: action.payload.data }
      };

    case STORY_LIST_FAILED:
      return {
        ...state,
        loading: { ...state.loading, [action.payload.storyId]: false },
        error: { ...state.error, [action.payload.storyId]: action.payload.error }
      };

    default: {
      return state;
    }
  }
}
