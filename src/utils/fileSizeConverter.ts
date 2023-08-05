export const fileSizeConverter = (size: number): string => {
  return `${(size / 1024 / 1024).toFixed(3)} мб`
}
