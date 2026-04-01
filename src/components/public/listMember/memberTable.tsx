"use client";
import { Pagination, Table } from "@heroui/react";
import { useMemo, useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { IMemberFilter } from "@/services/listMember/getMember";

const columns = [
    { id: "id", name: "id" },
    { id: "name", name: "ชื่อ" },
    { id: "day1", name: "วันที่ 1" },
    { id: "day2", name: "วันที่ 2" },
];

interface MemberTableType {
    perPage: number;
    searchValue?: string;
    memberData: IMemberFilter[];
}

function renderCell(member: IMemberFilter, columnId: string) {
    switch (columnId) {
        case "name":
            return `${member.prefix}${member.name}`;
        case "day1":
            return member.day1 ? <IoCheckmark className="text-green-600 text-2xl"/> : <RxCross2 className="text-red-600 text-2xl"/>;
        case "day2":
            return member.day2 ? <IoCheckmark className="text-green-600 text-2xl"/> : <RxCross2 className="text-red-600 text-2xl"/>;
        default:
            return member[columnId as keyof IMemberFilter] as string | number;
    }
}

export default function MemberTable({ perPage = 10, searchValue, memberData }: MemberTableType) {
    const [page, setPage] = useState(1);

    const filteredMembers = useMemo(() => {
        if (!searchValue) return memberData;
        const q = searchValue.toLowerCase();
        return memberData.filter((m) => m.name.toLowerCase().includes(q));
    }, [searchValue, memberData]);

    const totalPages = Math.ceil(filteredMembers.length / perPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const safePage = Math.min(page, totalPages || 1);

    const paginatedItems = useMemo(() => {
        const start = (safePage - 1) * perPage;
        return filteredMembers.slice(start, start + perPage);
    }, [safePage, perPage, filteredMembers]);

    const start = filteredMembers.length === 0 ? 0 : (safePage - 1) * perPage + 1;
    const end = Math.min(safePage * perPage, filteredMembers.length);

    return (
        <Table>
            <Table.ScrollContainer>
                <Table.Content aria-label="Table with pagination" className="w-full">
                    <Table.Header columns={columns}>
                        {(column) => (
                            <Table.Column
                                className={column.id === "id" ? "w-14" : ""}
                                isRowHeader={column.id === "id"}
                            >
                                {column.name}
                            </Table.Column>
                        )}
                    </Table.Header>
                    <Table.Body items={paginatedItems}>
                        {(member) => (
                            <Table.Row id={String(member.id)}>
                                <Table.Collection items={columns}>
                                    {(column) => (
                                        <Table.Cell>
                                            {renderCell(member, column.id)}
                                        </Table.Cell>
                                    )}
                                </Table.Collection>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
            <Table.Footer>
                <Pagination>
                    <div className="flex flex-col sm:flex-row w-full justify-center sm:justify-between">
                        <Pagination.Summary>
                            {start} ถึง {end} จาก {filteredMembers.length} คน
                        </Pagination.Summary>
                        <div className="flex justify-center md:justify-auto">
                            <Pagination.Content>
                                <Pagination.Item>
                                    <Pagination.Previous
                                        isDisabled={page === 1}
                                        onPress={() => setPage((p) => Math.max(1, p - 1))}
                                    >
                                        <Pagination.PreviousIcon />
                                        ย้อนกลับ
                                    </Pagination.Previous>
                                </Pagination.Item>
                                {pages.map((p) => (
                                    <Pagination.Item key={p}>
                                        <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                                            {p}
                                        </Pagination.Link>
                                    </Pagination.Item>
                                ))}
                                <Pagination.Item>
                                    <Pagination.Next
                                        isDisabled={page === totalPages}
                                        onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    >
                                        ถัดไป
                                        <Pagination.NextIcon />
                                    </Pagination.Next>
                                </Pagination.Item>
                            </Pagination.Content>
                        </div>
                    </div>
                </Pagination>
            </Table.Footer>
        </Table>
    );
}
