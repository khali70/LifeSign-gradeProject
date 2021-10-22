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

## get paired devices

```js
const getPairedDevices = async () => {
  console.log('DeviceListScreen::getBondedDevices');
  try {
    const bonded = await RNBluetoothClassic.getBondedDevices();
    bonded.forEach(dev => {
      console.log(dev.name + '   ' + dev.address);
    });
    setDevices(bonded);
  } catch (error) {
    setDevices([]);
  }
};

// components
<>
  <Button onPress={getPairedDevices}>search for Paired device</Button>
  {Devices.map((dev, id) => (
    <Layout level="2">
      <Text>
        name : {dev.name} with address : {dev.address}
      </Text>
    </Layout>
  ))}
</>;
```
