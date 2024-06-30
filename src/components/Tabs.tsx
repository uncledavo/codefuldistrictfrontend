import { clsx } from 'clsx'
import { useEffect } from 'react'

// NB - this is a dummy component for previewing a frame, stripped away parts from frog, should not be used


const indicatorStyle = {
  display: 'none',
  height: '2px',
  bottom: '0',
  left: '0.75rem',
  right: '0.75rem',
}


function setTab(tab: string) {
  console.log(`Setting tab to ${tab}`)
}

function unwrapState(state: string): object | string | undefined {
  try {
    const parsed = JSON.parse(decodeURIComponent(state))
    if (parsed.previousState) return parsed.previousState
    if (parsed.initialPath) return undefined
    return parsed
  } catch {
    return state
  }
}

// function bigIntReplacer(_key: string, value: unknown) {
//   if (typeof value === 'bigint') return Number(value)
//   return value
// }

interface Frame {
  imageAspectRatio: string;
  imageUrl: string;
  title: string;
  input: { text: string };
  buttons: { type: string; title: string; target?: string }[];
}

interface TabsProps {
  data: any; // Adjust type as needed
  frame: Frame;
}

interface Frame {
  imageAspectRatio: string;
  imageUrl: string;
  title: string;
  input: { text: string };
  buttons: { type: string; title: string; target?: string }[];
}

interface TabsProps {
  data: any; // Adjust type as needed
  frame: Frame;
}

