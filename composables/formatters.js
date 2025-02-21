export const usePhone = (value) => {
  const cleaned = value.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  // Partial formatting as match indexes
  if (cleaned.length > 6) {
    return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6,10)}`
  }
  if (cleaned.length > 3) {
    return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}`
  }
  
  return cleaned
}



export const useDOB = (value) => {
  const cleaned = value.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{2})(\d{2})(\d{4})$/)
  if (match) {
      return `${match[1]}/${match[2]}/${match[3]}`
  }
  // Partial formatting as user types
  if (cleaned.length > 4) {
      return `${cleaned.slice(0,2)}/${cleaned.slice(2,4)}/${cleaned.slice(4,8)}`
  }
  if (cleaned.length > 2) {
      return `${cleaned.slice(0,2)}/${cleaned.slice(2,4)}`
  }
  return cleaned
}
