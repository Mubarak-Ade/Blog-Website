import React, { useEffect } from "react";
import {useEditor, EditorContent} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import { EditorBar } from "./EditorBar";

interface Props {
    value: string,
    onChange: (value: string) => void,
}

export const BlogEditor = ({value, onChange} : Props) => {
    const editor = useEditor({
        extensions: [StarterKit, Image.configure({allowBase64: true})],
        content: value,
        onUpdate: ({editor}) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: "max-h-50 overflow-auto outline-none p-2 pt-15"
            }
        }
    })

    useEffect(() => {
        if(editor && value !== editor.getHTML()) {
            editor.commands.setContent(value)
        }
    }, [editor, value]);
	return (
		<div className="border rounded-md overflow-hidden relative">
            <EditorBar editor={editor} />
			<EditorContent editor={editor}  />
		</div>
	);
};
