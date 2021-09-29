import { UserModel } from "models/User";
import React, { useMemo } from "react";
import { useField } from "react-final-form";
import Select, { StylesConfig } from "react-select";

// TEMP: Mock users
const universalTierMock = {
  id: 1,
  tier: 4,
  name: "Chabr",
};

const usersMock: UserModel[] = [
  {
    id: 1,
    name: "John",
    surname: "Doe",
    username: "johndoe",
    type: universalTierMock,
    email: "johnyjohny@yespapa.com",
    groups: [],
  },
  {
    id: 2,
    name: "John",
    surname: "Doe 2",
    username: "johndoe2",
    type: universalTierMock,
    email: "johnyjohny2@yespapa.com",
    groups: [],
  },
  {
    id: 3,
    name: "John",
    surname: "Doe 3",
    username: "johndoe3",
    type: universalTierMock,
    email: "johnyjohny3@yespapa.com",
    groups: [],
  },
];

type Props = {
  name: string;
};

const styles: StylesConfig = {
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
};

const UsersPicker = ({ name }: Props) => {
  const options = useMemo(
    () =>
      usersMock.map((user) => ({
        label: `${user.name} ${user.surname}`,
        value: user.id,
      })),
    []
  );

  const { input } = useField(name);

  return (
    <Select
      isMulti
      styles={styles}
      options={options}
      value={input.value}
      onChange={input.onChange}
      onFocus={input.onFocus}
      onBlur={input.onBlur}
      menuPortalTarget={document.body}
    />
  );
};

export default UsersPicker;
