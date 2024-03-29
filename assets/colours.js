export const multi = [
  "#ff0048",
  "#fe00a3",
  "#8600f3",
  "#431d72",
  "#860c7a",
  "#f57901",
  "#ff0000",
  "#f40276",
  "#005eff",
  "#009fc7",
  "#ea798d",
  "#40ba54",
  "#22757f",
  "#284593",
  "#000000",
];

const purple = { bg: "#370080", fg: "#9a4dff", text: "white" };

const green = {
  bg: "#448f58",
  fg: "#ffe587",
  text: "#55094d",
  asset: "#90c26e",
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
  bg: "#b8d8e3",
  fg: "#fee1dd",
  text: "#535878",
  asset: "#f4bfa8",
};

export function theme(routeName) {
  if (routeName === "Party Box") return purple;
  else if (routeName === "Truth or Dare") return green;
  else if (routeName === "Quiz") return orange;
  else if (routeName === "Casual") return pink;
  return pink;
}
export default colours = { orange, green, blue, pink };
