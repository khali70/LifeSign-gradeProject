import React from "react";
import { StyleSheet, Image } from "react-native";
import { Layout, Text, ViewPager } from "@ui-kitten/components";
/**
// TODO
 * ? Images:
 *   * sizing:
 *      Tips for React Native Images (or saying goodbye to trial and error)
 *      https://eu4.proxysite.com/process.php?d=cAEHSE9HUkQk4z2cCbfRNeV6M%2BN%2FZuivkPUNc9JnerYxyQOPjE%2FyMSQgnAE0eJ9bng4ceLzf38Uhj2DHRgj9dyBuCYOpLKZe2sfXuIdIx0HhWbUdvxZGMruoeuOpKHAcFeTGb2ejP2EhFpOdrDpLhLan&b=1&f=norefer
 *   * Caching:
 *      5 Things to know about Images in React Native
 *      https://eu4.proxysite.com/process.php?d=cAEHSE9HUkQk4z2cCbfRAfp8f%2F9%2Bbue30vVDMpZld%2FIzwReNjEmvKWcphF54aJVPiVdYe7zM08Bp0GzLRBu1amx1Eti%2FYOkO1sXO7owVwhr9WQ%3D%3D&b=1&f=norefer
 * ? Firebase
 *   * DB schema
 *   * signs Logic
 *      
 */
const SignsViews = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const img =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.asn6Pqzq8JgIsAsGZPbyxwHaEo%26pid%3DApi&f=1";
  return (
    <ViewPager
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
    >
      <Layout style={styles.tab} level="2">
        <Image source={{ uri: img }} />
      </Layout>
      <Layout style={styles.tab} level="2">
        <Image source={{ uri: img }} />
      </Layout>
      <Layout style={styles.tab} level="2">
        <Image source={{ uri: img }} />
      </Layout>
    </ViewPager>
  );
};

const styles = StyleSheet.create({
  tab: {
    height: 192,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default SignsViews;
