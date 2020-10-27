import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {

  constructor(private http: Http) { }
  getAllPosts(keyword) {
  const key = keyword;
  const url = '/api/posts?&keyword=' + key;
    return this.http.get(url)
      .map(res => res.json());
  }
  // getCount(keyword) {
  //   const url = 'https://toronto.craigslist.org/count-search?type=search-count&query='+keyword;
  //   return this.http.get(url)
  //   .map(res => res.json()).subscribe(data => console.log(data));
  // }
}
