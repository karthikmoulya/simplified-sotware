import { Component, OnInit, OnDestroy } from "@angular/core";
import { PageEvent } from "@angular/material";
import { Subscription } from "rxjs";
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title : 'First Title', content : 'This is first title'},
  //   {title : 'Second Title', content : 'This is second title'},
  //   {title : 'Third Title', content : 'This is third title'}
  // ]

  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private postSub: Subscription;
  private authStatusSub: Subscription;
  private socialAuthStatusSub: Subscription;
  user: SocialUser;

  constructor(
    public postsService: PostsService,
    private authService: AuthService,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postSub = this.postsService
      .getUpdateListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
    this.socialAuthStatusSub = this.socialAuthService.authState.subscribe(
      (user) => {
        this.user = user;
        //this.isLoading = false;
      }
    );
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(
      () => {
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
    this.authStatusSub.unsubscribe();
    this.socialAuthStatusSub.unsubscribe();
  }
}
