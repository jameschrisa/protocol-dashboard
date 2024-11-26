export const getTreeMapConfig = (theme: string) => ({
  colorScale: theme === "dark" ? ["#333", "#444", "#555"] : ["#eee", "#ddd", "#ccc"],
  padding: 2,
  labelStyle: {
    fontSize: 12,
    fontFamily: "system-ui",
    fill: theme === "dark" ? "#fff" : "#000",
  },
  parentLabelStyle: {
    fontSize: 14,
    fontWeight: "bold",
    fill: theme === "dark" ? "#fff" : "#000",
  },
})
