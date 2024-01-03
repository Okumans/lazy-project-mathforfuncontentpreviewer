import { useState } from 'react'
import { SpecialText } from './specialText';
import { ContentBoxCreator } from './contentBox';
import AnimateHeight from 'react-animate-height';
import { useEffect } from 'react';
import { ShowPlain, ShowKey, ShowKeys, Show2DKeys, ShowTable } from './itemShower';
import { MdOpenInFull } from "react-icons/md";

const defaultContent = `
{
  references: [
      {
          rawContent: "test",
          isLatex: false,
          classes: ""
      }
  ],
  title: {
      rawContent: "test",
      isLatex: false,
      classes: ""
  },
  description: {
      rawContent: "test",
      isLatex: false,
      classes: "test"
  },
  equation: {
      rawContent: "$test$",
      isLatex: true,
      classes: ""
  },
  image: "test"
}`;

function getValue(strContent) {
  try {
    let evaled = eval(`(${strContent})`);
    if (typeof evaled === 'object' && evaled.title != undefined && evaled.references != undefined) {
      const results = Object.fromEntries(Object.entries(evaled).map(([key, content]) => [key, !["image", "video"].includes(key) ? SpecialText.parseJSON(content) : content]));
      console.log(results);
      return results;
    }
  }
  catch (e) {
    return null
  }
}

function format(obj, tab=4)
{
    var str = JSON.stringify(obj, null, tab),
        arr = str.match(/".*?":/g);

    for(var i = 0; i < arr.length; i++)
        str = str.replace(arr[i], arr[i].replace(/"/g,''));

    return str;
}

function App() {
  const [textContent, setTextContent] = useState(defaultContent);
  const [content, setContent] = useState(null);
  const [height, setHeight] = useState(0);

  useEffect(() => { setContent(getValue(textContent)) }, [textContent]);

  function handled_copy_event() {
    const copied = content ? format(content, 0) : textContent;
    navigator.clipboard.writeText(`ContentBoxCreator.fromObject(${copied})`);
  }

  function setContent_(key, value) {
    console.log({ ...content, [key]: value }, "dasfasdfas")
    setContent({ ...content, [key]: value });
  }

  return (
    <div className="flex flex-row justify-center min-h-screen overflow-clip">
      <div className="flex flex-col w-full bg-purple-950 bg-fixed bg-cover items-center justify-start gap-5">
        <div className='w-5/6 flex justify-between mt-2'>
          <p className="text-white [text-shadow:0px_4px_4px_#00000040] font-bold text-4xl md:text-6xl lg:text-7xl text-center tracking-[0] leading-[normal]">
            preview
          </p>
          <div className='flex items-center gap-2'>
            <button
              className="bg-white bg-opacity-35 rounded-lg p-2 w-fit h-fit disabled:opacity-30"
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
          value={content ? format(content) : textContent}
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

            {content?.image ?
              <ShowPlain kkey="image" content={content} setContent_={setContent_} />
              : content?.video ?
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
          <div className="flex flex-col w-5/6 gap-2">
            {content ? ContentBoxCreator.fromObject(content).content : null}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App
