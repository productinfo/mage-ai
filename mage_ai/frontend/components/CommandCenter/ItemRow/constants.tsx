import * as AllIcons from '@oracle/icons';
import { BLOCK_TYPE_ICON_MAPPING } from '@components/CustomTemplates/BrowseTemplates/constants';
import { CommandCenterItemType, ItemTypeEnum, ModeTypeEnum, ObjectTypeEnum } from '@interfaces/CommandCenterType';
import {
  Binary,
  BlockGeneric,
  HexagonAll,
  BranchAlt,
  Chat,
  ChurnV3,
  Code,
  DocumentIcon,
  File as FileIcon,
  FolderOutline,
  NavDashboard,
  PipelineV3,
  PlugAPI,
  Schedule,
  ScheduleClockWithBorderDots,
  SettingsWithKnobs,
  StreamingPipeline,
} from '@oracle/icons';

export function getIcon(item: CommandCenterItemType) {
  if (ItemTypeEnum.MODE_DEACTIVATION === item?.item_type) {
    return Binary;
  }
  if (ModeTypeEnum.VERSION_CONTROL === item?.mode?.type) {
    return ChurnV3;
  }

  const {
    display_settings_by_attribute: displaySettingsByAttribute,
    metadata,
  } = item || {
    display_settings_by_attribute: null,
    metadata: null,
  };
  const iconUUID = displaySettingsByAttribute?.icon?.icon_uuid;

  if (iconUUID && iconUUID in AllIcons) {
    return AllIcons?.[iconUUID];
  }

  if (metadata?.page?.timestamp) {
    return ScheduleClockWithBorderDots;
  } else if (ObjectTypeEnum.BLOCK === item?.object_type) {
    const Icon = BLOCK_TYPE_ICON_MAPPING[item?.metadata?.block?.type];

    if (Icon) {
      return Icon;
    }
  }

  const mapping = {
    [ObjectTypeEnum.APPLICATION]: NavDashboard,
    [ObjectTypeEnum.BLOCK]: BlockGeneric,
    [ObjectTypeEnum.BRANCH]: BranchAlt,
    [ObjectTypeEnum.CHAT]: Chat,
    [ObjectTypeEnum.CODE]: Code,
    [ObjectTypeEnum.DOCUMENT]: DocumentIcon,
    [ObjectTypeEnum.FILE]: FileIcon,
    [ObjectTypeEnum.FOLDER]: FolderOutline,
    [ObjectTypeEnum.PIPELINE]: PipelineV3,
    [ObjectTypeEnum.PIPELINE_RUN]: StreamingPipeline,
    [ObjectTypeEnum.PROJECT]: HexagonAll,
    [ObjectTypeEnum.REMOTE]: PlugAPI,
    [ObjectTypeEnum.SETTINGS]: SettingsWithKnobs,
    [ObjectTypeEnum.TRIGGER]: Schedule,
  };

  return mapping[item?.object_type];
}
