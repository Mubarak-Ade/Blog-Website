import React, { useEffect } from "react";
import {useEditor, EditorContent} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import { EditorBar } from "./EditorBar";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight"
import Link from "@tiptap/extension-link";
import { Placeholder} from "@tiptap/extensions";
import TextAlign from "@tiptap/extension-text-align"

interface Props {
    value: string,
    onChange: (value: string) => void,
}

export const BlogEditor = ({value, onChange} : Props) => {
    const editor = useEditor({
        extensions: [StarterKit.configure({heading: {
            levels: [1, 2, 3]
        }}), Underline, 
        Highlight.configure({multicolor: false}), 
        Link.configure({openOnClick: false}),
             TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Start typing...',
      })],
        content: value,
        onUpdate: ({editor}) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: "h-40 bg-white dark:bg-gray-900 prose prose-invert overflow-auto outline-none p-2"
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
			<EditorContent editor={editor}  />
            <EditorBar editor={editor} />
            <style jsx global>{`
        .ProseMirror {
          min-height: 400px;
        }

        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #6b7280;
          pointer-events: none;
          height: 0;
        }

        .ProseMirror h1 {
          font-size: 2em;
          font-weight: 700;
          margin-top: 1em;
          margin-bottom: 0.5em;
          line-height: 1.2;
        }

        .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: 600;
          margin-top: 1em;
          margin-bottom: 0.5em;
        }

        .ProseMirror p {
          margin-bottom: 1em;
          line-height: 1.6;
        }

        .ProseMirror mark {
          background-color: #854d0e;
          color: #fef3c7;
          padding: 2px 4px;
          border-radius: 2px;
        }

        .ProseMirror strong {
          font-weight: 700;
        }

        .ProseMirror em {
          font-style: italic;
        }

        .ProseMirror a {
          color: #60a5fa;
          text-decoration: underline;
          cursor: pointer;
        }

        .ProseMirror a:hover {
          color: #93c5fd;
        }

        .ProseMirror pre {
          background: #1f2937;
          border-radius: 0.5rem;
          padding: 1rem;
          margin: 1rem 0;
        }

        .ProseMirror code {
          background: #1f2937;
          color: #e5e7eb;
          padding: 0.2em 0.4em;
          border-radius: 0.25rem;
          font-size: 0.9em;
          font-family: 'Monaco', 'Courier New', monospace;
        }

        .ProseMirror pre code {
          padding: 0;
          background: none;
        }

        .ProseMirror blockquote {
          border-left: 3px solid #4b5563;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #9ca3af;
        }

        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 2rem;
          margin: 1rem 0;
        }

        .ProseMirror ul {
          list-style-type: disc;
        }

        .ProseMirror ol {
          list-style-type: decimal;
        }

        .ProseMirror li {
          margin: 0.25rem 0;
        }

        .ProseMirror u {
          text-decoration: underline;
        }

        .ProseMirror s {
          text-decoration: line-through;
        }
      `}</style>
		</div>
	);
};
