import { createFileRoute } from '@tanstack/react-router'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { EllipsisVertical, Image } from 'lucide-react'
import {
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/shared/ui'
import EditPlayer from '@/shared/ui/edit-player'
import { type VideoEntity } from '@/api/video'
import { AccessSelector } from '@/shared/ui/edit-acess-selector'

export const Route = createFileRoute('/video/$id/edit/')({
  component: VideoEditForm,
})

const formSchema = z.object({
  name: z.string().max(100),
  description: z.string().max(500).optional(),
  playlists: z.string().optional(),
  thumbnail: z.instanceof(FileList).optional(),
  video: z.instanceof(FileList).optional(),
  access: z.enum(['Public', 'Unlisted', 'Private']),
})

type FormFields = z.infer<typeof formSchema>

const VideoData: VideoEntity = {
  id: '1',
  name: 'Sample Video',
  description: 'This is a sample video description.',
  src: 'https://www.w3schools.com/html/mov_bbb.mp4',
  thumbnail: 'https://www.w3schools.com/html/pic_trulli.jpg',
  playlists: ['Playlist 1', 'Playlist 2', 'Playlist 3'],
  access: 'Private',
  createdAt: new Date(),
  updatedAt: new Date(),
}

function VideoEditForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    reset,
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      access: VideoData.access,
    },
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log('Form data:', data)
  }

  const handleDownloadVideo = () => {
    const link = VideoData.src
    const a = document.createElement('a')
    a.href = link
    a.download = 'video.mp4'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleUpload = (file: File, field: 'thumbnail' | 'video') => {
    const fileList = new DataTransfer()
    fileList.items.add(file)
    setValue(field, fileList.files, { shouldValidate: true })
  }

  const handleAccessChange = (newAccess: 'Public' | 'Unlisted' | 'Private') => {
    setValue('access', newAccess, { shouldValidate: true })
  }

  const handleUndoChanges = () => {
    reset({
      name: VideoData.name,
      description: VideoData.description,
      access: VideoData.access,
    })
  }

  return (
    <div className="h-full w-full flex">
      <form
        className="w-full h-full flex flex-row justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="leftside flex flex-col flex-3/4 gap-5">
          <h2 className="text-2xl font-bold pt-1">Video details</h2>
          <div className="grid w-full pr-6 items-center gap-4">
            <Input
              {...register('name')}
              type="text"
              placeholder="Video name"
              tooltip="Used to identify the user during registration. Displayed on-screen and stored in the video metadata."
            />
            <Input
              {...register('description')}
              type="text"
              placeholder="Description (optional)"
              tooltip="A brief summary or additional details about the video."
            />

            <div className="flex flex-col gap-2">
              <div className="text-sm">Icon</div>
              <div className="text-muted-foreground text-sm">
                Choose an icon that will involve other users.
              </div>

              <div className="flex flex-row gap-2">
                <img
                  src={VideoData.thumbnail}
                  alt="Video thumbnail"
                  className="object-cover rounded-md aspect-video w-48"
                />
                <label
                  htmlFor="thumbnail-upload"
                  className="w-48 h-32 flex flex-col items-center justify-center 
                    border-2 border-dashed border-gray-300 rounded-md 
                    cursor-pointer hover:border-gray-400"
                >
                  <Image />
                  <div>Upload photo</div>
                </label>
                <input
                  id="thumbnail-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleUpload(file, 'thumbnail')
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-sm">Playlists</div>
              <div className="text-muted-foreground text-sm">
                Choose a playlist to add your video to.
              </div>
              <Controller
                control={control}
                name="playlists"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full h-10">
                      <SelectValue placeholder="Select a playlist" />
                    </SelectTrigger>
                    <SelectContent>
                      {VideoData.playlists?.map((playlist, index) => (
                        <SelectItem key={index} value={playlist}>
                          {playlist}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </div>

        <div className="rightside flex flex-col gap-5 flex-1/4">
          <div className="flex flex-row gap-1 self-end">
            <Button type="button" variant="secondary" onClick={handleUndoChanges}>
              Undo changes
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Submit'}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem>Share</DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownloadVideo}>Download</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
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
