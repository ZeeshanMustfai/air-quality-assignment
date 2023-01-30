export const getCapitalize = (name: string) : string  => {
    const cities = name.split(" ")
    const result = []
    for(let city of cities){
        result.push(city.charAt(0).toUpperCase() + city.slice(1))
    }
    return result.join(" ")
}