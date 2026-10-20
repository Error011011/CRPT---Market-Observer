export const changeColor = (value: number): string => {
    if(value > 0) {
        return 'text-positive'
    }
    if(value < 0) {
        return 'text-negative'
    }
    return ''

}