export const PostStatuses = ['published', 'draft'] as const

export type PostStatus = (typeof PostStatuses)[number]
