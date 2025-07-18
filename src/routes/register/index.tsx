import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { useRegistrationStepper } from "../../shared/useRegistrationStepper"
import { Button } from "@/shared/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui"
import { Input } from "@/shared/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Progress } from "@/shared/ui/"
import LoginPasswordInput from "@/shared/ui/login-password-input" // refactor for pass inputs

export const Route = createFileRoute("/register/")({
  component: RouteComponent,
})

const formSchema = z
  .object({
    name: z.string().min(2, "First name must be at least 2 characters"),
    email: z.email().min(5, "Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type FormData = z.infer<typeof formSchema>

const stepSchemas = {
  0: z.object({
    name: z.string().min(2, "First name must be at least 2 characters"),
    email: z.email("Please enter a valid email address"),
  }),
  1: z
    .object({
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),
}

const steps = [
  {
    id: "personal",
    title: "Personal Information",
    description: "Tell us about yourself",
    fields: ["name", "email"] as (Array<keyof FormData>),
  },
  {
    id: "account",
    title: "Account Details",
    description: "Create your account",
    fields: ["password", "confirmPassword"] as (Array<keyof FormData>),
  },  
]

function RouteComponent() {
  const { currentStep, setStep, nextStep, prevStep, completedSteps, markStepCompleted, isStepCompleted, resetStepCompletion } = useRegistrationStepper()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const validateCurrentStep = async () => {
    const currentStepFields = steps[currentStep].fields
    const currentStepData = currentStepFields.reduce(
      (acc, field) => {
        acc[field] = form.getValues(field)
        return acc
      },
      {} as Record<string, unknown>,
    )

    try {
      stepSchemas[currentStep as keyof typeof stepSchemas].parse(currentStepData)
      return true
    } catch (error) {
      await form.trigger(currentStepFields)
      return false
    }
  }

const handleNextStep = async () => {
  const isValid = await validateCurrentStep()
  if (isValid) {
    markStepCompleted(currentStep)
    nextStep()
  }
} // debug scenario when nextStep is called without validation (e.g. all fields has been validated and this function is called)

const handlePrevStep = () => {
    prevStep()
  }

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
          </CardDescription>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex justify-between mb-8">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        index === currentStep
                          ? "border-primary bg-primary text-primary-foreground"
                          : completedSteps.includes(index)
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-muted-foreground bg-background"
                      }`}
                    >
                      {completedSteps.includes(index) ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    <div className="text-center mt-2">
                      <div className="text-sm font-medium">{step.title}</div>
                      <div className="text-xs text-muted-foreground hidden sm:block">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              {currentStep === 1 && (
                <div className="space-y-4">

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your password" type="password" {...field} />
                        </FormControl>
                        <FormDescription>Password must be at least 8 characters long.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Confirm your password" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                {currentStep < steps.length - 1 ? (
                  <Button type="button" onClick={() => handleNextStep()} className="flex items-center gap-2">
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button type="submit" className="flex items-center gap-2">
                    Complete Registration
                    <Check className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}