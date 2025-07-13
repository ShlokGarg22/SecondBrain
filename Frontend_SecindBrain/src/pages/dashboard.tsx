import { useEffect, useState } from "react";
import DottedButton from "../components/DottedButton";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Logo } from "../icons/Logo";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { MediumIcon } from "../icons/Medium";
import { RedditIcon } from "../icons/Reddit";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();
  const [filter, setFilter] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    refresh();
  }, [modalOpen, refresh]);

  const filteredContents = filter
    ? contents.filter((content: { type: string }) => content.type === filter)
    : contents;

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <div className="w-full xl:max-w-7xl mx-auto px-6 space-y-12">

        {/* Header */}
        <header className="flex justify-between items-center py-10 border-b border-gray-200">
          <div className="flex items-center text-3xl font-bold gap-4">
            <Logo />
            <span>SecondBrain</span>
          </div>

          <div className="flex gap-4">
            <DottedButton onClick={() => setModalOpen(true)} loading={false}>
              <div className="flex items-center gap-2">
                <PlusIcon />
                Add content
              </div>
            </DottedButton>
            <DottedButton onClick={() => navigate("/ShareDbrain")} loading={false}>
              <div className="flex items-center gap-2">
                <ShareIcon />
                Share brain
              </div>
            </DottedButton>
          </div>
        </header>

        {/* Filters */}
        <section className="flex flex-wrap justify-center gap-4">
          <DottedButton onClick={() => setFilter(null)} loading={false} disabled={filter === null}>
            All
          </DottedButton>
          <DottedButton onClick={() => setFilter("twitter")} loading={false} disabled={filter === "twitter"}>
            <div className="flex items-center gap-2">
              <TwitterIcon />
              Twitter
            </div>
          </DottedButton>
          <DottedButton onClick={() => setFilter("youtube")} loading={false} disabled={filter === "youtube"}>
            <div className="flex items-center gap-2">
              <YoutubeIcon />
              Youtube
            </div>
          </DottedButton>
          <DottedButton onClick={() => setFilter("medium")} loading={false} disabled={filter === "medium"}>
            <div className="flex items-center gap-2">
              <MediumIcon />
              Medium
            </div>
          </DottedButton>
          <DottedButton onClick={() => setFilter("reddit")} loading={false} disabled={filter === "reddit"}>
            <div className="flex items-center gap-2">
              <RedditIcon />
              Reddit
            </div>
          </DottedButton>
        </section>

        {/* Cards */}
  <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 pb-16">
  {filteredContents.map((content) => (
    <Card
      key={content._id}
      title={content.title}
      link={content.link}
      type={content.type}
      contentId={content._id}
      onDelete={() => refresh()}
    />
  ))}
</main>


      </div>
    </div>
  );
}
