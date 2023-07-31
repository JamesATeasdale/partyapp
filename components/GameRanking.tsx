import { TouchableOpacity, View, Text, Image, ScrollView } from "react-native";

export default function GameRanking({ players }) {
  return (
    <View tw="h-1/6 w-full self-center justify-center py-2 m-4 bg-[#2c935f] ">
      <View tw="w-full h-5/6 p-2 rounded-xl flex-row self-center justify-center">
        {players
          .sort((a, b) => b.score - a.score)
          .filter((place, index) => index < 3)
          .map((player, index) => {
            let colour;
            index === 0
              ? (colour = "gold")
              : index === 1
              ? (colour = "silver")
              : (colour = "brown");
            return (
              <TouchableOpacity
                onPress={() => {}}
                key={player.name}
                style={{ borderColor: colour, backgroundColor: colour }}
                tw="basis-1/3 mx-2 items-center justify-center border-8 rounded-t-2xl">
                <Image
                  source={require("../assets/Balloon_arch.jpg")}
                  tw="w-full h-full absolute rounded-t-xl"
                />
                <Text tw="font-black text-white text-2xl ">{player.name}</Text>
              </TouchableOpacity>
            );
          })}
      </View>
      <View tw="w-full flex-row bg-[#2c935f]">
        <ScrollView tw="" horizontal={true}>
          {players.map((player = { name: "", color: "" }, index = 0) => (
            <TouchableOpacity
              key={player.name}
              style={{ backgroundColor: player.color }}
              tw="m-1 p-2 rounded-xl ">
              <Text tw="text-xl font-extrabold">{player.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
