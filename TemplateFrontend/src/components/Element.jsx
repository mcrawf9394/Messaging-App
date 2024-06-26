import {v4 as uuidV4} from 'uuid'
function Element (props) {
    if (props.clicked === true) {
        return <div className="grid grid-rows-3 w-1/5 absolute right-0">
            {props.chatRooms.map((item) => {
                return <button key={uuidV4()} className=''>{item}</button>
            })}
        </div>
    } else {
        return <>
        
        </>
    }
}
export default Element