import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from "@angular/core/testing";
import { FeedStoriesComponent } from "./feed-stories.component";
import { FeedStoriesService } from "../service/feed-stories-service";
import { Page } from "../model/page";
import { of } from "rxjs";
import { StoryDetails, Story } from "../model/story";
import { environment } from "../../../environments/environment";
import { By } from "@angular/platform-browser";
import { FeedStoriesWebApi } from "src/app/shared/services/feed-stories-web-api";
import { StoreModule, Store } from "@ngrx/store";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import * as TypeMoq from "typemoq";
import { IMock } from "typemoq/_all";
import { CommonModule } from "@angular/common";
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe("FeedStoriesComponent", () => {
  let component: FeedStoriesComponent;
  let fixture: ComponentFixture<FeedStoriesComponent>;
  let mockFeedStoriesService: IMock<FeedStoriesService>;
  let mockFeedStoriesWebApi: IMock<FeedStoriesWebApi>;
  const oldResetTestingModule = TestBed.resetTestingModule;

  let store: MockStore; // Declare MockStore
  const initialState = {
    /* define your initial state here */
  };

  beforeAll((done) =>
    (async () => {
      mockFeedStoriesService = TypeMoq.Mock.ofType(FeedStoriesService);
      mockFeedStoriesWebApi = TypeMoq.Mock.ofType(FeedStoriesWebApi);
      let feedStoriesService: FeedStoriesService;
      TestBed.resetTestingModule();

      TestBed.configureTestingModule({
        imports: [],
        declarations: [FeedStoriesComponent],
        schemas: [ NO_ERRORS_SCHEMA ],
        providers: [
          {
            provide: FeedStoriesService,
            useValue: mockFeedStoriesService.object,
          },
          {
            provide: FeedStoriesWebApi,
            useValue: mockFeedStoriesWebApi.object,
          },
          provideMockStore({ initialState }),
        ],
      }).compileComponents();

      await TestBed.compileComponents();
      TestBed.resetTestingModule = () => TestBed;
    })()
      .then(done)
      .catch(done.fail)
  );

  afterAll(() => {
    //reinitiate the resettestingModule method
    TestBed.resetTestingModule = oldResetTestingModule;
    TestBed.resetTestingModule();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedStoriesComponent);
    component = fixture.componentInstance;
    component.page.pageNumber = 0;
    component.page.size = 20;
    fixture.detectChanges();
  });

  xit("should create the component", () => {
    expect(component).toBeTruthy();
  });

  xit("should call loadStories method", () => {
    spyOn(component, "loadStories").and.callThrough();
    component.ngOnInit();
    expect(component.loadStories).toHaveBeenCalled();
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

    mockFeedStoriesService.setup(x=> x.getStoryIds(20, 0)).returns(() => Promise.resolve(mockStoryIds));

    // mockFeedStoriesService.setup(x => x.getStoryIds(20, 0)).returns(() => Promise.resolve(mockStoryIds));
    // mockFeedStoriesService.setup(x => x.getStoryDetails(1)).returns(() => of(mockStoryDetails));


    mockFeedStoriesService
      .setup((service) => service.getStoryDetails(1))
      .returns(() => of({ storyId: 1, title: "Story 1", url: "url1" }));

    component.loadStories(pageInfo);

    // Wait for promises to resolve
    tick();
    
    expect(component.stories.length).toBe(1);
  }));
});
