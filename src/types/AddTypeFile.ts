export type AddTypeFile = {
  id: string
  status: 'idle' | 'success' | 'error'
  errorMessage: string | null
  file: File
}
