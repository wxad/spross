import * as React from 'react';
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  FloatingPortal,
  FloatingFocusManager,
  FloatingOverlay,
  useTransitionStatus,
} from '@floating-ui/react';

interface DialogOptions {
  initialOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function useDialog({
  initialOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: DialogOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    open,
    onOpenChange: setOpen,
  });

  const context = data.context;

  const click = useClick(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });
  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
    }),
    [open, setOpen, interactions, data],
  );
}

type ContextType = ReturnType<typeof useDialog> | null;

const DialogContext = React.createContext<ContextType>(null);

export const useDialogContext = () => {
  const context = React.useContext(DialogContext);

  if (context == null) {
    throw new Error('Dialog components must be wrapped in <Dialog />');
  }

  return context;
};

export function Dialog({
  children,
  ...options
}: {
  children: React.ReactNode;
} & DialogOptions) {
  const dialog = useDialog(options);
  return <DialogContext.Provider value={dialog}>{children}</DialogContext.Provider>;
}

interface DialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const DialogTrigger = React.forwardRef<HTMLElement, React.HTMLProps<HTMLElement> & DialogTriggerProps>(
  function DialogTrigger({ children, asChild = false, ...props }, propRef) {
    const context = useDialogContext();
    const childrenRef = (children as any).ref;
    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

    // `asChild` allows the user to pass any element as the anchor
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(
        children,
        context.getReferenceProps({
          ref,
          ...props,
          ...children.props,
          'data-state': context.open ? 'open' : 'closed',
        }),
      );
    }

    return (
      <button
        ref={ref}
        // The user can style the trigger based on the state
        data-state={context.open ? 'open' : 'closed'}
        {...context.getReferenceProps(props)}
      >
        {children}
      </button>
    );
  },
);

export const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(function DialogContent(
  props,
  propRef,
) {
  const { context: floatingContext, ...context } = useDialogContext();
  const { isMounted, status } = useTransitionStatus(floatingContext);
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  return (
    isMounted && (
      <FloatingPortal>
        <FloatingOverlay data-status={status} data-spross-modal-overlay lockScroll>
          <div ref={ref} {...context.getFloatingProps(props)} data-status={status}>
            {props.children}
          </div>
        </FloatingOverlay>
      </FloatingPortal>
    )
  );
});

export const DialogClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  function DialogClose(props, ref) {
    const { setOpen } = useDialogContext();
    return <button type="button" {...props} ref={ref} onClick={() => setOpen(false)} />;
  },
);
