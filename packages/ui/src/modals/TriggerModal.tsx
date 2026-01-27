import { ButtonSize, ButtonVariant } from '@workspace/ui/lib/types';
import { Component, LucideIcon } from 'lucide-react';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ApplyButtonTooltip } from '@workspace/ui/globals/ApplyTooltip';
import { Button } from '@workspace/ui/components/button';

interface TriggerModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onChangeModalState: React.Dispatch<React.SetStateAction<boolean | null>> | ((open: boolean) => void);
  modalIcon?: { icon: LucideIcon; size?: ButtonSize; variant?: ButtonVariant };
  modalText?: string;
  applyTooltip?: { title: string };
  className?: string;
  wrapperClassName?: string;
  disabled?: boolean;
  isVisible?: boolean;
}

/**
 *
 * onChangeModalState state handler
 *
 * modalIcon = { icon: Component, size: "default", variant: "default" } modal props
 *
 * modalText modal text
 *
 * applyTooltip tooltip option
 *
 * className = ""
 *
 * wrapperClassName = "" div element has wrapped the button
 *
 * disabled = false disable state
 *
 * onClick onClick handler
 *
 * isVisible = true if !visible then @returns null
 */
export const TriggerModal: React.FC<TriggerModalProps> = ({
  onChangeModalState,
  modalIcon = { icon: Component, size: 'default', variant: 'default' },
  modalText,
  applyTooltip,
  className = '',
  wrapperClassName = '',
  disabled = false,
  onClick,
  isVisible = true
}) => {
  const wrapperClass = `${wrapperClassName} flex`;
  if (!isVisible) return null;
  return (
    <div className={wrapperClass} onClick={onClick}>
      {applyTooltip ? (
        <ApplyButtonTooltip
          tootTipTitle={applyTooltip.title}
          buttonProps={{
            icon: modalIcon.icon,
            buttonText: modalText,
            size: modalIcon.size,
            variant: modalIcon.variant
          }}
          onClick={() => onChangeModalState(true)}
          className={className}
          disabled={disabled}
        />
      ) : (
        <Button
          variant={modalIcon.variant}
          disabled={disabled}
          onClick={() => onChangeModalState(true)}
          size={modalIcon.size}
          className={className}
        >
          {modalIcon && <modalIcon.icon />}
          {modalText}
        </Button>
      )}
    </div>
  );
};
