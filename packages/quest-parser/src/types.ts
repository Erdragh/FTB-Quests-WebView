export type LocaleKey = string;
export type Identifier = string;
export type FTBQuestShape = "circle" | "square" | "pentagon" | "hexagon" | "gear";
export type FTBQuestProgressionMode = "linear";

export type FTBQuestItem = Identifier | {
    id: Identifier,
    Count: number,
    tag: { [key: string]: any }
}

export type FTBQuestData = {
    version: number,
    title: LocaleKey,
    icon: FTBQuestItem,
    default_reward_team: boolean,
    default_consume_items: boolean,
    default_autoclaim_rewards: "disabled" | "enabled",
    default_quest_shape: FTBQuestShape,
    default_quest_disable_jei: boolean,
    emergency_items_cooldown: number,
    drop_loot_crates: boolean,
    loot_crate_no_drop: {
        passive: number,
        monster: number,
        boss: number,
    },
    disable_gui: boolean,
    grid_scale: number,
    pause_game: boolean,
    lock_message: string,
    progression_mode: FTBQuestProgressionMode
}

export type FTBQuestChapter = {
    id: string,
    group: string,
    order_index: number,
    filename: string,
    title: LocaleKey,
    icon: Identifier,
    default_quest_shape: FTBQuestShape,
    default_hide_dependency_lines: boolean,
    images: FTBQuestImage[],
    quests: FTBQuest[],
    quest_links: any[]
}

export type FTBQuestPlaceable = {
    x: number,
    y: number,
}

export type FTBQuestImage = FTBQuestPlaceable & {
    width: number,
    height: number,
    rotation: number,
    image: Identifier,
    hover: any[],
    click: string,
    dev: boolean,
    corner: boolean
}

export type FTBQuest = FTBQuestPlaceable & {
    subtitle?: LocaleKey,
    description: LocaleKey[],
    dependencies: string[],
    id: string,
    tasks: FTBQuestTask[],
    rewards?: FTBQuestReward[],
    title?: LocaleKey,
    shape?: FTBQuestShape,
    optional?: boolean,
    size?: number,
    hide_dependency_lines?: boolean,
    hide?: true,
    min_required_tasks?: number
}

type ID = { id: string, type: string };

export type FTBQuestTask = ID & (FTBQuestTaskItem | FTBQuestTaskDimension | FTBQuestTaskCheckmark);

export type FTBQuestTaskItem = {
    type: "item",
    item: FTBQuestItem,
    count?: number
}

export type FTBQuestTaskDimension = {
    type: "dimension",
    icon: FTBQuestItem,
    dimension: Identifier
}

export type FTBQuestTaskCheckmark = {
    type: "checkmark",
    title?: LocaleKey
}

export type FTBQuestReward = ID & (FTBQuestRewardItem | FTBQuestRewardXP);

export type FTBQuestRewardItem = {
    type: "item",
    item: FTBQuestItem,
    count?: number
}

export type FTBQuestRewardXP = {
    type: "xp",
    xp: number
}