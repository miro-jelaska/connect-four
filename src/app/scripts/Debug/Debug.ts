import {CoinSlot}  from '../Utilities/CoinsTracker';
import {Player} from "../Utilities/Player";

export module Debug
{
    export function toString(slot: CoinSlot):string {
        return slot == CoinSlot.Empty
            ? 'Empty' :
            (slot == CoinSlot.Blue ? 'blue' : 'red');
    }
    export function toString_player(player: Player):string {
        return player === Player.Blue ? 'Blue' : 'Red';
    }
}