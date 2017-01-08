import {GameBoard} from "../Components/GameBoard";
import {Player} from "./Player";
import {Debug} from "../Debug/Debug";

export enum CoinSlot {
    Empty,
    Blue,
    Red
}

export class CoinsTracker {
    private readonly row_x_column: [number, number];
    private readonly allSlots: CoinSlot[][] = [];
    private readonly winner?: Player = null;
    constructor(boardDimensions: [number, number]){
        if(boardDimensions[0] < 0 || boardDimensions[1] < 0)
            throw new Error('Board dimensions must be positive numbers.');

        this.row_x_column = boardDimensions;
        for(var columnIndex = 0; columnIndex < GameBoard.ROWxCOLUMN[1]; columnIndex++) {
            let wholeColumn = [];
            for(var rowIndex = 0; rowIndex < GameBoard.ROWxCOLUMN[0]; rowIndex++){
                wholeColumn.push(CoinSlot.Empty);
            }
            this.allSlots.push(wholeColumn);
        }
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

    private checkIsWinningMove(column_x_row_coinPosition: [number, number]): void {
        let activeCoinType: CoinSlot = this.allSlots[column_x_row_coinPosition[0]][column_x_row_coinPosition[1]];
        console.log('ActiveCoin: ' + Debug.toString(activeCoinType));

        // top_right ↗︎
        console.log('> top_right');
        let top_right = 0;
        for(var columnIndex = column_x_row_coinPosition[0] + 1, rowIndex = column_x_row_coinPosition[1] + 1;
            columnIndex < column_x_row_coinPosition[0] + 4
            && columnIndex < this.row_x_column[1]
            && rowIndex < column_x_row_coinPosition[1] + 4
            && rowIndex < this.row_x_column[0];
            columnIndex++, rowIndex++){
            if(this.allSlots[columnIndex][rowIndex] === activeCoinType){
                top_right = top_right + 1;
                console.log(Debug.toString(this.allSlots[columnIndex][rowIndex]));
            }
            else break;
        }
        console.log('top_right: ' + top_right);

        // right →
        console.log('> right');
        let right = 0;
        for(var columnIndex = column_x_row_coinPosition[0] + 1;
            columnIndex < column_x_row_coinPosition[0] + 4
            && columnIndex < this.row_x_column[1];
            columnIndex++){
            if(this.allSlots[columnIndex][column_x_row_coinPosition[1]] === activeCoinType){
                right = right + 1;
                console.log(Debug.toString(this.allSlots[columnIndex][column_x_row_coinPosition[1]]));
            }
            else break;
        }
        console.log('right: ' + right);

        // down ↓
        console.log('> down');
        let down = 0;
        for(var rowIndex = column_x_row_coinPosition[1] - 1; rowIndex > column_x_row_coinPosition[1] - 4 && rowIndex >= 0; rowIndex--){
            if(this.allSlots[column_x_row_coinPosition[0]][rowIndex] === activeCoinType){
                down = down + 1;
                console.log(Debug.toString(this.allSlots[column_x_row_coinPosition[0]][rowIndex]));
            }
            else break;
        }
        console.log('down: ' + down);





        console.log('------');
    }
}