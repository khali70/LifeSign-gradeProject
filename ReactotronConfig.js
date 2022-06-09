import Reactotron, { openInEditor, overlay } from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
// horrible, but useful hack.... oh come on, don't look at me like that... it's JavaScript :|
console.tron = Reactotron;
const reactotron = Reactotron
  .configure()
  .useReactNative()
  .use(openInEditor())
  .use(reactotronRedux())
  .use(overlay())
  .connect() //Don't forget about me!

export default reactotron