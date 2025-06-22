import { create } from 'zustand'
import { mockList } from './mocks'

export type Video = {
  id: string
  imageSrc: string
  title: string
  date: string
  views: number
}

export type ExtendedVideo = Video & {
  isSelected: boolean
}

export type useContent = {
  videoList: Array<ExtendedVideo>
  isAllSelected: boolean
  selectVideo: (id: string) => void
  selectAll: () => void
  getSelectedItems: () => Array<ExtendedVideo>
  setItems: (newVideos: Array<Video>) => void
}

const checkAllSelected = (videos: Array<ExtendedVideo>) =>
  videos.length > 0 && videos.every((v) => v.isSelected)

export const useContent = create<useContent>((set, get) => ({
  videoList: mockList.map((item) => ({
    ...item,
    isSelected: false,
  })),
  isAllSelected: false,

  setItems: (newVideos: Array<Video>) => {
    const videoList = newVideos.map((video) => ({
      ...video,
      isSelected: false,
    }))
    set({
      videoList,
      isAllSelected: false,
    })
  },

  selectVideo: (id: string) =>
    set((state) => {
      const videoList = state.videoList.map((video) =>
        video.id === id ? { ...video, isSelected: !video.isSelected } : video,
      )
      return {
        videoList,
        isAllSelected: checkAllSelected(videoList),
      }
    }),

  selectAll: () =>
    set((state) => {
      const allSelected = checkAllSelected(state.videoList)
      const videoList = state.videoList.map((video) => ({
        ...video,
        isSelected: !allSelected,
      }))
      return {
        videoList,
        isAllSelected: !allSelected,
      }
    }),

  getSelectedItems: () => get().videoList.filter((video) => video.isSelected),
}))
