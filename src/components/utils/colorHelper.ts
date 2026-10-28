export const changeColor = (value: number | null | undefined): string => {
    if(value  == null) return ''
    if (!Number.isFinite(value)) return ''; 
    if(value === 0) return ''
    return value > 0 ? 'text-positive' : 'text-negative'
    
}