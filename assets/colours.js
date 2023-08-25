export const multi = [
  "#ff0048",
  "#fe00a3",
  "#8600f3",
  "#431d72",
  "#860c7a",
  "#f57901",
  "#ff0000",
  "##f40276",
  "#005eff",
  "#009fc7",
  "#ea798d",
  "#40ba54",
  "#22757f",
  "#284593",
  "#000000",
];

const purple = { bg: "#370080", fg: "#9a4dff" };

const green = {
  bg: "#90c26e",
  fg: "#ffe587",
  text: "#55094d",
  asset: "#448f58",
};

const orange = {
  bg: "#f25a29",
  fg: "#fbaf3f",
  text: "#004080",
  asset: "#fbaf3f",
};

const blue = {
  bg: "#7dcfb6",
  fg: "#1d4e89",
  text: "#903c0b",
  asset: "#00b2ca",
};
const pink = {
  bg: "#fea3aa",
  fg: "#f5b0c2",
  text: "#585858",
  asset: "#f4bfa8",
};

export function theme(routeName) {
  if (routeName === "Party Animals") return purple;
  else if (routeName === "Truth or Dare") return green;
  else if (routeName === "Quiz") return orange;
  return pink;
}
export default colours = { orange, green, blue, pink };
