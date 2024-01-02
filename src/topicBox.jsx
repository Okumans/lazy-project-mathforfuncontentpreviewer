import AnimateHeight from 'react-animate-height';
import { useState } from "react";
import { FaLock, FaUnlock } from "react-icons/fa";
import { SpecialText } from './specialText';

export const TopicBox = ({ references, title, description, topics, image, video }) => {
    const [height, setHeight] = useState(0);

    return <div className="flex px-4 w-fit h-fit justify-center bg-white bg-opacity-30 rounded-full shadow-md backdrop-blur-sm ">
        <div className="flex flex-col p-3 w-full gap-2">
            <button
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
                                <p key={reference.rawContent} className="w-fit p-1 px-2 text-white text-base md:text-lg font-semibold bg-white bg-opacity-30 rounded-lg shadow-md">{reference.contentNoStyle}</p>
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
                        <div className="pb-2 w-full text-left text-white text-base md:text-lg font-medium pl-1">{description.content}</div>

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

                        {/* topics */}
                        <div className="flex gap-1">
                            {topics.map((topic) => 
                                <p>{topic.content}</p>
                            )}
                        </div>

                    </div>
                </AnimateHeight>
            </button>
        </div>
    </div>
}

// TODO: add key word field
export class TopicBoxCreator {
    constructor(
        references,
        title,
        description = null,
        topics = null,
        image = null,
        video = null
    ) {
        this.references = references;
        this.title = title;
        this.description = description;
        this.topics = topics;
        this.image = image;
        this.video = video

        // change normal string to SpecialText if need **all text use below is all SpecialText for latex support 
        if (this.references) SpecialText.recursiveNestToSpecialText(this.references);
        if (this.topics) SpecialText.recursiveNestToSpecialText(this.topics);
        this.title = SpecialText.toSpecialTextIfNotUndefined(this.title);
        this.description = SpecialText.toSpecialTextIfNotUndefined(this.description);
    }

    get content() {
        return <TopicBox
            references={this.references}
            title={this.title}
            description={this.description}
            topics={this.topics}
            image={this.image}
            video={this.video}
        />
    }

    contentWithKey(key) {
        return <TopicBox
            key={key}
            references={this.references}
            title={this.title}
            description={this.description}
            topics={this.topics}
            image={this.image}
            video={this.video}
        />
    }

    static fromObject(dict) {
        const { references,
            title,
            description,
            topics,
            image,
            video } = dict

        return new TopicBoxCreator(
            references,
            title,
            description,
            topics,
            image,
            video)
    }
}