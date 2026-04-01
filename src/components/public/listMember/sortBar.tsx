'use client'
import type { Key } from "@heroui/react";
import { ComboBox, EmptyState, Label, ListBox } from "@heroui/react";
import {Input, TextField} from "@heroui/react";
import React, { useEffect, useState } from 'react'

interface SortBarType {
    dropdownValue: number;
    setDropdownValue: (value: number) => void;
    serachValue: string,
    setSearchValue: (value: string) => void;
}

function SortBar({ dropdownValue, setDropdownValue,serachValue, setSearchValue }: SortBarType) {
    const perPage = [5, 10, 15, 20, 30]
    const [inputValue, setInputValue] = useState(serachValue)

    const handleChange = (key: Key | null) => {
        if (key !== null) {
            setDropdownValue(Number(key));
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchValue(inputValue)
        }, 300)
        return () => clearTimeout(timer)
    }, [inputValue])
    return (
        <div className="w-full flex sm:flex-row flex-col md:items-center justify-between gap-2">
            <div className=" order-2 sm:order-1">
                <ComboBox
                    className=" w-full"
                    allowsEmptyCollection={false}
                    selectedKey={String(dropdownValue)}
                    onSelectionChange={handleChange}
                >
                    <Label>จำนวนแถวต่อหน้า</Label>
                    <ComboBox.InputGroup>
                        <Input placeholder="Search animals..." />
                        <ComboBox.Trigger />
                    </ComboBox.InputGroup>
                    <ComboBox.Popover className="w-80">
                        <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
                            {perPage.map((item) => (
                                <ListBox.Item id={String(item)} key={String(item)} textValue={String(item)}>
                                    {item}
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            ))}
                        </ListBox>
                    </ComboBox.Popover>
                </ComboBox>
            </div>
            <div className=" order-1 sm:order-2">
                <TextField className="w-full md:max-w-64" name="name" type="text">
                    <Label>ค้นหา</Label>
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="ค้นหาจากชื่อ..."
                    />
                </TextField>
            </div>
        </div>
    )
}

export default SortBar
