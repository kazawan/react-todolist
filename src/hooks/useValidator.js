export default function useValidator() {
    function validateTitle(title) {
        if(title.length === 0){
            return false
        }
        return true
    }
    


    return {
        validateTitle
    };
}