"use client";

import { ButtonEdit } from "../../components/ButtonEdit";
import Button from "../../components/Button";
import ButtonClear from "../ButtonClear";

interface ActionSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onEdit: () => void;
    isEditing: boolean;
    handleEditClick: () => void;
}

export default function ActionSidebar({
  isOpen,
  onClose,
  isEditing,
  handleEditClick,
}: ActionSidebarProps) {
  return (
    <>

      <aside className={`fixed top-0 left-0 h-full w-64 bg-[var(--dropdown-bg)] shadow-xl z-50 p-6  transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <h3 className="text-lg font-semibold mb-6">Actions</h3>

        <div className="space-y-4">
          <ButtonEdit onClick={handleEditClick}>
            {isEditing ? "Cancel" : "Edit"}
          </ButtonEdit>

          <Button>Generate</Button>
        </div>
      </aside>
    </>
  );
}