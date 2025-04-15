import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post, CreatePostRequest } from '@/types';
import { getCurrentISODate } from '@/lib/utils';

const MOCKAPI_URL = 'https://67fb4dc98ee14a542629abff.mockapi.io/';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: MOCKAPI_URL }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post', id: 'LIST' },
            ]
          : [{ type: 'Post', id: 'LIST' }],
    }),
    
    getPaginatedPosts: builder.query<{ posts: Post[], total: number }, { page: number, limit: number }>({
      query: ({ page, limit }) => `/posts?page=${page}&limit=${limit}`,
      transformResponse: (response: Post[], meta, arg) => {
        const { page, limit } = arg;
        return { 
          posts: response,
          total: response.length * page + (response.length < limit ? 0 : limit)
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.posts.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post', id: 'PAGINATED-LIST' },
            ]
          : [{ type: 'Post', id: 'PAGINATED-LIST' }],
    }),
    
    getPostById: builder.query<Post, string>({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    
    addPost: builder.mutation<Post, Omit<CreatePostRequest, 'createdAt'>>({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: {
          ...post,
          createdAt: getCurrentISODate()
        },
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }, { type: 'Post', id: 'PAGINATED-LIST' }],
    }),

  }),
});

export const { 
  useGetPostsQuery, 
  useGetPaginatedPostsQuery,
  useGetPostByIdQuery, 
  useAddPostMutation,
  util: { getRunningQueriesThunk }
} = postsApi;

export const { getPosts, getPostById, getPaginatedPosts } = postsApi.endpoints;