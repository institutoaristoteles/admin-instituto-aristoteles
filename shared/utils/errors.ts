import { isAxiosError } from 'axios'

export function isConflictError(e: unknown) {
  return isAxiosError(e) && e.response?.status === 409
}
