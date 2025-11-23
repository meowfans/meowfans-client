"use client";

import { cn } from "@workspace/ui/lib/utils";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import {
  LoadingButton,
  LoadingButtonProps,
} from "@workspace/ui/globals/LoadingButton";
import { Button } from "@workspace/ui/components/button";
import { Modal } from "./Modal";

interface Props {
  relatedUserOrEntityId?: string;
  isOpen: boolean;
  title?: string;
  description?: string;
  subDescription?: string;
  onClose?: () => unknown;
  submitButton: LoadingButtonProps;
  cancelButton: LoadingButtonProps;
}

export const DestroyModal: React.FC<Props> = ({
  isOpen,
  onClose,
  description,
  subDescription,
  title,
  cancelButton,
  submitButton,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center text-center"
      >
        <AlertTriangle className="text-red-500 mb-3" size={42} />
        <p className="text-gray-500 mb-6">{subDescription}</p>

        <div className="flex justify-center gap-3 w-full">
          <Button
            onClick={cancelButton.onClick}
            variant={cancelButton.variant}
            size={cancelButton.size}
            className={
              (cn(
                "w-1/2 rounded-full hover:bg-gray-500 transition-all duration-300"
              ),
              cancelButton.className)
            }
            title={cancelButton.title}
          >
            Cancel
          </Button>
          <LoadingButton
            onClick={submitButton.onClick}
            destructive={submitButton.destructive}
            size={submitButton.size}
            title={submitButton.title}
            className={
              (cn(
                "w-1/2 rounded-full bg-red-600 hover:bg-red-700 transition-all duration-300 shadow-sm"
              ),
              submitButton.className)
            }
            Icon={submitButton.Icon}
            disabled={submitButton.disabled}
            loading={submitButton.loading}
            variant={submitButton.variant}
          />
        </div>
      </motion.div>
    </Modal>
  );
};
