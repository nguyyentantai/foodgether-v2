import { createContext, Dispatch, SetStateAction } from 'react'

export type UserContext = {
  id: string
  name: string
  email: string
  isLoading: boolean
}

export const userContextInitialValue = {
  id: '',
  name: '',
  email: '',
  isLoading: true,
}

export const UserContext = createContext<{
  user: typeof userContextInitialValue
  setUser?: Dispatch<
    SetStateAction<{
      id: string
      name: string
      email: string
      isLoading: boolean
    }>
  >
}>({ user: userContextInitialValue })
