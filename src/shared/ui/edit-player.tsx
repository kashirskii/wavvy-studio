import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/shared/ui'
import { MinifiedVideoPlayer } from '@/modules/video'

interface EditPlayerProps {
  src: string
}

export default function EditPlayer({ src }: EditPlayerProps) {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(src)
      .then(() => {
        toast('Success!', {
          description: 'Link copied to clipboard',
          duration: 2000,
        })
      })
      .catch((err) => {
        toast('Failed to copy link: ', err)
      })
  }

  const handleOpenLink = () => {
    window.open(src, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="bg-secondary p-4 rounded-lg shadow-md flex flex-col gap-2">
        <MinifiedVideoPlayer
          src={src}
          className="w-full aspect-auto"
          autoPlay={false}
          muted={false}
          loop={false}
        />
        <div className="flex flex-col">
          <div className="text-sm">File link</div>
          <div className="w-full flex flex-row justify-between">
            <Button variant="link" className="p-0" type="button" onClick={handleOpenLink}>
              {src}
            </Button>
            <Button variant="ghost" type="button" onClick={handleCopy}>
              <Copy />
            </Button>
          </div>
          <div className="text-sm">Video quality</div>
          {/* TODO: provide pseudocode for qualities */}
        </div>
      </div>
    </div>
  )
}
