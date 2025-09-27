export type Product = {
  name: string
  price: number
  image: string
  description: string
}

export type Lister = {
  id: string
  username: string
}

export type Bidder = {
  id: string
  username: string
  bid: number
}

export type Auction = {
  id: string
  product: Product
  lister: Lister
  bidders: Bidder[]
  closedAt: number
}

export type Category = {
  id: number
  name: string
}

export type Account = {
  id: string
  username: string
}
