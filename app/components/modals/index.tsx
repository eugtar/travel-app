"use client";
import React from "react";
import Button from "../Button";
import { IoMdClose } from "react-icons/io";

interface IModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<IModalProps> = (props) => {
  const {
    body,
    title,
    footer,
    isOpen,
    disabled,
    actionLabel,
    secondaryActionLabel,
    onClose,
    onSubmit,
    secondaryAction,
  } = props;

  const [showModal, setShowModal] = React.useState<boolean | undefined>(isOpen);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = React.useCallback(() => {
    if (disabled) return;
    setShowModal(false);
    setTimeout(() => onClose(), 300);
  }, [disabled, onClose]);

  const handleSubmit = React.useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = React.useCallback(() => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  }, [disabled, secondaryAction]);

  React.useEffect(() => {
    if (showModal) {
      const onKeyUp = function (this: Window, e: KeyboardEvent) {
        if (e.key === "Escape") handleClose();
        if (e.key === "Enter") handleSubmit();
        else return;
      };
      window.addEventListener("keyup", onKeyUp);
      return () => window.removeEventListener("keyup", onKeyUp);
    } else return;
  }, [showModal, handleClose, handleSubmit]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="
          absolute
          left-0
          top-0
          z-50
          flex
          h-full
          w-full
          items-center
          justify-center
          overflow-y-auto
          overflow-x-hidden
          bg-neutral-800/70
          outline-none
          focus:outline-none
        "
        ref={containerRef}
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.stopPropagation();
          if (e.target === containerRef.current) handleClose();
          else return;
        }}
      >
        <div
          className="
            absolute
            top-0
            mx-auto
            my-10
            h-auto
            w-full
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
          "
        >
          {/* CONTENT */}
          <div
            className={`
              h-full
              translate-x-0
              duration-300
              ${showModal ? "opacity-100" : "opacity-0"}
              ${showModal ? "translate-y-0" : "translate-y-full"}
            `}
          >
            <div
              className="
              translate
              relative
              flex
              h-full
              w-full 
              flex-col 
              rounded-lg 
              border-0 
              bg-primary_light 
              shadow-lg 
              outline-none 
              focus:outline-none 
              md:h-auto 
              lg:h-auto
              "
            >
              {/* HEADER */}
              <div
                className="
                  relative
                  flex
                  items-center
                  justify-center
                  rounded-t
                  border-b-[1px]
                  p-6
                "
              >
                <button
                  type="button"
                  title="Close"
                  onClick={handleClose}
                  className="
                    absolute
                    left-9
                    border-0
                    p-1
                    transition
                    hover:opacity-70
                  "
                >
                  <IoMdClose size={18} />
                </button>
                <div
                  className="
                    text-lg
                    font-semibold
                  "
                >
                  {title}
                </div>
              </div>
              {/* BODY */}
              <div
                className="
                  relative
                  flex-auto
                  p-6
                "
              >
                {body}
              </div>
              {/* FOOTER */}
              <div
                className="
                  flex
                  flex-col
                  gap-2
                  p-6
                "
              >
                <div
                  className="
                    flex
                    w-full
                    flex-row
                    items-center
                    gap-4
                  "
                >
                  {secondaryActionLabel && secondaryAction && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer ? footer : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