export function Tabs(props: TabsProps) {
  const { data, frame } = props

  const context = data.context
  let currentState: object | string | undefined
  if (context?.status === 'initial' && context?.previousState)
    currentState = context.previousState
  else if ((frame as { state?: string }).state) currentState = unwrapState((frame as { state?: string }).state)


  const transactionData = data.type === 'tx' ? data.response?.data : undefined
  const transactionId = context?.frameData?.transactionId
  const hasTransaction = Boolean(transactionData || transactionId)

  const tab = 'request'

  useEffect(() => {
    if (tab === 'context' && !context) setTab('request')
    if (tab === 'state' && !currentState) setTab('request')
    if (tab === 'tx' && !hasTransaction) setTab('request')
  }, [context, currentState, tab, hasTransaction])

  return (
    <div className="rounded-md border-sky-100 border-10 bg-black-100">
      <ul
        role="tablist"
        className="flex flex-row rounded-t-md border bg-background-200 text-sm"
        style={{
          borderLeft: '0',
          borderRight: '0',
          borderTop: '0',
          gap: '2px',
          paddingTop: '1px',
          paddingLeft: '0.25rem',
          paddingRight: '0.25rem',
        }}
      >
        <li role="presentation">
          <button
            role="tab"
            type="button"
            id="request"
            onClick={() => setTab('request')}
            aria-selected={tab === 'request'}
            className={clsx([
              'bg-transparent',
              'relative',
              'py-3',
              'border-gray-1000',
              'px-3',
              tab === 'request' ? 'text-gray-1000' : 'text-gray-700',
            ])}
          >
            Request
            <div
              aria-hidden="true"
              className="absolute bg-gray-1000"
              style={{
                ...indicatorStyle,
                ...(tab === 'request' ? { display: 'block' } : {}),
              }}
            />
          </button>
        </li>

        {context && (
          <li role="presentation">
            <button
              role="tab"
              type="button"
              id="context"
              onClick={() => setTab('context')}
              aria-selected={tab === 'context'}
              className={clsx([
                'bg-transparent',
                'relative',
                'py-3',
                'border-gray-1000',
                'px-3',
                tab === 'context' ? 'text-gray-1000' : 'text-gray-700',
              ])}
            >
              Context
              <div
                aria-hidden="true"
                className="absolute bg-gray-1000"
                style={{
                  ...indicatorStyle,
                  ...(tab === 'context' ? { display: 'block' } : {}),
                }}
              />
            </button>
          </li>
        )}

        {currentState && (
          <li role="presentation">
            <button
              role="tab"
              type="button"
              id="state"
              onClick={() => setTab('state')}
              aria-selected={tab === 'state'}
              className={clsx([
                'bg-transparent',
                'relative',
                'py-3',
                'border-gray-1000',
                'px-3',
                tab === 'state' ? 'text-gray-1000' : 'text-gray-700',
              ])}
            >
              State
              <div
                aria-hidden="true"
                className="absolute bg-gray-1000"
                style={{
                  ...indicatorStyle,
                  ...(tab === 'state' ? { display: 'block' } : {}),
                }}
              />
            </button>
          </li>
        )}

        {hasTransaction && (
          <li role="presentation">
            <button
              role="tab"
              type="button"
              id="tx"
              onClick={() => setTab('tx')}
              aria-selected={tab === 'tx'}
              className={clsx([
                'bg-transparent',
                'relative',
                'py-3',
                'border-gray-1000',
                'px-3',
                tab === 'tx' ? 'text-gray-1000' : 'text-gray-700',
              ])}
            >
              {transactionData ? 'Transaction Request' : 'Transaction Receipt'}
              <div
                aria-hidden="true"
                className="absolute bg-gray-1000"
                style={{
                  ...indicatorStyle,
                  ...(tab === 'tx' ? { display: 'block' } : {}),
                }}
              />
            </button>
          </li>
        )}

        <li role="presentation">
          <button
            role="tab"
            type="button"
            id="meta-tags"
            onClick={() => setTab('meta-tags')}
            aria-selected={tab === 'meta-tags'}
            className={clsx([
              'bg-transparent',
              'relative',
              'py-3',
              'border-gray-1000',
              'px-3',
              tab === 'meta-tags' ? 'text-gray-1000' : 'text-gray-700',
            ])}
          >
            Meta Tags
            <div
              aria-hidden="true"
              className="absolute bg-gray-1000"
              style={{
                ...indicatorStyle,
                ...(tab === 'meta-tags' ? { display: 'block' } : {}),
              }}
            />
          </button>
        </li>
      </ul>

      <section
        id="request-section"
        role="tabpanel"
        aria-labelledby="request"
        className="scrollbars flex-col divide-y lg:flex-row lg:divide-x lg:divide-y-0"
        style={{
          fontSize: '0.8125rem',
          display: tab === 'request' ? 'flex' : 'none',
        }}
      >
        <div>Request Content</div>
      </section>

      {hasTransaction && (
        <section
          id="transaction-section"
          role="tabpanel"
          aria-labelledby="transaction"
          className="flex-col divide-y lg:flex-row lg:divide-x lg:divide-y-0"
          style={{
            fontSize: '0.8125rem',
            display: tab === 'tx' ? 'flex' : 'none',
          }}
        >
          <div>Transaction Content</div>
        </section>
      )}

      {context && (
        <section
          id="context-section"
          role="tabpanel"
          aria-labelledby="context"
          className="scrollbars p-4"
          style={{
            fontSize: '0.8125rem',
            display: tab === 'context' ? 'flex' : 'none',
          }}
        >
          <div>Context Content</div>
        </section>
      )}

      {currentState && (
        <section
          id="state-section"
          role="tabpanel"
          aria-labelledby="state"
          style={{
            fontSize: '0.8125rem',
            display: tab === 'state' ? 'block' : 'none',
          }}
        >
          <div className="scrollbars flex flex-col divide-y lg:flex-row lg:divide-x lg:divide-y-0">
            <div className="scrollbars flex flex-col gap-2 p-4 lg:w-1/2">
              <div className="font-medium text-gray-700 text-xs uppercase">
                Current
              </div>
              <div>Current State Content</div>
            </div>

            <div className="scrollbars flex flex-col gap-2 p-4 lg:w-1/2">
              <div className="font-medium text-gray-700 text-xs uppercase">
                Previous
              </div>
              <div>Previous State Content</div>
            </div>
          </div>
        </section>
      )}

      <section
        id="meta-tags-section"
        role="tabpanel"
        aria-labelledby="meta-tags"
        className="relative"
        style={{
          fontSize: '0.8125rem',
          display: tab === 'meta-tags' ? 'block' : 'none',
        }}
      >
        <div>Meta Tags Content</div>
      </section>
    </div>
  )
}