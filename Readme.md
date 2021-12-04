# To Do

- [x] text2speak
- [x] AI integration with tensorFlow
- [x] ui update
  - [x] multi language support
  - [ ] [settings](#settings)
  - [ ] bluetooth connect screen
  - [ ] drawer navigation
- [x] validate bluetooth lib
- [ ] use native naivgation header with theme api from expo
- [x] work with eng.Doaa on github

```js
screenOptions={{
  headerTintColor: theme["text-basic-color"],
  headerStyle: {
    backgroundColor: theme["background-basic-color-2"],
  },
```

## settings

- [x] redux support
- [ ] settings screen
- [x] theme
- [ ] tts lang
- [x] local lang

# future work :rocket:

- [x] langue support
  - [ ] force rtl
  - [ ] translate app when finished
- [ ] tts arabic

## settings

- [ ] custom theme picker

## connect device

```js
const performRead = async () => {
  try {
    console.tron.log('Polling for available messages');
    let available = await this.props.device.available();
    console.tron.log(`There is data available [${available}], attempting read`);

    if (available > 0) {
      for (let i = 0; i < available; i++) {
        console.tron.log(`reading ${i}th time`);
        let data = await this.props.device.read();

        console.tron.log(`Read data ${data}`);
        console.tron.log(data);
        this.onReceivedData({data});
      }
    }
  } catch (err) {
    console.tron.log(err);
  }
};
```
