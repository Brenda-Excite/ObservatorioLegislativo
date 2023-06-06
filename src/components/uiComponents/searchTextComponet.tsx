import { useState } from "react";
import { Button, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";

interface Props{
    handleSubmitSearch: (query: string) => void;
}
const SearchTextComponet = ({handleSubmitSearch}:Props) => {
    const [searchText, setSearchText] = useState("");
    const handleInputSearchText = (e: React.SyntheticEvent): void => {
        let target = e.target as HTMLInputElement;
        setSearchText(target.value);
    };

    return (
        <FormGroup className="d-flex">
        <InputGroup className="input-group-rounded input-group-merge">
          <Input
            aria-label="Search"
            className="form-control-rounded form-control-prepended ml-5"
            placeholder="Search"
            type="text"
            onChange={(e)=>handleInputSearchText(e)}
            defaultValue={searchText}
          />
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <span className="fa fa-search" />
            </InputGroupText>
          </InputGroupAddon>          
          <Button 
            color="primary" 
            type="button"
            onClick={()=>handleSubmitSearch(searchText)}
          >
            Buscar
          </Button>
        </InputGroup>
      </FormGroup>
    );
};

export default SearchTextComponet;