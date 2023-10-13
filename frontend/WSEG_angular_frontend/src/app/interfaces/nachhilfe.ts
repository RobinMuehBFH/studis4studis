export interface NachhilfeModel{
  data: [{
    id: number,
    attributes: {
      createdAt: Date,
      date: Date,
      description: string,
      title: string,
      modul: string,
      updatedAt: Date,
      imgPath: string,
      hourlyWage: number,
      user: any
    }
  }],
  meta: any
}

export interface NachhilfeDataModel{
  id: number,
  attributes: {
    title: string,
    description: string,
    modul: string,
    imgPath: string,
    hourlyWage: number,
    user: any
    createdAt: Date,
    date: Date,
    updatedAt: Date,

  }
}
