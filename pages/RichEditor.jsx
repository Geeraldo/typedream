import Head from 'next/head'
import { useState, useCallback } from 'react'
import { createEditor, Transforms, Editor, Text } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { FiBold, FiUnderline, FiItalic, FiCode } from 'react-icons/fi'
import { AiFillMacCommand } from "react-icons/ai";
import Toolbar from './Toolbar'

export default function RichEditor() {
  const CustomEditor = {
    isBoldMarkActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.bold === true,
        universal: true,
      })
      
  
      return !!match
    },
  
    isCodeBlockActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.type === 'code',
      })
  
      return !!match
    },
    isUnderlineMarkActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.underline === true,
        universal: true,
      })
      
  
      return !!match
    },
    isItalicMarkActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.italic === true,
        universal: true,
      })
      
  
      return !!match
    },
  
    toggleBoldMark(editor) {
      const isActive = CustomEditor.isBoldMarkActive(editor)
      Transforms.setNodes(
        editor,
        { bold: isActive ? null : true },
        { match: n => Text.isText(n), split: true }
      )
    },
    toggleUnderline(editor) {
      const isActive = CustomEditor.isUnderlineMarkActive(editor)
      Transforms.setNodes(
        editor,
        { underline: isActive ? null : true },
        { match: n => Text.isText(n), split: true }
      )
    },
    toggleItalic(editor) {
      const isActive = CustomEditor.isItalicMarkActive(editor)
      Transforms.setNodes(
        editor,
        { italic: isActive ? null : true },
        { match: n => Text.isText(n), split: true }
      )
    },
  
    toggleCodeBlock(editor) {
      const isActive = CustomEditor.isCodeBlockActive(editor)
      Transforms.setNodes(
        editor,
        { type: isActive ? null : 'code' },
        { match: n => Editor.isBlock(editor, n) }
      )
    },
    
  }
  const initialValue = [
    {
      type: 'paragraph',
      children: [
        { text: 
          'lorem Ipsum is simply dummy text of the printing and typesetting industry.' 
        }
      ],
    },
  ]
  const [editor] = useState(() => withReact(createEditor()))
  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])
  const CodeElement = props => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    )
  }
  const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>
  }
  const renderLeaf = useCallback(props => {
    console.log(props)
    return <Leaf {...props} />
  }, [])
  return (
    <div className="home">
      <main>
        <div className="flex items-center justify-center mt-5 h-5/6">
          <div className="w-10/12 rounded overflow-hidden shadow-lg">
            <div className="flex justify-start">
            <button
            className="bg-slate-50 mx-5"
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleBoldMark(editor)
          }}
        >
        <FiBold />
        </button>
        <button
        className="bg-slate-50 mx-5"
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleUnderline(editor)
          }}
        >
        <FiUnderline />
        </button>
        <button
          className="bg-slate-50 mx-5"
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleItalic(editor)
          }}
        >
          <FiItalic />
        </button>
        <button
          className="bg-slate-50 mx-5"
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleCodeBlock(editor)
          }}
        >
          <FiCode />
        </button>
            </div>
            <div className="px-6 py-4">
            <Slate editor={editor} value={initialValue}>
      <div>
      </div>
      <div className="divide-y divide-zinc-400">
      </div>
      <Editable
      className="h-60"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={event => {
          if (!event.metaKey) {
            return
          }
          switch (event.key) {
            case '`': {
              event.preventDefault()
              const [match] = Editor.nodes(editor, {
                match: n => n.type === 'code',
              })
              Transforms.setNodes(
                editor,
                { type: match ? null : 'code' },
                { match: n => Editor.isBlock(editor, n) }
              )
              break
            }

            case 'b': {
              event.preventDefault()
              Transforms.setNodes(
                editor,
                { bold: true },
                { match: n => Text.isText(n), split: true }
              )
              break
            }

            case 'i': {
              event.preventDefault()
              Transforms.setNodes(
                editor,
                { italic: true },
                { match: n => Text.isText(n), split: true }
              )
              break
            }

            case 'u': {
              event.preventDefault()
              Transforms.setNodes(
                editor,
                { underline: true },
                { match: n => Text.isText(n), split: true }
              )
              break
            }
            
            case 'q': {
              event.preventDefault()
              Transforms.setNodes(
                editor,
                { quote: true },
                { match: n => Text.isText(n), split: true }
              )
              break
            }
          }
        }}
      />
    </Slate>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const Leaf = ({ attributes, children, leaf }) => {
  console.log(children);
  
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }
  if (leaf.quote) {
    children = <q>{children}</q>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }
  return <span {...attributes}>{children}</span>
}

