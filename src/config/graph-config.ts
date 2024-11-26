export const getGraphConfig = (theme: string) => ({
  backgroundColor: theme === "dark" ? "#1a1a1a" : "#fff",
  nodes: {
    color: theme === "dark" ? "#333" : "#eee",
    borderColor: theme === "dark" ? "#666" : "#ccc",
    labelColor: theme === "dark" ? "#fff" : "#000",
    fontSize: 12,
    fontFamily: "system-ui",
  },
  edges: {
    color: theme === "dark" ? "#444" : "#ddd",
    width: 1,
    arrowSize: 10,
  },
  interaction: {
    hover: true,
    zoomView: true,
    dragView: true,
  },
  physics: {
    enabled: true,
    barnesHut: {
      gravitationalConstant: -2000,
      centralGravity: 0.3,
      springLength: 95,
      springConstant: 0.04,
      damping: 0.09,
    },
  },
})
