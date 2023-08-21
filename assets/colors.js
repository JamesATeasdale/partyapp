export const multi = [
  "#FF0000",
  "#FF8000",
  "#FFFF00",
  "#80FF00",
  "#00FF00",
  "#00FF80",
  "#00FFFF",
  "#0080FF",
  "#0000FF",
  "#8000FF",
  "#FF00FF",
  "#FF0080",
];

// const greens = [
//   "#29AB87",
//   "#74C365",
//   "#4D8C57",
//   "#66FF66",
//   "#00703C",
//   "#507D2A",
//   "#299617",
//   "#3CB371",
//   "#32CD32",
//   "#93C572",
//   "#009150",
//   "#708238",
//   "#355E3B",
//   "#A8E4A0",
//   "#50C878",
//   "#00A86B",
// ];

// const reds = [
//   "#D0312D",
//   "#990F02",
//   "#E3242B",
//   "#60100B",
//   "#541E1B",
//   "#610C04",
//   "#B90E0A",
//   "#900603",
//   "#900D09",
//   "#4E0707",
//   "#7E2811",
//   "#A91B0D",
//   "#420C09",
//   "#710c04",
//   "#5E1916",
//   "#7A1712",
//   "#680C07",
//   "#BC544B",
//   "#D21404",
//   "#9B1003",
// ];

const main = { bg: "#370080", fg: "#9a4dff" };
// old -> const main = { bg: "#190927", fg: "#612c94" };

const green = { bg: "#57aa40", fg: "#c2e1f6" };

const orange = { bg: "#f25a29", fg: "#fbaf3f", text: "#004080" };

export function theme(routeName) {
  let theme = {};
  if (routeName === "Party Animals") theme = main;
  else if (routeName === "Truth or Dare") theme = green;
  else if (routeName === "Quiz") theme = orange;
  return theme;
}
