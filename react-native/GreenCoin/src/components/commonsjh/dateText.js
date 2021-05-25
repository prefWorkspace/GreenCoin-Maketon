

export default function DateText(date, text){
    return (`${date.getFullYear()}${text}${date.getMonth()+1}${text}${date.getDate()}`)
}