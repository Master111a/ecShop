import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ProductType } from './type/product.type'
import req from '../../utils/product.req'
import { CartType } from './type/cart.type'
interface ProductSliceType {
  productList: ProductType[]
  filterList: ProductType[]
  cartList: CartType[]
  isOpen: boolean
  amountItem: number
  totalPrice: number
  textSearch: string
  currentPage: number
  perPage: number
}
const initialState: ProductSliceType = {
  productList: [],
  filterList: [],
  cartList: [],
  isOpen: false,
  amountItem: 0,
  totalPrice: 0,
  textSearch: '',
  currentPage: 1,
  perPage: 5
}
export const getProductList = createAsyncThunk('product/getProductList', async (_, thunkAPI) => {
  const response = await req.get<ProductType[]>('products', {
    signal: thunkAPI.signal
  })
  return response.data
})
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSlideBar: (state) => {
      state.isOpen = !state.isOpen
    },
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const itemCart = state.cartList.find((item) => item.product.id === action.payload.id)
      if (itemCart) {
        state.cartList.find((item, index) => {
          if (item.product.id === itemCart.product.id) {
            state.cartList[index].amount = itemCart.amount + 1
            return true
          }
          return false
        })
      } else {
        state.cartList.push({
          product: action.payload,
          amount: 1
        })
      }
    },
    deleteItemCart: (state, action: PayloadAction<number | string>) => {
      const itemDelete = action.payload
      const cartItem = state.cartList.findIndex((item) => item.product.id === itemDelete)
      if (cartItem !== -1) {
        state.cartList.splice(cartItem, 1)
      }
    },
    decreaseAmount: (state, action: PayloadAction<number | string>) => {
      const itemCart = state.cartList.find((item) => item.product.id === action.payload)
      if (itemCart) {
        if (itemCart.amount > 1) {
          state.cartList.find((item, index) => {
            if (item.product.id === itemCart.product.id) {
              state.cartList[index].amount = itemCart.amount - 1
              return true
            }
            return false
          })
        } else {
          const cartItem = state.cartList.findIndex((item) => item.product.id === itemCart.product.id)
          if (cartItem !== -1) {
            state.cartList.splice(cartItem, 1)
          }
        }
      }
    },
    clearCart: (state) => {
      state.cartList = []
    },
    setTotalAmount: (state, action: PayloadAction<number>) => {
      state.amountItem = action.payload
    },
    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload
    },
    setTextSearch: (state, action: PayloadAction<string>) => {
      state.textSearch = action.payload
    },
    filterByCategory: (state, action: PayloadAction<string>) => {
      const filterList = state.productList.filter(
        (item) => item.category.toLocaleLowerCase() === action.payload.toLocaleLowerCase()
      )

      if (action.payload.toLocaleLowerCase() === 'Choose a category'.toLocaleLowerCase()) {
        state.filterList = state.productList
      } else if (filterList) {
        state.filterList = filterList
      }
    },
    nextPage: (state) => {
      if (state.currentPage < Math.ceil(state.filterList.length / state.perPage)) {
        state.currentPage = state.currentPage + 1
      }
    },
    prevPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage = state.currentPage - 1
      }
    },
    changeCurrentPage: (state) => {
      state.currentPage = 1
    },
    changePerPage: (state, action: PayloadAction<number>) => {
      state.perPage = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(getProductList.fulfilled, (state, action) => {
      state.productList = action.payload
      state.filterList = state.productList
    })
  }
})
export const {
  setSlideBar,
  setTextSearch,
  addToCart,
  deleteItemCart,
  decreaseAmount,
  clearCart,
  setTotalAmount,
  setTotalPrice,
  filterByCategory,
  nextPage,
  prevPage,
  changeCurrentPage,
  changePerPage
} = productSlice.actions
export default productSlice.reducer
