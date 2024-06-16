import { ComponentFixture, TestBed, tick, fakeAsync } from "@angular/core/testing";
import { FeedStoriesComponent } from "./feed-stories.component";
import { FeedStoriesService } from "../service/feed-stories-service";
import { FeedStoriesWebApi } from '../../shared/services/feed-stories-web-api';
import { Story, StoryDetails } from "../model/story";
import * as TypeMoq from "typemoq";
import { provideMockStore } from "@ngrx/store/testing";

describe("FeedStoriesComponent", () => {
  let component: FeedStoriesComponent;
  let fixture: ComponentFixture<FeedStoriesComponent>;
  let mockFeedStoriesService: TypeMoq.IMock<FeedStoriesService>;
  let mockFeedStoriesWebApi: TypeMoq.IMock<FeedStoriesWebApi>;
  const initialState = {
    /* define your initial state here */
  };


  beforeEach(async () => {
    mockFeedStoriesService = TypeMoq.Mock.ofType<FeedStoriesService>();
    mockFeedStoriesWebApi = TypeMoq.Mock.ofType<FeedStoriesWebApi>();

    await TestBed.configureTestingModule({
      declarations: [FeedStoriesComponent],
      providers: [
        { provide: FeedStoriesService, useFactory: () => mockFeedStoriesService.object },
        {
            provide: FeedStoriesWebApi,
            useValue: mockFeedStoriesWebApi,
          },
        provideMockStore({ initialState }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedStoriesComponent);
    
    component = fixture.componentInstance;
    component.page.pageNumber = 0;
    component.page.size = 20;
    fixture.detectChanges();
  });

  it("should set component stories", fakeAsync(() => {
    debugger;
    const mockStoryIds: Story = {
      storyIds: [1],
      totalElements: 1,
    };

    const pageInfo = { offset: 0 };

    const mockStoryDetails: StoryDetails[] = [
      { storyId: 1, title: "Story 1", url: "url1" },
      { storyId: 2, title: "Story 2", url: "url2" },
      { storyId: 3, title: "Story 3", url: "url3" },
    ];

    // Mocking the service method to return mockStoryIds
    mockFeedStoriesService
      .setup(x => x.getStoryIds(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()))
      .returns(() => Promise.resolve(mockStoryIds));

    // Simulate the component method call
    component.loadStories(pageInfo);

    // Resolve the promise
    tick();

    // Assert component behavior
    expect(component.stories.length).toBe(1); // Adjust the assertion based on your test case

    // Optionally, you can verify that the service method was called
    mockFeedStoriesService.verify(x => x.getStoryIds(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()), TypeMoq.Times.once());
  }));
});