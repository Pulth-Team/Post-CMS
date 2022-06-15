import React, { FunctionComponent, useEffect, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./tools";
import { resolveHref } from "next/dist/shared/lib/router/router";

export const EditorContainer = ({ editorRef, children, data, options }) => {
  const [editorInstance, setEditor] = useState(null);

  const [called, setCalled] = useState(1);
  const { data, optTools, holder, ...editorOptions } = options;
  const isCreated = false;
  // initialize
  useEffect(() => {
    // create instance
    if (isCreated) return;

    const editor = new EditorJS({
      /**
       * Id of Element that should contain the Editor
       */
      holder: "editor-js",

      /**
       * Available Tools list.
       * Pass Tool's class or Settings object for each Tool you want to use
       */
      tools: tools || optTools,

      /**
       * Previously saved data that should be rendered
       */
      data: data || {},

      initialBlock: "paragraph",

      // Override editor options
      ...editorOptions,
    });

    setEditor(editor);
    isCreated = true;
    // cleanup
    return () => {
      new Promise(async (resolve, reject) => {
        setCalled(called + 1);

        if (!isCreated) {
          await editor.isReady;
          editor.destroy();

          setEditor(null);
        }
      });
    };
  }, [tools]);

  // set reference
  useEffect(() => {
    if (!editorInstance) {
      return;
    }
    // Send instance to the parent
    if (editorRef) {
      editorRef(editorInstance);
    }
  }, [editorInstance, editorRef]);

  return (
    <React.Fragment>
      {!children && <div className="w-full" id="editor-js"></div>}
      {children}
    </React.Fragment>
  );
};

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
