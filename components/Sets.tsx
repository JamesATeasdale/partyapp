import { Text, View } from "react-native";

export default function Sets() {
  return (
    <View tw="bg-[#ed008e] w-full h-1/6 border-2 p-6 mb-4">
      <View
        style={{
          width: 144,
          borderBottomColor: "blue",
          borderBottomWidth: 45,
          borderLeftWidth: 45,
          borderRightWidth: 45,
          borderRightColor: "transparent",
          borderLeftColor: "transparent",
          transform: [{ rotate: "315deg" }],
          top: 12,
          left: -37,
          position: "absolute",
        }}
        tw="items-center">
        <Text
          style={{
            fontSize: 26,
            color: "white",
            position: "absolute",
            marginTop: 0,
          }}>
          Sets
        </Text>
      </View>
    </View>
  );
}
