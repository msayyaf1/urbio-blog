export interface Post {
    id: string;
    title: string;
    author: string;
    body: string;
    createdAt: string;
  }
  
  export interface CreatePostRequest {
    title: string;
    author: string;
    body: string;
    createdAt: string;
  }
  
  export interface PostsResponse {
    posts: Post[];
    total: number;
    skip: number;
    limit: number;
  }