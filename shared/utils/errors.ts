import { AxiosError, isAxiosError } from 'axios'

export function isConflictError(e: unknown): e is AxiosError<any, any> {
  return isAxiosError(e) && e.response?.status === 409
}
