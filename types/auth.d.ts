declare module '#auth-utils' {
  interface User {
    id: number
    sub: string
    picture: string
    email: string
  }
}

export {}
