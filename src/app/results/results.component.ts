import { Component, OnInit } from '@angular/core';
import {PostsService} from '../posts.service';
import {PostsComponent} from '../posts/posts.component';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  posts$: Observable<any>;
  constructor(private postsService: PostsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.queryParams.subscribe((param) => {
        this.posts$ = this.postsService.getAllPosts(param.keyword);
      });
  }
}
