import LabeledInput from '@/shared/components/labeled-input'
import { uploadFile } from '@/shared/services/self'
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import clsx from 'clsx'
import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { OverlayPanel } from 'primereact/overlaypanel'
import { Tooltip } from 'primereact/tooltip'
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useRef,
  useState,
} from 'react'
import {
  FaBold,
  FaImage,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
} from 'react-icons/fa'
import { LuHeading1, LuHeading2, LuHeading3 } from 'react-icons/lu'
import { RiLinkM, RiLinkUnlinkM } from 'react-icons/ri'

export function ImageLink({ editor }: { editor: Editor }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)

  const handleImageSelection = useCallback(
    async (ev: ChangeEvent<HTMLInputElement>) => {
      const file = ev.target.files?.[0]
      if (!file || !inputRef.current) return

      try {
        setLoading(true)
        const url = await uploadFile(file)
        editor
          .chain()
          .focus()
          .setImage({ src: url })
          .createParagraphNear()
          .run()
        inputRef.current.value = ''
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    },
    [editor],
  )

  return (
    <>
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleImageSelection}
        accept="image/*"
      />

      <ActionButton
        tooltip="Imagem"
        onClick={() => inputRef.current?.click()}
        className="border border-surface-border p-2 rounded text-xl bg-surface-overlay"
      >
        {loading ? (
          <i className={`${PrimeIcons.SPINNER} pi-spin`}></i>
        ) : (
          <FaImage />
        )}
      </ActionButton>
    </>
  )
}

export function LinkButton({ editor }: { editor: Editor }) {
  const op = useRef<OverlayPanel>(null)
  const [url, setUrl] = useState('')

  const setLink = useCallback(
    (event: FormEvent) => {
      event.preventDefault()

      if (!url) editor.chain().focus().unsetLink().run()

      editor.chain().focus().setLink({ href: url }).run()
      op.current?.hide()
    },
    [editor, url],
  )

  return (
    <>
      <ActionButton
        tooltip="Link"
        active={editor?.isActive('link')}
        onClick={(e) => op.current?.toggle(e)}
      >
        <RiLinkM />
      </ActionButton>

      {editor?.isActive('link') && (
        <ActionButton
          tooltip="Desvincular link"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className="border border-surface-border p-2 rounded text-xl bg-surface-overlay"
        >
          <RiLinkUnlinkM />
        </ActionButton>
      )}

      <OverlayPanel
        ref={op}
        onHide={() => setUrl('')}
        onShow={() => setUrl(editor.getAttributes('link').href)}
      >
        <form className="flex flex-col gap-5" onSubmit={setLink}>
          <LabeledInput label="URL">
            <InputText value={url} onChange={(ev) => setUrl(ev.target.value)} />
          </LabeledInput>

          <div className="flex items-center justify-start">
            <Button label="Confirmar" />
          </div>
        </form>
      </OverlayPanel>
    </>
  )
}

export function ActionButton({
  active = false,
  tooltip,
  ...props
}: React.HTMLProps<HTMLButtonElement> & { active?: boolean; tooltip: string }) {
  const ref = useRef<HTMLButtonElement>(null)

  return (
    <>
      <Tooltip content={tooltip} target={ref} position="bottom" />
      <button
        {...props}
        ref={ref}
        type="button"
        className={clsx(
          'border border-surface-border p-2 rounded text-xl hover:border-primary',
          {
            'bg-primary border-primary text-primary-color-text': active,
            'bg-surface-overlay': !active,
          },
          props.className,
        )}
      >
        {props.children}
      </button>
    </>
  )
}

export function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return <></>
  }

  return (
    <div className="flex flex-wrap gap-1 items-center mb-2">
      <ActionButton
        tooltip="Título 1"
        onClick={() => {
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }}
        active={editor?.isActive('heading', { level: 1 })}
      >
        <LuHeading1 />
      </ActionButton>

      <ActionButton
        tooltip="Título 2"
        active={editor?.isActive('heading', { level: 2 })}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <LuHeading2 />
      </ActionButton>

      <ActionButton
        tooltip="Título 3"
        active={editor?.isActive('heading', { level: 3 })}
        onClick={() => {
          editor?.chain().focus().toggleHeading({ level: 3 }).run()
        }}
      >
        <LuHeading3 />
      </ActionButton>

      <ActionButton
        tooltip="Negrito"
        active={editor?.isActive('bold')}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <FaBold />
      </ActionButton>

      <ActionButton
        tooltip="Itálico"
        active={editor?.isActive('italic')}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        <FaItalic />
      </ActionButton>

      <ActionButton
        tooltip="Lista"
        active={editor?.isActive('bulletList')}
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
      >
        <FaListUl />
      </ActionButton>

      <ActionButton
        tooltip="Lista ordenada"
        active={editor?.isActive('orderedList')}
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      >
        <FaListOl />
      </ActionButton>

      <ActionButton
        tooltip="Citação"
        active={editor?.isActive('blockquote')}
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
      >
        <FaQuoteLeft />
      </ActionButton>

      <LinkButton editor={editor} />

      <ImageLink editor={editor} />
    </div>
  )
}

interface TextEditorProps {
  value: string
  id: string
  onChange: (value: string) => void
  invalid?: boolean
}

export default function TextEditor({
  value,
  onChange,
  id,
  invalid = false,
}: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        autolink: true,
        linkOnPaste: true,
        openOnClick: false,
      }),
      Image,
    ],
    autofocus: false,
    editorProps: {
      attributes: {
        id,
        class: 'focus-visible:outline-none h-[400px] overflow-auto',
      },
    },
    content: value,
    onUpdate: (props) => {
      onChange(props.editor.getHTML())
    },
  })

  return (
    <>
      <Toolbar editor={editor} />

      <EditorContent
        editor={editor}
        className={clsx(
          'rounded p-3 border border-surface-border prose prose-invert prose-p:m-0 prose-headings:m-0 min-w-full bg-surface-b',
          {
            'border-[var(--red-300)]': invalid,
          },
        )}
      />
    </>
  )
}
