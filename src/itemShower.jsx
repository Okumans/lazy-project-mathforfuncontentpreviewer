import { SpecialText } from "./specialText";
import { RxCross2 } from "react-icons/rx"
import { MdAdd } from "react-icons/md";
import { useState } from "react";

function changeArraySizeWithPadding(arr, newSize, paddingFn = ((i) => 0)) {
  if (newSize >= arr.length) {
    const oldSize = arr.length;
    arr.length = newSize;
    for (let i = oldSize; i < newSize; i++) {
      arr[i] = paddingFn(i);
    }
  } else {
    arr.splice(newSize);
  }
  return arr;
}


export function ShowKey({ kkey, content, setContent_ }) {
  return content ? <>
    <div className='bg-white flex-grow bg-opacity-35 flex flex-col rounded-lg gap-1 px-2 py-2'>
      <p className='text-2xl font-bold text-white capitalize'>{kkey}</p>
      <div className='flex items-center gap-1'>
        <input
          className="flex-grow rounded-lg p-1 self-center"
          type='text'
          value={content[kkey]?.rawContent}

          onChange={(e) => {
            setContent_(kkey,
              SpecialText.fromString(e.target.value,
                content[kkey]?.isLatex || false,
                content[kkey]?.classes || ""));
          }} />
        <label className="text-white font-bold bg-white rounded-md p-1 px-2 bg-opacity-25 shadow-md">
          <input
            className="mr-1"
            type='checkbox'
            checked={content[kkey]?.isLatex}
            onChange={(e) => {
              setContent_(kkey,
                SpecialText.fromString(content[kkey]?.rawContent || "",
                  e.target.checked,
                  content[kkey]?.classes || ""));
            }}
          />
          isLatex
        </label>
      </div>
    </div>
  </> : null;
}

export function ShowPlain({ kkey, content, setContent_ }) {
  return content ? <>
    <div className='bg-white flex-grow bg-opacity-35 flex flex-col rounded-lg gap-1 px-2 py-2'>
      <p className='text-2xl font-bold text-white capitalize'>{kkey}</p>
      <div className='flex items-center gap-1'>
        <input
          className="flex-grow rounded-lg p-1 self-center"
          type='text'
          value={content[kkey]}

          onChange={(e) => {
            setContent_(kkey, e.target.value);
          }} />
      </div>
    </div>
  </> : null;
}

export function ShowKeys({ kkey, content, setContent_ }) {
  return content && Array.isArray(content[kkey]) ? <>
    <div className='bg-white flex-grow bg-opacity-35 flex flex-col rounded-lg gap-2.5 px-2 py-2'>
      <div className="flex justify-between">
        <p className='text-2xl font-bold text-white capitalize'>{kkey}</p>
        <button
          className="py-1 px-1.5 bg-white rounded-lg bg-opacity-30"
          onClick={() => {
            setContent_(kkey, [...content[kkey], SpecialText.fromString("")]);
          }}>
          <MdAdd className='w-5 h-5' color="white" />
        </button>
      </div>
      <div className=" flex flex-col gap-1">
        {content[kkey].map((item, index) =>
          <div className='flex items-center gap-1' key={index}>

            <button
              className="p-1 bg-white rounded-lg bg-opacity-30"
              onClick={() => {
                setContent_(kkey, [...content[kkey].slice(0, index), ...content[kkey].slice(index + 1,)]);
              }}>
              <RxCross2 className='w-5 h-5' color="white" />
            </button>

            <input
              className="flex-grow rounded-lg p-1 self-center"
              type='text'
              value={item?.rawContent}
              onChange={(e) => {
                const temp = [...content[kkey]];
                temp[index] = SpecialText.fromString(
                  e.target.value,
                  content[kkey][index].isLatex || false,
                  content[kkey][index].classes || "");
                setContent_(kkey, temp);
              }} />
            <label className="text-white font-bold bg-white rounded-md p-1 px-2 bg-opacity-25 shadow-md">
              <input
                className="mr-1"
                type='checkbox'
                checked={item?.isLatex}
                onChange={(e) => {
                  const temp = [...content[kkey]];
                  temp[index] = SpecialText.fromString(
                    content[kkey][index].rawContent || "",
                    e.target.checked,
                    content[kkey][index].classes || "");
                  setContent_(kkey, temp);
                }}
              />
              isLatex
            </label>
          </div>)
        }
      </div>
    </div>
  </> : null;
}


