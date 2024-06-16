import { Injectable } from "@angular/core";
import { Stories } from "../model/story";
import { FeedStoriesWebApi } from "../../shared/services/feed-stories-web-api";
import { GET_STORIES } from "../../shared/constants/feed-stories-constants";

@Injectable()
export class FeedStoriesService {
  Stories: Stories;

  constructor(private apiService: FeedStoriesWebApi) { }

  async getStories(pageSize: number, pageNumber: number): Promise<Stories> {

    const request = {
      pageSize: pageSize,
      pageNumber: pageNumber,
    };

    return this.apiService.post(GET_STORIES, request);
  }
}
