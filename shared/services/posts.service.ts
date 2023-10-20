import { WithPagination } from '@/shared/models/pagination'
import { Post } from '@/shared/models/post'
import { api } from '@/shared/services/api'
import { PostStatus } from '@/shared/models/post-status'

export type GetPostsFilters = Partial<{
  pageSize: number
  page: number
  status: PostStatus
}>

const defaultFilters: GetPostsFilters = { pageSize: 10, page: 1 }

export async function getPosts(filters: GetPostsFilters = defaultFilters) {
  const { data } = await api.get<WithPagination<Post>>('/posts', {
    params: filters,
  })
  return data
}
