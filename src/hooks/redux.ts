import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
const useTypedDispatch = () => useDispatch<AppDispatch>();

// const logger = useTypedSelector((state) => state.logger);