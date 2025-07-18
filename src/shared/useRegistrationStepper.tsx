import { create } from 'zustand'

interface StepperState {
  currentStep: number
  completedSteps: Array<number>
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  markStepCompleted: (step: number) => void
  resetStepCompletion: (step: number) => void
  isStepCompleted: (step: number) => boolean
}

export const useRegistrationStepper = create<StepperState>((set, get) => ({
  currentStep: 0,
  completedSteps: [],
  setStep: (step) => set({ currentStep: step }),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 1),
    })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
      completedSteps: state.completedSteps.filter((s) => s !== state.currentStep),
    })),
  markStepCompleted: (step) =>
    set((state) => ({
      completedSteps: state.completedSteps.includes(step)
        ? state.completedSteps
        : [...state.completedSteps, step],
    })),
  resetStepCompletion: (step) =>
    set((state) => ({
      completedSteps: state.completedSteps.filter((s) => s !== step),
    })),
  isStepCompleted: (step) => get().completedSteps.includes(step),
}))
