import AnimateHeight from 'react-animate-height';
import { useState } from "react";
import { FaLock, FaUnlock } from "react-icons/fa";
import { SpecialText } from './specialText';

export const ContentBox = ({ references, title, description, equation, table, definition, image, video }) => {
    const [height, setHeight] = useState("auto");
    const [contentLock, setContentLock] = useState(false);

    return <div className="flex w-full h-fit justify-center bg-white bg-opacity-30 rounded-lg shadow-md backdrop-blur-sm ">
        <div className="flex flex-col p-3 w-full gap-2">

            {/* lock button */}
            <button
                className={"absolute w-fit top-2 right-2 bg-white rounded-full transition-all " + (contentLock ? "p-4 bg-opacity-50 -translate-y-0.5 translate-x-0.5" : "p-3 bg-opacity-20")}
                onClick={() => setContentLock(!contentLock)}>
                {contentLock ?
                    <FaUnlock width="10" height="10" fill="white" /> :
                    <FaLock width="10" height="10" fill="white" />
                }
            </button>

            <div
                className="w-full"
                aria-expanded={height !== 0}
                aria-controls="panel"
                onClick={() => {
                    if (!contentLock) setHeight(height === 0 ? 'auto' : 0)
                }}
            >
                <AnimateHeight
                    id="panel"
                    duration={500}
                    height={height}>

                    {/* references */}
                    <div className="flex justify-between">
                        <div className="flex gap-2">
                            {references.map((reference) =>
                                <button
                                    key={reference.rawContent}
                                    className="w-fit p-1 px-2 text-white text-base md:text-lg font-semibold bg-white bg-opacity-30 rounded-lg shadow-md hover:scale-105 hover:bg-opacity-40 transition ease-in-out"
                                    onClick={(event) => {
                                        event.stopPropagation();
                    
                                        
                                    }}
                                    >{reference.contentNoStyle}</button>
                            )}
                        </div>
                    </div>

                </AnimateHeight>

                {/* title */}
                <div className="w-full pt-2 text-white text-2xl md:text-4xl font-extrabold text-left">{title.content}</div>

                <AnimateHeight
                    id="panel"
                    duration={500}
                    height={height}
                >
                    <div className="flex flex-col gap-2">

                        {/* description */}
                        <div className="pb-2 w-full text-left text-white text-base md:text-lg font-medium pl-1">{description?.content}</div>

                        {/* image or video */}
                        {
                            image ?
                                <div className={`flex w-full justify-center rounded-md bg-no-repeat bg-cover bg-center bg-white`} style={{ backgroundImage: `url('${image}')` }}>
                                    <div className="w-full h-full flex justify-center rounded-md backdrop-blur-xl">
                                        <img src={image} className="md:my-2 drop-shadow-md w-full md:w-1/2 lg:w-5/12"></img>
                                    </div>
                                </div>
                                : video ?
                                    <div className={`flex w-full justify-center rounded-md bg-no-repeat bg-cover bg-center bg-black`}>
                                        <div className="w-full h-full flex justify-center rounded-md backdrop-blur-xl">
                                            <iframe className="md:my-2 drop-shadow-md h-56 w-full md:w-1/2 lg:w-5/12" src={video} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                        </div>
                                    </div>
                                    : null
                        }

                        {/* table or equation */}
                        <div className="flex gap-1 flex-col md:flex-col lg:flex-row">


                            {equation ?
                                <div className="p-4 flex items-center min-w-fit text-white text-xl md:text-2xl bg-white bg-opacity-20 rounded-lg shadow-md flex-grow">
                                    <div className="w-full text-center">{equation?.contentNoStyle}</div>
                                </div>
                                : table ?
                                    <div className="p-2 md:p-4 min-w-fit text-white text-xl md:text-2xl bg-white bg-opacity-20 rounded-lg shadow-md flex-grow">
                                        <TableGenerator info={table} />
                                    </div>
                                    : null}


                            {/* definition */}
                            {definition ?
                                <table className="gap-2 h-fit">
                                    {definition.map(([key, value]) =>
                                        <tbody key={key.rawContent + value.rawContent}>
                                            <tr>
                                                <td><div className="p-1 my-0.5 flex text-white text-base md:text-lg font-medium bg-white bg-opacity-30 rounded-lg shadow-md justify-center">{key.content}</div></td>
                                                <td><div className="p-1 text-white text-base md:text-lg font-medium bg-opacity-30 text-left break-all">{value.content}</div></td>
                                            </tr>
                                        </tbody>
                                    )}
                                </table>
                                : null}
                        </div>

                    </div>
                </AnimateHeight>
            </div>
        </div>
    </div>
}

const TableGenerator = ({ info }) => {
    const [headers, contents] = info;

    return <table className="border-2 border-white border-solid w-full ">
        <thead>
            <tr>
                {headers.map((header) => <th key={header.rawContent} className="border-2 bg-white bg-opacity-20 border-white border-solid p-2">{header.content}</th>)}
            </tr>
        </thead>

        <tbody>
            {contents.map((row, index) =>
                <tr key={index} className="border-2 break-all border-white border-solid">{row.map((col) =>
                    <td key={col.rawContent} className="border-2 py-3 text-sm sm:text-lg md:text-xl lg:text-2xl border-white border-solid px-3">
                        <div>
                            {col.content}
                        </div>
                    </td>)}
                </tr>)}
        </tbody>
    </table>
}


//TODO: make tag usable

// required:
//     - topics: [string / SpecialText]
//     - title: [string / SpecialText]

// optional:
//     - description: string / SpecialText
//     - equation: SpecialText / table: [[SpecialText, ...], [[SpecialText, ...], ...]]
//     - definition: [[SpecialText, SpecialText], ...]
//     - image: string-url / video: string-url (must be https://www.youtube.com/embed/)
//     - keywords: [string]

export class ContentBoxCreator {
    constructor(
        references,
        title,
        description = undefined,
        equation = undefined,
        table = undefined,
        definition = undefined,
        image = undefined,
        video = undefined,
        keywords = undefined
    ) {
        this.references = references;
        this.title = title;
        this.description = description;
        this.equation = equation;
        this.table = table;
        this.definition = definition;
        this.image = image;
        this.video = video
        this.keywords = keywords;

        // change normal string to SpecialText if need **all text use below is all SpecialText for latex support 
        if (this.references) SpecialText.recursiveNestToSpecialText(this.references);
        if (this.table) SpecialText.recursiveNestToSpecialText(this.table);
        if (this.definition) SpecialText.recursiveNestToSpecialText(this.definition)
        this.title = SpecialText.toSpecialTextIfNotUndefined(this.title);
        this.description = SpecialText.toSpecialTextIfNotUndefined(this.description);
        this.equation = SpecialText.toSpecialTextIfNotUndefined(this.equation)
    }

    get content() {
        return <ContentBox
            references={this.references}
            title={this.title}
            description={this.description}
            equation={this.equation}
            table={this.table}
            definition={this.definition}
            image={this.image}
            video={this.video}
        />
    }

    contentWithKey(key) {
        return <ContentBox
            key={key}
            references={this.references}
            title={this.title}
            description={this.description}
            equation={this.equation}
            table={this.table}
            definition={this.definition}
            image={this.image}
            video={this.video}
        />
    }

    static fromObject(dict) {
        const { references,
            title,
            description,
            equation,
            table,
            definition,
            image,
            video,
            keywords } = dict

        return new ContentBoxCreator(
            references,
            title,
            description,
            equation,
            table,
            definition,
            image,
            video,
            keywords)
    }
}