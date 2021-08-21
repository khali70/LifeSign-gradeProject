export default ({children}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation title="Home" alignment="center" />
      <Divider />
      {children}
    </SafeAreaView>
  );
};
