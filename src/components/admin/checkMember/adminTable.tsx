"use client";
import { Pagination, Table, Button, Checkbox, useOverlayState } from "@heroui/react";
import { useMemo, useState } from "react";
import SlipModal from "@/components/modal/adminTable/slip";
import { IoCheckmark } from "react-icons/io5";
import { RxCross2, RxInfoCircled } from "react-icons/rx";
import { RiBillLine } from "react-icons/ri";
import { IMember } from "@/type/member";
import { updateMember } from "@/services/listMember/updateMember";
import dayjs from "dayjs";
import { toast } from "sonner";

const columns = [
    { id: "id", name: "id" },
    { id: "name", name: "ชื่อ" },
    { id: "grade", name : "ชั้น"},
    { id: "day1", name: "วันที่ 1" },
    { id: "day2", name: "วันที่ 2" },
    { id: "created_at", name: "วันที่ลงะเบียน" },
    { id: "food_allergy", name: "แพ้อาหาร/โรค" },
    { id: "action", name: "action" },
    { id: "status", name: "status"}
];

interface MemberTableType {
    perPage: number;
    searchValue?: string;
    filterPass?: string;
    memberData: IMember[];
}

async function handleUpdateMember({ member }: {member:IMember}) {
    try {
        await updateMember({ value: !member.pass, memberID: member.id })
        toast.success("update สำเร็จ");
    } catch(error) {
        if (error instanceof Error) {
            console.error(error.message);
            toast.error(error.message);
        }
    }
}

function renderCell(member: IMember, columnId: string, onSlipOpen: (m: IMember) => void, index?: number) {
    switch (columnId) {
        case "id":
            return index;
        case "name":
            return `${member.prefix}${member.name}`;
        case "day1":
            return member.day1 ? <IoCheckmark className="text-green-600 text-2xl"/> : <RxCross2 className="text-red-600 text-2xl"/>;
        case "day2":
            return member.day2 ? <IoCheckmark className="text-green-600 text-2xl" /> : <RxCross2 className="text-red-600 text-2xl" />;
        case "created_at":
            return `${dayjs(member.created_at).format("DD/MM/YYYY")}`
        case "action":
            return (
                <div className=" flex gap-2">
                    <Button isIconOnly variant="outline"><RxInfoCircled /></Button>
                    <Button isIconOnly variant="outline" onPress={() => onSlipOpen(member)}><RiBillLine /></Button>
                </div>
            )
        case "status":
            return (
                <Checkbox variant="secondary" defaultSelected={member.pass} onChange={() => handleUpdateMember({member:member})} >
                    <Checkbox.Control>
                        <Checkbox.Indicator  />
                    </Checkbox.Control>
                </Checkbox>
            )
        default:
            return member[columnId as keyof IMember] as string | number;
    }
}

export default function AdminTable({ perPage = 10, searchValue, filterPass, memberData }: MemberTableType) {
    const [page, setPage] = useState(1);
    const slipState = useOverlayState();
    const [selectedMember, setSelectedMember] = useState<IMember | null>(null);

    const handleSlipOpen = (member: IMember) => {
        setSelectedMember(member);
        slipState.setOpen(true);
    };

    const filteredMembers = useMemo(() => {
        let result = memberData;
        if (searchValue) {
            const q = searchValue.toLowerCase();
            result = result.filter((m) => m.name.toLowerCase().includes(q));
        }
        if (filterPass === "pass") result = result.filter((m) => m.pass);
        else if (filterPass === "notPass") result = result.filter((m) => !m.pass);
        return result;
    }, [searchValue, filterPass, memberData]);

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
        <>
        {selectedMember && <SlipModal state={slipState} member={selectedMember} />}
        <Table>
            <Table.ScrollContainer>
                <Table.Content aria-label="Member Table" className="min-w-200">
                    <Table.Header columns={columns}>
                        {(column) => (
                            <Table.Column
                                isRowHeader={column.id === "id"}
                            >
                                {column.name}
                            </Table.Column>
                        )}
                    </Table.Header>
                    <Table.Body>
                        {paginatedItems.map((member, index) => (
                            <Table.Row id={String(member.id)} key={member.id}>
                                <Table.Collection items={columns}>
                                    {(column) => (
                                        <Table.Cell>
                                            {renderCell(member, column.id, handleSlipOpen, (safePage - 1) * perPage + index + 1)}
                                        </Table.Cell>
                                    )}
                                </Table.Collection>
                            </Table.Row>
                        ))}
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
        </>
    );
}
