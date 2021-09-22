export const deleteDomain = (userName: string) => {
  if (userName.includes('@')) {
    return userName.substr(0, userName.indexOf('@'))
  }
  return userName
}
