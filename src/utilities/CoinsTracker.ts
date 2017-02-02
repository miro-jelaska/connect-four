import {GameBoard} from "../components/board/GameBoard";
import {Player} from "./Player";

export enum CoinSlot {
    Empty,
    Blue,
    Red
}

export class CoinsTracker {
    private readonly row_x_column: [number, number];

    private allSlots: CoinSlot[][] = [];
    private winner?: Player = null;
    private winnerCoinPositions: Array<[number, number]> = [];

    constructor(boardDimensions: [number, number]){
        if(boardDimensions[0] < 0 || boardDimensions[1] < 0)
            throw new Error('Board dimensions must be positive numbers.');
        this.row_x_column = boardDimensions;
        this.initializeSlots();
    }
    private initializeSlots(): void {
        this.allSlots = [];
        for(var columnIndex = 0; columnIndex < GameBoard.ROWxCOLUMN[1]; columnIndex++) {
            let wholeColumn = [];
            for(var rowIndex = 0; rowIndex < GameBoard.ROWxCOLUMN[0]; rowIndex++){
                wholeColumn.push(CoinSlot.Empty);
            }
            this.allSlots.push(wholeColumn);
        }
    }
    public reset(): void {
        this.initializeSlots();
        this.winner = null;
        this.winnerCoinPositions = [];
    }

    public isEmptySlotAvailable(columnIndex: number): boolean {
        return this.allSlots[columnIndex].some((slot: CoinSlot) => slot == CoinSlot.Empty);
    }

    public addCoin(player: Player, columnIndex: number): [number, number] {
        if(!this.isEmptySlotAvailable(columnIndex))
            throw new Error('You tried to insert coin to column at index `' + columnIndex +'` that has not empty slots.');

        if(this.isWin())
            throw new Error('Cannot add coin because game ended when player won.');

        if(this.isTie())
            throw new Error('Cannot add coin because game ended wih a tie.');

        for(var rowIndex = 0; rowIndex < this.row_x_column[0]; rowIndex++){
            if(this.allSlots[columnIndex][rowIndex] == CoinSlot.Empty){
                let coinPosition: [number, number] = [columnIndex, rowIndex];
                this.allSlots[columnIndex][rowIndex] = this.playerToCoinSlot(player);
                this.checkIsWinningMove(coinPosition);
                return coinPosition;
            }
        }
    }

    public isWin(): boolean {
        return this.winner != null;
    }

    public getWinner(): Player {
        return this.winner;
    }

    public getWinningCoinPositions(): Array<[number, number]> {
        return this.winnerCoinPositions;
    }

    public isTie(): boolean {
        let thereIsAtLeastOneEmptySlot =
            this.allSlots
                .some((column: CoinSlot[]) =>
                    column.some((slot: CoinSlot) =>
                        slot == CoinSlot.Empty));
        return !thereIsAtLeastOneEmptySlot;
    }


    public isGameOver(): boolean {
        return this.isWin() || this.isTie();
    }

    private playerToCoinSlot(player: Player): CoinSlot {
        if(player == Player.Blue)
            return CoinSlot.Blue;
        return CoinSlot.Red;
    }
    private coinToPlayerSlot(coin: CoinSlot): Player {
        if(coin == CoinSlot.Blue)
            return Player.Blue;
        return Player.Red;
    }


