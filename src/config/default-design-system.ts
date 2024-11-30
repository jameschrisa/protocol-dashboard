type DesignSystem = {
  topNav: {
    layout: {
      height: string;
      width: string;
      position: string;
      container: string;
      border: string;
      background: string;
    };
    logo: {
      container: string;
      size: string;
      variants: {
        light: string;
        dark: string;
      };
    };
    navigation: {
      container: string;
      links: Array<{
        id: string;
        label: string;
        path: string;
        style: string;
        primary?: boolean;
      }>;
    };
    userMenu: {
      container: string;
      button: string;
      avatar: {
        size: string;
        fallback: {
          guest: string;
          user: string;
        };
      };
      dropdown: {
        width: string;
        items: Array<{
          id: string;
          label: string;
          path: string;
        }>;
        logout: {
          style: string;
        };
      };
    };
  };
  sidebar: {
    layout: {
      position: string;
      width: {
        expanded: string;
        collapsed: string;
      };
      transition: string;
      border: string;
      background: string;
    };
    toggleButton: {
      position: string;
      size: string;
      style: string;
    };
    sections: {
      healthSpaces: {
        title: {
          container: string;
          style: string;
          text: string;
        };
        navigation: {
          container: string;
          linkStyle: string;
          activeStyle: string;
          iconSize: string;
        };
      };
      healthPilot: {
        container: string;
        card: {
          padding: string;
          content: {
            spacing: string;
            header: {
              style: string;
              iconSize: string;
              title: string;
            };
            description: string;
            button: {
              activated: {
                style: string;
                text: string;
                icon: string;
              };
              default: {
                style: string;
                text: string;
                icon: string;
              };
            };
          };
        };
      };
      footer: {
        container: string;
        linkStyle: string;
        iconSize: string;
        version: {
          style: string;
        };
      };
    };
  };
};

export const defaultDesignSystem: DesignSystem = {
  topNav: {
    layout: {
      height: "h-16",
      width: "w-full",
      position: "fixed top-0 z-50",
      container: "container flex items-center px-4",
      border: "border-b border-border",
      background: "bg-background"
    },
    logo: {
      container: "flex items-center gap-2",
      size: "h-8 w-auto",
      variants: {
        light: "/src/assets/protocol_logo.svg",
        dark: "/src/assets/whitelogo.svg"
      }
    },
    navigation: {
      container: "flex flex-1 items-center justify-center space-x-6",
      links: [
        {
          id: "longevity-index",
          label: "Longevity Index",
          path: "/longevity-index",
          style: "rounded-full bg-[#C81E78] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#C81E78]/90 hover:text-white",
          primary: true
        },
        {
          id: "calendar",
          label: "Calendar",
          path: "/calendar",
          style: "text-sm font-medium transition-colors hover:text-primary"
        },
        {
          id: "health-wallet",
          label: "Health Wallet",
          path: "/health-wallet",
          style: "text-sm font-medium transition-colors hover:text-primary"
        },
        {
          id: "devices",
          label: "Devices",
          path: "/devices",
          style: "text-sm font-medium transition-colors hover:text-primary"
        },
        {
          id: "rx-cabinet",
          label: "Rx Cabinet",
          path: "/rx-cabinet",
          style: "text-sm font-medium transition-colors hover:text-primary"
        }
      ]
    },
    userMenu: {
      container: "ml-auto flex items-center gap-2",
      button: "relative h-8 w-8 rounded-full",
      avatar: {
        size: "h-8 w-8",
        fallback: {
          guest: "GU",
          user: "JD"
        }
      },
      dropdown: {
        width: "w-56",
        items: [
          {
            id: "settings",
            label: "Settings",
            path: "/settings"
          },
          {
            id: "support",
            label: "Support",
            path: "/support"
          }
        ],
        logout: {
          style: "text-red-600 cursor-pointer"
        }
      }
    }
  },
  sidebar: {
    layout: {
      position: "fixed left-0 top-16 bottom-0 z-40",
      width: {
        expanded: "w-60",
        collapsed: "w-16"
      },
      transition: "transition-all duration-300",
      border: "border-r border-border",
      background: "bg-background"
    },
    toggleButton: {
      position: "absolute -right-4 top-6",
      size: "h-8 w-8",
      style: "flex items-center justify-center rounded-full border bg-background shadow-sm hover:bg-accent"
    },
    sections: {
      healthSpaces: {
        title: {
          container: "px-3",
          style: "flex items-center px-2 py-2",
          text: "text-muted-foreground font-medium text-sm"
        },
        navigation: {
          container: "space-y-1 px-3",
          linkStyle: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
          activeStyle: "bg-accent",
          iconSize: "h-4 w-4"
        }
      },
      healthPilot: {
        container: "px-3 mt-6",
        card: {
          padding: "p-3",
          content: {
            spacing: "space-y-3",
            header: {
              style: "flex items-center gap-2",
              iconSize: "h-4 w-4",
              title: "text-sm font-medium"
            },
            description: "text-xs text-muted-foreground",
            button: {
              activated: {
                style: "w-full justify-between bg-[#10B981] hover:bg-[#10B981] text-white cursor-not-allowed",
                text: "Activated",
                icon: "h-4 w-4"
              },
              default: {
                style: "w-full justify-between bg-[#C81E78] hover:bg-[#C81E78]/90 text-white",
                text: "Get Started",
                icon: "h-4 w-4"
              }
            }
          }
        }
      },
      footer: {
        container: "p-4",
        linkStyle: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
        iconSize: "h-4 w-4",
        version: {
          style: "mt-2 text-xs text-muted-foreground text-center"
        }
      }
    }
  }
};

// Helper functions with simpler typing
export const getTopNavStyles = () => defaultDesignSystem.topNav;
export const getSidebarStyles = () => defaultDesignSystem.sidebar;
export const getNavigationLinks = () => defaultDesignSystem.topNav.navigation.links;
export const getHealthPilotStyles = () => defaultDesignSystem.sidebar.sections.healthPilot;

// Type-safe style getters
export const getTopNavStyle = (element: keyof DesignSystem['topNav']['layout']) => {
  return defaultDesignSystem.topNav.layout[element];
};

export const getSidebarStyle = (element: keyof DesignSystem['sidebar']['layout']) => {
  return defaultDesignSystem.sidebar.layout[element];
};
