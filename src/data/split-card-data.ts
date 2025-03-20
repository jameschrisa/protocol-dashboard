interface TeamMember {
  name: string;
  avatar: string;
  credentials: string[];
  teamType: string;
  caption: string;
}

interface HealthSpace {
  name: string;
  teamMembers: TeamMember[];
}

interface SplitCardSection {
  title: string;
  caption: string;
  avatarImage?: string;
  tags?: string[];
}

interface SplitCardData {
  leftSection: SplitCardSection;
  rightSection: SplitCardSection;
}

// Health space specific left sections
const healthSpaceLeftSections: { [key: string]: SplitCardSection } = {
  generalHealth: {
    title: "Health Pilot",
    caption: "Your AI-powered health assistant, ready to help you navigate your health journey and connect with the right specialists.",
    avatarImage: "/avatars/pilots/General-AI.png"
  },
  mentalHealth: {
    title: "Mental Health Pilot",
    caption: "AI-powered mental health support providing personalized strategies for stress management, emotional well-being, and mindfulness practices.",
    avatarImage: "/avatars/pilots/Mental-AI.png"
  },
  nutrition: {
    title: "Nutrition Pilot",
    caption: "AI-driven nutritional guidance offering personalized meal planning, dietary recommendations, and healthy eating strategies tailored to your needs.",
    avatarImage: "/avatars/pilots/Nutrition-AI.png"
  },
  fitness: {
    title: "Fitness Pilot",
    caption: "AI can provide suggestions and exercise recommendations relating to exercise routines, cardio training and warm ups that are suitable for you.",
    avatarImage: "/avatars/pilots/Fitness-AI.png"
  },
  sleepRecovery: {
    title: "Sleep Co-Pilot",
    caption: "AI-assisted sleep optimization providing personalized recommendations for better sleep quality, recovery, and rest patterns.",
    avatarImage: "/avatars/pilots/Sleep-AI.png"
  },
  socialConnections: {
    title: "Social Co-Pilot",
    caption: "AI-powered social wellness assistant helping you maintain and strengthen meaningful relationships and community connections.",
    avatarImage: "/avatars/pilots/Social-AI.png"
  },
  lifestyle: {
    title: "Lifestyle Co-Pilot",
    caption: "AI-driven lifestyle optimization offering personalized recommendations for work-life balance, productivity, and daily routine enhancement.",
    avatarImage: "/avatars/pilots/Lifestyle-AI.png"
  }
};

// Default right section for when no team member is available
const defaultRightSection: SplitCardSection = {
  title: "Coming Soon",
  caption: "We're currently expanding our team of health professionals in this area.",
  avatarImage: "/avatars/team/md3.jpeg", // Using md3 as a fallback
  tags: ["Available Soon"]
};

// Health spaces data that populates the right section of split cards
export const healthSpacesData: { [key: string]: HealthSpace } = {
  generalHealth: {
    name: "General Health",
    teamMembers: [
      {
        name: "Jyotu Sandhu MD",
        avatar: "/avatars/team/general.jpeg",
        credentials: ["MD", "CAQ", "MBA"],
        teamType: "medical doctor",
        caption: "Board-certified internal medicine physician specializing in preventive care, longevity and sports medicine."
      }
    ]
  },
  mentalHealth: {
    name: "Mental Health",
    teamMembers: [
      {
        name: "Michelle Torres",
        avatar: "/avatars/team/mental.jpeg",
        credentials: ["PhD", "LCP", "LMHC"],
        teamType: "health support practitioner",
        caption: "Clinical psychologist specialized in anxiety, depression, and stress management."
      }
    ]
  },
  nutrition: {
    name: "Nutrition",
    teamMembers: [
      {
        name: "Emma Rodriguez",
        avatar: "/avatars/team/nutrition.jpeg",
        credentials: ["RD", "LDN"],
        teamType: "health support practitioner",
        caption: "Registered dietitian specializing in functional nutrition and gut health optimization."
      }
    ]
  },
  fitness: {
    name: "Fitness",
    teamMembers: [
      {
        name: "Justin Powell",
        avatar: "/avatars/team/fitness.jpeg",
        credentials: ["NASM CPT", "CSCS"],
        teamType: "coach",
        caption: "Elite performance coach specializing in functional training and injury prevention."
      }
    ]
  },
  sleepRecovery: {
    name: "Sleep Recovery",
    teamMembers: [
      {
        name: "Jill Patterson MD",
        avatar: "/avatars/team/sleep.jpeg",
        credentials: ["MD", "FAASM"],
        teamType: "medical doctor",
        caption: "Board-certified sleep medicine specialist focused on sleep disorders and optimization."
      }
    ]
  },
  socialConnections: {
    name: "Social Connections",
    teamMembers: [
      {
        name: "Mark Chen, PhD",
        avatar: "/avatars/team/social.jpeg",
        credentials: ["PhD", "LCSW"],
        teamType: "health support practitioner",
        caption: "Social worker and relationship counselor specializing in building meaningful connections."
      }
    ]
  },
  lifestyle: {
    name: "Lifestyle",
    teamMembers: [
      {
        name: "Katherine Lee",
        avatar: "/avatars/team/lifestyle.jpeg",
        credentials: ["NBC-HWC", "ACSM-CPT"],
        teamType: "coach",
        caption: "National board-certified health and wellness coach specializing in lifestyle transformation."
      },
      {
        name: "Robert Martinez, DO",
        avatar: "/avatars/team/md3.jpeg",
        credentials: ["DO", "ABIHM"],
        teamType: "medical doctor",
        caption: "Integrative medicine physician focused on holistic lifestyle approaches to health."
      }
    ]
  },
  stressManagement: {
    name: "Stress Management",
    teamMembers: []
  },
  environmentalWellness: {
    name: "Environmental Wellness",
    teamMembers: []
  }
};

// Helper function to create a split card data for a specific health space and team member
export function createSplitCardData(healthSpaceKey: string, teamMemberIndex: number = 0): SplitCardData {
  const healthSpace = healthSpacesData[healthSpaceKey];
  
  // Get the custom left section for this health space, or use the general health one as default
  const leftSection = healthSpaceLeftSections[healthSpaceKey] || healthSpaceLeftSections.generalHealth;

  // If health space doesn't exist, return default data
  if (!healthSpace) {
    console.warn(`Health space "${healthSpaceKey}" not found`);
    return {
      leftSection,
      rightSection: defaultRightSection
    };
  }

  const teamMember = healthSpace.teamMembers[teamMemberIndex];

  // If no team member is found at the specified index, return default data
  if (!teamMember) {
    console.warn(`No team member found for health space "${healthSpaceKey}" at index ${teamMemberIndex}`);
    return {
      leftSection,
      rightSection: defaultRightSection
    };
  }

  return {
    leftSection,
    rightSection: {
      title: teamMember.name,
      caption: teamMember.caption,
      avatarImage: teamMember.avatar,
      tags: teamMember.credentials
    }
  };
}
