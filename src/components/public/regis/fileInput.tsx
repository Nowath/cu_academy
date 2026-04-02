"use client"
import React from 'react'
import { Label, FieldError } from '@heroui/react';

function FileInput({ slipFile, setSlipFile }: {slipFile: File | null, setSlipFile: (data: File | null) => void}) {
    return (
        <div className="flex flex-col gap-1 w-full">
            <Label>
                หลักฐานการชำระเงิน <span className="text-red-400">*</span>
            </Label>

            <label
                htmlFor="slip-input"
                onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add('border-green-500', 'bg-green-50');
                }}
                onDragLeave={(e) => {
                e.currentTarget.classList.remove('border-green-500', 'bg-green-50');
                }}
                onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('border-green-500', 'bg-green-50');
                const file = e.dataTransfer.files[0];
                if (file?.type.startsWith('image/')) {
                    const dt = new DataTransfer();
                    dt.items.add(file);
                    const inputEl = document.getElementById('slip-input') as HTMLInputElement;
                    if (inputEl) {
                    Object.defineProperty(inputEl, 'files', { value: dt.files, writable: true });
                    inputEl.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                    setSlipFile(file);
                }
                }}
                className={`
                relative flex flex-col items-center justify-center gap-2
                border-2 border-dashed rounded-xl p-6 cursor-pointer
                transition-colors duration-150
                ${slipFile
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
                }
                `}
            >
                <input
                id="slip-input"
                name="slip"
                type="file"
                accept="image/*"
                required
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                onChange={(e) => setSlipFile(e.target.files?.[0] ?? null)}
                />
                {slipFile ? (
                <div className="flex items-center gap-3 w-full">
                    <img
                    src={URL.createObjectURL(slipFile)}
                    alt="preview"
                    className="w-14 h-14 rounded-lg object-cover border border-gray-200 shrink-0"
                    />
                    <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-sm font-medium truncate">{slipFile.name}</span>
                    <span className="text-xs text-gray-400">
                        {(slipFile.size / 1024).toFixed(0)} KB
                    </span>
                    <span className="text-xs text-green-600 font-medium mt-0.5">✓ พร้อมส่ง</span>
                    </div>
                </div>
                ) : (
                <>
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <path d="M3 9h18M8 15l2.5-3 2 2.5L15 12l3 4H6l2-1z" />
                    </svg>
                    <p className="text-sm font-medium text-gray-700">อัปโหลดสลิปการโอนเงิน</p>
                    <p className="text-xs text-gray-400">คลิกเพื่อเลือกไฟล์ หรือลากไฟล์มาวางที่นี่</p>
                    <p className="text-xs text-gray-300">รองรับ JPG, PNG, HEIC</p>
                </>
                )}
            </label>
            <FieldError>โปรดแนบหลักฐานการชำระเงิน</FieldError>
        </div>
    )
}

export default FileInput
