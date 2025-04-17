'use client';

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { SprossMessageProps, SprossMessage } from './types';

const INTENTS = ['normal', 'primary', 'success', 'warning', 'danger'] as const;

const ICONS = {
  normal:
    'M9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9C16 12.866 12.866 16 9 16ZM8.25 4.5V6H9.75V4.5H8.25ZM8.25 13.5H9.75V7H8.25V13.5Z',
  primary:
    'M9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9C16 12.866 12.866 16 9 16ZM8.01041 10.3388L6.06586 8.39429L5.0052 9.45495L8.01041 12.4602L12.9602 7.51041L11.8995 6.44975L8.01041 10.3388Z',
  success:
    'M9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9C16 12.866 12.866 16 9 16ZM8.01041 10.3388L6.06586 8.39429L5.0052 9.45495L8.01041 12.4602L12.9602 7.51041L11.8995 6.44975L8.01041 10.3388Z',
  warning:
    'M9.4341 2.75983L16.5725 15.252C16.7095 15.4918 16.6262 15.7972 16.3865 15.9342C16.3109 15.9774 16.2254 16.0001 16.1384 16.0001H1.86157C1.58543 16.0001 1.36157 15.7763 1.36157 15.5001C1.36157 15.4131 1.38428 15.3276 1.42745 15.252L8.56586 2.75983C8.70287 2.52007 9.00829 2.43677 9.24805 2.57378C9.32557 2.61807 9.38981 2.68231 9.4341 2.75983ZM8.24998 6.50012V12.0001H9.74998V6.50012H8.24998ZM8.24998 14.5001H9.74998V13.0001H8.24998V14.5001Z',
  danger:
    'M9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9C16 12.866 12.866 16 9 16ZM8.25 4.5V11H9.75V4.5H8.25ZM8.25 13.5H9.75V12H8.25V13.5Z',
};

const defaultProps: SprossMessageProps = {
  className: undefined,
  style: {},
  closable: false,
  content: undefined,
  duration: 3,
  getContainer: () => document.body,
  intent: 'normal',
  onClose: undefined,
};

const Message = forwardRef<HTMLDivElement, SprossMessageProps>(
  (
    {
      className = defaultProps.className,
      style = defaultProps.style,
      closable = defaultProps.closable,
      content = defaultProps.content,
      duration = defaultProps.duration,
      getContainer = defaultProps.getContainer,
      intent = defaultProps.intent,
      onClose = defaultProps.onClose,
      ...otherProps
    },
    ref: any,
  ) => {
    const domRef = useRef<HTMLDivElement>(null);
    let timer: null | ReturnType<typeof setTimeout>;

    const clearCloseTimer = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };

    const setCloseTimer = () => {
      if (duration) {
        timer = setTimeout(() => {
          close();
        }, duration * 1000);
      }
    };

    const handleMouseEnter = () => {
      // clearCloseTimer();
    };

    const handleMouseLeave = () => {
      // setCloseTimer();
    };

    useEffect(() => {
      setCloseTimer();
      return () => {
        clearCloseTimer();
        if (window.sprossMessageState.messages) {
          window.sprossMessageState.messages = window.sprossMessageState.messages.filter(
            (message) => message.id !== domRef.current?.dataset.id,
          );
        }
      };
    }, []);

    useImperativeHandle(ref, () => ({
      close,
      getDomNode: () => domRef.current,
    }));

    return (
      <div
        data-spross-message
        data-spross-message-intent={intent}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={domRef}
        className={className}
        style={style}
        {...otherProps}
      >
        <svg data-spross-message-prefix-icon viewBox="0 0 18 18">
          <path d={ICONS[intent]} fillRule="evenodd" />
        </svg>
        <div data-spross-message-content>{content}</div>
        <svg
          data-spross-message-close-icon
          viewBox="0 0 18 18"
          onClick={() => {
            if (onClose) {
              onClose();
            }
          }}
        >
          <path
            d="M14.1265 4.93709C14.3218 4.74183 14.3218 4.42524 14.1265 4.22998L13.773 3.87643C13.5777 3.68117 13.2611 3.68116 13.0659 3.87643L9.00002 7.94229L4.93416 3.87643C4.7389 3.68117 4.42231 3.68117 4.22705 3.87643L3.8735 4.22998C3.67824 4.42524 3.67824 4.74183 3.8735 4.93709L7.93936 9.00295L3.8735 13.0688C3.67824 13.2641 3.67824 13.5807 3.8735 13.7759L4.22705 14.1295C4.42231 14.3247 4.7389 14.3247 4.93416 14.1295L9.00002 10.0636L13.0659 14.1295C13.2611 14.3247 13.5777 14.3247 13.773 14.1295L14.1265 13.7759C14.3218 13.5807 14.3218 13.2641 14.1265 13.0688L10.0607 9.00295L14.1265 4.93709Z"
            fillRule="evenodd"
          />
        </svg>
      </div>
    );
  },
) as SprossMessage;

// 更新样式的核心函数
const updateStyles = () => {
  setTimeout(() => {
    const { messages } = window.sprossMessageState;
    messages.forEach((id, index) => {
      const message = document.querySelector(`[data-spross-message-container][data-id="${id.id}"]`) as HTMLDivElement;
      const visible = index >= messages.length - 3;
      message.style.opacity = visible ? '1' : '0';
      message.style.visibility = visible ? 'visible' : 'hidden';
      message.style.transform = `translate3d(0, ${70 * (messages.length - 1 - index)}px, 0)`;
    });
  }, 50);
};

const newInstance = (props: SprossMessageProps) => {
  const { onClose, getContainer, intent, ...otherProps } = props;
  const id = Math.random().toString(36).substring(2, 15);
  const container = document.createElement('div');
  container.dataset.sprossMessageContainer = 'true';
  container.dataset.sprossMessageIntent = intent;
  container.dataset.id = id;
  const dest = getContainer ? getContainer() : document.body;

  const newObj = { id };

  if (!window.sprossMessageState) {
    window.sprossMessageState = {
      collapsable: false,
      sameCollapsable: false,
      messages: [newObj],
    };
  } else {
    window.sprossMessageState.messages.push(newObj);
  }
  let instance: any;

  updateStyles();

  const root = createRoot(container);

  const close = () => {
    if (onClose) {
      onClose();
    }
    window.sprossMessageState.messages = window.sprossMessageState.messages.filter((message) => message.id !== id);
    container.style.opacity = '0';
    container.style.visibility = 'hidden';
    updateStyles();
    setTimeout(() => {
      // 卸载组件
      root.unmount();
      // 删除容器
      container.parentNode?.removeChild(container);
    }, 300);
  };

  root.render(
    <Message
      ref={(message) => {
        instance = message;
      }}
      onClose={close}
      intent={intent}
      {...otherProps}
    />,
  );

  // 将容器添加到目标元素
  dest.appendChild(container);

  return {
    destroy: () => {
      if (instance) {
        instance.close();
      }
      dest.removeChild(container);
    },
  };
};

INTENTS.forEach((intent) => {
  Message[intent] = (config: SprossMessageProps | string) => {
    let cnfg = { intent } as SprossMessageProps;
    if (typeof config === 'string') {
      cnfg = { content: config, intent };
    } else {
      cnfg = config;
    }
    return newInstance({
      ...cnfg,
      intent,
    });
  };
});

export default Message;
