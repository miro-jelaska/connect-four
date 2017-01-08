import {CoinSlot}  from '../utilities/CoinsTracker';
import {Player} from "../utilities/Player";

export module Debug
{
    export function toString_coinSlot(slot: CoinSlot):string {
        return slot == CoinSlot.Empty
            ? 'Empty' :
            (slot == CoinSlot.Blue ? 'blue' : 'red');
    }
    export function toString_player(player: Player):string {
        return player === Player.Blue ? 'Blue' : 'Red';
    }
}