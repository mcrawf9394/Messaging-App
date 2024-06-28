import {v4 as uuidV4} from 'uuid'
import { useNavigate } from 'react-router-dom'
function Element (props) {
    const navigate = useNavigate()
    if (props.clicked === true && props.chatRooms.length !== 0) {
        return <div className="grid grid-rows-3 w-1/5 absolute right-0">
            {props.chatRooms.map((item) => {
                return <button key={uuidV4()} className='' onClick={click => {
                    click.preventDefault()
                    navigate(`/chatrooms/${item.id}`)
                }}>{item.name}</button>
            })}
        </div>
    } else {
        return <>
        
        </>
    }
}
export default Element