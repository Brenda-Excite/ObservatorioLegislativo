export interface Districts{
    districts:Array<District>;
    update:boolean;
    districtSelected:District | null;
    sections:string[];
}

export interface District{
     id:string;
     id_district:string;
     num_roman:string;
     name:string;
     nominal:string;
     sections:string[];
}