'use client'

import { useContext } from 'react'

import { ChatInput, ChatMessage, ConversationContext } from '@chatbotkit/react'

import clsx from 'clsx'

export function UserMessage({ text, children, ...props }) {
  return (
    <div {...props} className="flex space-x-2 items-end justify-end">
      {children}
      {text ? (
        <ChatMessage
          className="bg-white text-gray-900 border border-gray-900 rounded-lg shadow-md p-4 prose"
          text={text}
        />
      ) : null}
    </div>
  )
}

export function BotMessage({ text, children, ...props }) {
  return (
    <div {...props} className="flex space-x-2 items-end">
      {children}
      {text ? (
        <ChatMessage
          className="bg-white text-gray-900 border border-gray-900 rounded-lg shadow-md p-4 prose"
          text={text}
        />
      ) : null}
    </div>
  )
}

export default function ChatArea() {
  const {
    thinking,

    text,
    setText,

    message,
    messages,

    submit,
  } = useContext(ConversationContext)

  return (
    <div className="my-10 mx-auto w-full max-w-2xl flex flex-col gap-4">
      {messages.length ? (
        <div className="flex flex-col gap-4">
          {messages
            .filter(({ type }) => ['user', 'bot'].includes(type))
            .map(({ id, type, text, children }, index, messages) => {
              switch (type) {
                case 'user':
                  return <UserMessage key={id} text={text} />

                case 'bot':
                  return (
                    <BotMessage key={id} text={text}>
                      {children ? (
                        <div className="transition-all duration-300 ease-in-out w-full">
                          {children}
                        </div>
                      ) : null}
                    </BotMessage>
                  )
              }
            })}
          {message ? <BotMessage key={message.id} text={message.text} /> : null}
          {thinking ? <BotMessage key="thinking" text="● ● ●" /> : null}
        </div>
      ) : null}
      <ChatInput
        className="p-5 text-lg bg-white border-2 border-gray-900 rounded-xl focus:outline-none resize-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onSubmit={submit}
        placeholder="What do you want to know?"
      />
    </div>
  )
}
