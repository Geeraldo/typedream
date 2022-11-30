import React from 'react'

export default function Toolbar({}) {
  const Leaf = ({ attributes, children, leaf }) => {
  
  if (leaf.bold) {
    children = <strong>{props.children}</strong>
  }

  if (leaf.italic) {
    children = <em>{props.children}</em>
  }
  if (leaf.quote) {
    children = <q>{props.children}</q>
  }

  if (leaf.underline) {
    children = <u>{props.children}</u>
  }
  return <span {...attributes}>{props.children}</span>
}

}
