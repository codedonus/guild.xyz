import { useAccessedGuildPoints } from "../AccessHub/hooks/useAccessedGuildPoints"
import useGuild from "../hooks/useGuild"
import useGuildPermission from "../hooks/useGuildPermission"
import Tabs, { TabsProps } from "./Tabs"
import TabButton from "./components/TabButton"

type Props = {
  activeTab: "SETTINGS" | "LEADERBOARD" | "MEMBERS" | "ACTIVITY"
} & TabsProps

const GuildTabs = ({ activeTab, ...rest }: Props): JSX.Element => {
  const { urlName, featureFlags } = useGuild()

  const { isAdmin } = useGuildPermission()

  const existingPointsRewards = useAccessedGuildPoints("ALL")
  const firstExistingPointsReward = existingPointsRewards?.[0]

  return (
    <Tabs {...rest}>
      {isAdmin && (
        <TabButton
          href={`/${urlName}/dashboard`}
          isActive={activeTab === "SETTINGS"}
        >
          Settings
        </TabButton>
      )}

      {firstExistingPointsReward && (
        <TabButton
          href={`/${urlName}/leaderboard/${firstExistingPointsReward.id}`}
          isActive={activeTab === "LEADERBOARD"}
        >
          Leaderboard
        </TabButton>
      )}
      {isAdmin && featureFlags?.includes("CRM") && (
        <TabButton href={`/${urlName}/members`} isActive={activeTab === "MEMBERS"}>
          Members
        </TabButton>
      )}
      {isAdmin && (
        <TabButton href={`/${urlName}/activity`} isActive={activeTab === "ACTIVITY"}>
          Activity log
        </TabButton>
      )}
    </Tabs>
  )
}
export default GuildTabs