export function Show2DKeys({ kkey, content, setContent_ }) {
  return content && Array.isArray(content[kkey]) ? <>
    <div className='bg-white flex-grow bg-opacity-35 flex flex-col rounded-lg gap-1 px-2 py-2'>
      <div className="flex justify-between">
        <p className='text-2xl font-bold text-white capitalize'>{kkey}</p>
        <button
          className="py-1 px-1.5 bg-white rounded-lg bg-opacity-30"
          onClick={() => {
            setContent_(kkey, [...content[kkey], [[SpecialText.fromString(""), SpecialText.fromString("")], [SpecialText.fromString(""), SpecialText.fromString("")]]]);
          }}>
          <MdAdd className='w-5 h-5' color="white" />
        </button>
      </div>
      {
        content[kkey].map((items, index) =>
          <div className="flex gap-1">
            <button
              className="p-1 bg-white rounded-lg bg-opacity-30"
              onClick={() => {
                setContent_(kkey, [...content[kkey].slice(0, index), ...content[kkey].slice(index + 1,)]);
              }}>
              <RxCross2 className='w-5 h-5' color="white" />
            </button>
            <div className='bg-white bg-opacity-25 flex-grow flex flex-col rounded-lg gap-1 px-2 py-2 shadow-md' key={index}>
              {
                items.map((item, indexx) =>
                  <div className='flex items-center gap-1' key={indexx}>
                    <input
                      className="flex-grow rounded-lg p-1 self-center"
                      type='text'
                      value={item?.rawContent}
                      onChange={(e) => {
                        const temp = [...content[kkey]];
                        temp[index][indexx] = SpecialText.fromString(
                          e.target.value,
                          content[kkey][index][indexx].isLatex || false,
                          content[kkey][index][indexx].classes || "");
                        setContent_(kkey, temp);
                      }} />
                    <label className="text-white font-bold bg-white rounded-md p-1 px-2 bg-opacity-25 shadow-md">
                      <input
                        className="mr-1"
                        type='checkbox'
                        checked={item?.isLatex}
                        onChange={(e) => {
                          const temp = [...content[kkey]];
                          temp[index][indexx] = SpecialText.fromString(
                            content[kkey][index][indexx].rawContent || "",
                            e.target.checked,
                            content[kkey][index][indexx].classes || "");
                          setContent_(kkey, temp);
                        }} />

                      isLatex
                    </label>
                  </div>)
              }
            </div>
          </div>)
      }
    </div>
  </> : null;
}

