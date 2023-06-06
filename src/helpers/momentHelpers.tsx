import moment from "moment";

export const years_old = (date:string) =>{
    if(date){
        const birthday = moment().diff(new Date(date),"years");
        return birthday;
    }
    
}

export const yearOfBirthDay = (date_without_format:string) =>{
    const date = moment(Date.parse(date_without_format)).format("L");
    return date;
}

