import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../lib/redux/store'

// using custom hooks with types instead of plain hooks 
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
