import { Component } from '@angular/core';
import { PostsService } from '../posts.service';
import {Subject} from 'rxjs/Subject';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  postSubject = new Subject<string>();
  value = '';
  constructor(private postsService: PostsService,
              private router: Router) { }
  searchPosts(id: string) {
    this.value = id;
    this.postSubject.next(id);
  }
  // tslint:disable-next-line:member-ordering
  blogPosts$ = this.postSubject.pipe(
    debounceTime(250),
    distinctUntilChanged(),
    switchMap(id => this.postsService.getAllPosts(id))
  );
  goToResults(keyword: string) {
    this.router.navigate(['/results'], { queryParams: {keyword}} );
  }
  // getCount(keyword: string) {
  //   this.postsService.getCount(keyword);
  // }
}
