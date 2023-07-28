import { RatingType } from './rating.type'

export interface ProductType {
  id: number | string
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: RatingType
}
