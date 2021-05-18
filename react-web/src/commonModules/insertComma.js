

export default function InsertComma(int){
    return (String(int).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,'))
}