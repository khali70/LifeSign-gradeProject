import {combineReducers, createStore} from 'redux';
import Reducer from './reducer';
import Reactotron from '../../ReactotronConfig';
type reducers = {
  Reducer: typeof Reducer;
};
const store = createStore(
  combineReducers<reducers>({
    Reducer: Reducer,
  }),
  Reactotron.createEnhancer(),
);
export default store;
/**
 * install react-redux,redux
 * create store
 * combineReducers({...reducers})
 * reducers = (state=initState,{type,payload})=>state
 * dispatch action and payload
 * action type is the type of the dispatched action
 * payload is the payload data (todo's,users,cards,arr,...etc)
 */
/**
 * HOOKS
 * useSelector((state)=>state.todos)
 * const dispatch = useDispatch()
 * dispatch({ type: Action.type,payload:todos })
 */
