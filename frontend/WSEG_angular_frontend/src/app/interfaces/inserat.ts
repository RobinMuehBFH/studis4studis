export interface InseratArrayModel{
  data: [{
    id: number,
    attributes: {
      price: number,
      createdAt: Date,
      date: Date,
      description: string,
      title: string,
      subtitle: string,
      updatedAt: Date,
      imgPath: string,
      state: string,
      user: any,
      publishedAt: Date
    }
  }],
  meta: any
}

export interface InseratModel{
  data: {
    id: number,
    attributes: {
      price: number,
      createdAt: Date,
      date: Date,
      description: string,
      title: string,
      subtitle: string,
      updatedAt: Date,
      imgPath: string,
      state: string,
      user: any,
      publishedAt: Date
    }
  },
  meta: any
}

export interface InseratDataModel{
  id: number,
  attributes: {
    price: number,
    createdAt: Date,
    date: Date,
    description: string,
    title: string,
    subtitle: string,
    state: string,
    updatedAt: Date,
    imgPath: string,
    user: any,
    publishedAt: Date
  }
}
