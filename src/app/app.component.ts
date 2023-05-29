import { Component } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Post } from './post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularHttpClient';

  //define root url variable - represents main http endpoint we will be using
  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com';

  posts:Observable<any[]> | undefined;
  //new variable
  newPost:Observable<any> | undefined;

  //inject http client
  constructor(private http:HttpClient){}

  getPosts(){
    //build parameters dynamically
    let params = new HttpParams().set('userId','1')
    let headers = new HttpHeaders().set('Authorization','auth-token')
    //return an observable from the api
    this.posts = this.http.get<Post[]>(this.ROOT_URL + '/posts?userId=1',{params,headers})
  }

  createPost(){
   const data:Post = {
    id:1234,
    userId:23,
    title:'My new Post',
    body:"Hello World"
   }
   this.newPost = this.http.post(this.ROOT_URL + '/sam',data) 

   //retry request 3 times
  //  .retry(3)
  //  .catch(err=>{
  //   //console log it and return it as an observable
  //   console.log(err)
  //   return Observable
  //  })

  }
}
