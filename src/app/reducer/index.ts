import * as story from './story-reducer';
import { ActionReducerMap, createSelector } from '@ngrx/store';

export interface RootReducerState {
  story: story.StoryState;
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  story: story.storyReducer
};

//story selector
export const selectStoryState = (state: RootReducerState) => state.story;

//Story property selector
export const getStoryLoading = (storyId: number) =>
  createSelector(selectStoryState, (state: story.StoryState) => state.loading[storyId]);

export const getStoryLoaded = (storyId: number) =>
  createSelector(selectStoryState, (state: story.StoryState) => state.loaded[storyId]);

export const getStoryDetails = (storyId: number) =>
  createSelector(selectStoryState, (state: story.StoryState) => state.stories[storyId]);
