import { Category } from '@/shared/models/category'
import { PostStatus } from '@/shared/models/post-status'
import { UserProfile } from '@/shared/models/user-profile'

export interface Post {
  id: string
  title: string
  slug: string
  coverUrl?: string
  description: string
  content: string
  status: PostStatus
  createdBy: UserProfile
  updatedBy?: UserProfile
  category?: Category
  createdAt: Date
  updatedAt?: Date
}
