"use client";

import { memberFormValueType } from "<store>/types/admin";
import { useStore } from "<store>/utils/store";
import { Table } from "@chakra-ui/react";
import { useEffect } from "react";

const MembersTable = ({ items }: { items: memberFormValueType[] }) => {
  const updateMembers = useStore((state) => state.updateMembers);
  const members = useStore((state) => state.members);

  useEffect(() => {
    // Update the members state using updateMembers
    updateMembers(items);
  }, [items]);

  return (
    <Table.Root size="lg" variant="outline">
      <Table.ColumnGroup>
        <Table.Column htmlWidth="50%" />
        <Table.Column htmlWidth="40%" />
        <Table.Column />
      </Table.ColumnGroup>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader padding={"4"}>ID</Table.ColumnHeader>
          <Table.ColumnHeader padding={"1"}>User Name</Table.ColumnHeader>
          <Table.ColumnHeader padding={"1"}>Email</Table.ColumnHeader>
          <Table.ColumnHeader padding={"1"}>Password</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {members.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell padding={"4"}>{item.id}</Table.Cell>
            <Table.Cell padding={"1"}>{item.userName}</Table.Cell>
            <Table.Cell padding={"1"}>{item.email}</Table.Cell>
            <Table.Cell padding={"1"}>{item.password}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default MembersTable;
