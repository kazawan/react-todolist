import { useToast } from "../toast"

export default function Child() {
    const {msg} = useToast()
    return (
        <div>
            <h1>Child</h1>
            <button onClick={()=>msg().warning('Welcome to Child') }  >info</button>
        </div>
    )
}