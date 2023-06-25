import type { NextComponentType, NextPageContext } from "next";
import { useEffect, useLayoutEffect, useState } from "react";
import { iconTilesCollection, numberTilesCollection } from "@/data/data";
import { shuffle } from "@/helper-functions/helper-functions";
import { TileType } from "@/types/types";
import styles from "@/styles/GameBoard.module.scss";

interface Props {
  gameTheme: string;
  numberOfPlayers: number;
  gridSize: number;
  onGameStarted: () => void;
  onUpdateMoves: () => void;
  onUpdateCurrentPlayer: (playerNumber: number) => void;
  onCorrectGuess: (playerNumber: number) => void;
  onGameCompleted: () => void;
}

const GameBoard: NextComponentType<NextPageContext, {}, Props> = (
  props: Props
) => {
  const {
    gameTheme,
    numberOfPlayers,
    gridSize,
    onGameStarted,
    onUpdateMoves,
    onUpdateCurrentPlayer,
    onCorrectGuess,
    onGameCompleted,
  } = props;

  const [gridTiles, setGridTiles] = useState<TileType[]>([]);
  const [gridClass, setGridClass] = useState("");
  const [tilesMatched, setTilesMatched] = useState<Set<string>>(new Set(""));
  const [flippedTile1, setFlippedTile1] = useState({ tile: "", index: -1 });
  const [flippedTile2, setFlippedTile2] = useState({ tile: "", index: -1 });
  const [gameStarted, setGameStart] = useState(false);
  const [currentPlayerNumber, setCurrentPlayer] = useState(1);

  // Create game board
  useLayoutEffect(() => {
    const tiles: TileType[] = [];

    // Based on theme
    if (gameTheme === "icons") {
      for (const tile of iconTilesCollection) {
        tiles.push(tile, tile);
      }
    } else {
      for (const tile of numberTilesCollection) {
        tiles.push(tile, tile);
      }
    }

    // Based on grid size
    if (gridSize === 4) {
      tiles.splice(16); // remove 2 from 18 elements in tile collection array
    }

    setGridTiles(shuffle(tiles));
  }, [gameTheme, gridSize]);

  // Compare 2 flipped tiles
  useEffect(() => {
    if (flippedTile1.tile && flippedTile2.tile) {
      setTimeout(() => {
        if (flippedTile1.tile === flippedTile2.tile) {
          setTilesMatched((tilesMatched) =>
            tilesMatched.add(flippedTile1.tile)
          );
          if (numberOfPlayers > 1) {
            onCorrectGuess(currentPlayerNumber);
          }
        } else {
          if (numberOfPlayers > 1) {
            setCurrentPlayer((value) => {
              return value + 1 > numberOfPlayers ? 1 : value + 1;
            });
          }
        }
        setFlippedTile1({ tile: "", index: -1 });
        setFlippedTile2({ tile: "", index: -1 });
      }, 600);
    }
  }, [
    flippedTile1.tile,
    flippedTile2.tile,
    currentPlayerNumber,
    numberOfPlayers,
    onCorrectGuess,
  ]);

  // Update current player real-time
  useEffect(() => {
    onUpdateCurrentPlayer(currentPlayerNumber);
  }, [currentPlayerNumber, onUpdateCurrentPlayer]);

  // Update on game completed when all tiles are correctly matched
  useEffect(() => {
    if (tilesMatched.size === gridSize ** 2 / 2) {
      onGameCompleted();
    }
  }, [tilesMatched.size, gridSize, onGameCompleted]);

  // Set grid class
  useLayoutEffect(() => {
    if (gridSize === 4) {
      setGridClass(styles.four_tiles_column);
    } else {
      setGridClass(styles.six_tiles_column);
    }
  }, [gridSize]);

  // Update start game
  const startGame = () => {
    setGameStart(true);
    onGameStarted();
  };

  // Set flipped tiles 2 at a time & update number of moves for solo player
  const flipTile = (tile: string, index: number) => {
    if (!tilesMatched.has(tile)) {
      if (!flippedTile1.tile) {
        setFlippedTile1({ tile: tile, index: index });
      } else if (!flippedTile2.tile && index !== flippedTile1.index) {
        setFlippedTile2({ tile: tile, index: index });
        if (numberOfPlayers === 1) {
          onUpdateMoves();
        }
      }
    }
  };

  // Show icon or number on tile when clicked
  const tileIsFlipped = (tile: string, index: number) => {
    if (
      tilesMatched.has(tile) ||
      flippedTile1.index === index ||
      flippedTile2.index === index
    ) {
      return true;
    }
    return false;
  };

  // Set tile background colour
  const setTileColor = (tile: string, index: number) => {
    if (tilesMatched.has(tile)) {
      return styles.gray_tile;
    } else if (flippedTile1.index === index || flippedTile2.index === index) {
      return styles.orange_tile;
    } else {
      return styles.blue_tile;
    }
  };

  return (
    <div
      className={`${styles.game_grid} ${gridClass}`}
      onClick={!gameStarted ? startGame : undefined}
    >
      {gridTiles.map((tileData, index) => (
        <button
          key={index}
          onClick={() => flipTile(tileData.id, index)}
          className={`${styles.grid_tile} ${setTileColor(
            tileData.id,
            index
          )}`}
        >
          {tileIsFlipped(tileData.id, index) && tileData.tile}
        </button>
      ))}
    </div>
  );
};

export default GameBoard;
