import React from "react";
import { Button } from "../ui/button";
import type { Editor } from "@tiptap/react";
import {
	AlignCenter,
	AlignJustify,
	AlignLeft,
	AlignRight,
	Bold,
	Code,
	Heading1,
	Highlighter,
	Image,
	Italic,
	List,
	ListOrdered,
	Redo2,
	Strikethrough,
	TextCursorIcon,
	Underline,
	UnderlineIcon,
	Undo2,
} from "lucide-react";
import { MenuButton } from "./MenuButton";

interface Props {
	editor: Editor | null;
}

export const EditorBar = ({ editor }: Props) => {
	if (!editor) return null;

	return (
		<div className="p-2 border-b space-x-4 space-y-4 w-full z-100 bg-blue-900/70">
			<MenuButton
				onClick={() => editor?.chain().focus().toggleBold().run()}
				isActive={editor.isActive("bold")}
				Icon={Bold}
			/>
			<MenuButton
				onClick={() => editor?.chain().focus().toggleItalic().run()}
				isActive={editor.isActive("italic")}
				Icon={Italic}
			/>
			<MenuButton
				onClick={() => editor?.chain().focus().toggleBulletList().run()}
				isActive={editor.isActive("bulletList")}
				Icon={List}
			/>
			<MenuButton
				onClick={() =>
					editor?.chain().focus().toggleOrderedList().run()
				}
				isActive={editor.isActive("orderedList")}
				Icon={ListOrdered}
			/>
			{/* <MenuButton onClick={() => editor?.chain().focus().setHorizontalRule().run()} isActive={editor.isActive("horizontal")} Icon={Underline} /> */}
			<MenuButton
				onClick={() => editor.chain().focus().undo().run()}
				isDisable={!editor.can().undo()}
				Icon={Undo2}
			/>
			<MenuButton
				onClick={() => editor.chain().focus().redo().run()}
				isDisable={!editor.can().redo()}
				Icon={Redo2}
			/>
			<MenuButton
				onClick={() =>
					editor.chain().focus().toggleHeading({ level: 1 }).run()
				}
				isActive={editor.isActive("heading", { level: 1 })}
				Icon={Heading1}
			/>
			<MenuButton
				onClick={() => editor.chain().focus().toggleStrike().run()}
				isActive={editor.isActive("strike")}
				Icon={Strikethrough}
			/>
			<MenuButton
				onClick={() => editor.chain().focus().toggleCode().run()}
				isActive={editor.isActive("code")}
				Icon={Code}
			/>
			<MenuButton
				onClick={() => editor.chain().focus().toggleUnderline().run()}
				isActive={editor.isActive("underline")}
				Icon={UnderlineIcon}
			/>
			<MenuButton
				onClick={() => editor.chain().focus().toggleHighlight().run()}
				isActive={editor.isActive("highlight")}
				Icon={Highlighter}
			/>

			<MenuButton
				onClick={() =>
					editor.chain().focus().setTextAlign("left").run()
				}
				isActive={editor.isActive({ textAlign: "left" })}
				Icon={AlignLeft}
			/>
			<MenuButton
				onClick={() =>
					editor.chain().focus().setTextAlign("center").run()
				}
				isActive={editor.isActive({ textAlign: "center" })}
				Icon={AlignCenter}
			/>
			<MenuButton
				onClick={() =>
					editor.chain().focus().setTextAlign("right").run()
				}
				isActive={editor.isActive({ textAlign: "right" })}
				Icon={AlignRight}
			/>
			<MenuButton
				onClick={() =>
					editor.chain().focus().setTextAlign("justify").run()
				}
				isActive={editor.isActive({ textAlign: "justify" })}
				Icon={AlignJustify}
			/>
		</div>
	);
};
