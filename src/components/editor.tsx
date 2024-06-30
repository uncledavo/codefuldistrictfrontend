import { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { oneDark } from '@codemirror/theme-one-dark';
import { linter, lintGutter } from '@codemirror/lint';

export function Editor() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const state = EditorState.create({
        doc: 'Hello World',
        extensions: [
          keymap.of(defaultKeymap),
          lineNumbers(),
          oneDark,
          lintGutter(),
          linter(() => {
            const diagnostics = [];
            // Add your linting logic here
            return diagnostics;
          }),
        ],
      });

      const view = new EditorView({
        state,
        parent: containerRef.current,
      });

      // Cleanup function to destroy the view when the component unmounts
      return () => {
        view.destroy();
      };
    }
  }, []);

  return <div ref={containerRef} />;
}