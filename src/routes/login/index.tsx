import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { z } from 'zod'
import { Eye, EyeOff } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormInput,
  FormLabel,
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/ui'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
})

type LoginFormFields = z.infer<typeof formSchema>

function RouteComponent() {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginFormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  function onSubmit(values: LoginFormFields) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <FormInput {...field} placeholder="Enter your username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <input
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 shadow-sm outline-none focus:border-rose-600"
                    placeholder="Enter your password"
                  />
                </FormControl>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-0 mr-3 mt-3 text-primary"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {showPassword ? 'Hide password' : 'Show password'}
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Login
        </Button>
      </form>
    </Form>
  )
}