    private checkIsWinningMove(column_x_row_coinPosition: [number, number]): void {
        let activeCoinType: CoinSlot = this.allSlots[column_x_row_coinPosition[0]][column_x_row_coinPosition[1]];

        // top_right ↗︎
        let adjacentCoins_top_right: Array<[number, number]> = [];
        for(var columnIndex = column_x_row_coinPosition[0] + 1,
                rowIndex = column_x_row_coinPosition[1] + 1;

            columnIndex < column_x_row_coinPosition[0] + 4
            && columnIndex < this.row_x_column[1]
            && rowIndex < column_x_row_coinPosition[1] + 4
            && rowIndex < this.row_x_column[0];

            columnIndex++, rowIndex++) {
            if(this.allSlots[columnIndex][rowIndex] === activeCoinType)
                adjacentCoins_top_right.push([columnIndex, rowIndex]);
            else break;
        }

        // right →
        let adjacentCoins_right: Array<[number, number]> = [];
        for(var columnIndex = column_x_row_coinPosition[0] + 1;

            columnIndex < column_x_row_coinPosition[0] + 4
            && columnIndex < this.row_x_column[1];

            columnIndex++) {
            if(this.allSlots[columnIndex][column_x_row_coinPosition[1]] === activeCoinType)
                adjacentCoins_right.push([columnIndex, column_x_row_coinPosition[1]]);
            else break;
        }

        // bottom_right ↘︎︎
        let adjacentCoins_bottom_right: Array<[number, number]> = [];
        for(var columnIndex = column_x_row_coinPosition[0] + 1,
                rowIndex = column_x_row_coinPosition[1] - 1;

            columnIndex < column_x_row_coinPosition[0] + 4
            && columnIndex < this.row_x_column[1]
            && rowIndex > column_x_row_coinPosition[1] - 4
            && rowIndex >= 0;

            columnIndex++, rowIndex--) {
            if(this.allSlots[columnIndex][rowIndex] === activeCoinType)
                adjacentCoins_bottom_right.push([columnIndex, rowIndex]);
            else break;
        }

        // down ↓
        let adjacentCoins_bottom: Array<[number, number]> = [];
        for(var rowIndex = column_x_row_coinPosition[1] - 1;
            rowIndex > column_x_row_coinPosition[1] - 4 && rowIndex >= 0;
            rowIndex--) {
            if(this.allSlots[column_x_row_coinPosition[0]][rowIndex] === activeCoinType)
                adjacentCoins_bottom.push([column_x_row_coinPosition[0], rowIndex]);
            else break;
        }

        // bottom_left ↙︎︎︎
        let adjacentCoins_bottom_left: Array<[number, number]> = [];
        for(var columnIndex = column_x_row_coinPosition[0] - 1,
                rowIndex = column_x_row_coinPosition[1] - 1;

            columnIndex > column_x_row_coinPosition[0] - 4
            && columnIndex >= 0
            && rowIndex > column_x_row_coinPosition[1] - 4
            && rowIndex >= 0;

            columnIndex--, rowIndex--) {
            if(this.allSlots[columnIndex][rowIndex] === activeCoinType)
                adjacentCoins_bottom_left.push([columnIndex, rowIndex]);
            else break;
        }

        // left ←
        let adjacentCoins_left: Array<[number, number]> = [];
        for(var columnIndex = column_x_row_coinPosition[0] - 1;

            columnIndex > column_x_row_coinPosition[0] - 4
            && columnIndex >= 0;

            columnIndex--) {
            if(this.allSlots[columnIndex][column_x_row_coinPosition[1]] === activeCoinType)
                adjacentCoins_left.push([columnIndex, column_x_row_coinPosition[1]]);
            else break;
        }

        // top_left ↖︎
        let adjacentCoins_top_left: Array<[number, number]> = [];
        for(var columnIndex = column_x_row_coinPosition[0] - 1,
                rowIndex = column_x_row_coinPosition[1] + 1;

            columnIndex > column_x_row_coinPosition[0] - 4
            && columnIndex >= 0
            && rowIndex < column_x_row_coinPosition[1] + 4
            && rowIndex < this.row_x_column[0];

            columnIndex--, rowIndex++) {
            if(this.allSlots[columnIndex][rowIndex] === activeCoinType)
                adjacentCoins_top_left.push([columnIndex, rowIndex]);
            else break;
        }


        let isWin: boolean;
        let winnerCoins: Array<[number, number]> = [];

        if(adjacentCoins_bottom.length >= 3) {
            adjacentCoins_bottom.forEach((coinPosition: [number, number]) => winnerCoins.push(coinPosition));
            isWin = true;
        }

        if(adjacentCoins_top_right.length + adjacentCoins_bottom_left.length >= 3) {
            adjacentCoins_top_right.forEach((coinPosition: [number, number]) => winnerCoins.push(coinPosition));
            adjacentCoins_bottom_left.forEach((coinPosition: [number, number]) => winnerCoins.push(coinPosition));
            isWin = true;
        }

        if(adjacentCoins_right.length + adjacentCoins_left.length >= 3) {
            adjacentCoins_right.forEach((coinPosition: [number, number]) => winnerCoins.push(coinPosition));
            adjacentCoins_left.forEach((coinPosition: [number, number]) => winnerCoins.push(coinPosition));
            isWin = true;
        }

        if(adjacentCoins_bottom_right.length + adjacentCoins_top_left.length >= 3) {
            adjacentCoins_bottom_right.forEach((coinPosition: [number, number]) => winnerCoins.push(coinPosition));
            adjacentCoins_top_left.forEach((coinPosition: [number, number]) => winnerCoins.push(coinPosition));
            isWin = true;
        }


        if(isWin){
            winnerCoins.push(column_x_row_coinPosition);
            this.winnerCoinPositions = winnerCoins;
            this.winner = this.coinToPlayerSlot(activeCoinType);
        }
    }
}