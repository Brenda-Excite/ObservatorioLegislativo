import { useState } from "react";
import { Button, DropdownItem, DropdownMenu, DropdownToggle, Form, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText } from "reactstrap";

export const useSearchText = () => {
  const [searchText, setSearchText] = useState("");
  const [parameter, setParameter] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleInputSearchText = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    setSearchText(target.value);
  };
  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

  const SearchTextView = () =>(
      <Form>
        <InputGroup className="input-group-rounded input-group-merge">
          <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown} >
            <DropdownToggle caret>
               Buscar Por: 
            </DropdownToggle>
            <DropdownMenu>
            <DropdownItem header>Header</DropdownItem>
            <DropdownItem disabled>Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Another Action</DropdownItem>
          </DropdownMenu>
          </InputGroupButtonDropdown>
          <Input
            aria-label="Search"
            className="form-control-rounded form-control-prepended"
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
          <Button color="primary" type="button">
            Buscar
          </Button>
        </InputGroup>
      </Form>
    );

  return {
    SearchTextView
  }
};
