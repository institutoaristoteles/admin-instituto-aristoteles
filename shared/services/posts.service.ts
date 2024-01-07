import { WithPagination } from '@/shared/models/pagination'
import { Post } from '@/shared/models/post'
import { PostStatus } from '@/shared/models/post-status'
import { api } from '@/shared/services/api'

export type GetPostsFilters = Partial<{
  pageSize: number
  page: number
  status: PostStatus
}>

export interface SavePost {
  title: string
  description: string
  content: string
  coverUrl: string | undefined
  status: PostStatus
  categoryId: string | undefined
}

const defaultFilters: GetPostsFilters = { pageSize: 10, page: 1 }

export async function getPosts(filters: GetPostsFilters = defaultFilters) {
  const { data } = await api.get<WithPagination<Post>>('/posts', {
    params: filters,
  })
  return data
}

export async function savePost(data: SavePost, id?: string) {
  if (id) {
    return await api.put(`/posts/${id}`, data)
  }

  await api.post('/posts', data)
}

export async function getPostById(postId: string) {
  const { data } = await api.get<Post>(`/posts/${postId}`)
  return data
}
