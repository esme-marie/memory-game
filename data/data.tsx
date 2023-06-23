import { GameConfigType, TileType } from "@/types/types";
import Ball from "@/assets/icons/Ball";
import Anchor from "@/assets/icons/Anchor";
import Flask from "@/assets/icons/Flask";
import Sun from "@/assets/icons/Sun";
import Starwars from "@/assets/icons/Starwars";
import Bug from "@/assets/icons/Bug";
import Moon from "@/assets/icons/Moon";
import Snowflake from "@/assets/icons/Snowflake";
import Hook from "@/assets/icons/Hook";
import Car from "@/assets/icons/Car";
import Cake from "@/assets/icons/Cake";
import Dice from "@/assets/icons/Dice";
import Dragon from "@/assets/icons/Dragon";
import GameController from "@/assets/icons/GameController";
import Ghost from "@/assets/icons/Ghost";
import Infinite from "@/assets/icons/Infinite";
import Lemon from "@/assets/icons/Lemon";
import Money from "@/assets/icons/Money";
import { createNumberTiles } from "@/helper-functions/helper-functions";

export const gameConfig: GameConfigType[] = [
  {
    title: "Select Theme",
    options: [
      {
        value: "numbers",
        label: "Numbers",
        groupName: "gameTheme",
        isChecked: true,
      },
      {
        value: "icons",
        label: "Icons",
        groupName: "gameTheme",
        isChecked: false,
      },
    ],
  },
  {
    title: "Number of Players",
    options: [
      {
        value: "1",
        label: "1",
        groupName: "numberOfPlayers",
        isChecked: true,
      },
      {
        value: "2",
        label: "2",
        groupName: "numberOfPlayers",
        isChecked: false,
      },
      {
        value: "3",
        label: "3",
        groupName: "numberOfPlayers",
        isChecked: false,
      },
      {
        value: "4",
        label: "4",
        groupName: "numberOfPlayers",
        isChecked: false,
      },
    ],
  },
  {
    title: "Grid Size",
    options: [
      {
        value: "four",
        label: "4 x 4",
        groupName: "gridSize",
        isChecked: true,
      },
      {
        value: "six",
        label: "6 x 6",
        groupName: "gridSize",
        isChecked: false,
      },
    ],
  },
];

export const numberTilesCollection = createNumberTiles(18);
export const iconTilesCollection: TileType[] = [
  {
    id: "ball",
    tile: <Ball />,
  },
  {
    id: "anchor",
    tile: <Anchor />,
  },
  {
    id: "flask",
    tile: <Flask />,
  },
  {
    id: "sun",
    tile: <Sun />,
  },
  {
    id: "starwars",
    tile: <Starwars />,
  },
  {
    id: "bug",
    tile: <Bug />,
  },
  {
    id: "moon",
    tile: <Moon />,
  },
  {
    id: "snowflake",
    tile: <Snowflake />,
  },
  {
    id: "hook",
    tile: <Hook />,
  },
  {
    id: "car",
    tile: <Car />,
  },
  {
    id: "cake",
    tile: <Cake />,
  },
  {
    id: "dragon",
    tile: <Dragon />,
  },
  {
    id: "infinite",
    tile: <Infinite />,
  },
  {
    id: "lemon",
    tile: <Lemon />,
  },
  {
    id: "money",
    tile: <Money />,
  },
  {
    id: "dice",
    tile: <Dice />,
  },
  {
    id: "console",
    tile: <GameController />,
  },
  {
    id: "ghost",
    tile: <Ghost />,
  },
];
