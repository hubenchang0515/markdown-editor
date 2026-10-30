import type { Color } from "../common/Color";
import type { Theme } from "../common/Theme";
import EmptyTheme from "./EmptyTheme";
import { CreateDefaultTheme } from "./DefaultTheme";
import { CreateMinimalTheme } from "./MinimalTheme";
import { CreateMagazineTheme } from "./MagazineTheme";
import { CreateClassicTheme } from "./ClassicTheme";
import { CreateSoftTheme } from "./SoftTheme";
import { CreateCardTheme } from "./CardTheme";

export interface ThemePreset {
    id: string;
    name: string;
    create: (primary: Color, secondary: Color, base: Color) => Theme;
}

export const DEFAULT_COLORS = {
    primary: "Green",
    secondary: "Pink",
    base: "Slate",
};

export const THEME_PRESETS: ThemePreset[] = [
    {
        id: "default",
        name: "默认样式",
        create: CreateDefaultTheme,
    },
    {
        id: "minimal",
        name: "简约样式",
        create: CreateMinimalTheme,
    },
    {
        id: "magazine",
        name: "杂志样式",
        create: CreateMagazineTheme,
    },
    {
        id: "classic",
        name: "经典样式",
        create: CreateClassicTheme,
    },
    {
        id: "soft",
        name: "清新样式",
        create: CreateSoftTheme,
    },
    {
        id: "card",
        name: "卡片样式",
        create: CreateCardTheme,
    },
    {
        id: "empty",
        name: "空样式",
        create: () => EmptyTheme,
    },
];
