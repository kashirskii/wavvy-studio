import { createFileRoute } from '@tanstack/react-router'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { EllipsisVertical, Video, Image, ChevronDown } from 'lucide-react'
import {
  AccessSelector,
  Button,
  FormInput,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/shared/ui'
import EditPlayer from '@/shared/ui/edit-player'
import { type VideoEntity } from '@/shared/api/video'

export const Route = createFileRoute('/video/$id/edit/')({
  component: RouteComponent,
})

type FormFields = {
  name: string
  description: string
  playlists?: string
  thumbnail: FileList
  video: FileList
  access: 'Public' | 'Unlisted' | 'Private'
}

const VideoData: VideoEntity = {
  id: '1',
  name: 'Sample Video',
  description: 'This is a sample video description.',
  src: 'https://www.w3schools.com/html/mov_bbb.mp4', // refactor to fetch function
  thumbnail: 'https://www.w3schools.com/html/pic_trulli.jpg', // refactor to fetch function
  playlists: ['Playlist 1', 'Playlist 2', 'Playlist 3'], // refactor to fetch function
  access: 'Public', // refactor to fetch function
  createdAt: new Date(),
  updatedAt: new Date(),
}

function RouteComponent() {
  const { register } = useForm<FormFields>()

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    // todo
    console.log('Form submitted:', data)
  }

  const handleDownloadVideo = () => {
    const link = VideoData.src
    const a = document.createElement('a')
    a.href = link
    a.download = 'video.mp4' // refactor
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleUpload = (file: File) => {
    // todo: handle file upload logic
    console.log('File uploaded:', file)
  }

  const handleAccessChange = (newAccess: 'Public' | 'Unlisted' | 'Private') => {
    // todo: handle access change logic
    console.log('Access changed to:', newAccess)
  }

  return (
    <div className="h-full w-full flex">
      <form className="w-full h-full flex flex-row justify-between">
        <div className="leftside flex flex-col flex-3/4 gap-5">
          <h2 className="text-2xl font-bold">Video details</h2>
          <div className="grid w-full pr-6 items-center gap-3">
            <FormInput
              {...register('name')}
              type="text"
              placeholder="Video name"
              value={''}
              helpText="Give your video a descriptive name to help others find it."
            />
            <FormInput
              {...register('description')}
              type="description"
              placeholder="Phone number (optional)"
              value={''}
              helpText="Add a description to your video. This will help others understand what the video is about."
            />
            <div className="flex flex-col gap-2">
              <div className="text-sm">Icon</div>
              <div>Choose an icon that will involve other users.</div>

              <div className="flex flex-row gap-2">
                <img
                  src={VideoData.thumbnail}
                  alt="Video thumbnail"
                  className="object-cover rounded-md aspect-video w-48"
                />
                <label
                  htmlFor="video-upload"
                  className="w-48 h-32 flex flex-col items-center justify-center 
                 border-2 border-dashed border-gray-300 rounded-md 
                 cursor-pointer hover:border-gray-400"
                >
                  <Image />
                  <div>Upload photo</div>
                </label>
                <input
                  id="video-upload"
                  type="file"
                  accept="video/mp4"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      // TODO: handle file upload
                      handleUpload(file)
                    }
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-sm">Playlists</div>
                <div>Choose a playlist to add your video to.</div>
                <select {...register('playlists')} className="w-full h-10 border rounded-md px-3">
                  <option value="">Select a playlist</option>
                  {VideoData.playlists?.map((playlist, index) => (
                    <option key={index} value={playlist}>
                      {playlist}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="rightside flex flex-col justify-center gap-5 flex-1/4">
          <div className="flex flex-row gap-1 self-end">
            <Button variant="default">Undo changes</Button>
            <Button variant="default">Submit</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem>Share</DropdownMenuItem> {/* provide functional */}
                <DropdownMenuItem onClick={handleDownloadVideo}>Download</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem> {/* provide functional */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <EditPlayer src={VideoData.src} />
          <AccessSelector initialAccess={VideoData.access} onChange={handleAccessChange} />
        </div>
      </form>
    </div>
  )
}
