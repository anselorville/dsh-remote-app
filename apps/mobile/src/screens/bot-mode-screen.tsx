import { Bot, Menu, MoreVertical } from 'lucide-react-native'
import { StyleSheet, View } from 'react-native'
import { strings as s } from '../locales/i18n'
import { useAppStore } from '../state/store'
import { BlurHeaderFrame, EmptyState, IconButton, TopBar } from '../ui/components'
import { spacing } from '../ui/theme'
import { useThemedStyles } from '../ui/use-themed-styles'

/** Reserved DS-Bot entry. Upstream bot UI is hidden until a replacement ships. */
export function BotModeScreen({
  onOpenDrawer,
  onBack,
  onDeviceInfo,
  onMore,
  splitView = false,
}: {
  selectedId?: string
  onSelect: (id?: string) => void
  onAgentMode: () => void
  onBack?: () => void
  onOpenDrawer?: () => void
  onDeviceInfo: () => void
  onMore: () => void
  splitView?: boolean
  drawerOpen?: boolean
  screenActive?: boolean
}) {
  const styles = useThemedStyles(createStyles)
  const device = useAppStore(store => store.selectedDevice)
  const navBack = splitView ? undefined : (onOpenDrawer ?? onBack)

  return (
    <BlurHeaderFrame
      header={
        <TopBar
          title={device?.name ?? s.bots.title}
          titleLines={1}
          centered={80}
          titleAccessory={null}
          backIcon={onOpenDrawer ? Menu : undefined}
          backLabel={onOpenDrawer ? s.chat.openHostSessions : undefined}
          onBack={navBack}
          onTitlePress={onDeviceInfo}
          action={
            <IconButton
              dense
              label={s.settings.more}
              icon={MoreVertical}
              onPress={onMore}
            />
          }
        />
      }
    >
      {headerHeight => (
        <View style={[styles.body, { paddingTop: headerHeight }]}>
          <EmptyState icon={Bot} title={s.bots.comingSoon} body={s.bots.comingSoonLead} />
        </View>
      )}
    </BlurHeaderFrame>
  )
}

const createStyles = () => StyleSheet.create({
  body: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
})
