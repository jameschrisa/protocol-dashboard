export interface SplitCardSection {
  title: string;
  caption: string;
  avatarIcon: 'bot' | 'user';
  avatarImage?: string;
  tags?: string[];
  status?: 'enabled' | 'disabled';
}

export interface SplitCardData {
  leftSection: SplitCardSection;
  rightSection: SplitCardSection;
}

export const splitCardData: SplitCardData = {
  leftSection: {
    title: "General Health Agent",
    caption: "This agent is designed to support your overall health and wellness. This intelligent bot helps you track your personal health data, performs administrative tasks, and provides recommendations to help you achieve your health goals.",
    avatarIcon: "bot",
    avatarImage: "https://robohash.org/health-agent?set=set2&size=96x96",
    status: 'enabled'
  },
  rightSection: {
    title: "Right Section",
    caption: "This is the right section content. Both sections maintain equal width through grid-cols-2.",
    avatarIcon: "user",
    avatarImage: "https://i.pravatar.cc/100?img=2",
    tags: ["Tag 1", "Tag 2", "Tag 3"]
  }
};
