import { Text, TouchableOpacity } from "react-native";

export default function TruthOrDare({ setPage }) {
  return (
    <TouchableOpacity
      onPress={() => setPage("")}
      tw="m-4 bg-[#00adf0] text-center p-6 text-xl border-2 rounded-xl font-black">
      <Text>Truth Or Dare</Text>
    </TouchableOpacity>
  );
}
