import React from 'react'
import { Button } from './ui/button'
import type { Editor } from '@tiptap/react'
import { Bold, Image, Italic, List, ListOrdered, TextCursorIcon, Underline } from 'lucide-react'

interface Props {
    editor: Editor | null,
}

export const EditorBar = ({editor} : Props) => {

    if (!editor) return null

    const handleImageUpload = () => {
        const input = document.createElement("input")
        input.type = "file";
        input.accept = "image/*"

        input.onchange = (e: Event) => {
           const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            if (!file) return;
            const reader = new FileReader()
            reader.onload = () => {
                const result = reader.result
                if (typeof result === "string") {
                    editor.chain().focus().setImage({ src: result }).run();
                }
            }
            reader.readAsDataURL(file)
        }
        input.click()
    }
  return (
    <div className='p-2 border-b space-x-4 absolute top-0 w-full z-40 bg-custom-400'>
        <Button type='button' size="icon" className='cursor-pointer' onClick={() => editor?.chain().focus().toggleBold().run()} variant={editor?.isActive("bold") ? "default" : "outline"}>
            <Bold />
        </Button>
        <Button type='button' size="icon" className='cursor-pointer' onClick={() => editor?.chain().focus().toggleItalic().run()} variant={editor?.isActive("italic") ? "default" : "outline"}>
            <Italic />
        </Button>
        <Button type='button' size="icon" className='cursor-pointer' onClick={() => editor?.chain().focus().toggleBulletList().run()} variant={editor?.isActive("bulletList") ? "default" : "outline"}>
            <List />
        </Button>
        <Button type='button' size="icon" className='cursor-pointer' onClick={() => editor?.chain().focus().toggleOrderedList().run()} variant={editor?.isActive("orderedList") ? "default" : "outline"}>
            <ListOrdered />
        </Button>
        <Button type='button' size="icon" className='cursor-pointer' onClick={() => editor?.chain().focus().setHorizontalRule().run()} variant={editor?.isActive("horizontal") ? "default" : "outline"}>
            <Underline />
        </Button>
        <Button type='button' onClick={handleImageUpload}>
            <Image />
        </Button>
    </div>
  )
}
