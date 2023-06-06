export interface InitialState {
    politicals:Array<PoliticalParty>;
    update:boolean;
    politicalSelected:PoliticalParty|null;
}

export interface PoliticalParty{
    id:string;
    image_path:string;
    name:string;
    abbreviation:string;
    foundation_year:string;
    ideology:string;
}