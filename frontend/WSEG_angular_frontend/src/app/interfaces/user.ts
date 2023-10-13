export interface AuthUserModel{
  jwt: string,
  user: {
    id: number,
    username: string,
    email: string,
    profilePicturePath: string,
    createdAt: Date,
  }
}

export interface UserModel{
  id: number,
  attributes:{
    username: string,
    email: string,
    profilePicturePath: string,
    createdAt: Date,
  }
}
