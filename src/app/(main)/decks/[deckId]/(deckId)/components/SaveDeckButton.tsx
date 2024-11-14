// import {
//   addDeckToSaved,
//   isDeckSaved,
//   removeDeckFromSaved,
// } from "@/actions/actions";
// import {
//   BookmarkAddOutlined,
//   BookmarkRemoveOutlined,
// } from "@mui/icons-material";

// interface SaveDeckButtonProps {
//   userId: string;
//   deckId: string;
// }

// export default async function SaveDeckButton({
//   userId,
//   deckId,
// }: SaveDeckButtonProps) {
//   const isSaved = await isDeckSaved(userId, deckId);

//   const handleSaveDeck = async () => {
//     await addDeckToSaved(userId, deckId);
//   };

//   const handleRemoveDeck = async () => {
//     await removeDeckFromSaved(userId, deckId);
//   };
//   return (
//     <>
//       <button
//         onClick={isSaved ? handleRemoveDeck : handleSaveDeck}
//         className="flex w-full items-center gap-3 py-3 px-2 text-sm font-semibold text-white/70 hover:bg-white/10 rounded"
//         role="menuitem"
//       >
//         {isSaved ? (
//           <>
//             <BookmarkRemoveOutlined className="text-white/50" />
//             Remove from library
//           </>
//         ) : (
//           <>
//             <BookmarkAddOutlined className="text-white/50" />
//             Add to library
//           </>
//         )}
//       </button>
//     </>
//   );
// }

import {
  addDeckToSaved,
  isDeckSaved,
  removeDeckFromSaved,
} from "@/actions/actions";
import {
  BookmarkAddOutlined,
  BookmarkRemoveOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";

interface SaveDeckButtonProps {
  clerkId: string;
  deckId: string;
}

const SaveDeckButton = ({ clerkId, deckId }: SaveDeckButtonProps) => {
  const [isSaved, setIsSaved] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load saved status from localStorage (if available)
  useEffect(() => {
    const storedStatus = localStorage.getItem(`saved_${deckId}`);
    if (storedStatus !== null) {
      setIsSaved(JSON.parse(storedStatus));
      setLoading(false);
    } else {
      // If not in localStorage, fetch from backend
      fetchSavedStatus();
    }
  }, [clerkId, deckId]);

  const fetchSavedStatus = async () => {
    try {
      const saved = await isDeckSaved(clerkId, deckId);
      setIsSaved(saved);
      localStorage.setItem(`saved_${deckId}`, JSON.stringify(saved));
    } catch (error) {
      console.error("Failed to fetch saved status:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSaveStatus = async () => {
    try {
      if (isSaved) {
        await removeDeckFromSaved(clerkId, deckId);
      } else {
        await addDeckToSaved(clerkId, deckId);
      }
      const newStatus = !isSaved;
      setIsSaved(newStatus);
      localStorage.setItem(`saved_${deckId}`, JSON.stringify(newStatus));
    } catch (error) {
      console.error("Failed to update save status:", error);
    }
  };

  if (loading) return <button disabled>...</button>;

  return (
    <button
      onClick={toggleSaveStatus}
      className="flex w-full items-center gap-3 py-3 px-2 text-sm font-semibold text-white/70 hover:bg-white/10 rounded"
    >
      {isSaved ? (
        <>
          <BookmarkRemoveOutlined className="text-white/50" />
          Remove from library
        </>
      ) : (
        <>
          <BookmarkAddOutlined className="text-white/50" />
          Add to library
        </>
      )}
    </button>
  );
};

export default SaveDeckButton;
