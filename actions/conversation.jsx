'use server'

import SearchResults from '@/components/functions/SearchResults'

import { streamComplete } from '@chatbotkit/react/actions/complete'
import { ChatBotKit } from '@chatbotkit/sdk'

const cbk = new ChatBotKit({
  secret: process.env.CHATBOTKIT_API_SECRET,
})

export async function complete({ messages }) {
  return streamComplete({
    client: cbk.conversation,

    // The backstory is the heart of the conversation. It provides the context
    // and rules for the conversational AI agent to follow. In this example, the
    // backstory is a simple appointment booking system for a virtual assistant.

    backstory: `You are a search engine virtual assistant. You can help users find information on the web. You can also help users with their everyday tasks.
  
ABILITIES:
- You can search for information on the web.
- You can help users with their everyday tasks.
- You can provide information on a wide range of topics.

RULES:
- Be polite and professional.
- Provide accurate information.
`,

    // We allow configuration of the model to be used for the conversation by
    // setting the CHATBOTKIT_MODEL environment variable. The default model is
    // GPT-3.5 Turbo.

    model: process.env.CHATBOTKIT_MODEL || 'gpt-3.5-turbo',

    // Pass the messages to the conversation.

    messages,

    // Pass a list of functions that the AI agent can call to interact with.

    functions: [
      {
        name: 'search',
        description: 'Search the web for information.',
        parameters: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
            },
          },
          required: ['query'],
        },
        handler: async ({ query }) => {
          const results = await fetch(
            `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}`,
            {
              headers: {
                Accept: 'application/json',
                'X-Subscription-Token': process.env.BRAVE_SUBSCRIPTION_TOKEN,
              },
            }
          )

          if (!results.ok) {
            return {
              result: {
                status: 'error',
                message: 'An error occurred while searching the web.',
              },
            }
          }

          const data = await results.json()

          return {
            result: {
              status: 'success',
              data: data.web.results.map(({ description }) => ({
                description,
              })),
            },
            children: <SearchResults data={data} />,
          }
        },
      },
    ],
  })
}
