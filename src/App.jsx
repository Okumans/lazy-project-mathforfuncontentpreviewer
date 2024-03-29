import { useState } from 'react'
import { SpecialText } from './specialText';
import { ContentBoxCreator } from './contentBox';
import AnimateHeight from 'react-animate-height';
import { useEffect } from 'react';
import { ShowPlain, ShowKey, ShowKeys, Show2DKeys, ShowTable } from './itemShower';
import { MdOpenInFull } from "react-icons/md";
import { ComponentsManager } from './componentsManager';
import { IoMdRefresh } from "react-icons/io";

const defaultContent = `
{
  references: [
      {
          rawContent: "reference",
          isLatex: false,
          classes: ""
      }
  ],
  title: {
      rawContent: "untitled",
      isLatex: false,
      classes: ""
  },
}`;

function getValue(strContent) {
  try {
    let evaled = eval(`(${strContent})`);
    if (typeof evaled === 'object' && evaled.title != undefined && evaled.references != undefined) {
      console.log(evaled, "dfdsfasdfadsfasdfad");
      const results = Object.fromEntries(Object.entries(evaled).map(([key, content]) => [key, !["image", "video"].includes(key) ? SpecialText.parseJSON(content) : content]));
      console.log(results, "aaaaaaaa");
      return results;
    }
  }
  catch (e) {
    return null
  }
}

function format(obj, tab = 4, shorthand = false) {
  var str = JSON.stringify(obj, (key, value) => {
    if (value instanceof SpecialText) {
      return shorthand ? `<''${value.rawContent}''${value.isLatex ? " | " + true : ""}${value.classes.length ? " | {" + value.classes + "}" : ""}>` : value;
    }
    return value;

  }, tab),

    str = str.replace(/"([^"]*)":/g, (match, group) => `${group}:`);

  const regex = /"(<[^>]+>)"/g;
  str = str.replace(regex, '$1');

  console.log(str);

  return str;
}

function App() {
  const [textContent, setTextContent] = useState(defaultContent);
  const [content, setContent] = useState(null);
  const [height, setHeight] = useState(0);
  const [textAreaFocused, setTextAreaFocused] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => { setContent(getValue(textContent)) }, [textContent]);

  function handled_copy_event() {
    const copied = content ? format(content, 0) : textContent;
    navigator.clipboard.writeText(`ContentBoxCreator.fromObject(${copied})`);
  }

  function setContent_(key, value) {
    console.log({ ...content, [key]: value }, "dasfasdfas")
    setContent(preContent => ({ ...preContent, [key]: value }));
  }

  function removeContent_(key) {
    const temp = { ...content };
    delete temp[key];
    console.log(temp)
    setContent(temp);
  }


  return (
    <div className="flex flex-row justify-center min-h-screen overflow-clip">
      <div className="flex flex-col w-full bg-purple-950 bg-fixed bg-cover items-center justify-start gap-5">
        <div className='w-5/6 flex justify-between mt-2'>
          <p className="text-white [text-shadow:0px_4px_4px_#00000040] font-bold text-4xl md:text-6xl lg:text-7xl text-center tracking-[0] leading-[normal]">
            Previewer
          </p>
          <div className='flex items-center gap-2'>
            {/* <button 
              className='bg-white bg-opacity-35 rounded-lg p-2 w-fit h-fit disabled:opacity-30 hover:bg-opacity-55 transition-all'
              onClick={() => {
                const temp = {...content};
                console.log("refresh...")
                setForceUpdate(Math.random());
              }}>
              <IoMdRefresh className='w-6 h-6' fill="white" />
            </button> */}
            <button
              className="bg-white bg-opacity-35 rounded-lg p-2 w-fit h-fit disabled:opacity-30 hover:bg-opacity-55 transition-all"
              aria-expanded={height !== 0}
              aria-controls="panel"
              disabled={!(content?.references || content?.title)}
              onClick={() => {
                setHeight(height === 0 ? 'auto' : 0)
              }}
            ><MdOpenInFull className='w-6 h-6' fill="white" /></button>
            <button disabled={content === null} onClick={handled_copy_event} className="text-white font-bold bg-white bg-opacity-35 rounded-lg h-fit p-2 self-center disabled:opacity-30 hover:bg-opacity-55 transition-all">Copy content</button>
          </div>
        </div>


        <textarea
          className="w-5/6 min-h-56 h-auto flex flex-grow text-white  p-2 font-semibold rounded-md text-lg text-left tracking-[0] leading-[normal] bg-white bg-opacity-20"
          placeholder='json content.'
          value={content ? (!textAreaFocused ? format(content, 4, true) : textContent) : textContent}
          onFocus={() => setTextAreaFocused(true)}
          onBlur={() => {
            setTextAreaFocused(false)
            setTextContent(content ? format(content) : textContent);
          }}
          onChange={(e) => setTextContent(e.target.value)} />

        {/* 
        { references,
            title,
            description,
            equation,
            table,
            definition,
            image,
            video,
            keywords } */}

        <AnimateHeight
          id="panel"
          duration={500}
          height={height}
          className='w-5/6'>
          <ComponentsManager
            content={content}
            setContent_={setContent_}
            removeContent_={removeContent_} />

          <div className='w-full flex gap-2 flex-wrap'>
            <ShowKeys kkey="references" content={content} setContent_={setContent_} />
            <ShowKey kkey="title" content={content} setContent_={setContent_} />
            <ShowKey kkey="description" content={content} setContent_={setContent_} />

            {content?.equation ?
              <ShowKey kkey="equation" content={content} setContent_={setContent_} />
              : content?.table ?
                <ShowTable kkey="table" content={content} setContent_={setContent_} />
                : null
            }

            <Show2DKeys kkey="definition" content={content} setContent_={setContent_} />

            {content?.image || content?.image === "" ?
              <ShowPlain kkey="image" content={content} setContent_={setContent_} />
              : content?.video || content?.video === "" ?
                <ShowPlain kkey="video" content={content} setContent_={setContent_} />
                : null
            }

            <ShowKeys kkey="keywords" content={content} setContent_={setContent_} />
          </div>
        </AnimateHeight>


        <div className="w-full flex justify-center mb-1 mt-2">
          <hr className="w-5/6 border-y-2 opacity-60"></hr>
        </div>

        <div className="flex w-full justify-center m-4">
          <div className="flex flex-col w-5/6 gap-2" key={forceUpdate}>
            {content ? ContentBoxCreator.fromObject(content).content : null}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App
