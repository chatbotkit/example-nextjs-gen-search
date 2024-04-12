import { complete } from '@/actions/conversation'
import ChatArea from '@/components/ChatArea'
import '@/components/functions'

import ConversationManager from '@chatbotkit/react/components/ConversationManager'

export default function Page() {
  return (
    <ConversationManager endpoint={complete}>
        <ChatArea />
    </ConversationManager>
  )
}
