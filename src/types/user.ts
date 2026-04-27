export interface FakeStoreUser {
  id: number
  email: string
  username: string
  password: string
  name: {
    firstname: string
    lastname: string
  }
  address: {
    city: string
    street: string
    number: number
    zipcode: string
    geolocation: {
      lat: string
      long: string
    }
  }
  phone: string
}

export interface UserFormData {
  firstname: string
  lastname: string
  email: string
  username: string
  password: string
  phone: string
}
