import AnimateHeight from "react-animate-height"
import { useState } from "react"
import { SpecialText } from "./specialText"
import { useEffect } from "react"

const defaultComponentBoxs = {
    references: true,
    title: true,
    description: false,
    equation: false,
    table: false,
    definition: false,
    image: false,
    video: false,
    keywords: false
}

export const ComponentsManager = ({ content, setContent_, removeContent_ }) => {
    const [componentBoxs, setComponentBoxs] = useState(defaultComponentBoxs);
    const setComponentBoxByKey = (key, value) => {
        setComponentBoxs(prevComponentBoxs => ({ ...prevComponentBoxs, [key]: value }));
    };

    useEffect(() => {
        content && Object.entries(content).forEach(([key, value]) => {
            if (key === "image" || key === "video")
                setComponentBoxByKey(key, (!!value || value === ""));
            else
                setComponentBoxByKey(key, !!value);
            // console.log(componentBoxs, !!value, key)
        });
    }, [content]);

    const handler = {
        references: (e) => setComponentBoxByKey("references", true),
        title: (e) => setComponentBoxByKey("title", true),
        description: (e) => {
            setComponentBoxByKey("description", e.target.checked);
            if (e.target.checked) {
                if (!content.description)
                    setContent_("description", new SpecialText(""));
            }
            else {
                if (content.description)
                    removeContent_("description");
            }
        },
        equation: (e) => {
            setComponentBoxByKey("equation", e.target.checked);
            if (e.target.checked) {
                if (content.table) {
                    setComponentBoxByKey("table", false);
                    removeContent_("table");
                }
                if (!content.equation)
                    setContent_("equation", new SpecialText("", true));
            }
            else {
                if (content.equation)
                    removeContent_("equation");
            }
        },
        table: (e) => {
            setComponentBoxByKey("table", e.target.checked);
            if (e.target.checked) {
                if (content.equation) {
                    setComponentBoxByKey("equation", false);
                    removeContent_("equation");
                }
                if (!content.table)
                    setContent_("table", [[new SpecialText("", true)], [[new SpecialText("", true)]]]);
            }
            else {
                if (content.table)
                    removeContent_("table");
            }
        },
        definition: (e) => {
            setComponentBoxByKey("definition", e.target.checked);
            if (e.target.checked) {
                if (!content.definition)
                    setContent_("definition", [[new SpecialText(""), new SpecialText("")]]);
            }
            else {
                if (content.definition)
                    removeContent_("definition");
            }
        },
        image: (e) => {
            setComponentBoxByKey("image", e.target.checked);
            console.log("image", e.target.checked);
            if (e.target.checked) {
                if (content.video || content.video === "") {
                    setComponentBoxByKey("video", false);
                    removeContent_("video")
                }

                if (!content.image && content.image !== "")
                    setContent_("image", "");
            }
            else {
                if (content.image || content.image === "")
                    removeContent_("image");
            }
        },
        video: (e) => {
            setComponentBoxByKey("video", e.target.checked);
            if (e.target.checked) {
                if (content.image || content.image === "") {
                    setComponentBoxByKey("image", false);
                    removeContent_("image")
                }
                if (!content.video && content.video !== "")
                    setContent_("video", "");
            }
            else {
                if (content.video || content.video === "")
                    removeContent_("video");
            }
        },
        keywords: (e) => {
            setComponentBoxByKey("keywords", e.target.checked);
            if (e.target.checked) {
                if (!content.keywords)
                    setContent_("keywords", [new SpecialText("")]);
            }
            else {
                if (content.keywords)
                    removeContent_("keywords");
            }
        }
    }

    return <div className="flex flex-wrap gap-1.5 mb-2">
        {Object.entries(componentBoxs).map(([key, value]) =>
            <label className="bg-white rounded-md p-1 font-medium flex gap-2 w-fit flex-grow">
                <input
                    type="checkbox"
                    checked={componentBoxs[key]}
                    onChange={handler[key]} />
                {key}
            </label>
        )}
    </div>
}