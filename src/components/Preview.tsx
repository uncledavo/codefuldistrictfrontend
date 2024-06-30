import { clsx } from 'clsx'

// NB - this is a dummy component for previewing a frame, stripped away parts from frog, should not be used

type Frame = {
  imageAspectRatio: string
  imageUrl: string
  title: string
  input?: { text: string }
  buttons?: { type: string; title: string; target?: string }[]
}

type PreviewProps = {
  frame: Frame
  url: string
}


type Notification = {
    message: string
  }
  
export function Preview(props: PreviewProps) {
  const { frame, url } = props

  const buttonCount = frame.buttons?.length ?? 0
  const hasIntents = Boolean(frame.input || frame.buttons?.length)
  const domain = new URL(url).host

  const notification: Notification | null = null // Replace with dummy data if needed

  return (
    <div className="h-full w-full lg:min-h-frame lg:w-frame lg:w-[300px]">
      <div className="relative w-full rounded-md">
        <div className="relative">
          <Img
            aspectRatio={frame.imageAspectRatio}
            hasIntents={hasIntents}
            src={frame.imageUrl}
            title={frame.title}
          />
          {notification && (
            <div className="absolute inset-x-4 bottom-2">
              <Toast message="toast message" />
            </div>
          )}
        </div>
        {hasIntents && (
          <div className="flex flex-col gap-2 rounded-br-md rounded-bl-md border border-t-0 bg-background-100 px-4 py-2">
            {frame.input && <Input placeholder={frame.input.text} />}

            {frame.buttons && (
              <div
                className={clsx([
                  'grid',
                  'gap-2.5',
                  buttonCount === 1 && 'grid-cols-1',
                  buttonCount === 2 && 'grid-cols-2',
                  buttonCount === 3 && 'grid-cols-3',
                  buttonCount === 4 && 'grid-cols-4',
                ])}
              >
                {frame.buttons.map((button, index) => {
                  switch (button.type) {
                    case 'link':
                      return <ButtonLink key={index} {...button} />
                    case 'mint':
                      return <ButtonMint key={index} {...button} />
                    case 'post':
                      return <ButtonPost key={index} {...button} />
                    case 'post_redirect':
                      return <ButtonPostRedirect key={index} {...button} />
                    case 'tx':
                        return null
                      return <ButtonTransaction key={index} {...button} />
                    default:
                      return null
                  }
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-1 mb-4 text-right text-xs">
        <a className="font-medium text-gray-700" href={url}>
          {domain}
        </a>
      </div>

      <CondensedFrame
        domain={domain}
        imgSrc={frame.imageUrl}
        title={frame.title}
      />
    </div>
  )
}

type CondensedFrameProps = {
  domain: string
  imgSrc: string
  title: string
}

function CondensedFrame(props: CondensedFrameProps) {
  const { imgSrc, domain, title } = props

  return (
    <div className="relative flex w-full flex-row place-items-center justify-center rounded-lg border bg-background-100 p-3 text-inherit text-sm">
      <div className="flex max-h-[48px] min-h-[48px] min-w-[48px] max-w-[48px] items-center justify-center rounded-lg border border-faint dark:bg-gray-alpha-100">
        <img
          className="max-h-[48px] min-h-[48px] min-w-[48px] max-w-[48px] rounded-lg object-cover"
          src={imgSrc}
          alt={title}
        />
      </div>

      <div className="flex max-h-24 flex-col justify-center overflow-hidden rounded-lg p-2">
        <div className="line-clamp-1 font-semibold">{title}</div>
        <div className="line-clamp-1 font-medium text-gray-700 text-xs">
          {domain}
        </div>
      </div>

      <div className="flex grow">
        <div className="flex grow" />
        <button
          type="button"
          className="rounded-lg bg-gray-alpha-100 px-4 py-2 font-semibold text-sm"
          disabled
        >
          View
        </button>
      </div>
    </div>
  )
}

type ImgProps = {
  aspectRatio: string
  hasIntents: boolean
  src: string
  title: string
}

function Img(props: ImgProps) {
  const { aspectRatio, hasIntents, src, title } = props

  return (
    <img
      className={clsx([
        'bg-background-200',
        'border',
        'border-gray-200',
        'min-h-img',
        'object-cover',
        'rounded-t-lg',
        'text-background-200',
        'w-full',
        !hasIntents && 'rounded-lg',
      ])}
      style={{
        aspectRatio: aspectRatio.replace(':', '/'),
        maxHeight: '532.5px',
      }}
      src={src}
      alt={title ?? 'Farcaster frame'}
    />
  )
}

type InputProps = {
  placeholder: string
}

function Input(props: InputProps) {
  const { placeholder } = props
  const value = '' // Replace with dummy data if needed
  return (
    <input
      aria-label={placeholder}
      autoComplete="off"
      className="w-full rounded-md border bg-background-200 px-3 py-2.5 text-sm leading-snug"
      data-1p-ignore
      name="inputText"
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={() => {}}
    />
  )
}

function ButtonLink(props: { title: string }) {
  const { title } = props
  return (
    <button className="bg-gray-alpha-100 border-gray-200 flex items-center justify-center flex-row text-sm rounded-lg border cursor-pointer gap-1.5 h-10 py-2 px-4 w-full" type="button">
      <span className="whitespace-nowrap overflow-hidden text-ellipsis text-gray-1000 font-medium">{title}</span>
      {/* <ExternalLinkIcon className="text-gray-900" style={{ marginTop: '2px' }} /> */} external link icon
    </button>
  )
}

function ButtonMint(props: { title: string }) {
  const { title } = props
  return (
    <button className="bg-gray-alpha-100 border-gray-200 flex items-center justify-center flex-row text-sm rounded-lg border cursor-pointer gap-1.5 h-10 py-2 px-4 w-full" type="button">
      {/* <WarpIcon /> */} warp icon
      <span className="whitespace-nowrap overflow-hidden text-ellipsis text-gray-1000 font-medium">{title}</span>
    </button>
  )
}

function ButtonPost(props: { title: string }) {
  const { title } = props
  return (
    <button className="bg-gray-alpha-100 border-gray-200 flex items-center justify-center flex-row text-sm rounded-lg border cursor-pointer gap-1.5 h-10 py-2 px-4 w-full" type="button">
      <span className="whitespace-nowrap overflow-hidden text-ellipsis text-gray-1000 font-medium">{title}</span>
    </button>
  )
}

function ButtonPostRedirect(props: { title: string }) {
  const { title } = props
  return (
    <button className="bg-gray-alpha-100 border-gray-200 flex items-center justify-center flex-row text-sm rounded-lg border cursor-pointer gap-1.5 h-10 py-2 px-4 w-full" type="button">
      <span className="whitespace-nowrap overflow-hidden text-ellipsis text-gray-1000 font-medium">{title}</span>
    </button>
  )
}
function ButtonTransaction(props: { title: string }) {
  const { title } = props
  return (
    <button className="bg-gray-alpha-100 border-gray-200 flex items-center justify-center flex-row text-sm rounded-lg border cursor-pointer gap-1.5 h-10 py-2 px-4 w-full" type="button">
      <span className="whitespace-nowrap overflow-hidden text-ellipsis text-gray-1000 font-medium">{title}</span>
    </button>
  )
}

function Toast(props: { message: string }) {
  const { message } = props
  return (
    <div className="bg-gray-800 text-white p-2 rounded-md">
      {message}
    </div>
  )
}