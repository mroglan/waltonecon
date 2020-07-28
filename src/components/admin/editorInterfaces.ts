type TAsyncAtomicBlockResponse = {
    data: any;
}

export type TMUIRichEditor = {
    focus: () => void;
    save: () => void;
    insertAtomicBlock: (name: string, data: any) => void
    insertAtomicBlockSync: (name: string, data: any) => void
    insertAtomicBlockAsync: (name: string, promise: Promise<TAsyncAtomicBlockResponse>, placeholder?: string) => void
}