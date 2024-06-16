export  class StoryDetails {
  storyId: number;
  title: string;
  url: string;
}


export class Stories {
  stories:StoryDetails[]
  totalElements: number;
}