import { PlatformAsRewardRestrictions, RewardData } from "rewards/types"

export const poapData = {
  imageUrl: "/platforms/poap.png",
  name: "POAP",
  colorScheme: "purple",
  gatedEntity: "POAP",
  autoRewardSetup: false,
  isPlatform: false,
  asRewardRestriction: PlatformAsRewardRestrictions.SINGLE_ROLE,
} as const satisfies RewardData
