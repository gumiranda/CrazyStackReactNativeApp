import { useCallback, useEffect, useState } from "react";
import { getUsers } from "../../entities/user";

export const useUsersSelect = ({
  userList = null,
  ownerSelected = null,
  role = "professional",
  userDefaultSelected = null,
}) => {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState(userList?.users ?? []);
  const [userSelected, setUserSelected] = useState(
    userDefaultSelected ?? userList?.users[0]?._id
  );
  const handleChangeUserSelected = (value) => {
    setUserSelected(value?._id);
  };
  const fetchUsersPaginated = useCallback(async () => {
    if (userList?.totalCount > users.length && page > 1) {
      const params = { role };
      if (ownerSelected) {
        Object.assign(params, { ownerId: ownerSelected });
      }
      const data = await getUsers(page, params);
      if (data?.totalCount > users?.length) {
        setUsers((prev) => {
          const uniqueUsers = [...prev, ...(data?.users ?? [])].filter(
            (user, index, self) => self.findIndex((u) => u._id === user._id) === index
          );
          return uniqueUsers;
        });
      }
      setUserSelected(data?.users?.[0]?._id ?? users?.[0]?._id ?? "");
    } else if (!userList && ownerSelected) {
      const data = await getUsers(page, { role, ownerId: ownerSelected });
      if (data?.totalCount > users?.length) {
        setUsers((prev) => {
          const uniqueUsers = [...prev, ...(data?.users ?? [])].filter(
            (user, index, self) => self.findIndex((u) => u._id === user._id) === index
          );
          return uniqueUsers;
        });
      }
      setUserSelected(data?.users?.[0]?._id ?? users?.[0]?._id ?? "");
    } else {
      setUserSelected(users?.[0]?._id ?? "");
    }
  }, [ownerSelected, page, role, userList, users]);
  useEffect(() => {
    setUsers(userList?.users ?? []);
  }, [userList?.users]);
  useEffect(() => {
    if (userSelected === "loadMore") {
      setPage((prev) => prev + 1);
    }
  }, [userSelected]);
  useEffect(() => {
    fetchUsersPaginated();
  }, [fetchUsersPaginated, page]);
  return {
    userSelected,
    setUserSelected,
    handleChangeUserSelected,
    users,
  };
};
