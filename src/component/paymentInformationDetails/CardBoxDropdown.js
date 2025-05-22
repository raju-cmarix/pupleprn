import React, { useContext, useState } from "react";
import { DotIcon } from "assets/svg";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import DeleteCard from "./DeleteCard";
import { api } from "api/Api";
import {
  DELETE_ACCOUNT,
  DELETE_CARD,
  PRIMARY_ACCOUNT,
  PRIMARY_CARD,
} from "constants/ApiUrls";
import UserContext from "utils/context/UserContext";
const CardBoxDropdown = (props) => {
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [deleteCard, setDelete] = useState(null);
  const { card, bank } = props;
  const { user } = useContext(UserContext);
  const toggle1 = () => setDropdownOpen1((prevState) => !prevState);
  const deleteToggle = () => {
    if (deleteCard) {
      setDelete(null);
    } else {
      setDelete(card);
    }
  };

  const userId = user?.id;

  const defaultCardDetails = {
    id: card?.id,
    userId,
    isPrimary: !card?.isPrimary,
  };
  const deleteCardDetails = {
    id: card?.id,
    userId,
    isPrimary: !card?.isPrimary,
  };
  const defaultAccountDetails = {
    id: bank?.id,
    userId,
  };
  const deleteAccountDetails = {
    id: bank?.id,
    userId,
  };
  const defaultCardSet = () => {
    api(
      bank ? PRIMARY_ACCOUNT : PRIMARY_CARD,
      bank ? defaultAccountDetails : defaultCardDetails
    ).then((res) => {
      props?.setRefresh(!props?.refresh);
      toggle1();
    });
  };
  const deleteCardSet = () => {
    api(
      bank ? DELETE_ACCOUNT : DELETE_CARD,
      {},
      null,
      bank ? deleteAccountDetails : deleteCardDetails
    ).then((res) => {
      deleteToggle();
      props?.setRefresh(!props?.refresh);
      toggle1();
    });
  };

  return (
    <>
      <Dropdown
        isOpen={dropdownOpen1}
        toggle={toggle1}
        direction={props?.direction}
      >
        <DropdownToggle className="p-0">
          <DotIcon />
        </DropdownToggle>
        <DropdownMenu id="card-menu">
          {bank ? (
            <>
              {!bank?.isPrimary && (
                <DropdownItem onClick={defaultCardSet}>
                  Set Default
                </DropdownItem>
              )}
            </>
          ) : (
            <>
              {!card?.isPrimary && (
                <DropdownItem onClick={defaultCardSet}>
                  Set Default
                </DropdownItem>
              )}
            </>
          )}
          <DropdownItem onClick={() => setDelete(bank || card)}>
            Remove
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <DeleteCard
        bank={bank ? 1 : 0}
        modal={deleteCard}
        toggle={deleteToggle}
        deleteCallback={deleteCardSet}
      />
    </>
  );
};

export default CardBoxDropdown;
