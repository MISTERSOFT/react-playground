import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Button } from "../../components/ui/Button";
import { decrement, increment, incrementByAmount, selectCount } from "./counterSlice";
import { ping } from "../../redux/epics/ping-pong.epic";

export function Counter() {
    const count = useAppSelector(selectCount);
    const dispatch = useAppDispatch();

    return (
        <div className="text-center text-white">
            <div>Redux Counter Test</div>
            {count}
            <Button onClick={() => dispatch(decrement())}>-</Button>
            <Button onClick={() => dispatch(increment())}>+</Button>
            <Button onClick={() => dispatch(incrementByAmount(10))}>+10</Button>
            <Button onClick={() => dispatch(ping())}>Emit PING (Pong from epic expected)</Button>
        </div>
    )
}