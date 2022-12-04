import React from 'react'

type Props = {}

function NotSupportedMessage({ }: Props) {
  const notSupportedMessage = `This browser can't read the device's accelerometer data`;

  return (
    <span>{notSupportedMessage}</span>
  )
}

export default NotSupportedMessage