export function ShowTable({ kkey, content, setContent_ }) {
  const [colSize, setColsize] = useState(0);

  return content && Array.isArray(content[kkey]) ? <>
    <div className='bg-white flex-grow bg-opacity-35 flex flex-col rounded-lg gap-1 px-2 py-2 '>
      <div className="flex justify-between">
        <p className='text-2xl font-bold text-white capitalize'>{kkey}</p>
        <div className="flex gap-2">
          <button
            className="py-1 px-1.5 bg-white rounded-lg bg-opacity-30 flex gap-1 text-white font-semibold items-center"
            onClick={() => {
              setContent_(kkey, [content[kkey][0], [...content[kkey][1], changeArraySizeWithPadding(new Array, colSize, () => new Array)]]);
            }}>
            <p>Row</p>
            <MdAdd className='w-5 h-5' color="white" />
          </button>
          <label className="flex gap-1 text-white font-semibold items-center">
            Column
            <input
              type="number"
              className="w-20 py-1 px-1.5 bg-white rounded-lg bg-opacity-30 items-center"
              value={colSize}
              onChange={(e) => {
                setColsize(e.target.value);
                if (e.target.value >= 0)
                  setContent_(kkey,
                    [changeArraySizeWithPadding(
                      content[kkey][0],
                      e.target.value,
                      () => new SpecialText('')),
                    [...content[kkey][1].map((elm) =>
                      changeArraySizeWithPadding(
                        elm,
                        e.target.value,
                        () => new SpecialText('')))]]);
              }}>
            </input>

          </label>
        </div>
      </div>

      <div className='bg-white bg-opacity-25 flex flex-col rounded-lg gap-1 px-2 py-2 shadow-md'>
        <p className='text-xl font-bold text-white capitalize'>Header</p>
        {
          content[kkey][0]?.map((item, index) =>
            <div className='flex items-center gap-1' key={index}>
              <input
                className="flex-grow rounded-lg p-1 self-center"
                type='text'
                value={item?.rawContent}
                onChange={(e) => {
                  const temp = [...content[kkey]];
                  temp[0][index] = SpecialText.fromString(
                    e.target.value,
                    content[kkey][0][index].isLatex || false,
                    content[kkey][0][index].classes || "");
                  setContent_(kkey, temp);
                }} />
              <label className="text-white font-bold bg-white rounded-md p-1 px-2 bg-opacity-25 shadow-md">
                <input
                  className="mr-1"
                  type='checkbox'
                  checked={item?.isLatex}
                  onChange={(e) => {
                    const temp = [...content[kkey]];
                    temp[0][index] = SpecialText.fromString(
                      content[kkey][0][index].rawContent || "",
                      e.target.checked,
                      content[kkey][0][index].classes || "");
                    setContent_(kkey, temp);
                  }}
                />
                isLatex
              </label>
            </div>)
        }
      </div>

      <div className='bg-white bg-opacity-35 flex flex-col rounded-lg gap-1 px-2 py-2 shadow-md'>
        <p className='text-xl font-bold text-white'>Contents</p>
        {
          content[kkey][1]?.map((row, index) =>

            <div className="flex gap-1">
              <div className="flex gap-1">
                <button
                  className="p-1 bg-white rounded-lg bg-opacity-30"
                  onClick={() => {
                    setContent_(kkey, [content[kkey][0], [...content[kkey][1].slice(0, index), ...content[kkey][1].slice(index + 1,)]]);
                  }}>
                  <RxCross2 className='w-5 h-5' color="white" />
                </button>
              </div>
              <div className='border-solid border-white border-2 flex flex-grow flex-col rounded-lg gap-1 px-2 py-2 shadow-md' key={index}>
                {
                  row?.map((col, indexx) =>
                    <div className='flex items-center gap-1' key={indexx}>
                      <input
                        className="flex-grow rounded-lg p-1 self-center"
                        type='text'
                        value={col?.rawContent}
                        onChange={(e) => {
                          const temp = [...content[kkey]];
                          temp[1][index][indexx] = SpecialText.fromString(
                            e.target.value,
                            content[kkey][1][index][indexx].isLatex || false,
                            content[kkey][1][index][indexx].classes || "");
                          setContent_(kkey, temp);
                        }} />
                      <label className="text-white font-bold bg-white rounded-md p-1 px-2 bg-opacity-25 shadow-md">
                        <input
                          className="mr-1"
                          type='checkbox'
                          checked={col?.isLatex}
                          onChange={(e) => {
                            const temp = [...content[kkey]];
                            temp[1][index][indexx] = SpecialText.fromString(
                              content[kkey][1][index][indexx].rawContent || "",
                              e.target.checked,
                              content[kkey][1][index][indexx].classes || "");
                            setContent_(kkey, temp);
                          }} />
                        isLatex
                      </label>
                    </div>)
                }
              </div>
            </div>
          )
        }
      </div>

    </div>
  </> : null;
}