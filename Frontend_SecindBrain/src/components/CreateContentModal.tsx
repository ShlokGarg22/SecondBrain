import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import DottedButton from "./DottedButton";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Medium = "medium",
  Reddit = "reddit"
}

export function CreateContentModal({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();
  const [type, setType] = useState(ContentType.Youtube);
  const [loading, setLoading] = useState(false);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    setLoading(true);
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          link,
          title,
          type
        },
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );
      onClose();
    } catch (err) {
      console.error("Failed to add content", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {open && (
        <div>
          {/* Background overlay */}
          <div className="w-screen h-screen bg-black fixed top-0 left-0 opacity-40 z-40"></div>

          {/* Modal */}
          <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-50">
            <div className="flex flex-col justify-center items-center w-full max-w-lg mx-auto">
              <div className="bg-white p-6 rounded-2xl shadow-xl w-full space-y-6 relative">
                {/* Close Icon */}
                <div className="absolute top-4 right-4 cursor-pointer" onClick={onClose}>
                  <CrossIcon />
                </div>

                {/* Inputs */}
                <div className="space-y-4">
                  <Input reference={titleRef} placeholder={"Title"} />
                  <Input reference={linkRef} placeholder={"Link"} />
                </div>

                {/* Type Selector */}
                <div>
                  <h1 className="text-center text-lg font-semibold mb-2">Type</h1>
                  <div className="flex gap-3 justify-center flex-wrap">
                    <DottedButton
                      onClick={() => setType(ContentType.Youtube)}
                      loading={false}
                      disabled={type === ContentType.Youtube}
                    >
                      Youtube
                    </DottedButton>
                    <DottedButton
                      onClick={() => setType(ContentType.Twitter)}
                      loading={false}
                      disabled={type === ContentType.Twitter}
                    >
                      Twitter
                    </DottedButton>
                    <DottedButton
                      onClick={() => setType(ContentType.Medium)}
                      loading={false}
                      disabled={type === ContentType.Medium}
                    >
                      Medium
                    </DottedButton>
                    <DottedButton
                      onClick={() => setType(ContentType.Reddit)}
                      loading={false}
                      disabled={type === ContentType.Reddit}
                    >
                      Reddit
                    </DottedButton>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-center">
                  <DottedButton onClick={addContent} loading={loading}>
                    Submit
                  </DottedButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
