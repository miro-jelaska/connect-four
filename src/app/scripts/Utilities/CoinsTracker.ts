import {GameBoard} from "../Components/GameBoard";
import {Player} from "./Player";
enum CoinSlot {
    Empty,
    Blue,
    Red
}

export class CoinsTracker {
    private readonly row_x_column: [number, number];
    private readonly allSlots: CoinSlot[][] = [];
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

        for(var rowIndex = 0; rowIndex < this.row_x_column[0]; rowIndex++){
            if(this.allSlots[columnIndex][rowIndex] == CoinSlot.Empty){
                this.allSlots[columnIndex][rowIndex] = this.playerToCoinSlot(player);
                return [rowIndex, columnIndex];
            }
        }
    }

    private playerToCoinSlot(player: Player): CoinSlot {
        if(player == Player.Blue)
            return CoinSlot.Blue;
        return CoinSlot.Red;
    }
}