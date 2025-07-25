import { useCallback } from 'react'
import { type FileMetadata } from '../types'

export const createPreview = useCallback((file: File | FileMetadata): string | undefined => {
  if (file instanceof File) {
    return URL.createObjectURL(file)
  }
  return file.url
}, [])
