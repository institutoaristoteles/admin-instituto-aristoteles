import { Category } from '@/shared/models/category'
import { UserProfile } from '@/shared/models/user-profile'
import { PostStatus } from '@/shared/models/post-status'

export interface Post {
  id: string
  title: string
  slug: string
  description: string
  content: string
  status: PostStatus
  createdBy: UserProfile
  updatedBy?: UserProfile
  category?: Category
  createdAt: Date
  updatedAt?: Date
}
